import React from 'react';
import { useAuth } from '../../contexts/authentication/AuthContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './addressForm.css';

const AddressForm = ({setShowAddressForm}) => {
    
    const {fillDummyData, cancelForm, saveAddressForm, addressDetails, handleUserAddressForm} = useProducts();

    const {user : {userEncodedToken}} = useAuth();


    console.log(addressDetails)

    return (
    <div className='addressForm'>
        <h2>add new address</h2>
        <form className='address-form'>
                <label className="form__label" htmlFor="">
                    <input 
                        type="text" 
                        required
                        placeholder='enter name'
                        name='name'
                        value={addressDetails?.name ? addressDetails?.name : ''}
                        onChange={handleUserAddressForm}
                        />
                </label>
                
                <label  className="form__label" htmlFor="">
                    <input 
                        type="text" 
                        required
                        placeholder='enter house mo., road, colony'
                        name='house'
                        value={addressDetails?.house ? addressDetails?.house : ''}
                        onChange={handleUserAddressForm}
                        />
                </label>

                <label  className="form__label" htmlFor="">
                    <input 
                        type="text" 
                        required
                        placeholder='enter city'
                        name='city'
                        value={addressDetails?.city}
                        onChange={handleUserAddressForm}
                        />
                </label>
                
                <label  className="form__label" htmlFor="">
                    <input 
                        type="text" 
                        required
                        placeholder='enter state'
                        name='state'
                        value={addressDetails?.state}
                        onChange={handleUserAddressForm}
                        />
                </label>
                <label  className="form__label" htmlFor="">
                    <input 
                        type="text" 
                        required
                        placeholder='enter country'
                        name='country'
                        value={addressDetails?.country}
                        onChange={handleUserAddressForm}
                        />
                </label>
                <label  className="form__label" htmlFor="">
                    <input 
                        type="zip" 
                        required
                        placeholder='enter postal code'
                        name='postalCode'
                        value={addressDetails?.postalCode}
                        onChange={handleUserAddressForm}
                        />
                </label>
                <label  className="form__label" htmlFor="">
                    <input 
                        type="number" 
                        required
                        placeholder='enter mobile number'
                        name='mobileNumber'
                        value={addressDetails?.mobileNumber}
                        onChange={handleUserAddressForm}
                        />
                </label>


                <div className='form__buttons'>
                    <button className="form__button form__button--save" onClick={(e) => saveAddressForm(e, addressDetails, userEncodedToken, setShowAddressForm)}> save </button>
                    <button className="form__button form__button--cancel" onClick={(e) => cancelForm(e, setShowAddressForm)}> cancel </button>
                    <button className="form__button form__button--dummy" onClick={fillDummyData}> fill dummy data </button>
                </div>
            </form>
    </div>
  )
}

export default AddressForm