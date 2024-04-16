import React, { useState, useEffect } from 'react'
import "./OrderReturnCard.css"
import axios from "../../context/axiosConfig"
import { useProducts } from "../../context/ProductContext";


const OrderReturnCard = ({ order }) => {
    const { products } = useProducts();
    const [item, setItem] = useState(null);
    const [processed, setProcessed] = useState(false);

    const AcceptReturn = async () => {
        try {
            // Set processed to true to disable the buttons while the request is being processed
            setProcessed(true);

            // Send a POST request to your backend to accept the return request
            await axios.post('/admin/accept-return-request', {
                orderId: order.OrderID,
                userID: order.UserID,
                productID: order.ProductID,
                Quantity:order.Quantity
            });

            // If the request is successful, you can update the UI or perform any other actions
            // For example, you can display a success message or refresh the list of return requests

            // For now, let's just log a success message
            alert("Return request accepted successfully");
        } catch (error) {
            // If there's an error, log the error message
            console.error("Error accepting return request:", error);
        } finally {
            // Reset the processed state to enable the buttons again
            setProcessed(true);
        }
    };


    const RejectReturn = () => {

    }

    useEffect(() => {
        setItem(products.find(product => product.id === order.ProductID));
    }, [products])
    return (
        <div className='OrderAlertsCardContainer'>
            <div className='OrderAlertsCardImageContainer'>
                <img
                    className="order-alerts-card-image"
                    src={order.image}
                />
            </div>
            <div className="order-alerts-card-info">
                <h3 className="itemname">{item ? item.name : "Loading"}</h3>
                <span><span className='font-Admin-Prod-Card'>ProductID : </span>{order.ProductID}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>Price: </span>{order.Price}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>Quantity: </span>{order.Quantity}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>Duration: </span>{order.Duration} months</span>
                <br />
            </div>
            <div>
                <span><span className='font-Admin-Prod-Card' style={{ color: "red" }}>Order ID : </span>{order.OrderID}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>User-Name : </span>{order.Username}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>User-Email : </span>{order.Email}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>Phone : </span>{order.Phone}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>Address : </span>{`${order.Street}, ${order.Province}, ${order.Country}`}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>ZipCode : </span>{order.ZipCode}</span>
                <br />
            </div>
            <div className='ReturnCardBtns'>
                <button onClick={AcceptReturn} disabled={processed} >Accept</button>
                <button onClick={RejectReturn} disabled={processed}>Reject</button>
            </div>
        </div>
    );

}

export default OrderReturnCard
