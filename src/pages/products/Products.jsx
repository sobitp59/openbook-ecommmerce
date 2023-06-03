import React, { useEffect, useState } from 'react'
import { useProductCategory } from '../../contexts/product-category-context/ProductCategoryContext'
import { useProducts } from '../../contexts/products-context/ProductsContext'

import { FilterProducts, ProductCard } from '../../components'
import "./products.css"

  

const Products = () => {
  const {allProducts, filters} = useProducts()
  const productCategories = useProductCategory()

  const filteredProducts = [...allProducts]
                            .filter((product) => filters?.priceRange ? product?.originalPrice - product?.originalPrice/100* product?.percentageOff <=  filters?.priceRange  : true)
                            .filter((product) => {
                              const [{star}] = product?.rating;
                              return  filters?.productRating?.rating ? star >= Number(filters?.productRating?.rating)  : true 
                            }).filter(({categoryName}) => filters?.categoryFilter?.length === 0 ? true : filters?.categoryFilter?.includes(categoryName) )

                            


  return (
    <div className='products'>
      
      <FilterProducts />

      <section>

        <ul className='products__lists'>
          { !filteredProducts ? (
              <li>no products found!!</li>
          ) : (
            filteredProducts?.map((product) => {
            return <li className='product__card' key={product?._id}>
                <ProductCard product={product} />
            </li>
            })
          )}
        </ul>
      </section>
    </div>
  )
}

export default Products;