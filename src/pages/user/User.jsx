import React, { useState } from 'react';
import { useAuth } from '../../contexts/authentication/AuthContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './user.css';


const User = () => {
  const {user, userLogoutHandler} = useAuth()
  const {getAddress} = useProducts()
  const [userState, setUserState] = useState({profile : true, address : false})
  console.log(user)
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
            <button onClick={() => getAddress(user?.userEncodedToken)}>+ add new address</button>
        </section>

        )
        
        }
    </div>
  )
}

export default User;