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
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const navigate = useNavigate();
  const { productID, quantity, duration } = useParams();
  const [product, setProduct] = useState(null);
  const [loading2, setLoading2] = useState(true);
  const [error, setError] = useState(null);
  const [rentItem, setRentItem] = useState(null);
  const { cartData, loading, setLoading, userId } = useCart();
  const { products } = useProducts();
  const [rentProducts, setRentProducts] = useState([]);

  const clearCartProducts = async () => {
    try {
      // Make a DELETE request to empty the user's cart
      const response = await axios.delete(`users/empty-cart/${userId}`);

      // Check if the request was successful
      if (response.data.success) {
        console.log("Cart emptied successfully");
        // Optionally, you can perform additional actions here if needed
      } else {
        console.error("Unable to clear cart");
      }
    } catch (error) {
      console.error("Unable to clear cart:", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (productID!==null) {
          const response = await axios.get(`/products/${productID}`);
          setProduct(response.data);
          setRentItem(true);
          setLoading2(false);
        }
      } catch (error) {
        setError(error.message);
        setRentItem(false);
        setLoading2(false);

      }
    };

    fetchProduct();
  }, [productID]);

  useEffect(() => {
    if (product) {
      setRentProducts(prevProducts => [...prevProducts, product]);
    }
  }, [product]);

  console.log("Single Product Rent? : ", rentItem);

  const [ProvinceInput, setProvinceInput] = useState("");
  const [FirstNameInput, setFirstNameInput] = useState("");
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

  const RentProducts = async () => {
    try {
      // Check if rentItem is true and a product is available for rent
      if (rentItem && product) {
        // Prepare data for renting the product
        const data = {
          productId: product.id,
          quantity: quantity,
          duration: duration,
          price: product.price,
          street: StreetAddressInput,
          city: TownCityInput,
          province: ProvinceInput,
          phone: PhoneInput,
          email: emailInput,
          zipcode: ZIPCodeInput,
          country: CountryRegionInput,
          userName: FirstNameInput
        };

        // Make a POST request to rent the product
        const response = await axios.post(`users/rent/${userId}`, data);

        // Handle the response
        console.log("Rented Product Response:", response.data);
        alert("Product has been successfully rented.");
      } else {
        // Handle case where rentItem is false or product is not available
        alert("No product available for rent.");
      }
      navigate('/');
    } catch (error) {
      console.error("Renting Error:", error);
      alert("An error occurred while renting the product. Please try again.");
    }
  }


  const rentCart = async () => {
    try {
      console.log(cartProducts);
      const response = await axios.post(`users/rent/cart/${userId}`, {
        street: StreetAddressInput,
        city: TownCityInput,
        province: ProvinceInput,
        phone: PhoneInput,
        email: emailInput,
        zipcode: ZIPCodeInput,
        country: CountryRegionInput,
        userName: FirstNameInput,
        cartItems: cartProducts,
      });

      console.log("Rent cart response:", response.data);
      alert("All Products have been successfully rented. Thank you for shopping with us.");
      try {
        // Make a DELETE request to empty the user's cart
        const response = await axios.delete(`users/empty-cart/${userId}`);
        console.log(response.data.success);
        // Check if the request was successful
        if (response.data.success) {
          console.log("Cart emptied successfully");
          // Optionally, you can perform additional actions here if needed
        } else {
          console.error("Unable to clear cart");
        }
      } catch (error) {
        console.error("Unable to clear cart:", error);
      }
      navigate('/');
    } catch (error) {
      console.error("Rent cart error:", error.message);
      alert("An error occurred while renting the products. Please try again.");
    }
  };


  return (
    <div className="MainCheckOutContainer">
      <Navbar />
      <ShopBanner name="Checkout" />
      <div className="CheckOutContainer">
        <div className="LeftPart">
          <p>Billing Details</p>
          <div className="Name">
            <div className="FirstName">
              <span>Name</span>
              <InputBox onInputChange={handleFirstNameChange} />
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
          {rentItem ? (
            loading2 ? (
              <p>Loading ... </p>
            ) : error ? (
              <p>check1</p>
            ) : (
              <>
                {product.image?.[0] ? ( // Ensure product.image is not undefined or empty
                  <CheckoutCard
                    key={product._id}
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
                  key={item._id}
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
          <br />
          <div className="PlaceOrderBtn">
            <CustomButtonSecondary Btnwidth="75%" btnText="Rent" handleClick={rentItem ? RentProducts : rentCart} />
          </div>
        </div>

      </div>

      <ServiceBanner />
      <Footer />
    </div>
  );

};
export default CheckOut;