import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineHeart } from 'react-icons/ai';
import { CiCircleRemove } from 'react-icons/ci';
import { MdDiscount } from 'react-icons/md';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './cart.css';



const Cart = () => {
    const {cart, coupons, addCouponHandler,couponApplied, removeCouponHandler, couponDiscount, wishlist, increaseProductQuantity, decreaseProductQuantity, removeFromCart, moveToWishlist} = useProducts();
    const navigate = useNavigate();

    const [coupon, setCoupon] = useState(false);
    // const [couponDiscount, setCouponDiscount] = useState([0, '']);


    const totalOriginalPrice = cart?.reduce((total, curr) => {
        return total +  (Number(curr?.originalPrice) * curr?.qty);
    }, 0)
    
    const totalDiscountedPrice = cart?.reduce((total, curr) => {
        return total +  (curr?.originalPrice / 100 * curr?.percentageOff) * (curr?.qty)
    }, 0)

    const finalPrice = cart?.reduce((total, curr) => {
        const cost = curr?.originalPrice - (curr?.originalPrice / 100 * curr?.percentageOff);
        const totalCost = cost * curr?.qty
        return totalCost + total
    }, 0)


    console.log(couponDiscount)

    const couponModalHandler = () => {
        setCoupon((prev) => !prev)
    }


    return(
        <div className='cart'>
                <Toaster />
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
    
                                            <button style={{cursor : product?.qty < 2 && 'not-allowed' }} disabled={product?.qty < 2} onClick={() => decreaseProductQuantity(product?._id)} className='cart__quantity product-details__wishlist product-details-button'> - </button>
    
                                                <span>{product?.qty}</span>
                                            <button style={{cursor : product?.qty > product?.maxQuantityPurchase && 'not-allowed' }} onClick={() => increaseProductQuantity(product?._id)} className='cart__quantity product-details__wishlist product-details-button'> + </button>
                                        </section>
    
                                        <section className='cart__buttons'>
                                            {wishlist?.find(({_id}) => _id === product?._id) ? (
                                                <button onClick={() => navigate('/wishlist')} className='product-details__cart product-details-button'> <AiOutlineHeart/> already in wishlist </button>
                                            ) : (
                                                 <button onClick={() => moveToWishlist(product?._id)} className='product-details__cart product-details-button'>      <AiOutlineHeart/> move to wishlist </button>
                                            )}


                                            <button onClick={() => removeFromCart(product?._id)} className='product-details__wishlist product-details-button'> <RiDeleteBin7Line /> remove </button>
    
                                        </section>
                                        
                                    </section>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                
                <div className='cart__details'>
                        <p className='cart__coupons'><span><MdDiscount className='cart__couponlogo' /> have a coupon?</span> <button className='cart__coupon' onClick={couponModalHandler}>{'see'}</button></p>
                        {coupon && 
                            <div className='coupon__list'>
                                {coupons?.map(({_id, couponDescription, coupon, couponCode}) => {
                                    console.log(couponDescription, coupon, couponCode)
                                    return(
                                        <label className='cart__couponItem'>
                                            <div className='cart__coupons'>
                                                <input name='coupon' type='radio' checked={couponCode === couponDiscount?.couponCode} onChange={(e)=>addCouponHandler(e, _id)} className='cart__couponItem' key={_id} />
                                                <strong>{couponCode}</strong> 
                                            </div>
                                            <span>{couponDescription}</span> 
                                        </label>
                                    )
                                })}
                            </div>
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
                            {couponDiscount?.couponCode !== '' && 
                                (
                                    <>
                                        <span><strong>{couponDiscount?.couponCode}</strong>  applied successfully</span>
                                        <span onClick={() => removeCouponHandler(couponDiscount?.couponID)} className='cart__couponRemoveBtn'><CiCircleRemove/></span>
                                    </>
                                )
                            }
                        </p>
                        <hr />
                        <h2>
                            <span>total</span>
                            <span> &#8377;{(finalPrice - (finalPrice / 100 * couponDiscount?.couponPercentage)).toFixed(2)}</span>
                        </h2>
                        <hr />
                        <p className='cart__message'>you will save &#8377;{(totalDiscountedPrice + (finalPrice / 100 * couponDiscount?.couponPercentage)).toFixed(2)} on this order</p>
                        <button onClick={() => navigate('/checkout')} className='cart__checkout'>checkout</button>
                </div>
                </>
                ) : (
                    <>
                        <h1>nothing in cart</h1>
                        <p>cart is empty</p>
                    </>
                )}
            
        </div>
    )
}

export default Cart;