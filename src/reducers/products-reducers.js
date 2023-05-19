export const initialStates = {
    allProducts : [],
    isLoading : true,
}

export const reducerFunction = (state, action) => {
    switch(action.type){
        case 'LOADING': {
            return {...state, isLoading : true}
        }

        case 'LOADED' : {
            return {...state, isLoading : false, allProducts : action.payload}
        }



        default:
            return state;
    }
}