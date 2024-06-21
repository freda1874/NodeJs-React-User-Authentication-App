import React, { useState } from 'react';
import './VerificationBox.css';
import { useNavigate } from 'react-router-dom';

export default function VerificationBox({ onCancel }) {
    const [code, setCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    function verifyCode() {
        if (code === "123") {
            navigate('/login')
        } else {
            setErrorMessage('The code is incorrect. Please recheck the code or resend a new code.');
        }
    }

    function reSendCode() {
        alert("re-Send code!");
    }


    return (
        <div className="verification-box">
            <p className="description ">
                The verification code has been sent to your Email inbox.
                Please copy it to the input box below.
            </p>
            <div className="input-group">
                <label htmlFor="verificationCode">Verification Code</label>
                <input type="text"
                    id="verificationCode"
                    name="verificationCode"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}

                />
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="button-group">
                <button onClick={verifyCode} className="verify-button">Verify  Code</button>
                <button onClick={reSendCode} className="send-button">Send New Code</button>
            </div>
            <div onClick={onCancel} className="cancel-group">
                <span className="cancel-icon">☚</span>
                <span className="cancel-text">Cancel</span>
            </div>
        </div>
    );
}
