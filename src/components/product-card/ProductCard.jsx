import React, { useEffect } from 'react';
import './product-card.css';

import { AiFillHeart, AiOutlineHeart, AiTwotoneStar } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/products-context/ProductsContext';

const ProductCard = ({product}) => {
    const {addToCart, addToWishlist, removeFromWishlist, wishlist, cart} = useProducts()
    const navigate = useNavigate()
    
    
    const [{star}] = product?.rating;

    useEffect(() => {
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [])


  return (
    <div>
            <section className='product__top'>
              <Link to={`/products/${product?._id}  `}>
                <img className='product__image' src={product?.imageURL} alt="" />
                <h2 className='product__title'>{product?.title}</h2>
                <h4  className='product__author'>{product?.author}</h4>
              </Link>

              {  wishlist?.find(({_id}) => _id === product?._id) ? <button onClick={() => removeFromWishlist(product?._id)} className='product__wishlist'> <AiFillHeart /> </button> : <button onClick={() => addToWishlist(product?._id)} className='product__wishlist'> <AiOutlineHeart /> </button>}

              

            </section>
            
            <section className='product__info'>
                <h4 className='product__payablePrice'> &#x20B9;{product?.originalPrice / 100 * product?.percentageOff}</h4>
                <h4 className='product__originalPrice'>&#x20B9;{product?.originalPrice}</h4>
                <h4 className='product__off'>{product?.percentageOff}%OFF</h4>
                <h4  className='product__rating'>{star}<AiTwotoneStar className='product__star' /> </h4>

            </section>

            {  cart?.find(({_id}) => _id === product?._id) ? <button onClick={() => navigate('/cart')} className='product__button'>go to card</button> : <button onClick={() => addToCart(product?._id)} className='product__button'>add to card</button>}
            
    </div>
  )
}

export default ProductCard