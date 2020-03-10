import React from 'react';
import './Footer.css';
import Link from '../shared/Link/Link';

function Footer() {
    return <nav className="Footer">
        <ul>
            <Link url="#">
                <img id="logo" src="origami.svg" alt="my-app-logo" />
            </Link>
            <Link url="#">Footer link 1</Link>
            <Link url="#">Footer link 2</Link>
        </ul>
    </nav>
}

export default Footer;