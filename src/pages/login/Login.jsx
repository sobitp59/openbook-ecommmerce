import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication/AuthContext";
import './login.css';


const Login = () => {
    const { handleUserLoginData, loginAsGuestHandler, login, userLoginHandler} = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    
    const passwordHandler = (e) => {
        e.preventDefault()
        setShowPassword((prev) => !prev)
    }  

    return(
        <div className="login">
            <Toaster />
            <h1>sign in</h1>
            <form className="login__form" onSubmit={(e) => userLoginHandler(e, login?.email, login?.password)}>
                <label className="form__label" htmlFor="">
                    email address
                    <input 
                        value={login?.email} 
                        type="email"
                        name="email" 
                        required
                        onChange={handleUserLoginData} 
                        />
                </label>

                <label className="form__label" htmlFor="">
                    password
                    <input 
                        value={login?.password} 
                        type={showPassword ? "text" : "password"} 
                        required
                        name="password"
                        onChange={handleUserLoginData} 
                        />
                    <button className="form__passButton" onClick={passwordHandler}>{showPassword ? <AiFillEye className="passBtn"  /> : <AiFillEyeInvisible className="passBtn" />  }</button>
                </label>

                <button type='submit' className="form__button form__button" >login</button>
                <button type='submit' className="form__button form__button" onClick={loginAsGuestHandler}>login as guest</button>
            </form>
            <p>don't have an account? <Link to={'/signup'}>signup</Link></p>
        </div>
    )
}

export default Login;