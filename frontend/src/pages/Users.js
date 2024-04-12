import React from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import UserCard from "../components/UserCard/UserCard";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import "./Css/Users.css";
import { NavLink, useNavigate } from "react-router-dom";

function Users() {
    const navigate = useNavigate();

    const handleAddUsers=()=>{
        navigate('admin/addusers');
    }

    return (  
        <div className="UsersContainer">
            <AdminNavbar/>
            <AdminBanner name="Users"/>
            <div className="AddNewUsers">
                <button onClick={handleAddUsers} >Add New User</button>
            </div>
            <div className="UsersListTitle">
                <span>Users</span>
            </div>
           <div className="UsersList">
            
            <UserCard/>
           </div>
        </div>
    );
}

export default Users;