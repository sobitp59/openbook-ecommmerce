import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialStates, reducerFunction } from '../../reducers/products-reducers';

const ProductsContext = createContext();

export const ProductsContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducerFunction, initialStates)

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
    
    const addToWishlist = (productID) => {
        const product = [...state?.allProducts].find(({_id}) => _id === productID)
        dispatch({
            type : 'ADD_TO_WISHLIST',
            payload : product
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


    const value = {
        allProducts : state.allProducts,
        sortedProducts : state.sortedProducts,
        isLoading : state.isLoading,
        filters : state.filters,
        cart : state.cart,
        wishlist : state.wishlist,
        filterPriceRangeHandler,
        productCategoryFilter,
        filterProductByRating,
        sortProducts,
        addToCart,
        addToWishlist,
        removeFromWishlist
    }


    return <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>
}

export const useProducts = () => {
    return useContext(ProductsContext)
}


