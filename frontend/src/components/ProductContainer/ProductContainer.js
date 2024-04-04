import React from 'react'
import { useProducts } from "../../context/ProductContext";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductContainer.css"

const ProductContainer = () => {
    const { products } = useProducts();
    return (
        <div className='Product-Card-Container'>
            {products.map((item) => (
                <ProductCard
                    className="item-Card"
                    key={item._id}
                    productName={item.name}
                    price={item.price}
                    imageUrl={item.image}
                />
            ))}
        </div>
    )
}

export default ProductContainer