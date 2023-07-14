import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication/AuthContext";
import './login.css';


const Login = () => {
    const { signup,loginAsGuestHandler, login, userLoginHandler, getUserLoginPassoword, getUserLoginEmail  } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    
    const passwordHandler = (e) => {
        e.preventDefault()
        setShowPassword((prev) => !prev)
    }  

    useEffect(() => {
        if(signup?.registered){
            return toast.success('thankyou for registering. please login to continue')
        }
        if(!signup?.registered){
            return toast.success('please login to continue.')
        }

    } , [signup?.registered]);


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
                        required
                        onChange={getUserLoginEmail} 
                        />
                </label>

                <label className="form__label" htmlFor="">
                    password
                    <input 
                        value={login?.password} 
                        type={showPassword ? "text" : "password"} 
                        required
                        onChange={getUserLoginPassoword} 
                        />
                    <button className="form__passButton" onClick={passwordHandler}>{showPassword ? <AiFillEye className="passBtn"  /> : <AiFillEyeInvisible className="passBtn" />  }</button>
                </label>

                <button className="form__button form__button">login</button>
                <button className="form__button form__button" onClick={loginAsGuestHandler}>login as guest</button>
            </form>
            <p>don't have an account? <Link to={'/signup'}>signup</Link></p>
        </div>
    )
}

export default Login;