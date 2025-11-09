import React from 'react';
import QRcodeGenerator from "./QRcodeGenerator"

function CheckGuest() {
    return (
        <div className='row'>
            <div className="mt-4 text-center text-white">
                <div className='row'>
                    <h4>Welcome to</h4> 
                    <h4>Career Pathways: Networking for Bangladeshis in Sweden</h4>
                </div>
                <div className='row'>
                    <div className='pt-5'>
                        <QRcodeGenerator
                            title="Scan to Check In"
                            value="https://amra-amra.se/checkin"
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='pt-5'>
                        <QRcodeGenerator
                            title="Scan to Sign Up"
                            value="https://amra-amra.se/registertonetwork"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CheckGuest;