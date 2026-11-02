import React, { useState, useEffect } from 'react';
// import DatePicker from "react-datepicker";
import AmraAmraDatePicker from '../Others/AmraAmraDatePicker';
import axios from 'axios';

function HomeForm({ setNotificationTitle, setNotificationMessage, setModalShow }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [savingText, setSavingText] = useState(false);


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
    const IMAGE_URL = "https://amra-amra.se/images/";

    useEffect(() => {
        const table = "home";
        axios.get(dataUrl, {
            params: { request: "getatablesdata", table }
        })
            .then(function (response) {
                console.log(response.data);
                setLoading(false);
                console.log(response.data[0].floating_text);
                setFloatingAd(response.data[0].floating_text);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            })
    }, []);
    useEffect(() => {
        loadimages();
    }, []);

    const loadimages = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                // `${apiUrl}?request=getimages`
                `${dataUrl}?request=getimages`
            );
            const data = await response.json();
            console.log("Data: ", data);
            setImages(data);
        } catch (error) {
            console.error("Could not load images:", error);
        } finally {
            setLoading(false);
        }
    };
    const uploadImage = () => {

    }
    const deleteImage = () => {

    }
    const saveFloatingText = async () => {
        setSavingText(true);
        try {
            const formData = new FormData();
            formData.append("request", "homepage");
            formData.append("floatingad", floatingAd);
            const res = await axios.post(dataUrl, formData);
            console.log(res.data);
            if (!res.data.success) {
                // console.log("failed")
                setNotificationTitle("Error");
                setNotificationMessage(res.data.error || "Could not save text");
                setModalShow(true);
            }
        } catch (err) {
            // console.log(err);
            setNotificationTitle("Error");
            setNotificationMessage(err.message);
            setModalShow(true);
        } finally {
            setSavingText(false);
        }

    }

    const handlePicnicInfo = (e) => {
        e.preventDefault();
        console.log(floatingAd);
        // const formElm = document.querySelector('form');
        // const formData = new FormData(formElm);
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        // formData.append("request", "picnicinput");
        // axios.post(dataUrl, formData)
        //     .then(response => {
        //         console.log(response.data)
        //         if (response.data === "successful") {

        //             // document.getElementById("register").disabled = false;
        //         } else {
        //             setNotificationTitle("Warning");
        //             setNotificationMessage(JSON.stringify(response.data));
        //             setModalShow(true);
        //             //document.getElementById("register").disabled = false;
        //         }
        //     }).catch(error => {
        //         setNotificationTitle("Error");
        //         setNotificationMessage(JSON.stringify(error));
        //         setModalShow(true);
        //     });

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
                    <h5>Information for Home Page</h5>
                    {/* 1. Floating ad text */}
                    <div className="row mb-4">
                        <div className="input-group">
                            <span className="input-group-text">Floating Ad Text: </span>
                            <input
                                className="form-control"
                                placeholder="Example: Registration for Picnic 2026 will open soon...."
                                type="text"
                                value={floatingAd}
                                onChange={(e) => setFloatingAd(e.target.value)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={saveFloatingText}
                                disabled={savingText}
                            >
                                {savingText ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <h2>Images</h2>

                        <div style={{ marginBottom: "20px" }}>
                            <label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    onChange={uploadImage}
                                    disabled={uploading}
                                />
                            </label>

                            {uploading && <p>Uploading...</p>}
                        </div>

                        {loading && <p>Loading images...</p>}

                        {!loading && images.length === 0 && (
                            <p>No images found.</p>
                        )}

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(200px, 1fr))",
                                gap: "20px"
                            }}
                        >
                            {images.map((filename) => (
                                <div
                                    key={filename}
                                    style={{
                                        border: "1px solid #ddd",
                                        padding: "10px",
                                        borderRadius: "8px"
                                    }}
                                >
                                    <img
                                        src={`${IMAGE_URL}${encodeURIComponent(filename)}`}
                                        alt={filename}
                                        style={{
                                            width: "100%",
                                            height: "150px",
                                            objectFit: "cover"
                                        }}
                                    />

                                    <p
                                        style={{
                                            wordBreak: "break-all"
                                        }}
                                    >
                                        {filename}
                                    </p>

                                    <button
                                        onClick={() => deleteImage(filename)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* <form onSubmit={handlePicnicInfo}>
                        <div className='row'>
                            <div className="input-group mb-3">
                                <span className="input-group-text">Add photo for Banner: </span>
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
                            <div className="input-group mb-3">
                                <span className="input-group-text">Update photo for Banner: </span>
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
                    </form> */}
                </>
            )}
            {/* Your picnic form content here */}
        </div>
    )

}

export default HomeForm;