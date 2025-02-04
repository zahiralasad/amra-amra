import React from 'react';
//import logo from '../images/logo.png';
import Banner from '../Banner/Banner';


function Home() {
    return (
        <div className='container'>
            <Banner/>
            <div className='row'>
                <div className="container text-center text-white">
                    Home page
                </div>
            </div>
        </div>
    )
}
export default Home;