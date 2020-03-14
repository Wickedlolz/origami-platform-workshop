import React from 'react';
import * as yup from 'yup';
import './Register.css';
import withForm from '../shared/hocs/withForm';
import userService from '../services/user-service';


class Register extends React.Component {
    usernameOnChangeHandle = this.props.controlChangeHandlerFactory('username');
    passwordOnChangeHandle = this.props.controlChangeHandlerFactory('password');
    rePasswordOnChangeHandle = this.props.controlChangeHandlerFactory('rePassword');

    submitHandler = () => {
        // this.props.runValidations().then(formData => console.log(formData));

        const errors = this.props.getFormErrorState();
        if (!!errors) { return; }
        const data = this.props.getFormState();
        userService.register(data).then(() => {            
            this.props.history.push('/login');
        })
    }

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorState();
        return errorState && errorState[name] && errorState[name][0];
    }

    render() {
        const usernameError = this.getFirstControlError('username');
        const passwordError = this.getFirstControlError('password');
        const rePasswordError = this.getFirstControlError('rePassword');

        return <form className="Register">
            <div className="form-control">
                <label>Username</label>
                <input type="text" onChange={this.usernameOnChangeHandle} />
                {usernameError && <div id="errorMessages" className="error">{usernameError}</div>}
            </div>
            <div className="form-control">
                <label>Password</label>
                <input type="password" onChange={this.passwordOnChangeHandle} />
                {passwordError && <div id="errorMessages" className="error">{passwordError}</div>}
            </div>
            <div className="form-control">
                <label>Re-Password</label>
                <input type="password" onChange={this.rePasswordOnChangeHandle} />
                {rePasswordError && <div id="errorMessages" className="error">{rePasswordError}</div>}
            </div>
            <div className="form-control">
                <button type="button" onClick={this.submitHandler} >Register</button>
            </div>
        </form>;
    }
}

const initialFormState = {
    username: '',
    password: '',
    rePassword: ''
};

const schema = yup.object({
    username: yup.string('Username should be a string')
    .required('Username is required')
    .min(4, 'Username should be more than 4 chars'),

    password: yup.string('Password must be a string')
    .required('Password is required')
    .min(6, 'Password must be more then 6 chars'),

    rePassword: yup.string('Password must be a string')
    // .oneOf([yup.ref('password'), null], 'Passwords don\'t match')
    .required('Password is required')
    .min(6, 'Passowrd must be more than 6 chars')
});

export default withForm(Register, initialFormState, schema)