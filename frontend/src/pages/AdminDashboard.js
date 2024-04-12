import React from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import UserCard from "../components/UserCard/UserCard";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import AdminLoginPage from "./AdminLoginPage";
import { useAdminAuth } from "../context/AdminAuthContext";


function Admin() {
    const { isAdminLoggedIn } = useAdminAuth();
    if(isAdminLoggedIn){
        return (  
            <div className="AdminContainer">
                <AdminNavbar/>
                <AdminBanner name="Admin Dashboard"/>
                <UserCard/>
            </div>
        );
    }
    else return <AdminLoginPage/>

    
}

export default Admin;