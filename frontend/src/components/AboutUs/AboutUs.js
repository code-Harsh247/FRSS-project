import React from "react";
import "./AboutUs.css";
import AboutUsImage from "../assets/images/AboutUsChair.jpg";


const AboutUs = () => {
    
    return (
        <div className="aboutUsContainer">
            <div className="aboutUsImage">
           <img src={AboutUsImage} alt="About Us Image" />
           </div>
           <div className="aboutUsText">
            <div className="aboutUsTitle">
                <p>About Us</p>
                </div>
                <div className="aboutUsContent">
                    <p>
Nullam a posuere diam, non rhoncus ex. Fusce eu elementum massa. Morbi id mattis odio. Morbi commodo commodo ligula, vitae lacinia odio posuere ac. Aliquam diam leo, dignissim ac elementum sit amet, consequat at tellus. Duis dictum convallis nisl, ut lacinia tellus pretium vitae. Donec enim ex, bibendum quis bibendum in, pharetra a metus. Curabitur tortor mi, maximus a magna quis, laoreet imperdiet tellus. Etiam eu metus ac mi pellentesque vehicula. Vivamus et enim rhoncus, laoreet turpis ac, facilisis odio.
                    </p>
                    </div>

           </div>
            </div>
            
      );
        
};

export default AboutUs;
