import { createContext, useContext, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialStates, reducerFunction } from '../../reducers/products-reducers';

const ProductsContext = createContext();

export const ProductsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducerFunction, initialStates)
    const navigate = useNavigate()

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

    useEffect(() => {
        getProducts()
    }, [])


    const filterPriceRangeHandler = (e) => {
        dispatch({
            type : 'FILTER_RANGE',
            payload : e.target.value,
        })
    }

    
    const productCategoryFilter = (e, categoryName) => {
        dispatch({
            type : 'FILTER_CATEGORY',
            payload : {
                categoryName : categoryName,
                checked : e.target.checked
            }
        })
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

    const addToCart = (productID) => {
        const product = [...state?.allProducts].find(({_id}) => _id === productID)
        dispatch({
            type : 'ADD_TO_CART',
            payload : product
        })
    }
    
    const removeFromCart = (productID) => {
        const updatedProducts = [...state?.cart].filter(({_id}) => _id !== productID)
        dispatch({
            type : 'REMOVE_FROM_CART',
            payload : updatedProducts
        })
    }
    
    const addToWishlist = (productID) => {
        const product = [...state?.allProducts].find(({_id}) => _id === productID)
        dispatch({
            type : 'ADD_TO_WISHLIST',
            payload : product
        })
    }
   
    const moveToWishlist = (productID) => {
        const wishlistItem = [...state?.wishlist].find(({_id}) => _id === productID)
        const updatedCart = [...state?.cart].filter(({_id}) => _id !== productID)
        const product = [...state?.cart].find(({_id}) => _id === productID)
        const updatedWishlist = wishlistItem ? [...state?.wishlist] : [...state?.wishlist, product] 
        dispatch({
            type : 'MOVE_TO_WISHLIST',
            payload : {
                updatedCart,
                updatedWishlist
            }
        })
    }
    
    const removeFromWishlist = (productID) => {
        const updatedProducts = [...state?.wishlist].filter(({_id}) => _id !== productID)
        console.log(updatedProducts)
        dispatch({
            type : 'REMOVE_FROM_WISHLIST',
            payload : updatedProducts
        })
    }
    
    const increaseProductQuantity = (productID) => {
        const updatedCart = [...state?.cart].map((product) => {
            if(product?._id === productID){
                return {...product, quantity : product?.quantity <= product?.maxQuantityPurchase ? product?.quantity + 1 : product?.quantity  }
            }
            return product;
        })

        dispatch({
            type : 'INCREASE_QUANTITY',
            payload : updatedCart            
        })
    }
    
    const decreaseProductQuantity = (productID) => {
        const updatedCart = [...state?.cart].map((product) => {
            if(product?._id === productID){
                return {...product, quantity : product?.quantity - 1  }
            }
            return product;
        })

        dispatch({
            type : 'DECREASE_QUANTITY',
            payload : updatedCart            
        })
    }

    const searchQueryResults = (e) => {
        const searchedProducts = [...state?.allProducts].filter(({title, author}) => title?.toLowerCase()?.includes(e.target.value.toLowerCase() || author?.toLowerCase()?.includes(e.target.value.toLowerCase())))
        
        console.log(searchedProducts)
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


    const value = {
        allProducts : state.allProducts,
        sortedProducts : state.sortedProducts,
        isLoading : state.isLoading,
        filters : state.filters,
        cart : state.cart,
        wishlist : state.wishlist,
        searchQuery : state.searchQuery,
        searchQuery : state.searchQuery,
        searchedProducts : state.searchedProducts,
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
        showProductOnClick
    }


 


    return <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>
}

export const useProducts = () => {
    return useContext(ProductsContext)
}


