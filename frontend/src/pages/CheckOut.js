import React, { useState, useEffect } from "react";
import axios from "../context/axiosConfig"
import InputBox from "../components/InputBox/InputBox";
import { useParams } from "react-router-dom";
import "./Css/CheckOut.css"
import ShopBanner from '../components/ShopBanner/ShopBanner';
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import ServiceBanner from "../components/ServiceBanner/ServiceBanner";
import CheckoutCard from "../components/CheckoutCards/CheckoutCard";

const CheckOut = () => {

  const { productID, quantity, duration } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productID}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productID]);

  console.log(product);


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
              <InputBox onInputChange={handleFirstNameChange} />
            </div>
            <div className="LastName">
              <span> Last Name</span>
              <InputBox onInputChange={handleLastNameChange} />
            </div>
          </div>
          <div className="CountryRegion">
            <span> Country/Region</span>
            <InputBox onInputChange={handleCountryRegionChange} />
          </div>
          <div className="StreetAddress">
            <span> Street Address</span>
            <InputBox onInputChange={handleStreetAddressChange} />
          </div>

          <div className="TownCity">
            <span>Town/City</span>
            <InputBox onInputChange={handleTownCityChange} />
          </div>
          <div className="Province">
            <span> Province</span>
            <InputBox onInputChange={handleProvinceChange} />
          </div>
          <div className="ZIPCode">
            <span>ZIP Code</span>
            <InputBox onInputChange={handleZIPCodeChange} />
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
          {loading ?
            (<p>Loading ... </p>)
            :
            error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <CheckoutCard name={product.name} quantity={quantity} rentDuration={duration} imgUrl={product.image[0]}/>
              </>
            )
             }
             <div className="Total">
              
             </div>
        </div>


      </div>
      <ServiceBanner />
      <Footer />
    </div>
  );

};
export default CheckOut;