import { createContext, useContext, useReducer } from "react";
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import { initialState, userAuthReducer } from "../../reducers/authReducer";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(userAuthReducer, initialState)
    const navigate = useNavigate()
    const location = useLocation()


    


    const handleUserLoginData = (event) => {
        const {name, value} = event?.target;
        dispatch({
            type : 'USER_LOGIN',
            payload : {
                name : name,
                value : value 
            }
        }) 
    }
    
    const handleUserSignupData = (event) => {
        const {name, value} = event?.target;
        dispatch({
            type : 'USER_SIGNUP',
            payload : {
                name : name,
                value : value 
            }
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
                    const { encodedToken, createdUser} = data;
                    const userSignUpData = {token : encodedToken, userInfo : createdUser}
                    localStorage.setItem('userData', JSON.stringify(userSignUpData))
                    
                    dispatch({type : 'CLEAR_FIELD'});  
                    dispatch({
                        type : 'REGISTRATION_SUCCESS',
                        payload : {
                            token :  encodedToken,
                            userInfo : createdUser,
                            
                        }
                    })
                    
                    toast.success(`hello! ${createdUser?.fullname}, welcome to OpenBook`)
                    navigate('/')
                }else{
                    throw new Error('some error occured')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }



    const userLoginHandler = async (e, email, password) => {
        e.preventDefault();

        try {
            const fetchResponse = await fetch('/api/auth/login', {
                method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      email: email.toLowerCase(),
                      password: password
                    })
            });

            if(fetchResponse.ok){
                const data = await fetchResponse.json();
                console.log(data)
                const {encodedToken, foundUser} = data;
                const userLoginData = {token : encodedToken, userInfo : foundUser}
                localStorage.setItem('userData', JSON.stringify(userLoginData))
                toast.success(`welcome! ${foundUser?.fullname}`)
                dispatch({type : 'CLEAR_FIELD'})  
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        userInfo : foundUser,
                        token : encodedToken,
                    }
            })
            location?.state?.from?.pathname ? navigate(location?.state?.from?.pathname) : navigate('/')
            }else{
                console.log('some error occured');
                toast.error('user not found, please enter valid credentials')
            }
            console.log(location)
        } catch (error) {
            console.log(error)
        }
    }

    const userLogoutHandler = (clearCart, clearWishlist) => {
        
        clearCart();
        clearWishlist();

        localStorage.removeItem('userData');
        dispatch({
            type : 'USER_LOGOUT',
        })
        setTimeout(() => {
            toast.error('logged out successfully')
        }, 400)
        navigate('/')
    }

    const loginAsGuestHandler = () => {

        dispatch ({
            type : 'LOGIN_AS_GUEST',
            payload : {
                email : 'guest@gmail.com',
                password : 'guest@test'
            }
        });
        
    }

    


    const value = {
        login : state.login,
        signup : state.signup,
        user : state.user,
        handleUserLoginData,
        handleUserSignupData,
        userRegistrationHandler,
        userLoginHandler,
        userLogoutHandler,
        loginAsGuestHandler
 
    }


    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)

 