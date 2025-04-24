import React from "react";
import './banner.css';
import logo from './logo_122x100.jpg';
import SlideShow from "../Home/Slideshow";

function Banner() {
    return (
        <div className="row Banner" >

            <div className="row" style={{ marginLeft: "10px" }}>
                <div className="row smallscreen" >
                    <div className="col">
                        <img className="Banner-top-row" src={logo} />
                    </div>
                    <div className="col-9 pt-2">
                        <div className="text-center" style={{ fontWeight: "bold", fontSize: "clamp(13px, 2vw, 15px)" }}>আমরা-আমরা</div>
                        <div className="text-center" style={{ fontSize: "clamp(10px, 2vw, 13px)" }}>সুইডেনে বসবাসরত বাংলাদেশীদের নিয়ে গঠিত একটি অলাভজনক সংগঠন যার লক্ষ্য দেশীয় সংস্কৃতি চর্চা করা।</div>
                    </div>
                </div>
                <div className="row smallscreen">
                    <SlideShow />
                </div>

                <div className="col bigscreen Banner-left-column">
                    <img className="Banner-top-row" src={logo} />
                    <div className="Banner-bottom-row">
                        <div style={{ fontWeight: "bold", fontSize: "clamp(13px, 2vw, 15px)" }}>আমরা-আমরা</div>
                        <div style={{ fontSize: "clamp(10px, 2vw, 13px)" }}>সুইডেনে বসবাসরত বাংলাদেশীদের নিয়ে গঠিত একটি অলাভজনক সংগঠন যার লক্ষ্য দেশীয় সংস্কৃতি চর্চা করা।</div>
                    </div>
                </div>
                <div className="col-9 me-3 bigscreen d-flex align-items-center justify-content-center">
                    <SlideShow />
                </div>
            </div>

            <div className="row">
                <div className="Ad-field">
                    <h5>"Amra-Amra Picnic 2025" On 26th June</h5>
                </div>
            </div>
        </div>

    )
}

export default Banner;