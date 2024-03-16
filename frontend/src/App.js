import React from "react";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AdminLoginInPage from "./pages/AdminLoginPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const App = () => {
    const router = createBrowserRouter([
        {
            path:"/login",
            element: <LoginPage/>
        },
        {
            path:"/signup",
            element: <SignUpPage/>
        },
        {
            path:"/admin",
            element: <AdminLoginInPage/>
        }
    ])
    return (
        <div>
            <RouterProvider router={router}/>   
        </div>
    );
};

export default App;
