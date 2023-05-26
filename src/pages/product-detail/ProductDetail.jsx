import React from 'react';

import { AiOutlineHeart, AiTwotoneStar } from 'react-icons/ai';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { ProductCard } from '../../components';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './productDetail.css';

const ProductDetail = () => {
    const {allProducts} = useProducts();
    const {productID} = useParams();
    const navigate = useNavigate();


    const product = allProducts.find((product) => product?._id === productID);
    console.log(product)
    const  [{star}] = product?.rating;

    const relatedProducts = allProducts.filter(({categoryName, _id}) => categoryName === product?.categoryName && _id !==  product?._id)
    console.log(relatedProducts)
    
    const goBackHandler = () => {
        navigate(-1);
        return window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    return (
    <div className='product-details'>
            <button onClick={goBackHandler} className='product-details__backBtn'>goback</button>
        <div className='product-details__product'>
            <img className='product-details__image' src={product?.imageURL} alt="" />

            <div>
                <div>
                    <h1 className='product-details__title'>{product?.title}</h1>
                    <h2 className='product-details__author'>{product?.author}</h2>
                </div>

                <section>
                    <h3 className='product-details__price'> &#x20B9;{product?.originalPrice / 100 * product?.percentageOff} <span className='product-details__off'>{product?.percentageOff}%OFF</span> </h3>
                    <h3 className='product-details__prices'> <span className='product-details__originalPrice'>&#x20B9;{product?.originalPrice}</span> <span>{star}<AiTwotoneStar className='product-details__star'/></span></h3>
                </section>

                <section className='product-details__buttons'>
                    <button className='product-details__wishlist product-details-button'> <AiOutlineHeart/> add to wishlist</button>
                    <button className='product-details__cart product-details-button'> <FaShoppingCart /> add to cart</button>
                </section>

                {/* <hr /> */}

                <section className='product-details__description'>
                    <h3 className='product-details__headline'>description</h3>
                    <p className='product-details__info'>{product?.description}</p>
                </section>
            
                <section>
                    <h3 className='product-details__headline'>product details</h3>
                    <ul className='product-details__details'>
                        <li> <span className='product-details__tag'>category</span> : {product?.categoryName}</li>
                        <li> <span className='product-details__tag'>language</span> : {product?.language}</li>
                        <li> <span className='product-details__tag'>binding</span> : {product?.binding}</li>
                        <li> <span className='product-details__tag'>cash on delivery</span> : {product?.cashOnDelivery ? 'available' : 'not available'}</li>
                        <li> <span className='product-details__tag'>fast delivery</span> : {product?.fastDelivery ? 'available' : 'not available'}</li>
                    </ul>
                </section>
            </div>
        </div>

        <div className='product-details__recommendations'>
            <h2>related products</h2>
            <ul className='product-details__relatedProducts'>
                {relatedProducts?.map((product) => {
                    return <li className='product__card' key={product?._id}>
                        <ProductCard product={product} />
                    </li>
                })}
            </ul>
        </div>


    </div>
  )
}

export default ProductDetail