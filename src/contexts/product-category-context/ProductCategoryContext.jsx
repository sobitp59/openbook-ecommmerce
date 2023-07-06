import { createContext, useContext, useEffect, useState } from "react";

const ProductCategoryContext = createContext()


export  const ProductCategoryContextProvider = ({children}) => {
    const [productCategories, setProductCategories] = useState([])
    const [productCategory, setProductCategory] = useState([]);

    const getProductCategories = async() => {
        try {
            const data = await fetch(' /api/categories');
            const categories = await data?.json(); 
            setProductCategories(categories?.categories);
        } catch (error) {
            console.log(error?.message)
        }
    }

    const getCategoryProducts = (category) => { 

        if(!productCategory?.includes(category?.categoryName)){
            setProductCategory(prev => [...prev, category?.categoryName])
        }
    }

    useEffect(() => {
        getProductCategories();
    }, [])

    return <ProductCategoryContext.Provider value={{productCategories, getCategoryProducts, productCategory}}>
        {children}
    </ProductCategoryContext.Provider>;
}


export const useProductCategory = () => {
    return useContext(ProductCategoryContext);
}