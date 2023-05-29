import { Link } from "react-router-dom";
import './signup.css';

const SignUp = () => {
    return(
        <div className="signup">
            <h1>sign up</h1>
            <form className="signup__form">
                <label className="form__label" htmlFor="">
                    name
                    <input type="text" name="" id="" />
                </label>
                
                <label  className="form__label" htmlFor="">
                    email address
                    <input type="email" name="" id="" />
                </label>

                <label  className="form__label" htmlFor="">
                    password
                    <input type="password" name="" id="" />
                </label>
                
                <label  className="form__label" htmlFor="">
                    confirm password
                    <input type="text" name="" id="" />
                </label>

                <button className="form__button"> create new account</button>
            </form>
            <p>already have an account? <Link to={'/login'}>login</Link></p>
        </div>
    )
}

export default SignUp;