import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication/AuthContext";
import './login.css';


const Login = () => {
    const {registered} = useAuth()
    
    useEffect(() => {
        if(registered){
            return toast.success('thankyou for registering! please login to continue.')
        }
    } , [registered]);

    return(
        <div className="login">
            <Toaster />
            <h1>sign in</h1>
            <form className="login__form">
                <label className="form__label" htmlFor="">
                    email address
                    <input type="email" name="" id=""  />
                </label>

                <label className="form__label" htmlFor="">
                    password
                    <input type="password" name="" id="" />
                </label>

                <button className="form__button form__button">login</button>
                <button className="form__button form__button">login as guest</button>
            </form>
            <p>don't have an account? <Link to={'/signup'}>signup</Link></p>
        </div>
    )
}

export default Login;