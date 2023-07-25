import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddressForm } from '../../components';
import { useAuth } from '../../contexts/authentication/AuthContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './user.css';

import toast, { Toaster } from 'react-hot-toast';


const User = () => {
  const {user, userLogoutHandler} = useAuth()
  const {address,addressDetails, showAddressForm, showAddressModal, orderedProducts, userAddressDeleteHandler, userEditAddressHandler} = useProducts()
  const [userState, setUserState] = useState({profile : true, address : false, orders : false})
  const {userInfo} = user;

  const styleAddress = address?.length > 0 && 'user__addresses'

  console.log(user?.userInfo)
  console.log(address)
  console.log(user)

  return (
    <div className='user'>
      <Toaster />
      <div className='user__addressform'>
         {showAddressForm && <AddressForm />}
      </div> 

      <div>
        <h1>account</h1>
      </div>
      
      <div className='user__buttons'>
        <button style={{background : userState?.profile && '#00214d', color : userState?.profile && 'white'}} className='user__button user__button--profile' onClick={() => setUserState({profile : true, address : false, orders : false})}>profile</button>
        <button style={{background : userState?.address && '#00214d', color : userState?.address && 'white'}} className='user__button user__button--address' onClick={() => setUserState({profile : false, address : true, orders : false})}>address</button>
        <button style={{background : userState?.orders && '#00214d', color : userState?.orders && 'white'}} className='user__button user__button--orders' onClick={() => setUserState({profile : false, address : false, orders : true})}>orders</button>
      </div>

      {userState?.profile ? (
        <section className='user__details user--data'>
            <h2>profile details</h2>
            <article>
              <strong>name</strong> <span>{userInfo?.fullname}</span>
            </article>
            <article>
              <strong>email</strong> <span>{userInfo?.email}</span>
            </article>

            <h2>account settings</h2>
            <button className='user__deleteBtn' onClick={userLogoutHandler}>logout</button>
        </section>
        ) : (userState?.address) ? (
        <section className='user__address user--data'>
            <h2>my addresses</h2>
            
            
            {/* address */}
            <ul>
              {(address?.length > 0) && address?.map((userAddress) => {
                return(
                <li key={userAddress?._id} className={styleAddress}>
                  <h3>{userAddress?.name}</h3>
                  <p>{userAddress?.house}, {userAddress?.city}, {userAddress?.stateName} - {userAddress?.postalCode}</p>
                  <p>{userAddress?.country}</p>
                  <p><strong>contact : </strong>{userAddress?.mobileNumber}</p>
                  <section>
                    <button onClick={() => userEditAddressHandler( userAddress, showAddressModal)} className='user__addressButton user__editBtn'>edit</button>
                    <button onClick={() => userAddressDeleteHandler(user?.userEncodedToken, userAddress?._id)} className='user__addressButton user__deleteBtn'>delete</button>
                  </section>
                </li>
              )}
              
              )}
            </ul>

            <button className='user__addBtn' onClick={showAddressModal}>+ add a new address</button>
        </section>

        ) : (userState?.orders) && (
        <section className='user__orders user--data'>
            <h2>my orders</h2>  
            {orderedProducts?.length == 0 && <p>You haven't ordered anything yet!</p>}
            {orderedProducts?.length > 0 && (
               orderedProducts?.map(({date : dateString, deliveryAddress, deliveryDate, paymentID, productsLists, totalAmount}) => {
                 
                const dateObject = new Date(dateString);
                
                const monthNames = [
                  "January", "February", "March", "April", "May", "June", 
                  "July", "August", "September", "October", "November", "December"
                ];
              
                const date = dateObject.getDate();
                const year = dateObject.getFullYear();
                const month = monthNames[dateObject.getMonth()];
              
                const [{address : deliveryAddressData} = {}] = deliveryAddress ?? [];

                return (
                  <div className='user__ordersDiv'>
                  <h2 className='user__orders--title'>order confirmed</h2>
                  <div>
                    <p>{date} {month} {year}</p>
                    <section>
                      <h3>{deliveryAddressData?.name}</h3>
                      <p>{deliveryAddressData?.house}, {deliveryAddressData?.city}, {deliveryAddressData?.state} - {deliveryAddressData?.postalCode}</p>
                      <p>{deliveryAddressData?.country}</p>
                      <p><strong>contact : </strong>{deliveryAddressData?.mobileNumber}</p>
                    </section>
                    <p><strong>delivery date : </strong> {deliveryDate}</p>
                    <p><strong>paymentID : </strong> {paymentID}</p>
                    <p><strong>total amount : </strong> {totalAmount}</p>
                  </div>
                  <ul className='user__ordersProducts'>
                    {productsLists?.map(({_id, imageURL, qty, title, originalPrice, percentageOff}) => (
                      <Link key={_id} to={`/products/${_id}`} className='user__ordersLink'>
                        <li className='user__ordersProduct'>
                          <img className='user__ordersImage' src={imageURL} alt={title} />
                          <p><strong>quantity : </strong> {qty} </p>
                          <section className='user__ordersPrice'>
                                <h4 className='user__ordersPayablePrice'> &#x20B9;{originalPrice - (originalPrice / 100 * percentageOff)} / book</h4>
                            </section>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
                )
               }) 
            )}
        </section>

        )

        }

       
    </div>
  )
}

export default User;