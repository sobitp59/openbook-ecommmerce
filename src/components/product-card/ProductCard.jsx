import React from 'react';
import './product-card.css';

import { AiOutlineHeart, AiTwotoneStar } from 'react-icons/ai';

const ProductCard = ({product}) => {
    const [{star}] = product?.rating;

  return (
    <div>
            <section className='product__top'>
              <img className='product__image' src={product?.imageURL} alt="" />
              <h2 className='product__title'>{product?.title}</h2>
              <h4  className='product__author'>{product?.author}</h4>

              <button className='product__wishlist'> <AiOutlineHeart /> </button>

            </section>
            
            <section className='product__info'>
                <h4 className='product__payablePrice'> &#x20B9;{product?.originalPrice / 100 * product?.percentageOff}</h4>
                <h4 className='product__originalPrice'>&#x20B9;{product?.originalPrice}</h4>
                <h4 className='product__off'>{product?.percentageOff}%OFF</h4>
                <h4  className='product__rating'>{star}<AiTwotoneStar className='product__star' /> </h4>

            </section>
            <button className='product__button'>add to card</button>
    </div>
  )
}

export default ProductCard