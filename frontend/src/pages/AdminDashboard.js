import React from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import UserCard from "../components/UserCard/UserCard";
import AdminBanner from "../components/AdminBanner/AdminBanner";

function Admin() {
    return (  
        <div className="AdminContainer">
            <AdminNavbar/>
            <AdminBanner name="Admin Dashboard"/>
            <UserCard/>
        </div>
    );
}

export default Admin;