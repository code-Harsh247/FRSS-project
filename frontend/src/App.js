import React from "react";
import Shop from "./pages/Shop";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ShopCategory from "./pages/ShopCategory";
import AdminLoginInPage from "./pages/AdminLoginPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoriesContext";
import { CartProvider } from "./context/CartContext";
import CheckOut from "./pages/CheckOut";
import Cart from "./pages/Cart";
import { useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import Products from "./pages/Products";
import AddProductsPage from "./pages/AddProductsPage";
import AddUsers from "./pages/AddUsers";
import Alerts from "./pages/Alerts";
import OrderHistory from "./pages/OrderHistory";
import Users from "./pages/Users";
import { AdminAuthProvider} from "./context/AdminAuthContext";
import { UserProvider } from "./context/UserContext";
import EditProduct from "./pages/EditProduct";


const App = () => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            localStorage.clear(); // Clear local storage if no token is found
        }
    }, []);

    

    const router = createBrowserRouter([
        {
            path:"/",
            element:<HomePage/>
        },
        {
            path:"/login",
            element: <LoginPage/>
        },
        {
            path:"/shop",
            element:<Shop/>
        },
        {
            path:"admin/products",
            element:<Products/>
        },
        {
            path:"admin/alerts",
            element:<Alerts/>
        },
        {
            path:"admin/addproducts",
            element:<AddProductsPage/>
        },
        {
            path:"admin/addusers",
            element:<AddUsers/>
        },
        {
            path:"/signup",
            element: <SignUpPage/>
        },
        {
            path:"/admin",
            element: <AdminLoginInPage/>
        },
        {
            path:"/admin/dashboard",
            element: <AdminDashboard/>
        },
        {
            path:"/rent/:productID/:quantity/:duration",
            element: <CheckOut/>
        },
        {
            path:"/cart",
            element: <Cart/>
        },
        {
            path:"/admin/users",
            element: <Users/>
        },
        {
            path:"/orders",
            element: <OrderHistory/>
        },
        {
            path:"/product/:productID",
            element: <ProductDetailsPage/>
        },
        {
            path:"/category/:categoryName",
            element: <ShopCategory/>
        },
        {
            path:"/admin/editProduct/:prodID",
            element: <EditProduct/>
        }
    ])


    return (
        <AdminAuthProvider>
        <AuthProvider>
        <CartProvider>
        <CategoryProvider>
        <UserProvider>
        <ProductProvider>
        <div>
            <RouterProvider router={router}/>
        </div>
        </ProductProvider>
        </UserProvider>
        </CategoryProvider>
        </CartProvider>
        </AuthProvider>
        </AdminAuthProvider>
    );


};


export default App;
