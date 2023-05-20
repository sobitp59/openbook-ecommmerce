import React from 'react'
import { useProductCategory } from '../../contexts/product-category-context/ProductCategoryContext'
import { useProducts } from '../../contexts/products-context/ProductsContext'

import { FilterProducts, ProductCard } from '../../components'
import "./products.css"

  

const Products = () => {
  const {allProducts} = useProducts()
  const productCategories = useProductCategory()


  return (
    <div className='products'>
      
      <FilterProducts />

      <section>

        <article className='product__categories'>
            { productCategories?.map((category) => (
              <button className='product__categoryBtn'>{category?.categoryName}</button>
            )) }
        </article>


        <ul className='products__lists'>
          {allProducts?.map((product) => {
            
            return <li className='product__card' key={product?._id}>
                <ProductCard product={product} />
            </li>
          })}
        </ul>
      </section>
    </div>
  )
}

export default Products;