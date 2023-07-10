import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import BrandLogo from '../../../src/assets/brandlogo.png';
import { useAuth } from '../../contexts/authentication/AuthContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './checkout.css';


const Checkout = () => {
    const {cart, getOrderDetails,clearCart, couponDiscount, address, deliveryAddress, selectCheckoutAddress, addressDetails : {mobileNumber}} = useProducts();
    const {user} = useAuth()
    const navigate = useNavigate();


    const {email, fullname} = user?.userInfo;

    const totalPrice = cart?.reduce((total, curr) => {
        const cost = curr?.originalPrice - (curr?.originalPrice / 100 * curr?.percentageOff);
        const totalCost = cost * curr?.qty
        return totalCost + total
    }, 0)

    const totalPriceToPay  = (totalPrice - (totalPrice / 100 * couponDiscount?.couponPercentage)).toFixed(2)


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
    }, 0);

    const [{address : addressCheckout, _id : deliveryAddressID} = {}] = deliveryAddress ?? [];

    const getDeliveryDate = () => {
        const today = new Date();
        const deliveryDate = new Date(today.getTime() + (7 * 24 * 24 * 60 * 1000));
        
        const options = {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        }
        const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", options); 
        return formattedDeliveryDate;
    }
    

    const handlePaymentSuccess = (response) => {
        const orderDetail = {
          paymentID : response?.razorpay_payment_id,
          productsLists : [...cart],
          deliveryAddress : deliveryAddress,
          totalAmount : totalPriceToPay,
          date : new Date(),
          deliveryDate : getDeliveryDate()
        }
    
        getOrderDetails(orderDetail);
    
        navigate("/order-successfull");
    
        clearCart();
    
        setTimeout(() => {
          navigate("/user-profile");
        }, 5000);
      }
    
    
      const razorpayOptions = {
          key: "rzp_test_8lFoFGsmvIuwB7",
          amount: parseInt(totalPriceToPay) * 100,
          name: "OpenBook",
          description: "Thank You For Purchasing",
          image: BrandLogo,
          
          handler: (response) => handlePaymentSuccess(response),
          
          prefill: {
            name: fullname,
            email: email,
            contact: mobileNumber,
          },
          
          notes: {
            address: deliveryAddress,
          },
          theme: {
            color: "#994ff3",
          },
        };
    


    const handleCheckout = () => {
        if(deliveryAddress?.length > 0){
            const razorpayInstance = new window.Razorpay(razorpayOptions);
            razorpayInstance.open();
        }else if(address?.length === 0){
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
                <span> -&#8377;{totalDiscountedPrice ? totalDiscountedPrice : 0}</span>
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