export const initialStates = {
    allProducts : [],
    isLoading : true,
    filters : {
        priceRange : 0,
        categoryFilter : [
            {category :  'Science-Fiction', checked : false},
            {category :  'Fiction', checked : false},
            {category :  'Non-fiction', checked : false},
            {category :  'Self-Help', checked : false}
        ],
        productRating : {
            rating : 0,
        },
        sortBy : {
            LOW_TO_HIGH : false,
            HIGH_TO_LOW : false,
        }
    },
    cart : [],
    wishlist : [],
    searchQuery : '',
    searchedProducts : []
}

export const reducerFunction = (state, action) => {
    switch(action.type){
        case 'LOADING': {
            return {...state, isLoading : true}
        }

        case 'LOADED' : {
            return {...state, isLoading : false, allProducts : action.payload}
        }

        case 'FILTER_RANGE': {
            return {...state, filters : {...state.filters, priceRange : action.payload }}
        }
        
        //TODO -  category filter
        case 'FILTER_CATEGORY': {
            const filteredCategories =  [...state?.filters?.categoryFilter].map((category) => {
                const updatedCategory = category?.category === action?.payload?.categoryName ? {...category,  checked : action?.payload?.checked } : {...category}  
                return updatedCategory
            })
            console.log(filteredCategories)
            return {...state, filters : {...state.filters, categoryFilter : filteredCategories }}
        }
        
        case 'FILTER_RATING' : {
            return {...state, filters : {...state.filters, productRating : {rating : action.payload} }}
        }

        case 'SORT_PRODUCTS' : {
            return {...state, allProducts : action.payload.products, filters : {...state.filters, sortBy : action?.payload?.sortBy === 'LOW_TO_HIGH' ? {LOW_TO_HIGH : action?.payload?.checked, HIGH_TO_LOW :  false} : {LOW_TO_HIGH : false, HIGH_TO_LOW : action?.payload?.checked} }}
        }

        case 'ADD_TO_CART': {
            return {...state, cart : [...state?.cart, {...action.payload, quantity :  1}]}
        }
        
        case 'REMOVE_FROM_CART': {
            return {...state, cart : action.payload}
        }
        
        case 'ADD_TO_WISHLIST': {
            return {...state, wishlist : [...state?.wishlist, {...action.payload }]}
        }
        
        case 'REMOVE_FROM_WISHLIST': {
            return {...state, wishlist : [...action?.payload]}
        }
        
        case 'MOVE_TO_WISHLIST': {
            return {...state, cart : [...action?.payload?.updatedCart], wishlist : [...action?.payload?.updatedWishlist]}
        }
        
        case 'INCREASE_QUANTITY': {
            return {...state, cart : [...action?.payload]}
        }
        
        case 'DECREASE_QUANTITY': {
            return {...state, cart : [...action?.payload]}
        }

        case 'SEARCH_QUERY': {
            return {...state, searchQuery : action.payload.searchQuery, searchedProducts : [...action.payload.searchedProducts]}
        }
        
        case 'SEARCH_PRODUCT': {
            return {...state, searchQuery : action.payload.searchQuery, searchedProducts : [...action.payload.searchedProducts]}
        }
        

        default:
            return state;
    }
}

// const categoriesChecked = [
//     {category :  'Science-Fiction', checked : false},
//     {category :  'Fiction', checked : false},
//     {category :  'Non-fiction', checked : false},
//     {category :  'Self-Help', checked : false}
// ]

// const s =  [...categoriesChecked].map((category) => {
//     console.log({...category})
//     const updatedCat = category?.category === categoryName ? {...category,  checked : e.target.checked} : {...category}  
//     return updatedCat
// })