import React from "react";
import './banner.css';
import logo from './logo_122x100.jpg';

function Banner() {
    return (
        <>
            <div class="Banner">
                <div class="Banner-left-column">
                    <img class="Banner-top-row" src={logo} />
                    <div class="Banner-bottom-row">
                        <h5>আমরা-আমরা</h5>
                        <h7> সুইডেনে বসবাসরত বাংলাদেশী একটি অলাভজনক সামাজিক সংগঠন</h7>
                    </div>
                </div>
                <div class="Banner-right-column"></div>
            </div>
            <div className="Ad-field"></div>
        </>
    )
}
export default Banner;