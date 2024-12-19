import React from "react";
import './banner.css';
import logo from './logo_122x100.jpg';

function Banner() {
    return (
        <>
            <div className="Banner" id="bigscreen">
                <div className="Banner-left-column">
                    <img className="Banner-top-row" src={logo} />
                    <div className="Banner-bottom-row">
                        <h5>আমরা-আমরা</h5>
                        <h7> সুইডেনে বসবাসরত বাংলাদেশীদের নিয়ে গঠিত একটি অলাভজনক সংগঠন যার লক্ষ্য দেশীয় সংস্কৃতি চর্চা করা</h7>
                    </div>
                </div>
                <div className="Banner-right-column">
                    {/* <div className="banner-item"></div> */}
                </div>
                <div className="Banner-item" style={{left:"27%", top:"24%"}}></div>
                <div className="Banner-item" style={{left:"45%", top:"21%"}}></div>
                <div className="Banner-item" style={{left:"63%", top:"18%"}}></div>
                <div className="Banner-item" style={{left:"81%", top:"15%"}}></div>
            </div>
            
            <div className="Ad-field">
                <h5>New event coming soon</h5>
            </div>
            
        </>
    )
}
export default Banner;