import React, { useState } from "react";
import './RegisterForm.css';
import { Link } from "react-router-dom";
import VerificationBox from "./VerificationBox";

export default function PassowrdForm({ title, buttonText }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showVerificationBox, setShowVerificationBox] = useState(false);
    const [rePassword, setRePassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        if (password !== rePassword) {
            setErrorMessage("Passwords do not match!");
            return;
        }
        setShowVerificationBox(true);
    };

    function handleCancel() {
        setShowVerificationBox(false); // Hide VerificationBox on cancel
    };


    function handlePasswordChange(e) {
        setPassword(e.target.value);

    }

    function handleRePasswordChange(e) {
        setRePassword(e.target.value);

    }

    return (
        <div className="register-form">
            {showVerificationBox && <VerificationBox onCancel={handleCancel} />}
            <h2 className={`form ${showVerificationBox ? 'blur' : ''}`}>{title}</h2>
            <form className={`form ${showVerificationBox ? 'blur' : ''}`} onSubmit={handleSubmit}>

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
                        onChange={handlePasswordChange}

                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="re-password">Re-enter Password</label>
                    <input
                        type="password"
                        id="re-password"
                        value={rePassword}
                        onChange={handleRePasswordChange}
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
                    <Link to="/login">Log in</Link>
                    <Link to="/">Register</Link>

                </p>
            </form>
        </div>
    );
}
