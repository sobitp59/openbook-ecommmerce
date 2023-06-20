const coupons = [
    {
      _id: 0,
      couponDescription: "50% off",
      coupon: 50,
      couponCode: "SHOP50",
    },
    {
      _id: 1,
      couponDescription: "45% off",
      coupon: 45,
      couponCode: "NEW45",
    },
    {
      _id: 2,
      couponDescription: "30% off",
      coupon: 30,
      couponCode: "SHOP30",
    },
    {
      _id: 3,
      couponDescription: "80% off",
      coupon: 80,
      couponCode: "BIBLIO80",
    },
    {
      _id: 4,
      couponDescription: "10% off",
      coupon: 10,
      couponCode: "JUST10",
    },
    {
      _id: 5,
      couponDescription: "40% off",
      coupon: 40,
      couponCode: "AVID40",
    },
  ];

export const initialStates = {
    allProducts : [],
    isLoading : true,
    filters : {
        priceRange : 0,
        categoryFilter : [],
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
    address : [],
    addressDetails : {
        name : '',
        house : '',
        city : '',
        state : '',
        country : '',
        postalCode : '',
        mobileNumber : '',
    },
    searchQuery : '',
    searchedProducts : [],
    toastMessage : '',
    coupons : coupons,
    couponApplied : false,
    couponDiscount : {
        couponPercentage : 0,
        couponCode : '',
    }


}


export const reducerFunction = (state, action) => {
    switch(action.type){
        case 'LOADING': {
            return {...state, isLoading : true}
        }

        case 'LOADED' : {
            return {...state, isLoading : false, allProducts : action.payload}
        }
        
        case 'SET_ADDRESS' : {
            return {...state, address : action.payload}
        }

        case 'USER_ADDRESS_DUMMY' : {
            return {...state, addressDetails : { 
                name : 'Krishna Kumar',
                house : 'Sri Sri Krishna Balaram Mandir',
                city : 'Vrindavan',
                state : 'Uttar Pradesh',
                country : 'India',
                postalCode : '281121',
                mobileNumber : '0123456789',}}
        }
        
        case 'USER_ADDRESS_CANCEL' : {
            return {...state, addressDetails : { 
                name : '',
                house : '',
                city : '',
                state : '',
                country : '',
                postalCode : '',
                mobileNumber : '',
            }}
        }

        case 'USER_ADDRESS_FORM' : {
            return {...state, addressDetails : {...state?.addressDetails, [action?.payload?.name] : action?.payload?.value}}
        }

        case 'ADD_USER_ADDRESS' : {
            return {...state, address : action?.payload?.address, addressDetails : action?.payload?.addressDetails}
        }
        
        case 'FILTER_RANGE': {
            return {...state, filters : {...state.filters, priceRange : action.payload }}
        }
        
        case 'FILTER_CATEGORY': {
            if(action?.payload?.checked){
                return {...state, filters : {...state.filters, categoryFilter : [...state?.filters?.categoryFilter,  action?.payload?.category] }}
            }else{
                return {...state, filters : {...state.filters, categoryFilter : [...state?.filters?.categoryFilter]?.filter((category) => category !== action?.payload?.category) }}
            }
        }
        
        case 'FILTER_RATING' : {
            return {...state, filters : {...state.filters, productRating : {rating : action.payload} }}
        }

        case 'SORT_PRODUCTS' : {
            return {...state, allProducts : action.payload.products, filters : {...state.filters, sortBy : action?.payload?.sortBy === 'LOW_TO_HIGH' ? {LOW_TO_HIGH : action?.payload?.checked, HIGH_TO_LOW :  false} : {LOW_TO_HIGH : false, HIGH_TO_LOW : action?.payload?.checked} }}
        }

        case 'ADD_TO_CART': {
            return {...state, cart : [...action.payload]}
        }
        
        case 'REMOVE_FROM_CART': {
            return {...state, cart : [...action.payload] }
        }
        
        case 'ADD_TO_WISHLIST': {
            return {...state, wishlist : [...action.payload]}
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
        
        case 'CLEAR_FILTER' : {
            return {...state,  filters : {
                priceRange : 0,
                categoryFilter : [],
                productRating : {
                    rating : 0,
                },
                sortBy : {
                    LOW_TO_HIGH : false,
                    HIGH_TO_LOW : false,
                }
            }, }
        }

        case 'APPLY_COUPON' : {
            console.log(action?.payload?.coupon, action?.payload?.couponCode)
            return {
                ...state,
                couponApplied : true,
                couponDiscount : {
                couponPercentage : action?.payload?.coupon,
                couponCode : action?.payload?.couponCode,
            }
        }
        }

        case 'REMOVE_COUPON' : {
            return {
                    ...state,
                    couponApplied : false,
                    couponDiscount : {
                    couponPercentage : 0,
                    couponCode : '',
                }
            }
    
        }

        default:
            return state;
    }
}
