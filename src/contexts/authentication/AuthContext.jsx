import { createContext, useContext, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { initialState, userAuthReducer } from "../../reducers/authReducer";

import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userAuthReducer, initialState)
    const navigate = useNavigate()
    const location = useLocation()

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
                    const data = await fetchResponse.json();
                    console.log(data)
                    const userSignUpData = {token : `${data?.encodedToken}`}
                localStorage.setItem('userSignUpData', JSON.stringify(userSignUpData))
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
                const userLoginData = {token : `${data?.encodedToken}`, userInfo : data?.foundUser}
                localStorage.setItem('userLoginData', JSON.stringify(userLoginData))
                dispatch({type : 'CLEAR_FIELD'})  
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        userInfo : data?.foundUser,
                        token : `${data?.encodedToken}`,
                    }
            })
            location?.state?.from?.pathname ? navigate(location?.state?.from?.pathname) : navigate('/')
            }else{
                console.log('some error occured')
            }
            console.log(location)
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
        setTimeout(() => {
            toast.error('logged out successfully')
        }, 400)
        navigate('/')
    }

    const loginAsGuestHandler = async () => {
        console.log(location)

        dispatch ({
            type : 'LOGIN_AS_GUEST',
            payload : {
                email : 'guest@gmail.com',
                password : 'guest@test'
            }
        });

        try {
            const fetchResponse = await fetch(`/api/auth/signup`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  fullname: 'guest user',
                  email: state?.login?.email?.toLowerCase() || 'guest@gmail.com',
                  password: state?.login?.password || 'guest@test'
                })
            })

            if(fetchResponse.ok){
                const data = await fetchResponse.json();
                const userSignUpData = {token : `${data?.encodedToken}`}
            localStorage.setItem('userSignUpData', JSON.stringify(userSignUpData))
                dispatch({type : 'CLEAR_FIELD'})  
                dispatch({type : 'REGISTRATION_SUCCESS'})
            }else{
                throw new Error('some error occured')
            }
        } catch (error) {
            console.log(error)
        }


        // login
        try {
            const fetchResponse = await fetch('/api/auth/login', {
                method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      authorization : `Bearer ${state?.user?.userEncodedToken}`
                    },
                    body: JSON.stringify({
                      email: state?.login?.email?.toLowerCase(),
                      password: state?.login?.password
                    })
            });
            if(fetchResponse.ok){
                const data = await fetchResponse.json()
                const userLoginData = {token : `${data?.encodedToken}`, userInfo : data?.foundUser}
                localStorage.setItem('userLoginData', JSON.stringify(userLoginData))
                dispatch({type : 'CLEAR_FIELD'})  
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        userInfo : data?.foundUser,
                        token : data?.encodedToken,
                    }
                })
            location?.state?.from?.pathname ? navigate(location?.state?.from?.pathname) : navigate('/')

            }else{
                console.log('some error occured')
            }
        } catch (error) {
            console.log(error)
        }


        console.log('LOGIN AS GUEST')
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
        loginAsGuestHandler
 
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)

 