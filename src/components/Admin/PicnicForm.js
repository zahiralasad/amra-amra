import React, { useState, useEffect } from 'react';
// import DatePicker from "react-datepicker";
import AmraAmraDatePicker from '../Others/AmraAmraDatePicker';
import axios from 'axios';

function PicnicForm({ setNotificationTitle, setNotificationMessage, setModalShow}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [picnicName, setPicnicName] = useState(null);
    const [picnicDate, setPicnicDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [acceptCar, setAcceptCar] = useState(null);
    const [maxSmallKidsAge, setMaxSmallKidsAge] = useState(null);
    const [maxBigKidsAge, setMaxBigKidsAge] = useState(null);
    const [adultsFeeInBus, setAdultsFeeInBus] = useState(0);
    const [adultsFeeInCar, setAdultsFeeInCar] = useState(0);
    const [smallKidsFeeInBus, setSmallKidsFeeInBus] = useState(0);
    const [smallKidsFeeInCar, setSmallKidsFeeInCar] = useState(0);
    const [bigKidsFeeInBus, setBigKidsFeeInBus] = useState(0);
    const [bigKidsFeeInCar, setBigKidsFeeInCar] = useState(0);
    const [maxBusSeats, setMaxBusSeats] = useState(0);
    const [maxCarSeats, setMaxCarSeats] = useState(0);
    const [busStops, setBusStops] = useState(null);
    const [floatingAd, setFloatingAd] = useState(null);
    const [codePrefix, setCodePrefix] = useState(null);

    const dataUrl = 'https://script.google.com/macros/s/AKfycbzp9Bk3W9FPEdbWTVOki_AcQxwR3IKHRc0_zCyCTfH4cNvXAotM3NamU9eIc6HhXcWb/exec';

     useEffect(() => {
        fetch(dataUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLoading(false);
                setPicnicName(data.picnicName);
                const formattedPicnicDate = new Date(data.picnicDate).toISOString().split("T")[0];
                setPicnicDate(formattedPicnicDate);
                const formattedStartDate = new Date(data.startDate).toISOString().split("T")[0];
                setStartDate(formattedStartDate);
                const formattedEndDate = new Date(data.endDate).toISOString().split("T")[0];
                setEndDate(formattedEndDate);
                setAcceptCar(data.acceptCar);
                setMaxSmallKidsAge(data.maxSmallKidsAge);
                setMaxBigKidsAge(data.maxBigKidsAge);
                setAdultsFeeInBus(data.adultsFeeInBus);
                setAdultsFeeInCar(data.adultsFeeInCar);
                setSmallKidsFeeInBus(data.smallKidsFeeInBus);
                setSmallKidsFeeInCar(data.smallKidsFeeInCar);
                setBigKidsFeeInBus(data.bigKidsFeeInBus);
                setBigKidsFeeInCar(data.bigKidsFeeInCar);
                setMaxBusSeats(data.maxBusSeats);
                setMaxCarSeats(data.maxCarSeats);
                setBusStops(data.busStops);
                setFloatingAd(data.floatingAd);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    },[loading]);

    const handlePicnicInfo = (e) => {
        e.preventDefault();
        const formElm = document.querySelector('form');
        const formData = new FormData(formElm);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        axios.post(dataUrl, formData)
            .then(response => {
                console.log(response.data)
                if (response.data === "successful") {

                    // document.getElementById("register").disabled = false;
                } else {
                    setNotificationTitle("Warning");
                    setNotificationMessage(JSON.stringify(response.data));
                    setModalShow(true);
                    //document.getElementById("register").disabled = false;
                }
            }).catch(error => {
                setNotificationTitle("Error");
                setNotificationMessage(JSON.stringify(error));
                setModalShow(true);
            });

    }

    const handlePicnicDate = (date) => {
        setPicnicDate(date);
    }

    return (
        <div>
            {loading && (
                <div className="text-center  text-white my-5">Please wait while loading the from .........</div>
            )}
            {!loading && (
                <>
                    <h5>Information for Picnic Registration Form</h5>

                    <form onSubmit={handlePicnicInfo}>
                        <div className='row'>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Picnic Title: </span>
                                <input
                                    className="form-control"
                                    placeholder="Example: Picnic 2025"
                                    type="text" name="picnicname"
                                    id="picnicname"
                                    value={picnicName}
                                    onChange={(e) => setPicnicName(e.target.value)}
                                >
                                </input>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Picnic Date: </span>
                                    <AmraAmraDatePicker
                                        value="picnicdate"
                                        date={picnicDate}
                                    // onChange = {setPicnicDate}
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Allow Car Registration: </span>
                                    <select className="custom-select" name="acceptcar">
                                        <option value="no" selected>No</option>
                                        <option value="yes">Yes</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Registration Start Date: </span>
                                    <AmraAmraDatePicker
                                        value="startdate"
                                        date={startDate}
                                    // onChange = {setStartDate}                                                              
                                    />
                                </div>
                            </div>
                            <div className='col-6 '>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Registration End Date: </span>
                                    <AmraAmraDatePicker
                                        value="enddate"
                                        date={endDate}
                                    // onChange = {setEndDate}  
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Registration Prefix: </span>
                                    <select
                                        className="custom-select"
                                        name="codeprefix"
                                        value={codePrefix}
                                        onChange={(e) => setCodePrefix(e.target.value)}>
                                        <option value="AA">AA</option>
                                        <option value="BB">BB</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Bus Stops: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="busstops"
                                        id="busstops"
                                        value={busStops}
                                        onChange={(e) => setBusStops(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className='row'>

                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Small Kids Max Age: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="maxsmallkidsage"
                                        id="maxsmallkidsage"
                                        value={maxSmallKidsAge}
                                        onChange={(e) => setMaxSmallKidsAge(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Big Kids Max Age: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="maxbigkidsage"
                                        id="maxbigkidsage"
                                        value={maxBigKidsAge}
                                        onChange={(e) => setMaxBigKidsAge(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Adult Fee in Bus: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="adultfeeinbus"
                                        id="adultfeeinbus"
                                        value={adultsFeeInBus}
                                        onChange={(e) => setAdultsFeeInBus(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Adult Fee in Car: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="adultfeeincar"
                                        id="adultfeeincar"
                                        value={adultsFeeInCar}
                                        onChange={(e) => setAdultsFeeInCar(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Big Kids Fee in Bus: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="bigkidsfeeinbus"
                                        id="bigkidsfeeinbus"
                                        value={bigKidsFeeInBus}
                                        onChange={(e) => setBigKidsFeeInBus(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Big Kids Fee in Car: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="bigkidsfeeincar"
                                        id="bigkidsfeeincar"
                                        value={bigKidsFeeInCar}
                                        onChange={(e) => setBigKidsFeeInCar(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Small Kids Fee in Bus: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="smallkidsfeeinbus"
                                        id="smallkidsfeeinbus"
                                        value={smallKidsFeeInBus}
                                        onChange={(e) => setSmallKidsFeeInBus(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Small Kids Fee in Car: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="smallkidsfeeincar"
                                        id="smallkidsfeeincar"
                                        value={smallKidsFeeInCar}
                                        onChange={(e) => setSmallKidsFeeInCar(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Max Bus Seats: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="maxbusseats"
                                        id="maxbusseats"
                                        value={maxBusSeats}
                                        onChange={(e) => setMaxBusSeats(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Max Car Seats: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="maxcarseats"
                                        id="maxcarseats"
                                        value={maxCarSeats}
                                        onChange={(e) => setMaxCarSeats(e.target.value)}
                                    >
                                    </input>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Floating Ad Text: </span>
                                <input
                                    className="form-control"
                                    placeholder="Example: Registration for Picnic 2026 will open soon ...."
                                    type="text" name="floatingad"
                                    id="floatingad"
                                    value={floatingAd}
                                    onChange={(e) => setFloatingAd(e.target.value)}
                                >
                                </input>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" id="register" className="btn btn-primary btn-block"> Update</button>
                        </div>
                    </form>
                </>)}
            {/* Your picnic form content here */}
        </div>
    )

}

export default PicnicForm;