
import { AiOutlineHeart } from 'react-icons/ai';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './cart.css';


const Cart = () => {
    const {cart, allProducts, addToCart, addToWishlist, wishlist, removeFromWishlist, increaseProductQuantity, decreaseProductQuantity, removeFromCart, moveToWishlist} = useProducts();
    console.log(cart)
    
    return(
        <div className='cart'>
            <div className='cart__products'>
            <h1>cart__products</h1>
                <ul className='cart__lists'>
                    {cart?.map((product) => {
                        return(
                            <li className='cart__product'>
                                <section className='cart__image'>
                                    <img className='cart__productImage' src={product?.imageURL} alt="" />
                                </section>
                                <section className='cart__detail'>
                                    <h1>{product?.title}</h1>
                                    <p>by {product?.author}</p>

                                    <section className='product__info'>
                                        <h4 className='product__payablePrice'> &#x20B9;{product?.originalPrice / 100 * product?.percentageOff}</h4>
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
                    <h1>cart cart__details</h1>
            </div>
        </div>
    )
}

export default Cart;