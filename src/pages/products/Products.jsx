import React from 'react'
import { useProducts } from '../../contexts/products-context/ProductsContext'

import { ProductCard } from '../../components'
import "./products.css"

const Products = () => {
  const {allProducts} = useProducts()
console.log(allProducts)


  return (
    <div className='products'>
      <aside className='products__filter'>
        <h1>filter</h1>
      </aside>

      <ul className='products__lists'>
        {allProducts?.map((product) => {

         return <li className='product__card' key={product?._id}>
              <ProductCard product={product} />
          </li>
        })}
      </ul>
    </div>
  )
}

export default Products;