import React, { useState } from "react";
import InputBox from "../components/InputBox/InputBox";
import "./Css/CheckOut.css"
import ShopBanner from '../components/ShopBanner/ShopBanner';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ServiceBanner from "../components/ServiceBanner/ServiceBanner";

const CheckOut = ({name}) => {
    const product = {
        name: 'Asgaard Sofa',
        price: 250000,
        quantity: 1,
    };
    
    const subtotal = product.price * product.quantity;

    const [ProvinceInput, setProvinceInput] = useState("");
    const [FirstNameInput, setFirstNameInput] = useState("");
    const [LastNameInput, setLastNameInput] = useState("");
    const [CountryRegionInput, setCountryRegionInput] = useState("");
    const [StreetAddressInput, setStreetAddressInput] = useState("");
    const [TownCityInput, setTownCityInput] = useState("");
    const [ZIPCodeInput, setZIPCodeInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [PhoneInput, setPhoneInput] = useState("");




    const handleProvinceChange = (province) => {
        setProvinceInput(province);
    }
    const handleFirstNameChange = (firstName) => {
        setFirstNameInput(firstName);
    }
    const handleLastNameChange = (lastName) => {
        setLastNameInput(lastName);
    }
    const handleCountryRegionChange = (countryRegion) => {
        setCountryRegionInput(countryRegion);
    }
    const handleStreetAddressChange = (streetAddress) => {
        setStreetAddressInput(streetAddress);
    }
    const handleTownCityChange = (townCity) => {
        setTownCityInput(townCity);
    }
    const handleZIPCodeChange = (zIPCode) => {
        setZIPCodeInput(zIPCode);
    }
    const handleEmailChange = (email) => {
        setEmailInput(email);
    }
    const handlePhoneChange = (phone) => {
        setPhoneInput(phone);
    }
    


    return (
      <div className="MainCheckOutContainer">
        <Navbar />
        <ShopBanner name="Checkout" />
        <div className="CheckOutContainer">
            <div className="LeftPart">
                <p>Billing Details</p>
                <div className="Name">
                    <div className="FirstName">
                    <span> First Name</span>
                    <InputBox onInputChange={handleFirstNameChange}/>
                    </div>
                    <div className="LastName">
                    <span> Last Name</span>
                    <InputBox onInputChange={handleLastNameChange}/>
                    </div>
                </div>
                <div className="CountryRegion">
                    <span> Country/Region</span>
                    <InputBox onInputChange={handleCountryRegionChange}/>
                </div>
                <div className="StreetAddress">
                    <span> Street Address</span>
                    <InputBox onInputChange={handleStreetAddressChange}/>
                </div>
  
                <div className="TownCity">
                    <span>Town/City</span>
                    <InputBox onInputChange={handleTownCityChange} />
                </div>
                <div className="Province">
                    <span> Province</span>
                    <InputBox onInputChange={handleProvinceChange}/>
                </div>
                <div className="ZIPCode">
                    <span>ZIP Code</span>
                    <InputBox onInputChange={handleZIPCodeChange}/>
                </div>
                <div className="Phone">
                    <span>Phone</span>
                    <InputBox onInputChange={handlePhoneChange} />
                </div>
                <div className="Email">
                    <span> Email Address</span>
                    <InputBox onInputChange={handleEmailChange} autocomplete="email" />
                </div>
                
            </div>
            <div className="RightPart">
            <div className="checkout-page">
      <table>
        <thead>
          <tr>
            <th className="product-name"><p className="product">Product</p></th>
            <th className="subtotal"><p className="product">Subtotal</p></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.name} x {product.quantity}</td>
            <td>₹{subtotal.toFixed(2)}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td className="text-right">Subtotal</td>
            <td className="text-right">₹{subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="text-right">Total</td>
            <td className="text-right">₹{subtotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div className="payment-methods">
        <h2>Payment Methods</h2>
        <p>Choose your preferred payment method:</p>
        <ul>
          <li>
            <input
              type="radio"
              id="direct-bank-transfer"
              name="payment-method"
              value="direct-bank-transfer"
           
            />
            <label htmlFor="direct-bank-transfer">Direct Bank Transfer</label>
          </li>
          <li>
            <input
              type="radio"
              id="cash-on-delivery"
              name="payment-method"
              value="cash-on-delivery"
              
            />
            <label htmlFor="cash-on-delivery">Cash On Delivery</label>
          </li>
        </ul>
        </div>
      <button className="place-order-button " >Place Order</button>
    </div>
            </div>
            
        </div>
        <ServiceBanner/>
        <Footer/>
        </div>
      );
        
};
export default CheckOut;