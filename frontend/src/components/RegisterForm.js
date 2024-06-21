import React, { useState } from "react";
import './RegisterForm.css';
import { Link } from "react-router-dom";
import VerificationBox from "./VerificationBox";

export default function RegisterForm({ title, buttonText }) {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showVerificationBox, setShowVerificationBox] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setShowVerificationBox(true);
    };

    function handleCancel() {
        setShowVerificationBox(false); // Hide VerificationBox on cancel
    };
    return (
        <div className="register-form">
            {showVerificationBox && <VerificationBox onCancel={handleCancel} />}
            <h2 className={`form ${showVerificationBox ? 'blur' : ''}`}>{title}</h2>
            <form className={`form ${showVerificationBox ? 'blur' : ''}`} onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

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
                <div className="submit-button-container">
                    <button type="submit" className="submit-button">
                        {buttonText}
                    </button>
                </div>
                <p className="login-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </form>
        </div>
    );
}
