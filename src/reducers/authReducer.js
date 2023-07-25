export const initialState = {
    signup : {
        fullname : '',
        email : '',
        password : '',
        confirmpassword : '',
    },
    login : {
        email : '',
        password : '',
    },
    user : {
        loggedIn : JSON.parse(localStorage.getItem('userData'))?.token,
        userEncodedToken : JSON.parse(localStorage.getItem('userData'))?.token,
        userInfo : JSON.parse(localStorage.getItem('userData'))?.userInfo 
    }

}

export const userAuthReducer = (state, action) => {
    switch(action.type){
 
        case 'USER_LOGIN' : {
            return {...state, login : {...state.login, [action?.payload?.name] : action?.payload?.value}}
        }
        
        case 'USER_SIGNUP' : {
            return {...state, signup : {...state.signup, [action?.payload?.name] : action?.payload?.value}}
        }
        
        case 'CLEAR_FIELD' : {
            return {...initialState}
        }
        
        case 'REGISTRATION_SUCCESS' : {
            return {...state, user : {...state.signup, userEncodedToken : action?.payload?.token, userInfo : action?.payload?.userInfo, loggedIn : true}}
        }
       
        case 'LOGIN_SUCCESS' : {
            return {...state, user : {...state.user, loggedIn : true, userEncodedToken : action?.payload?.token, userInfo : action?.payload?.userInfo}}
        }

        case 'USER_LOGOUT' : {
            return {...state, user : {loggedIn : false, userEncodedToken : '', userInfo : ''}}
        }

        case 'LOGIN_AS_GUEST' : {
            return {...state, login : { email : action?.payload?.email , password : action?.payload?.password},}
        }

    }
}