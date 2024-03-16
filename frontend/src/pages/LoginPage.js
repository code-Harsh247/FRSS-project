import React from 'react'
import LoginForm from '../components/loginSection/LoginForm'
import "./Css/LoginPage.css"
import LoginPageImg from "../components/assets/images/LoginPageImg.jpg"
import Logo from "../components/assets/Logo/Logo.png"

const LoginPage = () => {
  return (
    <div className='Container'>
        <div className='ImgContainer'>
          <img src= {LoginPageImg} alt='Login Page'/>
        </div>
        <LoginForm/>
        <img src={Logo} className="LoginPage-Logo" alt="Company Logo" />
    </div>
  )
}
export default LoginPage;
