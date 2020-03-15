import React from 'react';
import './Login.css';
// import withForm from '../shared/hocs/withForm';
import userService from '../services/user-service';
import { useFormControl, getValidationsRunnerForSchema } from '../shared/hocs/withForm';
import * as yup from 'yup';

const validations = {
    username: yup.string('Username should be a string')
    .required('Username is required')
    .min(4, 'Username should be more than 4 chars'),

    password: yup.string('Password must be a string')
    .required('Password is required')
    .min(6, 'Password must be more then 6 chars')
}

const schema = yup.object().shape(validations);

const validationsRunner = getValidationsRunnerForSchema(schema);

const Login = ({ login, history }) => {
    const usernameFormControl = useFormControl('', validations.username);
    const passwordFormControl = useFormControl('', validations.password);
    const [serverError, setServerError] = React.useState(null);

    const submitHandler = React.useCallback(() => {
        validationsRunner({
            username: usernameFormControl.value,
            password: passwordFormControl.value
        }).then(data => {
            login(history, data).catch(error => {
                if (typeof error === 'object') { throw error; }
                setServerError(error);
            });
        }).catch(errors => {
            if (errors.username) { usernameFormControl.setErrors(errors.username); }
            if (errors.password) { passwordFormControl.setErrors(errors.password); }
        })
    }, [usernameFormControl, passwordFormControl, setServerError, history, login]);

    return <form className="login">
        <div className="form-control">
            <label>Username</label>
            <input type="text" onChange={usernameFormControl.changeHandler} />
        </div>
        <div id="error-message" className="form-control">{usernameFormControl.errors && usernameFormControl.errors[0]}</div>
        <div className="form-control">
            <label>Password</label>
            <input type="password" onChange={passwordFormControl.changeHandler} />
        </div>
        <div id="error-message" className="form-control">{passwordFormControl.errors && passwordFormControl.errors[0]}</div>
        <div className="form-control">
            <button type="button" onClick={submitHandler}>Login</button>
        </div>
    </form>;
}

export default Login;

// class Login extends React.Component {
//     state = { error: null }
//     usernameChangeHandler = this.props.controlChangeHandlerFactory('username');
//     passwordChangeHandler = this.props.controlChangeHandlerFactory('password');

//     submitHandler = () => {
//         const errors = this.props.getFormErrorState();
//         if (!!errors) { return; }
//         const data = this.props.getFormState();
//         this.props.login(this.props.history, data).catch(error => {
//             this.setState({ error });
//         });
//     }    

//     render() {
//         const { error } = this.state;
//         return <form className="login">
//             <div className="form-control">
//                 <label>Username</label>
//                 <input type="text" onChange={this.usernameChangeHandler} />
//             </div>
//             <div className="form-control">
//                 <label>Password</label>
//                 <input type="password" onChange={this.passwordChangeHandler} />
//             </div>
//             {error && <div id="error-message" className="form-control">{error}</div>}
//             <div className="form-control">
//                 <button type="button" onClick={this.submitHandler}>Login</button>
//             </div>
//         </form>;
//     }
// }

// export default withForm(Login, { username: '', password: '' });