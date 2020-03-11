import React from 'react';
import './Footer.css';
import Link from '../shared/Link/Link';

function Footer() {
    return <nav className="Footer">
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
    </nav>
}

export default Footer;