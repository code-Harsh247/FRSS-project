import React from 'react';
import AdminNavbar from '../components/AdminNavbar/AdminNavbar';
import AdminBanner from '../components/AdminBanner/AdminBanner';
import ProductCard from "../components/ProductCard/ProductCard";
import "./Css/Products.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLoginPage from "./AdminLoginPage";




function Products() {
    const navigate = useNavigate();

    const handleAddProducts = () => {
        navigate('/admin/addproducts');
    }
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
                <div className="ProductsList">

                    <ProductCard />
                </div>

            </div>
        );
    }
    else return <AdminLoginPage />
}

export default Products;