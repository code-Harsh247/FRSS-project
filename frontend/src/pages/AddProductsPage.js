import React from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import AddProducts from "../components/AddProducts/AddProducts";
import "./Css/AddProductsPage.css";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLoginPage from "./AdminLoginPage";

function AddProductPage() {

    const { isAdminLoggedIn } = useAdminAuth();

    if (isAdminLoggedIn) {
        return (
            <div className="AddProductPageContainer">
                <AdminNavbar />
                <AdminBanner name="Add Products" />
                <AddProducts />
            </div>

        );
    }
    else return <AdminLoginPage />
}


export default AddProductPage;