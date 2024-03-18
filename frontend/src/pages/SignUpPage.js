import React from 'react'
import SignupForm from '../components/signupSection/SignupForm'
import "./Css/LoginPage.css"
import signupPage_Img from "../components/assets/images/img1.jpg"
import Logo from "../components/assets/Logo/Logo.png"

const LoginPage = () => {
  return (
    <div className='Container'>
        <div className='ImgContainer'>
          <img src= {signupPage_Img} alt='Signup Page'/>
        </div>
        <SignupForm/>
        <img src={Logo} className="LoginPage-Logo" alt="Company Logo" />
    </div>
  )
}
export default LoginPage;
