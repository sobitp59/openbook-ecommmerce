import { createContext, useContext, useReducer } from "react";
import { json, useNavigate } from "react-router-dom";
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

    const getUserLoginEmail = (e) => {
        dispatch({
            type : 'SET_LOGIN_EMAIL',
            payload : e.target.value
        })
    }
    
    const getUserPassoword = (e) => {
        dispatch({
            type : 'SET_PASSWORD',
            payload : e.target.value
        })
        
    }
    
    const getUserLoginPassoword = (e) => {
        dispatch({
            type : 'SET_LOGIN_PASSWORD',
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
                      email: email.toLowerCase(),
                      password: password
                    })
                })
    
                if(fetchResponse.ok){
                    const data = await fetchResponse.json()
                    dispatch({type : 'CLEAR_FIELD'})  
                    navigate('/login')
                    dispatch({type : 'REGISTRATION_SUCCESS'})
                }else{
                    throw new Error('some error occured')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }



    const userLoginHandler = async (e, email, password) => {
        e.preventDefault()
        try {
            const fetchResponse = await fetch('/api/auth/login', {
                method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      authorization : `Bearer ${state?.user?.userEncodedToken}`
                    },
                    body: JSON.stringify({
                      email: email.toLowerCase(),
                      password: password
                    })
            });
            if(fetchResponse.ok){
                const data = await fetchResponse.json()
                console.log(data)
                console.log(data?.foundUser)
                const userData = {token : `Bearer ${data?.encodedToken}`, userInfo : data?.foundUser}
                localStorage.setItem('userData', JSON.stringify(userData))
                dispatch({type : 'CLEAR_FIELD'})  
                // navigate('/products')
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        userInfo : data?.foundUser,
                        token : `Bearer ${data?.encodedToken}`,
                    }
                })
            }else{
                console.log('some error occured')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const userLogoutHandler = () => {
        console.log('hello')
        localStorage.clear()
        dispatch({
            type : 'USER_LOGOUT',
            payload : {
                isLoggedIn : false
            }
        })
        navigate('/')
    }

    


    const value = {
        login : state.login,
        signup : state.signup,
        user : state.user,
        getUserFullName,
        getUserEmail,
        getUserPassoword,
        getUserConfirmPassword,
        userRegistrationHandler,
        userLoginHandler,
        userLogoutHandler,
        getUserLoginPassoword,
        getUserLoginEmail,
 
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)

 