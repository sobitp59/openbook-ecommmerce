import React from 'react';
import { useAuth } from '../../contexts/authentication/AuthContext';
import { useProducts } from '../../contexts/products-context/ProductsContext';
import './addressForm.css';

const AddressForm = () => {
    
    const {fillDummyData, editedAddress, cancelForm, saveAddressForm, addressDetails, handleUserAddressForm} = useProducts();

    const {user : {userEncodedToken}} = useAuth();

    return (
    <div className='addressForm'>
        <form className='address-form' onSubmit={(e) => saveAddressForm(e, userEncodedToken, addressDetails)}>
                <h2>add new address</h2>
                <label className="form__label" htmlFor="">
                    <input 
                        type="text" 
                        required
                        placeholder='enter name'
                        name='name'
                        value={addressDetails?.name}
                        onChange={handleUserAddressForm}
                        />
                </label>
                
                <label  className="form__label" htmlFor="">
                    <input 
                        type="text" 
                        required
                        placeholder='enter house mo., road, colony'
                        name='house'
                        value={addressDetails?.house}
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
                        name='stateName'
                        value={addressDetails?.stateName}
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
                    <button className="form__button form__button--save"> save </button>
                    <button className="form__button form__button--cancel" onClick={cancelForm}> cancel </button>
                    <button className="form__button form__button--dummy" onClick={fillDummyData}> fill dummy data </button>
                </div>
            </form>
    </div>
  )
}

export default AddressForm