import ChangePassword from './components/ChangePassword';
import LogIn from './components/LogIn';
import ResetPassword from './components/ResetPassword';
import SignUp from './components/SignUp';
import { useState } from 'react';
import './authPage.scss';

const AuthPage = (props: {form: string}) => {
    const [emailSignUp, setEmailSignUp] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("");
    const [emailLogIn, setEmailLogIn] = useState("");
    const [passwordLogIn, setPasswordLogIn] = useState("");

    const [show, setShow] = useState(false);

    const handleShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const el = event.currentTarget;
        el.classList.toggle("active");
        if (el.classList.contains('active')) {
            el.innerText = "Hide";
            setShow(true);
        } else {
            el.innerText = "Show";
            setShow(false);
        }
    }

    return (
        <div className="b-auth">
            <div className="b-auth_image">
                <img src={`/public/images/${props.form}.jpg`} alt={props.form} />
            </div>
            <div className="b-auth_form">
                {props.form === "signup" && 
                    <SignUp setEmailSignUp={setEmailSignUp} 
                            setPasswordSignUp={setPasswordSignUp}
                            emailSignUp={emailSignUp}
                            passwordSignUp={passwordSignUp}
                            showPassword={handleShowPassword}
                            show={show}/>}
                {props.form === "login" && 
                    <LogIn setEmailLogIn={setEmailLogIn} 
                           setPasswordLogIn={setPasswordLogIn}
                           emailLogIn={emailLogIn} 
                           passwordLogIn={passwordLogIn}
                           showPassword={handleShowPassword}
                           show={show}/>}
                {props.form === "reset-pass" && 
                    <ResetPassword/>}
                {props.form === "change-pass" && 
                    <ChangePassword showPassword={handleShowPassword}
                                    show={show}/>}
            </div>
        </div>
    )
}

export default AuthPage;