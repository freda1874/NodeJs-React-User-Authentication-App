
import React from 'react';

import Background from '../components/Background';
import PassowrdForm from '../components/PassowrdForm';
import './Register.css';

export default function Register() {
    return (
        <div className="register-container">
            <div className="grid-container">
                <div className="register-left">
                    <Background
                        src="images/background.jpg"
                        alt="Register"
                        text="Welcome to join our community"
                    />
                </div>
                <div className="register-right">
                    <PassowrdForm
                        title="Reset your password"
                        buttonText="Reset Password" />
                </div>
            </div>

        </div>
    );
}
