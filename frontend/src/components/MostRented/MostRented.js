import React from 'react';
import './MostRented.css';
import ProductCard from '../ProductCard/productCard';
import { useProducts } from '../../context/ProductContext';

const MostRented = () => {
    const { products } = useProducts();

    // Sort products based on units rented in descending order
    const sortedProducts = products.sort((a, b) => b.unitsRented - a.unitsRented);

    // Get the top 6 most rented products
    const top6MostRented = sortedProducts.slice(0, Math.min(sortedProducts.length, 6));

    return (
        <div id='most-rented-container'>
            <div id='most-rented-heading'>
                <p>Most Rented</p>
                <span id='most-rented-subheading'>Explore out best sellers</span> 
            </div>
            <div className="mostRentedProducts">
                {top6MostRented.map(product => (
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
        </div>
    );
}

export default MostRented;
