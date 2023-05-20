import React from 'react'
import './filterProduct.css'

import { FaFilter } from 'react-icons/fa'

const FilterProducts = () => {
  return (
    <aside className='products__filter'>
        
        <section className='products__top'>
          <h2 className='products__filterTitle'>filter<FaFilter className='products__filterLogo' /></h2>
          <button className='products__filterResetBtn'>clear</button>
        </section>
        
        <section className='products__filters'>
            <h2>price range</h2>
          <label>
            <article className='products__priceRange'> <span>&#8377;100</span> <span>&#8377;1000</span> <span>&#8377;2000</span></article>
            <input className='products__range' type="range" min={100} max={2000} name="" id="" />
          </label>
        </section>
       
        <section className='products__filters'>
            <h2>category</h2>
          <label>
            <input type="checkbox" name="" id="" />
            Fiction
          </label>
          <label>
            <input type="checkbox" name="" id="" />
            Non-Fiction
          </label>
          <label>
            <input type="checkbox" name="" id="" />
            Science-Fiction
          </label>
          <label>
            <input type="checkbox" name="" id="" />
            Self Help
          </label>
        </section>


        <section className='products__filters'>
          <h2>rating</h2>
          <label>
            <input type="radio" name='rating' />
            1 star & above
          </label>
          <label>
            <input type="radio" name='rating' />
            2 star & above
          </label>
          <label>
            <input type="radio" name='rating' />
            3 star & above
          </label>
          <label>
            <input type="radio" name='rating' />
            4 star & above
          </label>
        </section>

        <section className='products__filters'>
          <h2>sort by</h2>
          <label>
            <input type="radio" name='sort' />
            price(low to high)
          </label>
          <label>
            <input type="radio" name='sort' />
            price(high to low)
          </label>
        </section>

    </aside>
  )
}

export default FilterProducts