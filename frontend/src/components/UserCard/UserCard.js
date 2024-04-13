import React from "react";
import "./UserCard.css";
import deleteicon from "../assets/Icons/bin.png";

function UserCard({name,email,phone}) {
    
    const handleDeleteUser=()=>{
        console.log("User Deleted");
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
            <img src={deleteicon} onClick={handleDeleteUser}/>
            </div>

        </div>
    );
}

export default UserCard;