import React from 'react';
import './Navigation.css';
import Link from '../shared/Link/Link';

function Navigation({ isLogged }) {
    return <nav className="Navigation">
        <ul>
            <Link to="#">
                <img id="logo" src="origami.svg" alt="my-app-logo" />
            </Link>
            <Link to="/">Posts</Link>
            {isLogged && <Link to="/create-post">New Post</Link>}
            {isLogged && <Link to="/profile">Profile</Link>}
            {!isLogged &&<Link to="/login">Login</Link>}
            {!isLogged && <Link to="/register">Register</Link>}
            {isLogged && <Link to="/logout">Logout</Link>}

        </ul>
    </nav>;
}

export default Navigation;