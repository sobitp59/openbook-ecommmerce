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
        registered : false,
        loggedIn : localStorage.getItem('userToken') ||  false,
        userEncodedToken : JSON.parse(localStorage.getItem('userData'))?.token || false,
        userInfo : JSON.parse(localStorage.getItem('userData'))?.userInfo || false

    }

}

export const userAuthReducer = (state, action) => {
    switch(action.type){
        case 'SET_FULLNAME': {
            return {...state, signup : {...state.signup, fullname : action?.payload}}
        }
        
        case 'SET_EMAIL' : {
            return {...state, signup : {...state.signup, email : action?.payload}}
        }

        case 'SET_LOGIN_EMAIL' : {
            return {...state, login : {...state.login, email : action?.payload}}
        }
        
        case 'SET_PASSWORD' : {
            return {...state, signup : {...state.signup, password : action?.payload}}
        }
        
        case 'SET_LOGIN_PASSWORD' : {
            return {...state, login : {...state.login, password : action?.payload}}
        }
        
        case 'SET_CONFIRMPASSWORD' : {
            return {...state, signup : {...state.signup, confirmpassword : action?.payload}}
        }
        
        case 'CLEAR_FIELD' : {
            return {...initialState}
        }
        
        case 'REGISTRATION_SUCCESS' : {
            return {...state, user : {...state.signup, registered : true}}
        }
       
        case 'LOGIN_SUCCESS' : {
            console.log()
            return {...state, user : {...state.user, registered : true, loggedIn : true, userEncodedToken : action?.payload?.token, userInfo : action?.payload?.userInfo}}
        }

        case 'USER_LOGOUT' : {
            return {...state, user : {...state.user, registered : true, loggedIn : false, userEncodedToken : '', userInfo : ''}}
        }
    }
}