import React, { useEffect, useState } from 'react'
import { useProductCategory } from '../../contexts/product-category-context/ProductCategoryContext'
import { useProducts } from '../../contexts/products-context/ProductsContext'

import { BsFilterLeft } from 'react-icons/bs'
import { GrFormClose } from 'react-icons/gr'

import { FilterProducts, ProductCard } from '../../components'
import "./products.css"

  

const Products = () => {
  const {allProducts, filters} = useProducts()
  const productCategories = useProductCategory()
  const [showFilter, setShowFilter] = useState(false)

  const filteredProducts = [...allProducts]
                            .filter((product) => filters?.priceRange ? product?.originalPrice - product?.originalPrice/100* product?.percentageOff <=  filters?.priceRange  : true)
                            .filter((product) => {
                              const [{star}] = product?.rating;
                              return  filters?.productRating?.rating ? star >= Number(filters?.productRating?.rating)  : true 
                            }).filter(({categoryName}) => filters?.categoryFilter?.length === 0 ? true : filters?.categoryFilter?.includes(categoryName) )

                            


  return (
    <div className='products'>
      
      <section className='products__filtering'>
        <button onClick={() => setShowFilter((prev) => !prev)}>
        {showFilter ?  <GrFormClose showFilter={showFilter} /> : 
          <BsFilterLeft showFilter={showFilter} />
        }
        </button>
        <p>showing ({filteredProducts?.length}) products</p>
      </section>
    
      {/* { !showFilter ? <FilterProducts showFilter={showFilter}/> : <FilterProducts />} */}
      <FilterProducts showFilter={showFilter}/>
  
      <section>

        <ul className='products__lists'>
          { filteredProducts?.length < 1 ? (
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