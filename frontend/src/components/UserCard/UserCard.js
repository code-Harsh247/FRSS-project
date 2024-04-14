import React, { useState } from "react";
import "./UserCard.css";
import deleteicon from "../assets/Icons/bin.png";
import axios from "../../context/axiosConfig"; 


function UserCard({ name, email, phone, id, setTemp}) {
    const [deleted, setDeleted] = useState(false); 

    const handleDeleteUser = async () => {
        setTemp(prevTemp => prevTemp.filter(user => user._id !== id));
        try {
            // Make a DELETE request to your server's delete endpoint
            const response = await axios.delete(`users/delete/${id}`);

            // Check if the deletion was successful
            if (response.data.success) {
                console.log("User Deleted");
                // Update the state to indicate that the user is deleted
                setDeleted(true);
            } else {
                console.error("Failed to delete user:", response.data.errors);
                // Handle the case where deletion fails
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle any errors that occur during the deletion process
        }
    };

    // If the user is deleted, don't render the UserCard component
    if (deleted) {
        return null;
    }
    

    return (
        <div className="UserCardContainer">
            <div className="UserContent">
                <div className="UserName">
                    <span>Name: {name}</span>
                </div>
                <div className="UserEmail">
                    <span>Email: {email}</span>
                </div>
                <div className="UserPhone">
                    <span>Phone: {phone}</span>
                </div>
            </div>
            <div className="UserDelete">
                <img src={deleteicon} alt="Delete" onClick={handleDeleteUser} />
            </div>
        </div>
    );
}

export default UserCard;
