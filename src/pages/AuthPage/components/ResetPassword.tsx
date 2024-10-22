import { auth } from '../../../services/firebase';
import { FirebaseError } from 'firebase/app';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';

const ResetPassword = () => {
    const [resetEmail, setResetEmail] = useState("");
    const [message, setMessage] = useState(""); 
    const [disabled, setDisabled] = useState(false);
    const [error, setError] = useState(false);

    const handleEmail = (value: string) => {
        setDisabled(false);
        setMessage("");
        setResetEmail(value);
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
    
        try {
            await sendPasswordResetEmail(auth, resetEmail);
            setError(false);
            setMessage("Reset email sent successfully (if this email exists)");
            setDisabled(true);
        } catch (error) {
            setError(true);
            if (error instanceof FirebaseError) {
                if (error.code === "auth/missing-email") {
                    setMessage("Enter your email")
                } else {
                    setError(true);
                    setMessage("Reset wasn't send");
                }
            }
        }
    };

    return (
        <div className="b-login">
            <h1>Reset Your Password</h1>
            <form className="b-auth_form-wrap">
                <label className="b-input">
                    <span className="b-input_label">Email Address</span>
                    <input type="email" 
                           name="email"
                           value={resetEmail}
                           autoComplete={"email"}
                           onChange={(e) => handleEmail(e.target.value)} 
                           />
                </label>
                <button className="b-login_login" disabled={disabled} onClick={(e) => handleSubmit(e)}>Send</button>
                {message !== "" && <span className={`b-message ${error ? "error" : "ok"}`}>{message}</span>}
                <div className="b-login_signup">
                    <span>Back to </span>
                    <Link to="/signin" className="b-login_signup-link">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword;