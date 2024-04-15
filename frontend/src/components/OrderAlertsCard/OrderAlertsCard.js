import React, { useState, useEffect } from "react";
import './OrderAlertsCard.css'; // Import the CSS file for styling
import { useProducts } from "../../context/ProductContext";

function OrderAlertsCard({ order }) {
    const { products } = useProducts();
    const [item, setItem] = useState(null);

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
                <span><span className='font-Admin-Prod-Card' style={{color:"red"}}>Order ID : </span>{order.OrderID}</span>
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
        </div>
    );
}

export default OrderAlertsCard;
