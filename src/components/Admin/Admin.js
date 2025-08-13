import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import './admin.css';
import axios from 'axios';

import AmraAmraDatePicker from '../Others/AmraAmraDatePicker';

function Admin() {
    // console.log(localStorage.getItem("state"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState("");
    const [activeForm, setActiveForm] = useState("");
    const [picnicDate, setPicnicDate] = useState(null);
    const [registrationStartDate, setRegistrationStartDate] = useState(null);
    const [registrationEndDate, setRegistrationEndDate] = useState(null);

    useEffect(() => {
        const state = localStorage.getItem("state");
        if (state === "LoggedIn") {
            setIsLoggedIn(true);
            setLoggedUser(localStorage.getItem('name'));
        }
        else
            setIsLoggedIn(false);
    }, []);

    const handleLogout = () => {

    }

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const url = "https://amra-amra.se/db/";

        let fData = new FormData();

        fData.append('request', "login");
        fData.append('email', email);
        fData.append('password', password);

        // axios.post(url, fData)
        //     .then(response => alert(response.data))
        //     .catch(error => alert(error));

        axios.post(url, fData)
            .then(function (response) {
                if (response.data !== "") {
                    alert("Hi " + response.data + ", you are logged in successfully");
                    localStorage.setItem("name", response.data);
                    localStorage.setItem("state", "LoggedIn");
                    window.location.replace("Admin"); // I want to link to a page (Admin) after login 
                }
                else {
                    alert("Failed to login, please try with correct credential");
                }
            })
            .catch(error => alert(error));
    }
    const handlePicnicInfo = () => {

    }
    const handleGameInfo = () => {

    }

    return (
        <div className='row'>
            <div className="text-center text-white">
                {!isLoggedIn ? (
                    <div className="row justify-content-center mt-5">
                        <div className="col-6 p-4 border rounded shadow text-white">
                            <h3 className="text-center mb-4 border-bottom pb-2">Login</h3>
                            <form onSubmit={handleLogin}>
                                <div className="form-group mb-3">
                                    {/* <label htmlFor="email">Email:</label> */}
                                    <input type="email" name="email" className="form-control" id="email" placeholder="Email" />
                                </div>
                                <div className="form-group mb-3">
                                    {/* <label htmlFor="password">Password:</label> */}
                                    <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-dark">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div className='row'>
                        <div className='col-2 border-end text-start p-3'>
                            <div><strong>Admin:</strong> {loggedUser}</div>
                            <hr />
                            <button className="btn btn-link text-white p-0 d-block mb-2" onClick={() => setActiveForm("picnic")}>Picnic</button>
                            <button className="btn btn-link text-white p-0 d-block mb-2" onClick={() => setActiveForm("games")}>Games</button>
                            <button className="btn btn-link text-danger p-0 d-block" onClick={handleLogout}>Logout</button>
                        </div>
                        <div className='col-10 p-4'>
                            {activeForm === "picnic" && (
                                <div>
                                    <h5>Information for Picnic Registration Form</h5>
                                    <form onSubmit={handlePicnicInfo}>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Picnic Title: </span>
                                                <input
                                                    className="form-control"
                                                    placeholder="Example: Picnic 2025"
                                                    type="text" name="picnictitle"
                                                    id="picnictitle">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Picnic Date: </span>
                                                <AmraAmraDatePicker 
                                                className="form-control"
                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Registration Start Date: </span>
                                                <AmraAmraDatePicker 
                                                className="form-control"
                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Registration End Date: </span>
                                                <AmraAmraDatePicker 
                                                className="form-control"
                                                />
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Allow Car Registration: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="allowcarregistration"
                                                    id="allowcarregistration">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Small Kids Max Age: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="smallkidsmaxage"
                                                    id="smallkidsmaxage">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Big Kids Max Age: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="bigkidsmaxage"
                                                    id="bigkidsmaxage">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Adult Fee in Bus: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="adultfeeinbus"
                                                    id="adultfeeinbus">
                                                </input>
                                                
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Adult Fee in Car: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="adultfeeincar"
                                                    id="adultfeeincar">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Big Kids Fee in Bus: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="bigkidsfeeinbus"
                                                    id="bigkidsfeeinbus">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Big Kids Fee in Car: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="bigkidsfeeincar"
                                                    id="bigkidsfeeincar">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Small Kids Fee in Bus: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="smallkidsfeeinbus"
                                                    id="smallkidsfeeinbus">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Small Kids Fee in Car: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="smallkidsfeeincar"
                                                    id="smallkidsfeeincar">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Max Bus Seats: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="maxbusseats"
                                                    id="maxbusseats">
                                                </input>
                                            </div>
                                            
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Max Car Seats: </span>
                                                <input
                                                    className="form-control"                                                
                                                    type="text" name="maxcarseats"
                                                    id="maxcarseats">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Bus Stops: </span>
                                                <input
                                                    className="form-control" 
                                                    placeholder="Example: Sollentuna, Tumba"                                               
                                                    type="text" name="busstops"
                                                    id="busstops">
                                                </input>
                                            </div>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Floating Ad Text: </span>
                                                <input
                                                    className="form-control" 
                                                    placeholder="Example: Registration for Picnic 2026 will open soon ...."                                               
                                                    type="text" name="floatingadtext"
                                                    id="floatingadtext">
                                                </input>
                                            </div>
                                    </form>
                                    {/* Your picnic form content here */}
                                </div>
                            )}
                            {activeForm === "games" && (
                                <div>
                                    <h5>Games Form</h5>

                                    <form onSubmit={handleGameInfo}>
                                        sdkfls
                                        <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                                            <div className="d-flex mb-3 input-group border-bottom pb-1">
                                                <i className="bi bi-people-fill me-2"></i>
                                                <span className="input-group-text"> Number of 12+ old</span>
                                            </div>
                                        </div>
                                    </form>
                                    {/* Your games form content here */}
                                </div>
                            )}
                            {!activeForm && (
                                <div>
                                    <h5>Welcome to the Admin Panel</h5>
                                    <p>Select an option on the left.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
        // <Modal
        //     size="lg"
        //     aria-labelledby="contained-modal-title-vcenter"
        //     centered
        // >
        //     <Modal.Header closeButton>
        //         <Modal.Title id="contained-modal-title-vcenter">              
        //             Admin Login
        //         </Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body>
        //         <p>
        //         </p>
        //     </Modal.Body>
        //     <Modal.Footer>
        //         <Button onClick={handleClick}>OK</Button>
        //     </Modal.Footer>
        // </Modal>
    )
}
export default Admin;