import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/authentication/AuthContext";
import './signup.css';

const SignUp = () => {
    const {fullname, email, password, confirmpassword,  getUserFullName, getUserEmail, getUserPassoword,getUserConfirmPassword, userRegistrationHandler} = useAuth();



    return(
        <div className="signup">
            <h1>sign up</h1>
            <form className="signup__form" onSubmit={(e) => userRegistrationHandler(e, fullname, email, password, confirmpassword)}>
                <label className="form__label" htmlFor="">
                    full name
                    <input 
                        value={fullname} 
                        type="text" 
                        required
                        onChange={getUserFullName} 
                        />
                </label>
                
                <label  className="form__label" htmlFor="">
                    email address
                    <input 
                        value={email} 
                        type="email" 
                        required
                        onChange={getUserEmail} 
                        />
                </label>

                <label  className="form__label" htmlFor="">
                    password
                    <input 
                        value={password} 
                        type="password" 
                        required
                        onChange={getUserPassoword} 
                        />
                </label>
                
                <label  className="form__label" htmlFor="">
                    confirm password
                    <input 
                        value={confirmpassword} 
                        type="text" 
                        required 
                        onChange={getUserConfirmPassword} 
                    />
                    <p>{password !== confirmpassword && 'password mismatches!'}</p>
                </label>

                <button style={{cursor : password !== confirmpassword && 'not-allowed' }} disabled={password !== confirmpassword} className="form__button"> create new account</button>
            </form>
            <p>already have an account? <Link to={'/login'}>login</Link></p>
        </div>
    )
}

export default SignUp;