import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import banner from "../../images/form-banner.jpg";

import axios from 'axios';

// import "./picnic.css";
import Notification from './Notification';


function RegisterMember() {
    const [response, setResponse] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [clearForm, setClearForm] = useState(false);

    const url = "https://script.google.com/macros/s/AKfycbyNJ8bOqFrEaQ4CPUjbDmsqokym-Hj3QxYB54JwaAmaS1lGxb2BVm2-vfoZw3J59haawA/exec";
    const apiUrl = "https://amra-amra.se/emailApi/";

    function CheckExpired() {

    }

    const sendEmail = (fData) => {
        fData.append('request', 'picnicRegistrationEmail');
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

    function Submit(e) {
        const formFile = document.querySelector("form")
        e.preventDefault()
        console.log("Submitted")
        const formData = new FormData(formFile)
        

        // fetch("https://script.google.com/macros/s/AKfycbwD_ff2bXXvsCNRy5IoEnhkX2IpHUcO3tk04Yzu-hcuwvzEef7n5nZYMVZ-qBotI1xNIg/exec", {
        //     method: "POST",
        //     body: formData,
        // })

        axios.post(url, formData)
            .then(response => {
                if (response.data === "successful") {
                    sendEmail(formData);
                    console.log("successful");
                } else {
                    setTitle("Warning");
                    setMessage(response.data);
                    setModalShow(true);
                    document.getElementById("register").disabled = false;
                }
            }).catch(error => setResponse(error));
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
                        <div className="input-group  mb-3">
                            <i className="bi bi-person-fill me-2"></i>
                            <span className="input-group-text">Name: </span>
                            <input Name="Name" className="form-control" placeholder="Full name" type="text" required />
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
                            <input Name="Phone" className="form-control" placeholder="Phone number" type="tel" required />
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
                        <div>Membership fee: 100kr</div>
                        <div className="pb-3">Pay to Bankgiro: 577-0623</div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" Name="Swish" id="swish" required />
                            <label className="form-check-label" htmlFor="swish">
                                I have paid the membership fee. 
                            </label>
                            <span id="swishTo" className="swishto ms-2 h9"></span>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <button type="submit" id="register" className="btn btn-primary btn-block">Register</button>
                    </div>
                </form>
            </div>
            <Notification
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={title}
                message={message}
            />
        </div>
    );
}

export default RegisterMember;