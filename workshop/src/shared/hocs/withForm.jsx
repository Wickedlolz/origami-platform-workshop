import React from 'react';
import Register from '../../Register/Register';

const runControlValidation = (value, validations) => {
    return validations.validate(value, { abortEarly: false });
};

export const getValidationsRunnerForSchema = schema => form => {
    return schema && schema.validate(form, { abortEarly: false })
        .then(() => { return form; }).catch(err => {
        const errors = err.inner.reduce((acc, { path, message }) => {
            acc[path] = (acc[path] || []).concat(message);
            return acc;
        }, {});
        return Promise.reject(errors);
        }) || Promise.resolve();
}

const getControlChangeHandler = (validations, setValue, setErrors) => {
    let id;
    return  e => {
        const newValue = e.target.value;
        if (id) { clearTimeout(id); id = null; }
        id = setTimeout(() => {
            setValue(newValue);
            runControlValidation(newValue, validations)
                .then(() => {
                    setErrors(undefined);
                    console.log('Clear errors!');
                })
                .catch(err => {
                    setErrors(err.errors);
                    console.log(err.errors);
                });            
            id = null;
        }, 200);
    };
}

export const useFormControl = (defaultValue, validations) => {
    const [value, setValue] = React.useState(defaultValue);
    const [errors, setErrors] = React.useState(undefined);

    const changeHandler = React.useCallback(
        getControlChangeHandler(validations, setValue, setErrors),
        [validations, setValue, setErrors]
    );

    return React.useMemo(() => ({
        value,
        setValue,
        errors,
        setErrors,
        changeHandler
    }), [value, setValue, errors, setErrors, changeHandler]);
};


export default function withForm(Cmp, initialState, schema) {
    return class extends React.Component {
        state = {
            form: initialState,
            errors: undefined
        };

        controlChangeHandlerFactory = name => {
            let id;
            return e => {
                const newValue = e.target.value;
                if (id) { clearTimeout(id); id = null; }
                id = setTimeout(() => {
                    this.setState(({ form }) => {
                        return { form: { ...form, [name]: newValue } };
                    });
                    
                    this.runControlValidation(name)
                    .then(() => {
                        this.setState(({ errors: { [name]: current, ...others } = {} }) => 
                            ({ errors: Object.keys(others).length === 0 ? undefined : others })
                        );
                    })
                    .catch(err => {
                        this.setState(({ errors }) => ({ errors: { ...errors, [name]: err.errors } }));
                    });
                    
                    id = null;
                }, 200);
            };
        };

        getFormState = () => {
            return this.state.form;
        }

        getFormErrorState = () => {
            return this.state.errors;
        };

        runControlValidation = name => {
            const currentValue = this.state.form[name];
            return schema && schema.fields[name].validate(currentValue, { abortEarly: false }) || Promise.resolve();
        };

        runValidations = () => {
            return schema && schema.validate(this.state.form, { abortEarly: false })
              .then(() => {
                this.setState({ errors: undefined });
                return this.state.form;
              }).catch(err => {
                const errors = err.inner.reduce((acc, { path, message }) => {
                  acc[path] = (acc[path] || []).concat(message);
                  return acc;
                }, {});
                this.setState({ errors });
              }) || Promise.resolve();
          }

        render() {
            return <Cmp {...this.props} controlChangeHandlerFactory={this.controlChangeHandlerFactory} getFormState={this.getFormState} runValidations={this.runValidations} getFormErrorState={this.getFormErrorState}></Cmp>
        }
    }
}