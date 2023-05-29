import { Link } from "react-router-dom";
import './login.css';


const Login = () => {
    return(
        <div className="login">
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