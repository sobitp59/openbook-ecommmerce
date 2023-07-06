import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './checkout.css';


const Checkout = () => {
    const {cart, couponDiscount, address} = useProducts();
    const navigate = useNavigate();

    const totalOriginalPrice = cart?.reduce((total, curr) => {
        return total +  (Number(curr?.originalPrice) * curr?.qty);
    }, 0)
    
    const totalDiscountedPrice = cart?.reduce((total, curr) => {
        return total +  (curr?.originalPrice / 100 * curr?.percentageOff) * (curr?.qty)
    }, 0)

    const price = cart?.reduce((total, curr) => {
        const cost = curr?.originalPrice - (curr?.originalPrice / 100 * curr?.percentageOff);
        const totalCost = cost * curr?.qty
        return totalCost + total
    }, 0)


    console.log(address)


  return (
    <div className='checkout'>
        <div className='checkout__address checkout--div'>
            <h1>
                address
            </h1>

            <button onClick={() => navigate('/user-profile')} className='user__addBtn'>add another address</button>
            <section>
                {address?.map(({address, _id}) => {
                    return <label className='checkout__addressSelect' htmlFor="" key={_id}>
                        <input type="radio" name='user_address' className='checkout__addressInput'/>
                        <section>
                            <h3>{address?.name}</h3>
                            <p>{address?.house}, {address?.city}, {address?.state} - {address?.postalCode}</p>
                            <p>{address?.country}</p>
                            <p><strong>contact : </strong>{address?.mobileNumber}</p>
                        </section>
                    </label>
                })}
            </section>

        </div>

        <div className='checkout__details checkout--div'>

            <hr />
            <h2>order details</h2>
            <hr />
            <p><strong>item</strong> <strong>quantity</strong></p>
            {cart?.map(({_id, title,qty}) => {
                return <p className='checkout__quantity' key={_id}><span>{title}</span> <span>{qty}</span> </p>
            })}

            <hr />
            <h2>price details</h2>
            <hr />
            <p>
                <span>price ({cart?.length} items)</span>
                <span>&#8377; {totalOriginalPrice}</span>
            </p>
            <p>
                <span>discount</span>
                <span> -&#8377;{totalDiscountedPrice}</span>
            </p>
            <p>
                <span>discount</span>
                <span> -&#8377;{0}</span>
            </p>
    
            <h2>
                <span>total</span>
                <span> &#8377;{(price - (price / 100 * couponDiscount?.couponPercentage)).toFixed(2)}</span>
            </h2>
 
 
            <hr />
            <h2>deliver to</h2>
            <hr />

            <p>Rutvik Umak

            #1/4 , 100ft Ring Road, Karve Nagar, Bangalore , Maharashtra ,India. 452412
                        
            Phone Number : 123456789</p>

            <button className='cart__checkout'>place order</button>

        </div>
    </div>
  )
}

export default Checkout;