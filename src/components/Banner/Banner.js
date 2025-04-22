import React from "react";
import './banner.css';
import logo from './logo_122x100.jpg';

function Banner() {
    return (
        <div className="row Banner" style={{ marginLeft: "0px", padding: "0px" }}>
            <div className="col">
                <img className="Banner-top-row" src={logo} />
                <div className="Banner-bottom-row">
                    <div style={{fontWeight: "bold", fontSize: "clamp(13px, 2vw, 15px)"}}>আমরা-আমরা</div>
                    <div style={{fontSize: "clamp(10px, 2vw, 13px)"}}>সুইডেনে বসবাসরত বাংলাদেশীদের নিয়ে গঠিত একটি অলাভজনক সংগঠন যার লক্ষ্য দেশীয় সংস্কৃতি চর্চা করা</div>
                </div>
            </div>
            <div className="col-9 ">
                {/* <div className="banner-item"></div> */}
                SlidePhotos
            </div>
            <div className="Ad-field">
                <h5>"Amra-Amra Picnic 2025" On 26th June</h5>
            </div>
        </div>

    )
}

export default Banner;