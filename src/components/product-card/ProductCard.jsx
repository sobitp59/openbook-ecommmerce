import React from 'react';
import './product-card.css';


const ProductCard = ({product}) => {
    const [{star}] = product?.rating;

  return (
    <div>
         <img className='product__image' src={product?.imageURL} alt="" />
            <h2 className='product__title'>{product?.title}</h2>
            <h4>{product?.author}</h4>
            
            <section className='product__info'>
                <h4>{product?.originalPrice / 100 * product?.percentageOff}</h4>
                <h4>{product?.originalPrice}</h4>
                <h4>{product?.percentageOff}%OFF</h4>
                <h4>{star}</h4>

            </section>
            <button>add to card</button>
    </div>
  )
}

export default ProductCard