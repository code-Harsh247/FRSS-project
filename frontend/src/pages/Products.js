import React, {useState, useEffect} from 'react';
import AdminNavbar from '../components/AdminNavbar/AdminNavbar';
import AdminBanner from '../components/AdminBanner/AdminBanner';
import axios from '../context/axiosConfig';
import "./Css/Products.css";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import AdminLoginPage from "./AdminLoginPage";
import { useProducts } from '../context/ProductContext';
import AdminProductCard from '../components/AdminProductCard/AdminProductCard';



function Products() {
    const navigate = useNavigate();
    const { products } = useProducts();
    const [ProdArray, setProdArray] = useState(null);

    useEffect(()=>{
        setProdArray(products);
    },[products]);

    const handleDeleteProduct = async (id)=>{
        try {
            const url = `products/removeproduct/`;
            const response = await axios.post(url,{id});
            setProdArray(prevProdArray => prevProdArray.filter(product => product.id !== id));
            console.log("Product deleted:",response.data.success);
        } catch (error) {
            console.error("Error deleting product from cart:", error.response ? error.response.data : error);
        }
    }

    // console.log(products);
    // console.log(ProdArray);

    const handleAddProducts = () => {
        navigate('/admin/addproducts');
    }
    const { isAdminLoggedIn } = useAdminAuth();
    if (isAdminLoggedIn) {
        return (
            <div className='ProductsContainer'>
                <AdminNavbar />
                <AdminBanner name="Products" />
                <div className="AddNewProducts">
                    <button onClick={handleAddProducts} >Add New Product</button>
                </div>
                <div className="ProductsListTitle">
                    <span>Products</span>
                </div>
                {/* <AdminProductCard id="4" name="Harsh" price="10000" /> */}
                <div>
                    {
                        ProdArray && ProdArray.map((prod) => (
                            <AdminProductCard
                                key={prod._id}
                                id={prod._id}
                                name={prod.name}
                                price={prod.price}
                                img={prod.image[0]}
                                cost={prod.cost}
                                stock={prod.stock}
                                deleteProduct={()=>handleDeleteProduct(prod.id)}
                            />
                        ))
                    }


                </div>

            </div>
        );
    }
    else return <AdminLoginPage />
}

export default Products;