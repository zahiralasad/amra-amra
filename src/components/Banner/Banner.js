import React from "react";
import './banner.css';
import logo from './logo_122x100.jpg';

function Banner() {
    // console.log(window.innerWidth);
    return (
        <div className="row Banner" id="bigscreen">
            <div className="col-1 Banner-left-column">
                <div className="Banner-top-row" style={{background: "black"}} src={logo}></div>
                <div className="Banner-bottom-row">
                <h5>আমরা-আমরা</h5>
                        <h7> সুইডেনে বসবাসরত বাংলাদেশীদের নিয়ে গঠিত একটি অলাভজনক সংগঠন যার লক্ষ্য দেশীয় সংস্কৃতি চর্চা করা</h7>
                </div>
            </div>
            <div className="col Banner-right-column">right</div>
        </div>

    )
}
export default Banner;