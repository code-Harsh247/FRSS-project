import React from 'react'
import "./AdminProductCard.css"
import { useNavigate } from 'react-router-dom';

const AdminProductCard = ({ img, name, id, price, cost, stock,deleteProduct }) => {

    const navigate = useNavigate();
    const handleProdEdit = () => {
        navigate(`/admin/editProduct/${id}`)
    }

    return (
        <div className='AdminProdCardContainer'>
            <div className='ProdImageContainer'>
                <img
                    className="item-image"
                    src={img}
                    alt={name}
                />
            </div>
            <div className="iteminfo">
                <h3 className="itemname">{name}</h3>
                <span className='item-id'><span className='font-Admin-Prod-Card'>id : </span>{id}</span>
                <br />
                <span className="itemprice">
                    <span className='font-Admin-Prod-Card'>rent :</span> ₹{(price).toLocaleString()}/month
                </span>
                <br />
                <span><span className='font-Admin-Prod-Card'>cost:</span> ₹{(cost).toLocaleString()}</span>
                <br />
                <span><span className='font-Admin-Prod-Card'>Stock Available :</span> {stock}</span>
                <div className="control-btns">
                    <button className='EditProductBtn' style={{ color: 'white' }} onClick={handleProdEdit} >Edit Product Details</button>
                    <button className='DeleteProductBtn' onClick={deleteProduct} >Delete Product</button>

                </div>
            </div>
        </div>
    )
}

export default AdminProductCard