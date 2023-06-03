export const initialState = {
    fullname : '',
    email : '',
    password : '',
    confirmpassword : '',
    registered : false,

}

export const userAuthReducer = (state, action) => {
    switch(action.type){
        case 'SET_FULLNAME': {
            return {...state, fullname : action?.payload}
        }
        
        case 'SET_EMAIL' : {
            return {...state, email : action?.payload}
        }
        
        case 'SET_PASSWORD' : {
            return {...state, password : action?.payload}
        }
        
        case 'SET_CONFIRMPASSWORD' : {
            return {...state, confirmpassword : action?.payload}
        }

        case 'CLEAR_FIELD' : {
            return {...initialState}
        }
        
        case 'REGISTRATION_SUCCESS' : {
            return {...state, registered : true}
        }
    }
}