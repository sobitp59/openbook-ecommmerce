import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication/AuthContext";


import { useState } from "react";
import './signup.css';
const SignUp = () => {
    const {signup, getUserFullName, getUserEmail, getUserPassoword,getUserConfirmPassword, userRegistrationHandler,} = useAuth();
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const passwordHandler = (e) => {
        e.preventDefault()
        setShowPassword((prev) => !prev)
    }  

    const confirmPasswordHandler = (e) => {
        e.preventDefault()
        setShowConfirmPassword((prev) => !prev)
    }

    return(
        <div className="signup">
            <h1>sign up</h1>
            <form className="signup__form" onSubmit={(e) => userRegistrationHandler(e, signup?.fullname, signup?.email, signup?.password, signup?.confirmpassword)}>
                <label className="form__label" htmlFor="">
                    full name
                    <input 
                        value={signup?.fullname} 
                        type="text" 
                        required
                        onChange={getUserFullName} 
                        />
                </label>
                
                <label  className="form__label" htmlFor="">
                    email address
                    <input 
                        value={signup?.email} 
                        type="email" 
                        required
                        onChange={getUserEmail} 
                        />
                </label>

                <label  className="form__label" htmlFor="">
                    password
                    <input 
                        value={signup?.password} 
                        type={showPassword ? "text" : "password"} 
                        required
                        onChange={getUserPassoword} 
                        />
                    <button className="form__passButton" onClick={passwordHandler}>{showPassword ? <AiFillEye className="passBtn" /> : <AiFillEyeInvisible className="passBtn" />  }</button>
                </label>
                
                <label  className="form__label" htmlFor="">
                    confirm password
                    <input 
                        value={signup?.confirmpassword} 
                        type={showConfirmPassword ? "text" : "password"} 
                        required 
                        onChange={getUserConfirmPassword} 
                        />
                    <button className="form__passButton" onClick={confirmPasswordHandler}>{showConfirmPassword ? <AiFillEye className="passBtn" /> : <AiFillEyeInvisible className="passBtn"/>   }</button>

                </label>
                    <p>{signup?.password !== signup?.confirmpassword && 'password mismatches!'}</p>

                <button style={{cursor : signup?.password !== signup?.confirmpassword && 'not-allowed' }} disabled={signup?.password !== signup?.confirmpassword} className="form__button"> create new account</button>
            </form>
            <p>already have an account? <Link to={'/login'}>login</Link></p>
        </div>
    )
}

export default SignUp;