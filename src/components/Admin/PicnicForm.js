import React, { useState, useEffect } from 'react';
// import DatePicker from "react-datepicker";
import AmraAmraDatePicker from '../Others/AmraAmraDatePicker';
import axios from 'axios';

function PicnicForm({ setNotificationTitle, setNotificationMessage, setModalShow }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [picnicName, setPicnicName] = useState(null);
    const [picnicDate, setPicnicDate] = useState(null);
    const [startDateForMembers, setStartDateForMembers] = useState(null);
    const [startDateForEverybody, setStartDateForEverybody] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [acceptCar, setAcceptCar] = useState(null);
    const [maxKidsAge, setMaxKidsAge] = useState(null);
    const [maxJuniorsAge, setMaxJuniorsAge] = useState(null);
    const [adultMembersFeeInBus, setAdultMembersFeeInBus] = useState(0);
    const [adultMembersFeeInCar, setAdultMembersFeeInCar] = useState(0);
    const [adultsFeeInBus, setAdultsFeeInBus] = useState(0);
    const [adultsFeeInCar, setAdultsFeeInCar] = useState(0);
    const [kidsFeeInBus, setKidsFeeInBus] = useState(0);
    const [kidsFeeInCar, setKidsFeeInCar] = useState(0);
    const [juniorMembersFeeInBus, setJuniorMembersFeeInBus] = useState(0);
    const [juniorMembersFeeInCar, setJuniorMembersFeeInCar] = useState(0);
    const [juniorsFeeInBus, setJuniorsFeeInBus] = useState(0);
    const [juniorsFeeInCar, setJuniorsFeeInCar] = useState(0);
    const [maxBusSeats, setMaxBusSeats] = useState(0);
    const [maxCarSeats, setMaxCarSeats] = useState(0);
    const [busStops, setBusStops] = useState(null);
    const [floatingAd, setFloatingAd] = useState(null);
    const [codePrefix, setCodePrefix] = useState(null);

    const url = 'https://script.google.com/macros/s/AKfycbzp9Bk3W9FPEdbWTVOki_AcQxwR3IKHRc0_zCyCTfH4cNvXAotM3NamU9eIc6HhXcWb/exec';
    const dataUrl = "https://amra-amra.se/db/";

    useEffect(() => {
        axios.get(`${dataUrl}?request=picnicinput`)
            .then(function (response) {
                // console.log(response.data);
                setLoading(false);
                setPicnicName(response.data[0].picnic_name);

                // Convert string date to Date object for the date picker
                const picnicDateObj = new Date(response.data[0].picnic_date);
                setPicnicDate(picnicDateObj);

                const registrationStartForMemberDateObj = new Date(response.data[0].registration_start_for_members);
                setStartDateForMembers(registrationStartForMemberDateObj);
                const registrationStartDateObj = new Date(response.data[0].registration_start);
                setStartDateForEverybody(registrationStartDateObj);
                const registrationEndDateObj = new Date(response.data[0].registration_end);
                setEndDate(registrationEndDateObj);

                setAcceptCar(response.data[0].car);

                setMaxKidsAge(response.data[0].max_kids_age);
                setMaxJuniorsAge(response.data[0].max_juniors_age);

                setAdultMembersFeeInBus(response.data[0].adult_member_fee_bus);
                setAdultMembersFeeInCar(response.data[0].adult_member_fee_car);
                setAdultsFeeInBus(response.data[0].adult_non_member_fee_bus);
                setAdultsFeeInCar(response.data[0].adult_non_member_fee_car);

                setKidsFeeInBus(response.data[0].kids_fee_bus);
                setKidsFeeInCar(response.data[0].kids_fee_car);

                setJuniorMembersFeeInBus(response.data[0].junior_member_fee_bus);
                setJuniorMembersFeeInCar(response.data[0].junior_member_fee_car);
                setJuniorsFeeInBus(response.data[0].junior_non_member_fee_bus);
                setJuniorsFeeInCar(response.data[0].junior_non_member_fee_car);

                setMaxBusSeats(response.data[0].max_bus_seats);
                setMaxCarSeats(response.data[0].max_car_seats);
                setBusStops(response.data[0].bus_stops);
                setFloatingAd(response.data[0].floating_ad_text);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, []);

    const handlePicnicInfo = (e) => {
        e.preventDefault();
        const formElm = document.querySelector('form');
        const formData = new FormData(formElm);
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        formData.append("request", "picnicinput");
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
                                    <span className="input-group-text">Registration Start Date For Members: </span>
                                    <AmraAmraDatePicker
                                        value="registrationstartdateformember"
                                        date={startDateForMembers}
                                    // onChange = {setStartDate}                                                              
                                    />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Registration Start Date For Everybody: </span>
                                    <AmraAmraDatePicker
                                        value="registrationstartdate"
                                        date={startDateForEverybody}
                                    // onChange = {setStartDate}                                                              
                                    />
                                </div>
                            </div>
                            <div className='col-6 '>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Registration End Date: </span>
                                    <AmraAmraDatePicker
                                        value="registrationenddate"
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
                                    <span className="input-group-text">Kids Max Age: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="maxkidsage"
                                        id="maxkidsage"
                                        value={maxKidsAge}
                                        onChange={(e) => setMaxKidsAge(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Juniors Max Age: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="maxjuniorsage"
                                        id="maxjuniorsage"
                                        value={maxJuniorsAge}
                                        onChange={(e) => setMaxJuniorsAge(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Adult Member's Fee in Bus: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="adultmembersfeeinbus"
                                        id="adultmembersfeeinbus"
                                        value={adultMembersFeeInBus}
                                        onChange={(e) => setAdultMembersFeeInBus(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Adult Member's Fee in Car: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="adultmembersfeeincar"
                                        id="adultmemberfeeincar"
                                        value={adultMembersFeeInCar}
                                        onChange={(e) => setAdultMembersFeeInCar(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Adult Non-Member's Fee in Bus: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="adultsfeeinbus"
                                        id="adulsfeeinbus"
                                        value={adultsFeeInBus}
                                        onChange={(e) => setAdultsFeeInBus(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Adult Non-Member's Fee in Car: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="adultsfeeincar"
                                        id="adultsfeeincar"
                                        value={adultsFeeInCar}
                                        onChange={(e) => setAdultsFeeInCar(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Junior Member's Fee in Bus: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="juniormembersfeeinbus"
                                        id="juniormembersfeeinbus"
                                        value={juniorMembersFeeInBus}
                                        onChange={(e) => setJuniorsFeeInBus(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Junior Member's Fee in Car: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="juniormembersfeeincar"
                                        id="juniormembersfeeincar"
                                        value={juniorMembersFeeInCar}
                                        onChange={(e) => setJuniorsFeeInCar(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Junior Non-Member's Fee in Bus: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="juniorsfeeinbus"
                                        id="juniorsfeeinbus"
                                        value={juniorsFeeInBus}
                                        onChange={(e) => setJuniorsFeeInBus(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Junior Non-Member's Fee in Car: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="juniorsfeeincar"
                                        id="juniorsfeeincar"
                                        value={juniorsFeeInCar}
                                        onChange={(e) => setJuniorsFeeInCar(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Small Kids Fee in Bus: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="kidsfeeinbus"
                                        id="kidsfeeinbus"
                                        value={kidsFeeInBus}
                                        onChange={(e) => setKidsFeeInBus(e.target.value)}>
                                    </input>
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Small Kids Fee in Car: </span>
                                    <input
                                        className="form-control"
                                        type="text" name="kidsfeeincar"
                                        id="kidsfeeincar"
                                        value={kidsFeeInCar}
                                        onChange={(e) => setKidsFeeInCar(e.target.value)}>
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