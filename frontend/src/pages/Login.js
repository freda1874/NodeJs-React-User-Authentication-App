
import React from 'react';
import Background from '../components/Background';
import LoginForm from '../components/LoginForm';
import './Login.css';

export default function Login() {
    return (
        <div className="register-container">
            <div className="grid-container">
                <div className="register-left">
                    <Background
                        src="images/background.jpg"
                        alt="Register"
                        text="Welcome back to our community"
                    />
                </div>
                <div className="register-right">
                    <LoginForm
                        title="Welcome Back!"
                        buttonText="Login" />
                </div>
            </div>

        </div>
    );
}
