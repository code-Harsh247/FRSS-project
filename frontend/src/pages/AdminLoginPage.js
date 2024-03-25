import React from 'react'
import AdminLoginForm from '../components/adminLogicSection/AdminLoginForm'
import './Css/AdminLoginPage.css';
import AdminLoginPageImg from '../components/assets/images/adminPage_Img.jpg';
import Logo from "../components/assets/Logo/Logo.png"

 const AdminLoginPage = () => {
  return (
    <div className='Container'>
        <div className='ImgContainer'>
          <img src= {AdminLoginPageImg} alt='Admin Login Page'/>
        </div>
        <AdminLoginForm/>
        <img src={Logo} className="AdminLoginPage-Logo" alt="Company Logo" />
    </div>
  )
}
export default AdminLoginPage;

