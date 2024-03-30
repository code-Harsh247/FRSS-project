import React from 'react';
import './ShopCategoryBanner.css';

const ShopCategoryBanner = ({ title, Img, desc }) => {

  
  return (
    <div id='Banner-Container'>
      <div id="Img-Container">
        <img src={Img} alt={title} />
      </div>
      <div id='Banner-Wrapper'>
        
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        
        <span>Chairs</span>
      </div>
    </div>
  );
};

export default ShopCategoryBanner;
