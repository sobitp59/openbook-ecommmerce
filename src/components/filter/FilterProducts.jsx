import React from 'react'
import './filterProduct.css'

import { FaFilter } from 'react-icons/fa'
import { useProductCategory } from '../../contexts/product-category-context/ProductCategoryContext'
import { useProducts } from '../../contexts/products-context/ProductsContext'

const FilterProducts = ({showFilter}) => {
const {filterPriceRangeHandler,productCategoryFilter,filterClearHandler,  filters, filterProductByRating, sortProducts} = useProducts();

const categories = useProductCategory();
const ratings = [1, 2, 3, 4];

const className = showFilter ?  'products__filter products__filter--show' : 'products__filter'


  return (
    <aside className={className} >
        
        <section className='products__top'>
          <div className=''>
            <h2 className='products__filterTitle'>filters  <FaFilter className='products__filterLogo' /> </h2>
          </div>
          <div>
          <button onClick={filterClearHandler} className='products__filterResetBtn'>clear</button>
          </div>
        </section>
        
        {/* FILTER PRODUCTS BY PRICE RANGE */}
        <section className='products__filters'>
            <h2>price range</h2>
          <label>
            <article className='products__priceRange'> <span>&#8377;0</span> <strong>&#8377;{(filters?.priceRange)}</strong> <span>&#8377;2000</span></article>
            <input onChange={(e) => filterPriceRangeHandler(e)} className='products__range' type="range" min={0} max={2000} value={filters?.priceRange}  name="" id="" />
          </label>
        </section>

       
       {/* FILTER PRODUCTS BY CATEGORY */}
        <section className='products__filters'>
            <h2>category</h2>       
            { categories?.map(({categoryName}) => {
              return(
                  <label>
                    <input onChange={productCategoryFilter} value={categoryName} type="checkbox"  checked={filters?.categoryFilter?.includes(categoryName)} />
                    {categoryName}
                  </label>
              )
            })}
        </section>


      {/* FILTER PRODUCTS BY RATINGS */}
        <section className='products__filters'>
          <h2>rating</h2>
          { ratings?.map((rating) => {
            return(
              <label>
                <input value={rating} checked={Number(filters?.productRating?.rating) === rating}  type="radio" name='rating' onChange={(e) => filterProductByRating(e)} />
                {rating} star & above
              </label>
            )
          })}
        </section>


      {/* SORT PRODUCTS BY PRICE */}
        <section className='products__filters'>
          <h2>sort by</h2>
          <label>
            <input value={'LOW_TO_HIGH'} checked={filters?.sortBy?.LOW_TO_HIGH} onChange={(e) => sortProducts('LOW_TO_HIGH', e)} type="radio" name='sort' />
            price(low to high)
          </label>
          <label>
            <input value={'HIGH_TO_LOW'} checked={filters?.sortBy?.HIGH_TO_LOW} onChange={(e) => sortProducts('HIGH_TO_LOW', e)} type="radio" name='sort' />
            price(high to low)
          </label>
        </section>

    </aside>
  )
}

export default FilterProducts