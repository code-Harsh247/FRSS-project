import React, { useEffect, useState } from "react";
import axios from "../context/axiosConfig";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import AdminBanner from "../components/AdminBanner/AdminBanner";
import AdminLoginPage from "./AdminLoginPage";
import { useAdminAuth } from "../context/AdminAuthContext";
import "./Css/AdminDashboard.css";

function Admin() {
    const { isAdminLoggedIn } = useAdminAuth();
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [
                    totalInvestmentResponse,
                    totalCategoriesResponse,
                    totalProductsResponse,
                    totalInventoryResponse,
                    revenueResponse,
                    totalCustomersResponse,
                    totalRentedResponse,
                    totalLoanResponse,
                    totalProductsRentedResponse,
                    totalProfitResponse
                ] = await Promise.all([
                    axios.get("/admin/total-investments"),
                    axios.get("/admin/total-categories"),
                    axios.get("/admin/total-products"),
                    axios.get("/admin/total-inventory"),
                    axios.get("/admin/revenue"),
                    axios.get("/admin/total-customers"),
                    axios.get("/admin/total-rented"),
                    axios.get("/admin/total-loan"),
                    axios.get("/admin/total-products-rented"),
                    axios.get("/admin/total-profit")
                ]);

                setDashboardData({
                    totalinvestment: totalInvestmentResponse.data.totalInvestments,
                    totalcategories: totalCategoriesResponse.data.totalCategories,
                    totalproducts: totalProductsResponse.data.totalProducts,
                    totalinventory: totalInventoryResponse.data.totalInventory,
                    revenue: revenueResponse.data.revenue,
                    customer: totalCustomersResponse.data.totalCustomers,
                    rented: totalRentedResponse.data.totalRented,
                    currrentlyented: totalProductsRentedResponse.data.totalProductsRented,
                    totalloan: totalLoanResponse.data.totalLoan,
                    profit: totalProfitResponse.data.totalProfit
                    
                    
                });
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        if (isAdminLoggedIn) {
            fetchDashboardData();
            
        }
    }, [isAdminLoggedIn]);

    if (isAdminLoggedIn) {
        return (
            
            <div className="AdminContainer">
                <AdminNavbar />
                <AdminBanner name="Admin Dashboard" />
                <div className="AdminDashboardContent">
                    {dashboardData && (
                        <>
                            <div className="TotalInvestment">
                                <div className="InvestmentStat">
                                    <div className="TotalInvestmentTitle">
                                        <span id="itext">Total Investment</span>
                                    </div>
                                    <div className="TotalInvestmentAmount">
                                        <span id="inumber">₹{dashboardData.totalinvestment}</span>
                                    </div>
                                </div>
                                <div className="ProductInvestment">
                                    <div className="Categories">
                                        <span id="itext">Total Categories :</span>
                                        <span id="inumber">{dashboardData.totalcategories}</span>
                                        
                                    </div>
                                    <div className="Products">
                                        <span id="itext">Total Products :</span>
                                        <span id="inumber">{dashboardData.totalproducts}</span>
                                    </div>
                                    <div className="Inventory">
                                        <span id="itext">Total Inventory :</span>
                                        <span id="inumber">{dashboardData.totalinventory}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="TotalInvestment">
                                <div className="InvestmentStat">
                                    <div className="TotalInvestmentTitle">
                                        <span id="itext">Revenue</span>
                                    </div>
                                    <div className="TotalInvestmentAmount">
                                        <span id="inumber">₹{dashboardData.revenue}</span>
                                    </div>
                                </div>
                                <div className="ProductInvestment">
                                    <div className="Categories">
                                        <span id="itext">Customers :</span>
                                        <span id="inumber">{dashboardData.customer}</span>
                                    </div>
                                    <div className="Products">
                                        <span id="itext">Rented :</span>
                                        <span id="inumber">{dashboardData.rented}</span>
                                    </div>
                                    <div className="Inventory">
                                        <span id="itext">Currently Rented :</span>
                                        <span id="inumber">{dashboardData.currrentlyented}</span>
                                    </div>
                                    <div className="Inventory">
                                        <span id="itext">Total Loan :</span>
                                        <span id="inumber">{dashboardData.totalloan}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="TotalInvestment">
                                <div className="InvestmentStat">
                                    <div className="TotalInvestmentTitle">
                                        <span id="itext">Profit</span>
                                    </div>
                                    <div className="TotalInvestmentAmount">
                                        <span className={dashboardData.revenue -dashboardData.totalinvestment < 0 ? "loss" : "profit"}>
                                            {dashboardData.revenue -dashboardData.totalinvestment < 0 ? `-₹${Math.abs(dashboardData.revenue -dashboardData.totalinvestment)}` : `₹${dashboardData.revenue -dashboardData.totalinvestment}`}
                                        </span>



                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        );
    } else {
        return <AdminLoginPage />;
    }
}

export default Admin;
