import React, { useState } from "react";
import './LoginForm.css';
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function RegisterForm({ title, buttonText }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (password === "123") {
            if (email.includes("vip")) {
                navigate('/landingVIP');
            } else {
                navigate('/landing');
            }
        } else {
            setErrorMessage("Incorrect password. Please try again.");
        }

    };

    return (
        <div className="register-form">
            <h2 >{title}</h2>
            <form className="register-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="submit-button-container">
                    <button type="submit" className="submit-button">
                        {buttonText}
                    </button>
                </div>

                <p className="login-link">
                    <Link to="/reset">Forget Password</Link>

                    < Link to="/">Create an account</Link>
                </p>
            </form>
        </div >
    );
}
