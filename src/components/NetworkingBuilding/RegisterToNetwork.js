import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AmraAmraDatePicker from '../Others/AmraAmraDatePicker';
import Notification from '../Others/Notification';

function RegisterToNetwork() {
    const [loading, setLoading] = useState(true);
    const [today, seToday] = useState(new Date());
    const [error, setError] = useState(null);
    const [seatsFilled, setSeatsFilled] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);
    const [response, setResponse] = useState(null);

    const [seatBooked, setSeatBooked] = useState(null);

    const url = 'https://script.google.com/macros/s/AKfycbyWNqsxnPXK0vFgNblrZrinz8HuvCYvS6Jn8NBqh51_5WaUI3qDjsRZLc0SVoCu1T3X/exec';
    const apiUrl = "https://amra-amra.se/emailApi/";

    useEffect(() => {
        // if (maxBusSeats && maxCarSeats) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data.seatBooked);
                // setEntries(data.data); // Update the state with JSON data
                setLoading(false);
                setSeatBooked(data.seatBooked);
                // setCarSeatsFilled(data.carSeats);
                // if((data.busSeats >= maxBusSeats) && (data.carSeats >= maxCarSeats)){
                //   setSeatsFilled(true);
                // }
                //getColumnsData(data.data);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
        // }
        //   }, [maxBusSeats, maxCarSeats]);
    }, []);

    function Submit(e) {
        e.preventDefault();
        const formElm = document.querySelector('form');
        const formData = new FormData(formElm);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
        // console.log(formData);

        axios.post(url, formData)
            .then(response => {
                console.log(response.data)
                if (Array.isArray(response.data) && response.data[0] === "successful") {
                    // formData.append("Code", response.data[1]);
                    sendEmail(formData);
                    // document.getElementById("register").disabled = false;
                    // document.getElementById("picnicForm").reset();
                } else {
                    setTitle("Warning");
                    setMessage(JSON.stringify(response.data));
                    setModalShow(true);
                    // document.getElementById("register").disabled = false;
                }
            }).catch(error => setResponse(error));

    }
    const sendEmail = (fData) => {
        fData.append('request', 'networkRegistrationEmail');
        axios.post(apiUrl, fData)
            .then(response => {
                console.log(response.data);
                //setClearForm(true);
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
        // if (clearForm === true) {
        //   document.getElementById("picnicForm").reset();
        // }
    }
    const isDateExpired = () => {
        const dateString = "2025-10-30";
        const givenDate = new Date(dateString);
        return givenDate < today;
    };

    const handleRegistration = () => {

    }

    return (
        <div className="picnic">
            <div className="p-4 text-center rounded bg-dark">
                <h4>Registration Form for the Carrier & Network Building Event</h4>
                {/* <img src={banner} className="img-fluid" /> */}
            </div>
            <div className="mt-1 p-2 rounded bg-dark">
                {loading && (
                    <div className="text-center  text-white my-5">
                        Please wait while loading the from .........
                    </div>
                )}
                {!loading && (
                    <>
                        {error && (
                            <div className="text-center  text-white my-5">
                                Error: {error}
                            </div>
                        )}
                        {!error && (
                            <>
                                {isDateExpired() && (
                                    <div className="text-center  text-white my-5">
                                        Registrion date to the picnic has passed. Please contact us for further information
                                    </div>
                                )}
                                {!isDateExpired() && (
                                    <>
                                        {seatsFilled && (
                                            <div className="text-center  text-white my-5">
                                                Unfortunately, we are unable to confirm your registration as all bus seats are fully booked. Please contact us for further information
                                            </div>
                                        )}
                                        {!seatsFilled && (
                                            <form className="needs-validation" id="picnicForm" onSubmit={(e) => Submit(e)}>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-person-fill me-2"></i>
                                                        <span className="input-group-text" style={{ width: "80px" }}>Name</span>
                                                        <input name="Name" className="form-control" placeholder="Full Name" type="text" required />
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-envelope-fill me-2"></i>
                                                        <span className="input-group-text" style={{ width: "80px" }}>Email</span>
                                                        <input name="Email" className="form-control" placeholder="Email address" type="email" required />
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-telephone-fill me-2"></i>
                                                        <span className="input-group-text" style={{ width: "80px" }}>Phone</span>
                                                        <input name="Phone" className="form-control" placeholder="Phone number" type="text" required />
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-person-fill me-2"></i>
                                                        <span className="input-group-text me-1" style={{ width: "60px" }}>Gender: </span>
                                                        <div className="form-check pe-2">
                                                            <input className="form-check-input" type="radio" name="Gender" value="Male" id="male" required />
                                                            <label className="form-check-label" htmlFor="male">
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="Gender" value="Female" id="female" required />
                                                            <label className="form-check-label" htmlFor="female">
                                                                Female
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-person-fill me-2"></i>
                                                        <span className="input-group-text me-1" style={{ width: "90px" }}>Age Group: </span>
                                                        <div className="form-check pe-2">
                                                            <input className="form-check-input" type="radio" name="Age" value="18-25" id="18-25" required />
                                                            <label className="form-check-label" htmlFor="18-25">
                                                                18-25
                                                            </label>
                                                        </div>
                                                        <div className="form-check pe-2">
                                                            <input className="form-check-input" type="radio" name="Age" value="26-35" id="26-35" required />
                                                            <label className="form-check-label" htmlFor="26-35">
                                                                26-35
                                                            </label>
                                                        </div>
                                                        <div className="form-check pe-2">
                                                            <input className="form-check-input" type="radio" name="Age" value="36-45" id="36-45" required />
                                                            <label className="form-check-label" htmlFor="36-45">
                                                                36-45
                                                            </label>
                                                        </div>
                                                        <div className="form-check">
                                                            <input className="form-check-input" type="radio" name="Age" value="45+" id="45+" required />
                                                            <label className="form-check-label" htmlFor="45+">
                                                                45+
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        {/* <i className="bi bi-book-fill me-2"></i>  */}
                                                        <i className="bi bi-mortarboard me-2"></i>
                                                        <span className="input-group-text" style={{ width: "160px" }}>Highest level of Education: </span>
                                                        <input name="Education" className="form-control" placeholder="" type="text" required />
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-bank me-2"></i>
                                                        {/* <i className="bi bi-journal-bookmark"></i> */}
                                                        <span className="input-group-text" style={{ width: "130px" }}>Educational institute:</span>
                                                        <input name="Institue" className="form-control" placeholder="" type="text" required />
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-briefcase me-2"></i>
                                                        {/* <i className="bi bi-journal-bookmark"></i> */}
                                                        <span className="input-group-text" style={{ width: "130px" }}>Current Occupation:</span>
                                                        <input name="Occupation" className="form-control" placeholder="" type="text" required />
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-journal-bookmark me-2"></i>
                                                        <span className="input-group-text" style={{ width: "190px" }}>Carrier interest/Interested Field:</span>
                                                        <select className="custom-select" name="Subject">
                                                            <option value="Läkare" selected>Läkare</option>
                                                            <option value="Sjuksköterska">Sjuksköterska</option>
                                                            <option value="Undersköterska">Undersköterska</option>
                                                            <option value="Lärare">Lärare</option>
                                                            <option value="Förskollärare">Förskollärare</option>
                                                            <option value="Systemutvecklare">Systemutvecklare</option>
                                                            <option value="IT-konsult">IT-konsult</option>
                                                            <option value="Elektriker">Elektriker</option>
                                                            <option value="Ekonom">Ekonom</option>
                                                            <option value="Jurist">Jurist</option>
                                                            <option value="Apotekare">Apotekare</option>
                                                            <option value="Servitör/Servitris">Servitör/Servitris</option>
                                                            <option value="Butikssäljare">Butikssäljare</option>
                                                            <option value="Taxiförare">Taxiförare</option>
                                                            <option value="Bussförare">Bussförare</option>
                                                            <option value="Personlig assistent">Personlig assistent</option>
                                                            <option value="Social Handlägare">Social Handlägare</option>
                                                            <option value="Resturang Chef">Resturang Chef</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                                    <div className="form-group input-group  mb-3">
                                                        <i className="bi bi-chat-dots me-2"></i>
                                                        {/* <i className="bi bi-journal-bookmark"></i> */}
                                                        <span className="input-group-text" style={{ width: "130px" }}>Comment:</span>
                                                        <textarea
                                                            name="Comment"
                                                            className="form-control"
                                                            rows="1"
                                                            onInput={(e) => {
                                                                e.target.style.height = "auto";      // Reset height
                                                                e.target.style.height = e.target.scrollHeight + "px"; // Adjust to content
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mt-2 rounded border p-2">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" name="Swish" id="swish" required />
                                                        <label className="form-check-label" htmlFor="swish">
                                                            I have swished 30kr to 1230432419
                                                        </label>
                                                        <span id="swishTo" className="swishto ms-2 h9"></span>
                                                    </div>
                                                </div>
                                                <div className="form-group mt-3">
                                                    <button type="submit" id="register" className="btn btn-primary btn-block"> Register</button>
                                                </div>
                                            </form>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
                <Notification
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title={title}
                    message={message}
                />
            </div>
        </div>
    )
}



export default RegisterToNetwork;