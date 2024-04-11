import React from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import AddProducts from "../components/AddProducts/AddProducts";
import "./Css/AddProductsPage.css";

function AddProductPage() {
    return (
        <div className="AddProductPageContainer">
            <AdminNavbar />
            <AdminBanner name="Add Products" />
            <AddProducts />
        </div>
    );
}

export default AddProductPage;