import React from "react";
import "./UserCard.css";
import deleteicon from "../assets/Icons/bin.png";

function UserCard() {
    return (
        <div className="UserCardContainer">
            
            <div className="UserContent">
                <div className="UserName">
                    <span>Name: John Doe</span>
                </div>
                <div className="UserEmail">
                    <span>Email: johndoe@gmail.com</span>
                </div>
                <div className="UserPhone">
                    <span>Phone: 27564990756</span>
                </div>
            </div>
            <div className="UserDelete">
            <img src={deleteicon} />
            </div>

        </div>
    );
}

export default UserCard;