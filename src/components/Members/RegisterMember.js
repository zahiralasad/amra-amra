import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
// import banner from "../../images/form-banner.jpg";

import axios from 'axios';

// import "./picnic.css";
import Notification from '../Others/Notification';
import AmraAmraDatePicker from '../Others/AmraAmraDatePicker';


function RegisterMember() {
    const [response, setResponse] = useState("");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [clearForm, setClearForm] = useState(false);
    const [isJunior, setIsJunior] = useState(false);

    const url = "https://script.google.com/macros/s/AKfycbzQou_14Gnvwjmktjq3uF_78bbtPUji9Ocz7TMA-bNz0gp9OSQctPTZdLI6ZvVdVonouw/exec";
    const apiUrl = "https://amra-amra.se/emailApi/";


    // Get current date
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().split('T')[0]; // "2026-02-07"

    // Define the special offer date
    const specialOfferDate = '2026-03-10';

    // Check if today is the special offer date
    const isSpecialOfferDay = currentDateString === specialOfferDate;

    function CheckExpired() {

    }
    const calculateAge = (birthDate) => {
        if (!birthDate) return null;

        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        console.log(age);
        return age;
    }

    const handleDateChange = (date) => {
        if (date) {
            const age = calculateAge(date);
            setIsJunior(age < 20);
        } else {
            setIsJunior(false);
        }
    }

    const sendEmail = (fData) => {
        fData.append('request', 'memberRegistrationEmail');
        axios.post(apiUrl, fData)
            .then(response => {
                console.log(response.data);
                setClearForm(true);
                document.getElementById("register").disabled = false;
                setTitle("Registration Completed");
                setMessage(response.data);
                setModalShow(true);
                setClearForm(true);
                document.getElementById("register").disabled = false;
            })
            .catch(error => {
                console.log(error);
                setTitle("Failed to Register");
                setMessage(error);
                setModalShow(true);
            })
        //alert(error));
        if (clearForm === true) {
            document.getElementById("memberForm").reset();
        }
    }

    function Submit(e) {
        const formFile = document.querySelector("form")
        e.preventDefault()
        console.log("Submitted")
        document.getElementById("register").disabled = true;
        const formData = new FormData(formFile)
        if (isJunior) {
            formData.append("Group", "Junior");
        }

        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }


        // fetch("https://script.google.com/macros/s/AKfycbwD_ff2bXXvsCNRy5IoEnhkX2IpHUcO3tk04Yzu-hcuwvzEef7n5nZYMVZ-qBotI1xNIg/exec", {
        //     method: "POST",
        //     body: formData,
        // })

        axios.post(url, formData)
            .then(response => {
                if (response.data.status === "successful") {
                    formData.append('Code', response.data.code);
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
                <form className="needs-validation" id="memberForm" onSubmit={(e) => Submit(e)}>
                    <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                        <div className="input-group  mb-3">
                            <i className="bi bi-person-fill me-2"></i>
                            <span className="input-group-text">Name: </span>
                            <input Name="Name" className="form-control" placeholder="Full name" type="text" required />
                        </div>
                    </div>
                    <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                        <div className="input-group  mb-3">
                            <i className="bi bi-calendar-fill me-2"></i>
                            <span className="input-group-text">Date of birth: </span>
                            <AmraAmraDatePicker
                                value="DateOfBirth"
                                placeHolderText="Example: 1995-12-22"
                                onDateChange={handleDateChange}
                            //date={picnicDate}
                            />
                            {isJunior && (
                                <span name="Junior" className="badge bg-warning text-dark ms-2 align-self-center">
                                    Junior
                                </span>
                            )}
                            {/* {isJunior && (
                                <span className="input-group-text bg-warning ms-2 text-dark">
                                    Junior
                                </span>
                            )} */}
                        </div>

                    </div>
                    {isJunior && (
                        <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                            <div className="input-group  mb-3">
                                <i className="bi bi-person-vcard-fill me-2"></i>
                                <span className="input-group-text">Parent's ID: </span>
                                <input Name="ParentsId" className="form-control" placeholder="Example: M012" type="text" required />
                            </div>
                        </div>
                    )}
                    <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                        <div className="form-group input-group  mb-3">
                            <i className="bi bi-envelope-fill me-2"></i>
                            <span className="input-group-text" style={{ width: "80px" }}>Email</span>
                            <input Name="Email" className="form-control" placeholder={isJunior ? "Email address(Optional)" : "Email address"} type="email" required={!isJunior} />
                        </div>
                    </div>
                    <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                        <div className="form-group input-group  mb-3">
                            <i className="bi bi-telephone-fill me-2"></i>
                            <span className="input-group-text" style={{ width: "80px" }}>Phone</span>
                            <input Name="Phone" className="form-control" placeholder={isJunior ? "Phone number(Optional)" : "Phone number"} type="tel" required={!isJunior} />
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


                        {isJunior && <>Membership fee: 0kr </>}
                        {isSpecialOfferDay && !isJunior && (
                            <div>
                                <div>
                                    Membership fee:
                                    <s style={{ color: 'red', marginLeft: '8px' }}> 100kr</s>
                                    <span style={{ marginLeft: '8px' }}> (25kr for today)</span>
                                </div>
                                <div>Pay to Bankgiro: 577-0623</div>
                                <div className="pb-3">Or Swish to Bankgiro: 1230432419</div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" Name="Swish" id="swish" required />
                                    <label className="form-check-label" htmlFor="swish">
                                        I have paid the membership fee.
                                    </label>
                                    <span id="swishTo" className="swishto ms-2 h9"></span>
                                </div>
                            </div>
                        )}
                        {!isSpecialOfferDay && !isJunior && (
                            <div>
                                <div>Membership fee:
                                    <span style={{ marginLeft: '8px' }}>100kr</span>
                                </div>
                                <div>Pay to Bankgiro: 577-0623</div>
                                <div className="pb-3">Or Swish to Bankgiro: 1230432419</div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" Name="Swish" id="swish" required />
                                    <label className="form-check-label" htmlFor="swish">
                                        I have paid the membership fee.
                                    </label>
                                    <span id="swishTo" className="swishto ms-2 h9"></span>
                                </div>
                            </div>
                        )}

                        {/* {isSpecialOfferDay ? (
                                <>
                                    <s style={{ color: 'red', marginLeft: '8px' }}> 100kr</s>
                                    <span style={{ marginLeft: '8px' }}> (25kr for today)</span>
                                </>
                            ) : (
                                <span style={{ marginLeft: '8px' }}>100kr</span>
                            )} */}


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