import React from 'react';
import './Aside.css';
import Link from '../shared/Link/Link';

function Aside() {
    return <aside className="Aside">
        <ul>
            <Link to="#">
                <img id="logo" src="origami.svg" alt="my-app-logo" />
            </Link>
            <Link to="/">Posts</Link>
            <Link to="/create-post">New Post</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </ul>
    </aside>
}

export default Aside;