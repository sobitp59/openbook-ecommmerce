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


    const value = {
        allProducts : state.allProducts,
        isLoading : state.isLoading
    }


    return <ProductsContext.Provider value={value}>
        {children}
    </ProductsContext.Provider>
}

export const useProducts = () => {
    return useContext(ProductsContext)
}


