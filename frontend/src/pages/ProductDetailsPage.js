import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProdDetails from '../components/ProductDetails/ProductDetails'
import Navbar from '../components/Navbar/Navbar'
import ServiceBanner from '../components/ServiceBanner/ServiceBanner'
import Footer from '../components/Footer/Footer';
import axios from '../context/axiosConfig'
import ReviewSection from '../components/ReviewSection/ReviewSection'

const ProductDetailsPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);



  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`products/${productID}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };
    window.scrollTo(0, 0);

    fetchProductDetails();
  }, [productID]);

  return (
    <div>
      <Navbar />
      <ProdDetails item={product} />
      <ReviewSection product={product}/>
      <ServiceBanner />
      <Footer />
    </div>
  )
}

export default ProductDetailsPage