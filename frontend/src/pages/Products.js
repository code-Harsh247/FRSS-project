import React from 'react';
import AdminNavbar from '../components/AdminNavbar/AdminNavbar';
import AdminBanner from '../components/AdminBanner/AdminBanner';
import ProductCard from "../components/ProductCard/ProductCard";
import "./Css/Products.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLoginPage from "./AdminLoginPage";
import { useProducts } from '../context/ProductContext';
import AdminProductCard from '../components/AdminProductCard/AdminProductCard';



function Products() {
    const navigate = useNavigate();
    const { products } = useProducts();
    const handleAddProducts = () => {
        navigate('/admin/addproducts');
    }
    console.log(products);
    const { isAdminLoggedIn } = useAdminAuth();
    if (isAdminLoggedIn) {
        return (
            <div className='ProductsContainer'>
                <AdminNavbar />
                <AdminBanner name="Products" />
                <div className="AddNewProducts">
                    <button onClick={handleAddProducts} >Add New Product</button>
                </div>
                <div className="ProductsListTitle">
                    <span>Products</span>
                </div>
                {/* <AdminProductCard id="4" name="Harsh" price="10000" /> */}
                <div>
                    {
                        products.map((prod) => (
                            <AdminProductCard
                                key={prod._id}
                                id={prod._id}
                                name={prod.name}
                                price={prod.price}
                                img={prod.image[0]}
                                cost={prod.cost}
                                stock={prod.stock}
                            />
                        ))
                    }


                </div>

            </div>
        );
    }
    else return <AdminLoginPage />
}

export default Products;