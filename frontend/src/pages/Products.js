import React from 'react';  
import AdminNavbar from '../components/AdminNavbar/AdminNavbar';
import AdminBanner from '../components/AdminBanner/AdminBanner';
import AddProducts from '../components/AddProducts/AddProducts';



function Products() {
    return ( 
        <div className='ProductsContainer'>
            <AdminNavbar/>
            <AdminBanner name="Products"/>
            <div className='ProductsList'>
                
            </div>
            
        </div>
     );
}

export default Products;