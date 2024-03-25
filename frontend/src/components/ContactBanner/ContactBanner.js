import React from 'react'
import engineerIcon from '../assets/Icons/software-engineer.png'
import "./ContactBanner.css"

const ContactBanner = () => {
    return (
        <div className='ContactBanner-Container' id='ContactBanner'>
            <div className='ContactBanner-Header'>
                <p>Contact Details</p>
            </div>
            <div className='ContactBanner-Contact-Wrapper'>
                <div className='Contact'>
                    <div className='EngineerIcon-Container'>
                        <img src={engineerIcon} alt='Contact Icon' />
                    </div>
                    <div className='Contact-details'>
                        <p className='Contact-Name'>Harsh Chattar</p>
                        <p className='Contact-Roll'>22CS30028</p>
                        <p className='Contact-Email'>harsh@kgpian.iitkgp.ac.in</p>
                    </div>

                </div>
                <div className='Contact'>
                    <div className='EngineerIcon-Container'>
                        <img src={engineerIcon} alt='Contact Icon' />
                    </div>
                    <div className='Contact-details'>
                        <p className='Contact-Name'>Abhinav Kumar Singh</p>
                        <p className='Contact-Roll'>22CS30005</p>
                        <p className='Contact-Email'>abhinav@kgpian.iitkgp.ac.in</p>
                    </div>

                </div>
                <div className='Contact'>
                    <div className='EngineerIcon-Container'>
                        <img src={engineerIcon} alt='Contact Icon' />
                    </div>
                    <div className='Contact-details'>
                        <p className='Contact-Name'>Hemant</p>
                        <p className='Contact-Roll'>22CS30029</p>
                        <p className='Contact-Email'>hemant@kgpian.iitkgp.ac.in</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ContactBanner