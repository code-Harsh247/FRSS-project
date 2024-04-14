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
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import CustomButtonSecondary from "../components/Button/CustomButttonSecondary";

const CheckOut = () => {

  const { productID, quantity, duration } = useParams();
  const [product, setProduct] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error, setError] = useState(null);
  const [rentItem, setRentItem] = useState(null);
  const { cartData, loading, setLoading, userId } = useCart();

  const { products } = useProducts();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${productID}`);
        setProduct(response.data);
        setRentItem(true);
        setLoading2(false);
      } catch (error) {
        setError(error.message);
        setRentItem(false);
        setLoading2(false);
      }
    };

    fetchProduct();
  }, [productID]);

  console.log("Single Product Rent? : ", rentItem);

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
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate total when product, quantity, or duration changes
    if (product && quantity && duration) {
      const totalPrice = product.price * quantity * duration;
      setTotal(totalPrice);
    }
  }, [product, quantity, duration]);
  let cartProducts = [];
  let totalBill = 0;

  if (!loading) {
    // Create an array of products with the same IDs as in cartData and add count and duration
    cartProducts = cartData.map(cartItem => {
      const matchingProduct = products.find(product => product.id === cartItem.id);
      return {
        ...matchingProduct,
        count: cartItem.count,
        duration: cartItem.duration
      };
    });
  }

  cartProducts.forEach(element => {
    totalBill += element.price * element.duration * element.count;
  });

  const RentProducts = ()=>{
    
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
          {console.log("Cart Items", cartData)}
        </div>
        <div className="RightPart">
          {rentItem ? (
            loading2 ? (
              <p>Loading ... </p>
            ) : error ? (
              <p>check1</p>
            ) : (
              <>
                {product.image?.[0] ? ( // Ensure product.image is not undefined or empty
                  <CheckoutCard
                    price={product.price}
                    name={product.name}
                    quantity={quantity}
                    rentDuration={duration}
                    imgUrl={product.image[0]}
                  />
                ) : (
                  <p>No image available</p>
                )}
              </>
            )
          ) : (
            loading ? (
              <p>Loading ... </p>
            ) : (
              cartProducts.map((item) => (
                <CheckoutCard
                  key={item.id}
                  price={item.price}
                  name={item.name}
                  quantity={item.count}
                  rentDuration={item.duration}
                  imgUrl={item.image?.[0]}
                />
              ))
            )
          )}

          <div className="Total">
            <span className="totalamt">Total:</span>
            <div>
              {rentItem ? (
                <span className="bill">Rs {total}</span>
              ) :
                <span className="bill">Rs {totalBill}</span>
              }
            </div>

          </div>
          <span className="disclaimer">*Total = Quantity * Monthly Rent * Rent Duration in months</span>
          <br/>
          <div className="PlaceOrderBtn">
              <CustomButtonSecondary Btnwidth="75%" btnText="Rent" handleClick={RentProducts}/>
          </div>
        </div>

      </div>

      <ServiceBanner />
      <Footer />
    </div>
  );

};
export default CheckOut;