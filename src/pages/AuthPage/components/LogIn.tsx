import { auth } from '../../../services/firebase';
import { FirebaseError } from 'firebase/app';
import { Link } from 'react-router-dom';
import { LogInProps } from '../types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/userContext';

const LogIn: React.FC<LogInProps> = ({emailLogIn, passwordLogIn, setEmailLogIn, setPasswordLogIn, showPassword, show}) => {
    const {setUserId} = useUserContext();
    const [message, setMessage] = useState("");
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {

        try {
            event.preventDefault();
            const userCredential = await signInWithEmailAndPassword(auth, emailLogIn, passwordLogIn);
            const user = userCredential.user;

            setMessage("Logged in successfully!");
            setUserId(user.uid);
            localStorage.setItem('userId', user.uid);
            setTimeout(() => {
                navigate("/shop");
            }, 1000);

        } catch(error) {
            setDisabled(true);
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/invalid-email' || error.code === "auth/invalid-credential") {
                    setMessage("Invalid credential");
                } else {
                    setMessage(`Error: ${error.message}`);
                }
              } else {
                    setMessage("Unknown error occurred");
              }
        }
    }

    const handleOnChangeInput = (value: string, setState: React.Dispatch<React.SetStateAction<string>>) => {
        setState(value);
        setMessage("");
    }

    useEffect(() => {
        (emailLogIn !== "" && passwordLogIn !== "") ? setDisabled(false) : setDisabled(true);
    }, [emailLogIn, passwordLogIn])

    return (
        <div className="b-login">
            <h1>Sign In</h1>
            <form className="b-auth_form-wrap">
                <label className="b-input">
                    <span className="b-input_label">Email</span>
                    <input type="email" 
                           name="email"
                           value={emailLogIn}
                           autoComplete={"email"}
                           onChange={(e) => handleOnChangeInput(e.target.value, setEmailLogIn)} 
                           />
                </label>
                <div className="b-auth_show-hide">
                    <button className="b-input_hide" onClick={(e) => showPassword(e)}>Show</button>
                    <label className="b-input">
                        <span className="b-input_label">Password</span>
                        <input type={show ? "text" : "password"} 
                            name="password"
                            value={passwordLogIn} 
                            autoComplete={"current-password"}
                            onChange={(e) => handleOnChangeInput(e.target.value, setPasswordLogIn)}
                            />
                    </label>
                    <Link to="/reset-password" className="b-login_forget-pass">Forget your password</Link>
                </div>
                <button className="b-login_login" disabled={disabled} onClick={(e) => handleLogin(e)}>Sign In</button>
                {message !== "" && <span className={`b-message ${disabled ? "error" : "ok"}`}>{message}</span>}
                <div className="b-login_signup">
                    <span>Don’t have an account? </span>
                    <Link to="/signup" className="b-login_signup-link">Sign up</Link>
                </div>
            </form>
        </div>
    )
}

export default LogIn;