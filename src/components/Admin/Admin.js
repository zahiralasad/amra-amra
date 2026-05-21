import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-datepicker/dist/react-datepicker.css'
import './admin.css';

import axios from 'axios';

import Notification from '../Others/Notification';
import MeetingNoteBook from './MeetingNoteBook';
import PicnicForm from "./PicnicForm";
import HomeForm from "./HomeForm";
import IndoorGamesForm from "./IndoorGamesForm"
import ReceiptForm from "./ReceiptForm";

function Admin() {
    // console.log(localStorage.getItem("state"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUser, setLoggedUser] = useState("");
    const [activeForm, setActiveForm] = useState("");

    const [notificationTitle, setNotificationTitle] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [modalShow, setModalShow] = useState(false);

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
                            <button className="btn btn-link text-white p-0 d-block mb-2" onClick={() => { setActiveForm("home") }}>Home</button>
                            {/* <button className="btn btn-link text-white p-0 d-block mb-2" onClick={() => { setActiveForm("picnic"); loadPicnicData() }}>Picnic</button> */}
                            <button className="btn btn-link text-white p-0 d-block mb-2" onClick={() => { setActiveForm("picnic"); }}>Picnic</button>
                            <button className="btn btn-link text-white p-0 d-block mb-2" onClick={() => setActiveForm("games")}>Games</button>
                            <button className="btn btn-link text-white p-0 d-block mb-2" onClick={() => setActiveForm("meetingnotebook")}>Meeting Note Book</button>
                            <button className="btn btn-link text-white p-0 d-block mb-2" onClick={() => setActiveForm("receipts")}>Receipts</button>
                            <button className="btn btn-link text-danger p-0 d-block" onClick={handleLogout}>Logout</button>
                        </div>
                        <div className='col-10 p-4'>
                            {/* {loading && <div className="text-center  text-white my-5">Please wait while loading the from .........</div>} */}
                            {activeForm === "home" && (
                                <HomeForm />
                            )}
                            {activeForm === "picnic" && (
                                <PicnicForm
                                    setNotificationTitle={setNotificationTitle}
                                    setNotificationMessage={setNotificationMessage}
                                    setModalShow={setModalShow}
                                />
                            )}
                            {activeForm === "meetingnotebook" && (
                                <IndoorGamesForm
                                    setNotificationTitle={setNotificationTitle}
                                    setNotificationMessage={setNotificationMessage}
                                    setModalShow={setModalShow}
                                />
                            )}
                            {activeForm === "meetingnotebook" && (
                                <MeetingNoteBook
                                    setNotificationTitle={setNotificationTitle}
                                    setNotificationMessage={setNotificationMessage}
                                    setModalShow={setModalShow}
                                />
                            )}
                            {activeForm === "receipts" && (
                                <ReceiptForm
                                    setNotificationTitle={setNotificationTitle}
                                    setNotificationMessage={setNotificationMessage}
                                    setModalShow={setModalShow}
                                />
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
            <Notification
                show={modalShow}
                onHide={() => setModalShow(false)}
                title={notificationTitle}
                message={notificationMessage}
            />
        </div>
    )
}
export default Admin;