import React from 'react';
import './Aside.css';
import Link from '../shared/Link/Link';

function Aside({ isLogged }) {
    return <aside className="Aside">
        <ul>
            <Link to="#">
                <img id="logo" src="origami.svg" alt="my-app-logo" />
            </Link>
            <Link to="/">Posts</Link>
            {isLogged && <Link to="/create-post">New Post</Link>}
            {isLogged && <Link to="/profile">Profile</Link>}
            {!isLogged &&<Link to="/login">Login</Link>}
            {!isLogged && <Link to="/register">Register</Link>}
        </ul>
    </aside>
}

export default Aside;