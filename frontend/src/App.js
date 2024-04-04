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
import CheckOut from "./pages/CheckOut";

const App = () => {
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
            path:"/signup",
            element: <SignUpPage/>
        },
        {
            path:"/admin",
            element: <AdminLoginInPage/>
        },
        {
            path:"/checkout",
            element: <CheckOut/>
        },
        {
            path:"/product/:productID",
            element: <ProductDetailsPage/>
        },
        {
            path:"/category/:categoryName",
            element: <ShopCategory/>
        }
    ])
    return (
        <AuthProvider>
        <CategoryProvider>
        <ProductProvider>
        <div>
            <RouterProvider router={router}/>   
        </div>
        </ProductProvider>
        </CategoryProvider>
        </AuthProvider>
    );
};

export default App;
