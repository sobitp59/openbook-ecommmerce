import { createContext, useContext, useEffect, useState } from "react";

const ProductCategoryContext = createContext()


export  const ProductCategoryContextProvider = ({children}) => {
    const [productCategories, setProductCategories] = useState([])

    const getProductCategories = async() => {
        try {
            const data = await fetch(' /api/categories');
            const categories = await data?.json(); 
            setProductCategories(categories?.categories);
        } catch (error) {
            console.log(error?.message)
        }
    }

    useEffect(() => {
        getProductCategories();
    }, [])

    return <ProductCategoryContext.Provider value={productCategories}>
        {children}
    </ProductCategoryContext.Provider>;
}


export const useProductCategory = () => {
    return useContext(ProductCategoryContext);
}