import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import banner from "../../images/form-banner.jpg";

import axios from 'axios';

// import "./picnic.css";
// import Notification from '../Notification';


function RegisterMember() {
    const [adults, setAdults] = useState(1);
    const [bigkids, setBigKids] = useState(0);
    const [smallkids, setSmallKids] = useState(0);
    const [babys, setBabys] = useState(0);
    const [response, setResponse] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const [modalShow, setModalShow] = useState(false);
    const [clearForm, setClearForm] = useState(false);
    const url = 'https://script.google.com/macros/s/AKfycbw0Y6DBSROylbb32gx8fLXDTwVUNnJt7sujHMqNWv1ufd4Sak0upYp73Qk2ctaXGkwn/exec';
    const apiUrl = "https://amra-amra.se/emailApi/";

    useEffect(() => {

    })

    function Submit(e) {
        document.getElementById("register").disabled = true;
        const formElm = document.querySelector('form');
        e.preventDefault();
        const formData = new FormData(formElm);

        axios.post(url, formData)
            .then(response => {
                if (response.data === "successful") {
                    sendEmail(formData);
                } else {
                    setTitle("Warning");
                    setMessage(response.data);
                    setModalShow(true);
                    document.getElementById("register").disabled = false;
                }
            }).catch(error => setResponse(error));
    }

    const sendEmail = (fData) => {
        fData.append('request', 'sendemail');
        axios.post(apiUrl, fData)
            .then(response => {
                console.log(response.data);
                setClearForm(true);
                setTitle("Registration Completed");
                setMessage(response.data);
                setModalShow(true);
            })
            .catch(error => {
                console.log(error);
                setTitle("Failed to Register");
                setMessage(error);
                setModalShow(true);
            })
        //alert(error));
        if (clearForm === true) {
            document.getElementById("picnicForm").reset();
        }
    }


    return (
        <div className="picnic">
            <div className="p-4 text-center rounded bg-dark">
                <h4>Member Registration Form</h4>
                {/* <img src={banner} className="img-fluid" /> */}
            </div>
            <div className="mt-1 p-2 rounded bg-dark">
                <form className="needs-validation" id="picnicForm" onSubmit={(e) => Submit(e)}>
                    <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                        <div id="adultContainer">
                            <div className="input-group  mb-3">
                                <i className="bi bi-person-fill me-2"></i>
                                <span className="input-group-text">Name: </span>
                                <input Name="Adult1" className="form-control" placeholder="Full name" type="text" required />
                            </div>
                        </div>
                    </div>
                    <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                        <div className="form-group input-group  mb-3">
                            <i className="bi bi-envelope-fill me-2"></i>
                            <span className="input-group-text" style={{ width: "80px" }}>Email</span>
                            <input Name="Email" className="form-control" placeholder="Email address" type="email" required />
                        </div>
                    </div>
                    <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                        <div className="form-group input-group  mb-3">
                            <i className="bi bi-telephone-fill me-2"></i>
                            <span className="input-group-text" style={{ width: "80px" }}>Phone</span>
                            <input Name="Phone" className="form-control" placeholder="Phone number" type="text" required />
                        </div>
                    </div>
                    <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                        <div className="form-group input-group  mb-3">
                            <i className="bi bi-house-door-fill me-2"></i>
                            <span className="input-group-text" style={{ width: "80px" }}>Address</span>
                            <input Name="Address" className="form-control" placeholder="Address" type="text" required />
                        </div>
                    </div>
                    <div className="mt-2 rounded border p-2">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" Name="Swish" id="swish" required />
                            <label className="form-check-label" htmlFor="swish">
                                I have submitted all currectly
                            </label>
                            <span id="swishTo" className="swishto ms-2 h9"></span>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" id="register" className="btn btn-primary btn-block"> Register</button>
                    </div>
                </form>
            </div>
            {/* <Notification
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={title}
                message={message}
            /> */}
        </div>
    );
}

export default RegisterMember;