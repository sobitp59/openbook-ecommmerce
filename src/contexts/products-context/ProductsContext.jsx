    import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialStates, reducerFunction } from '../../reducers/products-reducers';
import { useAuth } from '../authentication/AuthContext';

const ProductsContext = createContext();

export const ProductsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducerFunction, initialStates)
    const navigate = useNavigate()
 
    const {user : {userEncodedToken, loggedIn}} = useAuth()
 
 
    const getProducts = async () => {
        dispatch({type : 'LOADING'})
        try {
            const response = await fetch('/api/products');
            const json = await response.json();
            const products = json?.products;
            dispatch({type : 'LOADED', payload : products}) 
        } catch (error) {
            console.log(error.message)
        }
    }

    // Addresses
    const getAddress = async (authToken) => {
        console.log('ADDRESS CLCIKED')
        try {
            const response = await fetch('/api/user/addresses', {
                headers : {authorization : authToken}
            });
            if(response?.ok){
                const data = await response?.json();
                dispatch({
                    type : 'SET_ADDRESS',
                    payload : data?.address
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    

    const saveAddressForm = async (e, address, authToken, setShowAddressForm) => {
        e.preventDefault();
        console.log(address)
        console.log(state?.addressDetails)
        try {
            const response = await fetch('/api/user/address', {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    authorization : authToken
                },
                body : JSON.stringify({address : state?.addressDetails})
            })

            if(response?.ok){
                const data = await response?.json();
                const [{address}] = data?.address;
                console.log(address)
                console.log(data?.address)
                dispatch({
                    type : 'ADD_USER_ADDRESS',
                    payload : {
                        address : data?.address,
                        addressDetails : { 
                            name : '',
                            house : '',
                            city : '',
                            state : '',
                            country : '',
                            postalCode : '',
                            mobileNumber : '',
                        }
                    }
                })

                setShowAddressForm(false)
            }
        } catch (error) {
            console.log('SOME ERROR OCCURED : ', error)
        }
    }

    const fillDummyData = (e) => {
        e.preventDefault()
        dispatch({
            type : 'USER_ADDRESS_DUMMY'
        })
    }

    const cancelForm = (e, setShowAddressForm) => {
        e.preventDefault()
        setShowAddressForm(false)
        dispatch({
            type : 'USER_ADDRESS_CANCEL' 
        })
    }

    const handleUserAddressForm = (e) => {
        e.preventDefault();
        const {name, value} = e?.target;
        console.log(name, value)
        dispatch({
            type : 'USER_ADDRESS_FORM',
            payload : {
                name : name,
                value : value
            }
        })   
    }

    const userAddressDeleteHandler = async(authToken, addressID) => {
        try {
            const response = await fetch(`/api/user/address/${addressID}`, {
                method : "DELETE",
                headers : {
                    authorization : authToken
                }
            })
            
            if(response?.ok){
                const data = await response?.json();
                dispatch({
                    type : 'ADD_USER_ADDRESS',
                    payload : {
                        address : data?.address
                    }
                })
            }
            
        } catch (error) {
            console.log('SOME ERROR OCCURED', error);
        }
    }

    // console.log('EDIT')
    // console.log(authToken)
    // console.log(addressID)
    const userEditAddressHandler = async(authToken, addressID) => {
        try {
            const response = await fetch(`/api/user/address/${addressID}`, {
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                    authorization : authToken
                },
                body : JSON.stringify({address : state?.addressDetails})
            })

            if(response?.ok){
                const data = await response?.json();
                console.log(data);
            }
        } catch (error) {
         console.log('SOME ERROR OCCURED : ', error)   
        }
    }

    // address


    useEffect( async () => {
        getProducts();
        getAddress();
    }, [])


    const filterPriceRangeHandler = (e) => {
        dispatch({
            type : 'FILTER_RANGE',
            payload : e.target.value,
        })
    }

    
    const productCategoryFilter = (e) => {
        const category = e?.target?.value
        const checked = e?.target?.checked

        dispatch({
            type : 'FILTER_CATEGORY',
            payload : {
                category, checked                
            }
        })

        navigate('/products')
    }

    const filterProductByRating = (e) => {
        dispatch({
            type : 'FILTER_RATING',
            payload : e.target.value,
        })
    }

    const sortProducts = (sortBy, e) => {

        const sortedProducts = state?.allProducts?.sort((a, b) => sortBy === 'LOW_TO_HIGH' ? a?.originalPrice / 100 * a?.percentageOff - b?.originalPrice / 100 * b?.percentageOff : b?.originalPrice / 100 * b?.percentageOff - a?.originalPrice / 100 * a?.percentageOff)
          
        dispatch({
            type : 'SORT_PRODUCTS',
            payload : {
                products : sortedProducts,
                sortBy : sortBy,
                checked : e.target.checked
            }
        })
    }

    const addToCart = async (productID) => {
        if(!loggedIn){
            navigate('/login')
        }
        const product = [...state?.allProducts].find(({_id}) => _id === productID)


        try {
            const response = await fetch('/api/user/cart', {
                method : 'POST',
                headers : {
                    authorization : `Bearer ${userEncodedToken}`
                },
                body : JSON.stringify({product : product})
            })
            if(response.ok){
                const data = await response.json()
                console.log(data?.cart)
                dispatch({
                    type : 'ADD_TO_CART',
                    payload : data?.cart
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const removeFromCart = async (productId) => {
        
        try {
            const response = await fetch(`/api/user/cart/${productId}`, {
                method : 'DELETE',
                headers : {
                    authorization : `Bearer ${userEncodedToken}`
                }
            })
            
            if(response?.ok){
                const json = await response?.json();
                console.log(json?.cart)

                const updatedProducts = [...json?.cart].filter(({_id}) => {
                    // console.log(productId, _id)
                    return  _id !== productId
                })
                console.log(updatedProducts)
                dispatch({
                    type : 'REMOVE_FROM_CART',
                    payload : json?.cart
                })
            }
        } catch (error) {
            console.log(error )
        }
    }
    
    const addToWishlist = async (productID) => {
        if(!loggedIn){
            navigate('/login')
        }
        const product = [...state?.allProducts].find(({_id}) => _id === productID)
        try {
            const response = await fetch(`/api/user/wishlist`, {
                method : 'POST',
                headers : {
                    authorization : `Bearer ${userEncodedToken}`
                },
                body : JSON.stringify({
                    product : product
                })
            })             

            if(response?.ok){
                const data = await response?.json()
                console.log(data?.wishlist)
                dispatch({
                    type : 'ADD_TO_WISHLIST',
                    payload : data?.wishlist
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
   
    const moveToWishlist = async (productID) => {
        try {
            const response = await fetch(`/api/user/cart/${productID}`, {
                method : 'DELETE',
                headers : {
                    authorization : `Bearer ${userEncodedToken}`
                }
            })
            
            if(response?.ok){
                const json = await response?.json();
                dispatch({
                    type : 'REMOVE_FROM_CART',
                    payload : json?.cart

                })
            }
        } catch (error) {
            console.log(error )
        }
        

        const product = [...state?.allProducts].find(({_id}) => _id === productID)  
        try {
                const response = await fetch(`/api/user/wishlist`, {
                    method : 'POST',
                    headers : {
                        authorization : `Bearer ${userEncodedToken}`
                    },
                    body : JSON.stringify({
                        product : product
                    })
                })             
    
                if(response?.ok){
                    const data = await response?.json()
                    dispatch({
                        type : 'ADD_TO_WISHLIST',
                        payload : data?.wishlist
                    })
                    
                }
            } catch (error) {
                console.log(error)
            }
    }
    
    const removeFromWishlist = async (productID) => {
        try {
            const response = await fetch(`/api/user/wishlist/${productID}`, {
                method : 'DELETE',
                headers : {
                    authorization :  `Bearer ${userEncodedToken}`
                }                
            })
            if(response?.ok){
                const data = await response?.json()
                dispatch({
                    type : 'REMOVE_FROM_WISHLIST',
                    payload : data?.wishlist
                })
            }
            
        } catch (error) {
            console.log(error)
        }       
    }
    
    const increaseProductQuantity = async (productID) => {
        try {
            const response = await fetch(`/api/user/cart/${productID}`, {
                method : 'POST',
                headers : {
                    authorization : `Bearer ${userEncodedToken}`
                },
                body : JSON.stringify({
                    action : {
                        type : "increment"
                    }
                })
            })

            if(response?.ok){
                const json = await response.json()
                console.log(json?.cart)
                dispatch({
                    type : 'INCREASE_QUANTITY',
                    payload : json?.cart            
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    const decreaseProductQuantity = async (productID) => {
        try {
            const response = await fetch(`/api/user/cart/${productID}`, {
                method : 'POST',
                headers : {
                    authorization : `Bearer ${userEncodedToken}`
                },
                body : JSON.stringify({
                    action : {
                        type : "decrement"
                    }
                })
            })

            if(response?.ok){
                const json = await response.json()
                console.log(json?.cart)
                dispatch({
                    type : 'DECREASE_QUANTITY',
                    payload : json?.cart            
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const searchQueryResults = (e) => {
        const searchedProducts = [...state?.allProducts].filter(({title, author}) => title?.toLowerCase()?.includes(e.target.value.toLowerCase() || author?.toLowerCase()?.includes(e.target.value.toLowerCase())))
        
       dispatch({
        type : 'SEARCH_QUERY',
        payload : {
            searchQuery: e?.target?.value,
            searchedProducts : e?.target?.value ? searchedProducts : []
        }
       })
    }

    const showProductOnClick = (ID) => {
            navigate(`/products/${ID}`)
            dispatch({
                type : 'SEARCH_PRODUCT',
                payload : {
                    searchQuery : '',
                    searchedProducts : []                    
                }
            }) 
    }

    const filterClearHandler = () => {
        dispatch({type : 'CLEAR_FILTER'})
    }


    const addCouponHandler = (e, couponID) => {
        const getCoupon = state?.coupons?.find(({_id}) => _id === couponID);
       if(getCoupon){
        dispatch({
            type : 'APPLY_COUPON',
            payload : {
                coupon : getCoupon?.coupon,
                couponCode : getCoupon?.couponCode,
        }
        })
       }else{
           dispatch({
            type : 'REMOVE_COUPON'
           })
       }
    }
    
    const removeCouponHandler = () => {
       dispatch({
        type : 'REMOVE_COUPON'
       })
    }

    const value = {
        allProducts : state.allProducts,
        sortedProducts : state.sortedProducts,
        isLoading : state.isLoading,
        filters : state.filters,
        cart : state.cart,
        address : state.address,
        wishlist : state.wishlist,
        searchQuery : state.searchQuery,
        searchQuery : state.searchQuery,
        searchedProducts : state.searchedProducts,
        coupons : state.coupons,
        couponApplied : state.couponApplied,
        couponDiscount : state.couponDiscount,
        addressDetails : state.addressDetails,
        filterPriceRangeHandler,
        productCategoryFilter,
        filterProductByRating,
        sortProducts,
        addToCart,
        addToWishlist,
        removeFromWishlist,
        increaseProductQuantity,
        decreaseProductQuantity,
        removeFromCart,
        moveToWishlist,
        searchQueryResults,
        showProductOnClick,
        filterClearHandler,
        addCouponHandler,
        removeCouponHandler,
        fillDummyData,
        cancelForm,
        saveAddressForm,
        handleUserAddressForm,
        userAddressDeleteHandler,
        userEditAddressHandler
    }


 


    return <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>
}



export const useProducts  = () => useContext(ProductsContext)