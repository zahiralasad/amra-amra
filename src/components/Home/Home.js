import React from 'react';
//import logo from '../images/logo.png';
import Banner from '../Banner/Banner';


function Home() {
    return (
        <div className='row'>
            <Banner/>
            <div className='row'>
                <div className="text-center text-white">
                    Home page
                </div>
            </div>
        </div>
    )
}
export default Home;