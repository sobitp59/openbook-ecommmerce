import React, { useState } from 'react';
import { AddressForm } from '../../components';
import { useAuth } from '../../contexts/authentication/AuthContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './user.css';


const User = () => {
  const {user, userLogoutHandler} = useAuth()
  const {address, userAddressDeleteHandler, userEditAddressHandler} = useProducts()
  const [userState, setUserState] = useState({profile : true, address : false})
  const [showAddressForm, setShowAddressForm] = useState(false);
  const {userInfo} = user;

  const styleAddress = address.length > 0 && 'user__addresses'

  return (
    <div className='user'>

      <div>
        <h1>account</h1>
      </div>
      
      <div className='user__buttons'>
        <button style={{background : userState?.profile && '#994ff3', color : userState?.profile && 'white'}} className='user__button user__button--profile' onClick={() => setUserState({profile : true, address : false})}>profile</button>
        <button style={{background : userState?.address && '#994ff3', color : userState?.address && 'white'}} className='user__button user__button--address' onClick={() => setUserState({profile : false, address : true})}>address</button>
      </div>

      {userState.profile ? (
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
        ) : (
        <section className='user__address user--data'>
            <h2>my addresses</h2>
            
            {/* address */}
            <ul>
              {address?.map(({ address, _id}) => (
                <li key={_id} className={styleAddress}>
                  <h3>{address?.name}</h3>
                  <p>{address?.house}, {address?.city}, {address?.state} - {address?.postalCode}</p>
                  <p>{address?.country}</p>
                  <p><strong>contact : </strong>{address?.mobileNumber}</p>
                  <section>
                    <button onClick={() => userEditAddressHandler(user?.userEncodedToken, _id)} className='user__addressButton user__editBtn'>edit</button>
                    <button onClick={() => userAddressDeleteHandler(user?.userEncodedToken, _id)} className='user__addressButton user__deleteBtn'>delete</button>
                  </section>
                </li>
              ))}
            </ul>

            <button className='user__addBtn' onClick={() => setShowAddressForm(true)}>+ add a new address</button>
        </section>

        )
        
        }

        <div className='user__addressform'>
         {showAddressForm && <AddressForm setShowAddressForm={setShowAddressForm} />}
        </div>
    </div>
  )
}

export default User;