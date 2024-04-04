import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ServiceBanner from '../components/ServiceBanner/ServiceBanner';
import Footer from '../components/Footer/Footer';
import ShopBanner from '../components/ShopBanner/ShopBanner';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard/ProductCard';
import './Css/ShopCategory.css' 

const ShopCategory = () => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    const { categoryName } = useParams();
    const CategoryName = categoryName.slice(0,-1);
    const {products} = useProducts();
    const filteredProducts = products.filter(product => product.category === CategoryName );
    return (
        <div>
            <Navbar />
            <ShopBanner name={categoryName} />
            <div className="CategoryProducts">
                {filteredProducts.map(product => (
                    <div className="productCard" key={product.id}>
                    <ProductCard
                        id={product._id}
                        imageUrl={product.image[0]}
                        productName={product.name}
                        price={product.price}
                    />
                </div>
                ))}
            </div>
            <ServiceBanner />
            <Footer />
        </div>
    );
};

export default ShopCategory;
