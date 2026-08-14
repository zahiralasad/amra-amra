import React, { useState, useEffect } from 'react';
// import DatePicker from "react-datepicker";
import AmraAmraDatePicker from '../Others/AmraAmraDatePicker';
import axios from 'axios';

function PicnicForm({ setNotificationTitle, setNotificationMessage, setModalShow }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

     const handleReceipts = (e) => {
        e.preventDefault();
     }
    return (
        <div>
            {loading && (
                <div className="text-center  text-white my-5">Please wait while loading the from .........</div>
            )}
            {!loading && (
                <>
                    <h5>Receipts</h5>
                    <form onSubmit={handleReceipts}>

                    </form>
                </>
            )}
        </div>
    )

}
export default PicnicForm;