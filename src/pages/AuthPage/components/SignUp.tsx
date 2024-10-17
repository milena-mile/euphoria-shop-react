import { addUser } from '../../../services/asynkThunks/addUser';
import { auth } from '../../../services/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { Link } from 'react-router-dom';
import { SignUpProps } from '../types';
import { StoreDispatch } from '../../../store/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../../slices/types';

const SignUp: React.FC<SignUpProps> = ({emailSignUp, passwordSignUp, setEmailSignUp, setPasswordSignUp, showPassword, show}) => {
    const dispatch = useDispatch<StoreDispatch>();
    const [disabled, setDisabled] = useState(true);
    const [checked, setChecked] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [checkEmail, setCheckEmail] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleTermsAgree = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setChecked(checked);
    }

    const handleCorrectEmail = (value: string) => {
        setEmailSignUp(value);

        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            setMessage("Invalid email");
            setCheckEmail(false);
            return;
        }

        setCheckEmail(true);
        setMessage("");
    }

    const handleCorrectPassword = (value: string) => {
        setPasswordSignUp(value);

        if (value.length < 8) {
            setMessage("Password length should be 8 or more characters");
            setCheckPassword(false);
            return; 
        }

        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d]+$/.test(value)) {
            setMessage("Password should have a mix of letters, numbers, and symbols");
            setCheckPassword(false);
            return;
        } 

        setCheckPassword(true);
        setMessage("");
    }

    useEffect(() => {
        setDisabled(!(checked && checkPassword && checkEmail));
    }, [checked, checkPassword, checkEmail, disabled]);

    const handleSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const user = await createUserWithEmailAndPassword(auth, emailSignUp, passwordSignUp);
            const userData: UserData = {
                id: user.user.uid,
                email: user.user.email ?? ""
            }

            dispatch(addUser(userData));

            if (!disabled) {
                setMessage("User was registered sucessfully!");
                setEmailSignUp("");
                setPasswordSignUp("");
                setTimeout(() => {
                    navigate("/signin");
                }, 1000);
            } 

        } catch (error) {

            if (error instanceof FirebaseError) {
                if (error.code === 'auth/invalid-email') {
                    setMessage("Invalid email");
                } else if (error.code === 'auth/email-already-in-use') {
                    setMessage("User with this email already exists");
                } else {
                    setMessage(`Error: ${error.message}`);
                }
                
            } else {
                setMessage("Unknown error occurred");
            }
        }
    }

    return (
        <div className="b-signup">
            <h1>Sign Up</h1>
            <span className="b-auth_desc">Sign up for free to access to in any of our products </span>
            <form className="b-auth_form-wrap">
                <label className="b-input">
                    <span className="b-input_label">Email Address</span>
                    <input type="email" 
                           name="email-sighup"
                           value={emailSignUp}
                           onChange={(e) => handleCorrectEmail(e.target.value)} 
                           />
                </label>
                <div className="b-auth_show-hide">
                    <button className="b-input_hide" onClick={(e) => showPassword(e)}>Show</button>
                    <label className="b-input">
                        <span className="b-input_label">Password</span>
                        <input type={show ? "text" : "password"}  
                            name="password-signup"
                            value={passwordSignUp} 
                            onChange={(e) => handleCorrectPassword(e.target.value)}
                            />
                        <span className="b-input_desc">Use 8 or more characters with a mix of letters, numbers & symbols</span>
                    </label>
                </div>
                <label className="b-input_checkbox">
                    <input type="checkbox" name="agree" onChange={(e) => handleTermsAgree(e)}/>
                    <span>Agree to our <Link to="/terms-conditions">Terms of use</Link> and <Link to="/privacy-policy">Privacy Policy</Link> </span>
                </label>
                <button className="b-login_login" disabled={disabled} onClick={(e) => handleSignUp(e)}>Sign Up</button>
                {message !== "" && <span className={`b-message ${disabled ? "error" : "ok"}`}>{message}</span>}
                <div className="b-login_signup">
                    <span>Already have an  account? </span>
                    <Link to="/signin" className="b-login_signup-link">Log in</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp;