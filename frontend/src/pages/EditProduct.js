import React from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import EditProductForm from "../components/EditProductForm/EditProductForm";
import "./Css/AddProductsPage.css";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLoginPage from "./AdminLoginPage";
import { useParams } from "react-router-dom";

function AddProductPage() {

    const { isAdminLoggedIn } = useAdminAuth();
    const {prodID} = useParams();

    if (isAdminLoggedIn) {
        return (
            <div className="AddProductPageContainer">
                <AdminNavbar />
                <AdminBanner name="Edit Product" />
                <EditProductForm productId={prodID} />
            </div>

        );
    }
    else return <AdminLoginPage />
}


export default AddProductPage;