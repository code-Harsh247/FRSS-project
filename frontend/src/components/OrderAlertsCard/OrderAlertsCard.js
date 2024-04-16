import React, { useState, useEffect } from "react";
import axios from "../../context/axiosConfig"
import './OrderAlertsCard.css';
import { useProducts } from "../../context/ProductContext";

function OrderAlertsCard({ order }) {
    const { products } = useProducts();
    const [item, setItem] = useState(null);
    const [ship, setShip] = useState(false);
    const [isClosed, setClose] = useState(false);

    useEffect(() => {
        setItem(products.find(product => product.id === order.ProductID));
        setShip(order.ShipStatus);
    }, [products])

    const handleShip = async () => {
        try {
            await axios.post(`/admin/ship-order/${order.OrderID}`);
            setShip(true);
            alert("Order Shipping initiated.")
        } catch (error) {
            console.error('Error shipping order:', error);
            // Handle error, maybe show a message to the user
        }
    }

    const onClose = () => {
        setClose(true);
    };
    if (!isClosed) {
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
                <div className="ShipOrderBtn">
                    <button
                        onClick={handleShip}
                        disabled={order.ShipStatus}
                        style={{
                            backgroundColor: ship ? 'grey' : 'black',
                            color: ship ? 'white' : 'white',
                        }}
                    >
                        {ship ? "Shipped" : "Ship Order"}
                    </button>

                </div>
            </div>
        );
    }
    else return <></>

}

export default OrderAlertsCard;
