
import { AiOutlineHeart } from 'react-icons/ai';
import { CiCircleRemove } from 'react-icons/ci';
import { MdDiscount } from 'react-icons/md';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { coupons } from '../../backend/db/coupons';
import { useProducts } from '../../contexts/products-context/ProductsContext';

import { useState } from 'react';
import './cart.css';


const Cart = () => {
    const {cart, increaseProductQuantity, decreaseProductQuantity, removeFromCart, moveToWishlist} = useProducts();
    const navigate = useNavigate();

    const [coupon, setCoupon] = useState(false);
    const [couponDiscount, setCouponDiscount] = useState([0, '']);

    console.log(coupons)

    const totalOriginalPrice = cart?.reduce((total, curr) => {
        return total +  (Number(curr?.originalPrice) * curr?.quantity);
    }, 0)
    
    const totalDiscountedPrice = cart?.reduce((total, curr) => {
        return total +  (curr?.originalPrice / 100 * curr?.percentageOff) * (curr?.quantity)
    }, 0)

    const finalPrice = cart?.reduce((total, curr) => {
        const cost = curr?.originalPrice - (curr?.originalPrice / 100 * curr?.percentageOff);
        const totalCost = cost * curr?.quantity
        return totalCost + total
    }, 0)


    const couponHandler = (couponID) => {
        const coupon = coupons?.find(({_id}) => _id === couponID)
        setCouponDiscount([coupon?.coupon, coupon?.couponCode])
        setCoupon(false)
    }
    

    const couponModalHandler = () => {
        setCoupon((prev) => !prev)
    }

    const couponRemoveHandler = () => {
        setCouponDiscount([0, ''])
    }

    console.log(finalPrice / 100 * couponDiscount[0])
    console.log(couponDiscount[0])

    return(
        <div className='cart'>
                {cart?.length > 0 ? (
                    <>
                    <div className='cart__products'>
                    <ul className='cart__lists'>
                        {cart?.map((product) => {
                            return(
                                <li className='cart__product'>
                                    <section className='cart__image'>
                                        <Link to={`/products/${product?._id}`}>
                                            <img className='cart__productImage' src={product?.imageURL} alt="" />
                                        </Link>
                                    </section>
                                    <section className='cart__detail'>
                                        <h1>{product?.title}</h1>
                                        <p>by {product?.author}</p>
    
                                        <section className='product__info'>
                                            <h4 className='product__payablePrice'> &#x20B9;{product?.originalPrice - product?.originalPrice / 100 * product?.percentageOff}</h4>
                                            <h4 className='product__originalPrice'>&#x20B9;{product?.originalPrice}</h4>
                                            <h4 className='product__off'>{product?.percentageOff}%OFF</h4>
                                        </section>
    
                                        <section className='cart__quantity'>
    
                                            <button style={{cursor : product?.quantity < 2 && 'not-allowed' }} disabled={product?.quantity < 2} onClick={() => decreaseProductQuantity(product?._id)} className='cart__quantity product-details__wishlist product-details-button'> - </button>
    
                                                <span>{product?.quantity}</span>
                                            <button style={{cursor : product?.quantity > product?.maxQuantityPurchase && 'not-allowed' }} onClick={() => increaseProductQuantity(product?._id)} className='cart__quantity product-details__wishlist product-details-button'> + </button>
                                        </section>
    
                                        <section className='cart__buttons'>
                                            <button onClick={() => moveToWishlist(product?._id)} className='product-details__cart product-details-button'> <AiOutlineHeart/> move to wishlist </button>
                                            <button onClick={() => removeFromCart(product?._id)} className='product-details__wishlist product-details-button'> <RiDeleteBin7Line /> remove </button>
    
                                        </section>
                                        
                                    </section>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                
                <div className='cart__details'>
                        <p className='cart__coupons'><span><MdDiscount className='cart__couponlogo' /> have a coupon?</span> <button className='cart__coupon' onClick={couponModalHandler}>apply</button></p>
                        {coupon && 
                            <ul className='coupon__list'>
                                {coupons?.map(({_id, couponDescription, coupon, couponCode}) => {
                                    return(
                                        <li onClick={() => couponHandler(_id)} className='cart__couponItem' key={_id}>
                                            <strong>{couponCode}</strong> <span>{couponDescription}</span> 
                                        </li>
                                    )
                                })}
                            </ul>
                        }
                        <hr />
                        <h2>PRICE DETAILS</h2>
                        <hr />
                        <p>
                            <span>price ({cart?.length} items)</span>
                            <span>&#8377; {totalOriginalPrice}</span>
                        </p>
                        <p>
                            <span>discount</span>
                            <span> -&#8377;{totalDiscountedPrice}</span>
                        </p>
                        <p className='cart__couponinfo'>
                            {couponDiscount[1] !== '' && 
                                (
                                    <>
                                        <span><strong>{couponDiscount[1]}</strong>  applied successfully</span>
                                        <span onClick={couponRemoveHandler} className='cart__couponRemoveBtn'><CiCircleRemove/></span>
                                    </>
                                )
                            }
                        </p>
                        <hr />
                        <h2>
                            <span>total</span>
                            <span> &#8377;{finalPrice - (finalPrice / 100 * couponDiscount[0])}</span>
                        </h2>
                        <hr />
                        <p className='cart__message'>you will save &#8377;{totalDiscountedPrice + (finalPrice / 100 * couponDiscount[0])} on this order</p>
                        <button onClick={() => navigate('/checkout')} className='cart__checkout'>checkout</button>
                </div>
                </>
                ) : (
                    <>
                        <h1>nothing in cart</h1>
                        <p>cart is wmpty</p>
                    </>
                )}
            
        </div>
    )
}

export default Cart;