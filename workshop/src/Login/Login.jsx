import React from 'react';
import './Login.css';

export default function Login() {
    return <form className="login">
        <div className="form-control">
            <label>Username</label>
            <input type="text" />
        </div>
        <div className="form-control">
            <label>Password</label>
            <input type="password" />
        </div>
        <div className="form-control">
            <button>Login</button>
        </div>
    </form>;
}