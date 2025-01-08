import React from "react";
import './banner.css';
import logo from './logo_122x100.jpg';

function Banner() {
    console.log(window.innerWidth);
    return (
        <div className="container">
            <div className="row Banner" id="bigscreen">

                <div className="col-1 Banner-left-column">
                    <img className="Banner-top-row" style={{background: "black"}} src={logo} />
                    <div className="Banner-bottom-row">
                        <h5>আমরা-আমরা</h5>
                        <h7> সুইডেনে বসবাসরত বাংলাদেশীদের নিয়ে গঠিত একটি অলাভজনক সংগঠন যার লক্ষ্য দেশীয় সংস্কৃতি চর্চা করা</h7>
                    </div>
                </div>

                <div className="col Banner-right-column">
                    {/* <div className="banner-item"></div> */}

                </div>
                <div style={{left: "230px"}}>
                    <div className="Banner-item" style={{ left: "27%", top: "180px" }}></div>
                    <div className="Banner-item" style={{ left: "45%", top: "150px" }}></div>
                    <div className="Banner-item" style={{ left: "63%", top: "120px" }}></div>
                    <div className="Banner-item" style={{ left: "81%", top: "90px" }}></div>
                    </div>
            </div>
            <div className="row Ad-field">
                <h5>New event coming soon</h5>
            </div>
        </div>

    )
}
export default Banner;