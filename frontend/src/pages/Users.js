import React, { useState, useEffect  } from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import UserCard from "../components/UserCard/UserCard";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import "./Css/Users.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

function Users() {
    const navigate = useNavigate();

    const handleAddUsers = () => {
        navigate('/admin/addusers');
    }
    const { user } = useUser();

    const [temp, setTemp] = useState([]);

    // Use useEffect to update temp when user data is available
    useEffect(() => {
        if (user) {
            setTemp(user);
        }
    }, [user]);

    return (
        <div className="UsersContainer">
            <AdminNavbar />
            <AdminBanner name="Users" />
            <div className="AddNewUsers">
                <button onClick={handleAddUsers} >Add New User</button>
            </div>
            <div className="UsersListTitle">
                <span>Users</span>
            </div>
            <div className="UsersList">
                {
                    temp && temp.map((user) => {
                        return <UserCard key={user._id} name={user.name} email={user.email} phone={user.phone} id={user._id} setTemp={setTemp} />
                    })
                }

            </div>
        </div>
    );
}

export default Users;