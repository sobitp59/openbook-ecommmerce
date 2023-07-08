import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authentication/AuthContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './checkout.css';


const Checkout = () => {
    const {cart, couponDiscount, address, deliveryAddress, selectCheckoutAddress} = useProducts();
    const {user} = useAuth()
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



    console.log(deliveryAddress)
    console.log(address)


    const [{address : addressCheckout, _id : deliveryAddressID} = {}] = deliveryAddress ?? [];


    const handleCheckout = () => {
        console.log('hello')
        if(address?.length === 0){
            toast.error('please add an address!')
        }else if(deliveryAddress?.length === 0){
            toast.error('please select an address!')
        }        
    }



  return (
    <div className='checkout'>
        <Toaster />
         
        <div className='checkout__address checkout--div'>
            <h1>
                address
            </h1>

            <button onClick={() => navigate('/user-profile')} className='user__addBtn'>add another address</button>

            {address?.map(({address, _id}) => {
                return <label onClick={() => selectCheckoutAddress(_id, user?.userEncodedToken)} className='checkout__addressSelect' htmlFor="user_address" key={_id}>
                    <input checked={deliveryAddressID === _id} onChange={() => {}} type="radio" name='user_address' className='checkout__addressInput'/>
                    <section>
                        <h3>{address?.name}</h3>
                        <p>{address?.house}, {address?.city}, {address?.state} - {address?.postalCode}</p>
                        <p>{address?.country}</p>
                        <p><strong>contact : </strong>{address?.mobileNumber}</p>
                    </section>
                </label>
            })}

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

            { deliveryAddress?.length > 0 && (
                <>
                    <h3>{addressCheckout?.name}</h3>
                    <p>{addressCheckout?.house} {addressCheckout?.city}, {addressCheckout?.state}  {addressCheckout?.postalCode}</p>
                    <p>{addressCheckout?.country}</p>
                    <p><strong>contact : </strong>{addressCheckout?.mobileNumber}</p>
                </>
            ) }
            
            <button onClick={handleCheckout} className='cart__checkout'>place order</button>

        </div>
    </div>
  )
}

export default Checkout;