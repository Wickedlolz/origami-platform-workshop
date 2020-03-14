import React from 'react';
import Posts from '../publications/Posts/Posts';
import './Profile.css';

export default function Profile() {
    return <div className="Profile">
        <img src="default-profile-picture1.jpg" alt="profile" />
        <div className="personal-info">
            <p>
                <span>Email:</span>
                myemail@abv.bg
            </p>
            <p>
                <span>Posts:</span>
                1000
            </p>
        </div>
        <Posts limit={3} />
    </div>;
}