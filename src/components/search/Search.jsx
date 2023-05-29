import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../../contexts/products-context/ProductsContext'
import './search.css'

const Search = () => {
    const {searchedProducts, searchQuery, searchQueryResults, showProductOnClick} = useProducts()


  return (
    <div className='search'>
            <input value={searchQuery} onChange={(e) => searchQueryResults(e)} className='search__input' type="search" placeholder='search products...'/>
            {searchedProducts.length > 0 ? (
                <ul style={{display : searchQuery ? 'block' : 'none'}} className='search__products'>
                {searchedProducts?.map(({title, _id, imageURL, author, description}) => {
                        return(
                            <li key={_id} className='search__product' onClick={() => showProductOnClick(_id)}>
                                <img className='search__image' src={imageURL} alt="" srcset="" />
                                <div className='search__info'>
                                    <div>
                                        <h3 className='search__title'>{title}</h3>
                                        <p className='search__author'>by {author}</p>
                                    </div>
                                    <p className='search__description'>{description}</p>
                                </div>
                            </li>
                        )
                })}
                </ul>
            )  : (
                <ul style={{display : searchQuery ? 'block' : 'none'}} className='search__products'>
                            <li>
                                <h3>no result found for "<i>{searchQuery}</i>"</h3>
                            </li>
                </ul>
            )}
    </div>
  )
}

export default Search