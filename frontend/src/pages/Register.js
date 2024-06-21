
import React from 'react';

import Background from '../components/Background';
import RegisterForm from '../components/RegisterForm';
import './Register.css';

export default function Register() {
    return (
        <div className="register-container">
            <div className="grid-container">
                <div className="register-left">
                    <Background
                        src="images/background.jpg"
                        alt="Register"
                        text="Create an account to join our community"
                    />
                </div>
                <div className="register-right">
                    <RegisterForm
                        title="Create your Account"
                        buttonText="Register" />
                </div>
            </div>

        </div>
    );
}
