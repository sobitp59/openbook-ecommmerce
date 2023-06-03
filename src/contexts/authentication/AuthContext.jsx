import { createContext, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { initialState, userAuthReducer } from "../../reducers/authReducer";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userAuthReducer, initialState)
    const navigate = useNavigate()

    const getUserFullName = (e) => {
        dispatch({
            type : 'SET_FULLNAME',
            payload : e.target.value
        })
    }
    
    const getUserEmail = (e) => {
        dispatch({
            type : 'SET_EMAIL',
            payload : e.target.value
        })
        
    }
    
    const getUserPassoword = (e) => {
        dispatch({
            type : 'SET_PASSWORD',
            payload : e.target.value
        })
        
    }
    
    const getUserConfirmPassword = (e) => {
        dispatch({
            type : 'SET_CONFIRMPASSWORD',
            payload : e.target.value
        })

    }
 

    const userRegistrationHandler = async (e, fullname, email, password, confirmpassword) => {
        e.preventDefault()
        if(password === confirmpassword){
            try {
                const fetchResponse = await fetch(`/api/auth/signup`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      fullname: fullname,
                      email: email,
                      password: password
                    })
                })
    
                if(fetchResponse.ok){
                    const data = await fetchResponse.json()
                    localStorage.setItem('userToken', data?.encodedToken)
                    dispatch({type : 'CLEAR_FIELD'})  
                    navigate('/login')
                    dispatch({type : 'REGISTRATION_SUCCESS'})
                }else{
                    throw new Error('error occured')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }


    const value = {
        fullname : state.fullname,
        email : state.email,
        password : state.password,
        confirmpassword : state.confirmpassword,
        registered : state.registered,
        getUserFullName,
        getUserEmail,
        getUserPassoword,
        getUserConfirmPassword,
        userRegistrationHandler
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)

 