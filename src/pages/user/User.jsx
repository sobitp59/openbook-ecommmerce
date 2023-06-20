import React, { useState } from 'react';
import { AddressForm } from '../../components';
import { useAuth } from '../../contexts/authentication/AuthContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './user.css';


const User = () => {
  const {user, userLogoutHandler} = useAuth()
  const {address} = useProducts()
  const [userState, setUserState] = useState({profile : true, address : false})
  const [showAddressForm, setShowAddressForm] = useState(false);
  const {userInfo} = user;
  
  return (
    <div className='user'>

      <div>
        <h1>account</h1>
      </div>
      
      <div className='user__buttons'>
        <button onClick={() => setUserState({profile : true, address : false})}>profile</button>
        <button onClick={() => setUserState({profile : false, address : true})}>address</button>
      </div>

      {userState.profile ? (
        <section className='user__details'>
            <h2>profile details</h2>
            <article>
              <strong>name</strong> <span>{userInfo?.fullname}</span>
            </article>
            <article>
              <strong>email</strong> <span>{userInfo?.email}</span>
            </article>

            <h2>account settings</h2>
            <button onClick={userLogoutHandler}>logout</button>
        </section>
        ) : (
        <section className='user__address'>
            <h2>my addresses</h2>
            
            {/* address */}
            <ul className='user__addresses'>
              {address?.map(({ address, _id}) => (
                <li key={_id}>
                  <h3>{address?.name}</h3>
                  <p>{address?.house}, {address?.city}, {address?.state} - {address?.postalCode}</p>
                  <p>{address?.country}</p>
                  <p><strong>contact : </strong>{address?.mobileNumber}</p>
                  <section>
                    <button>edit</button>
                    <button>delete</button>
                  </section>
                </li>
              ))}
            </ul>

            <button onClick={() => setShowAddressForm(true)}>+ add a new address</button>
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