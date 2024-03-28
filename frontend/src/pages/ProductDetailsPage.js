  import React from 'react'
  import ProdDetails from '../components/ProductDetails/ProductDetails'
  import Navbar from '../components/Navbar/Navbar'
  import {useProducts} from  '../context/ProductContext';
  import ServiceBanner from '../components/ServiceBanner/ServiceBanner'
  import Footer from '../components/Footer/Footer';

  const ProductDetailsPage = () => {
    const {products} = useProducts();
    // if(products.length() > 0 ) console.log("Products fetched to page");
    // else console.log("Error fetching prodcts to page")
    return (
      <div>
        <Navbar/>
        <ProdDetails item={products[0]} />
        <ServiceBanner/>
        <Footer/>
      </div>
    )
  }

  export default ProductDetailsPage