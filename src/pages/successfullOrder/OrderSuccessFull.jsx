import React from 'react';
import Lottie from 'react-lottie';
import success from '../../assets/success.json';
import './index.css';


const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: success,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const OrderSuccessFull = () => {
  return (
    <div className='order__message'>
      <h1><span className='order__messageSuccess'>Order Successfull!</span>  Thankyou for Shopping with Us 😊</h1>
      <Lottie 
	      options={defaultOptions}
        height={250}
        width={250}
      />
    </div>
  )
}

export default OrderSuccessFull