import { changePassword } from '../../../services/asynkThunks/changePassword';
import { ChangePasswordProps } from '../types';
import { StoreDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ChangePassword: React.FC<ChangePasswordProps> = ({showPassword, show}) => {
    const dispatch = useDispatch<StoreDispatch>();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [checkNewPassword, setCheckNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);

    const handleNewPassword = (value: string) => {
        setNewPassword(value);

        if (value.length < 8) {
            setMessage("Password length should be 8 or more characters");
            setDisabled(true);
            return; 
        }

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]+$/.test(value)) {
            setMessage("Password should have a mix of letters, numbers, and symbols");
            setDisabled(true);
            return;
        }

        if (value !== checkNewPassword) {
            setMessage("New password and confirm new password do not match");
            setDisabled(true);
            return; 
        }
    
        setMessage("");
        setDisabled(false);
    }

    const confirmPassword = (value: string) => {
        setCheckNewPassword(value);

        if (value !== newPassword) {
            setMessage("New password and confirm new password do not match");
            setDisabled(true);
            return; 
        }

        setMessage("");
        setDisabled(false);
    }

    const handleChangePassword = (event: React.FormEvent) => {
        event.preventDefault();
        dispatch(changePassword(newPassword));
        setMessage("Password was changed");
        setTimeout(() => {
            navigate("/signin");
        }, 1000);
    }

    return (
        <div className="b-login">
            <h1>Create New Password</h1>
            <span className="b-auth_desc">Your new password must be different from previous used passwords.</span>
            <form className="b-auth_form-wrap">
                <div className="b-auth_show-hide">
                    <button className="b-input_hide" onClick={(e) => showPassword(e)}>Show</button>
                    <label className="b-input">
                        <span className="b-input_label">Password</span>
                        <input type={show ? "text" : "password"}  
                            name="password-signup"
                            onChange={(e) => handleNewPassword(e.target.value)}
                            />
                        <span className="b-input_desc">Use 8 or more characters with a mix of letters, numbers & symbols</span>
                    </label>
                </div>
                <label className="b-input new-password">
                    <span className="b-input_label">Confirm Password</span>
                    <input type={show ? "text" : "password"}  
                        name="password-signup"
                        onChange={(e) => confirmPassword(e.target.value)}
                        />
                    <span className="b-input_error">
                        {message !== "" && <span className={`b-message ${disabled ? "error" : "ok"}`}>{message}</span>}
                    </span>
                </label>
                <button className="b-login_login" disabled={disabled} onClick={handleChangePassword}>Reset Password</button>
            </form>
        </div>
    )
}

export default ChangePassword;