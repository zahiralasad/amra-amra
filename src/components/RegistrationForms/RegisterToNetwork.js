import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Notification from "../Others/Notification";
import "./RegisterToNetwork.css";


function RegisterToNetwork() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [seatsFilled, setSeatsFilled] = useState(false);

    const [modalShow, setModalShow] = useState(false);
    const [title, setTitle] = useState(null);
    const [message, setMessage] = useState(null);
    const [response, setResponse] = useState(null);

    const [selected, setSelected] = useState(null);
    const [seatBooked, setSeatBooked] = useState(null);

    /* Event configuration from Google Sheet */
    const [eventData, setEventData] = useState(null);


    /* ======================================================
       EVENT
    ====================================================== */

    const EVENT_ID = "networking-2026";


    /* ======================================================
       API
    ====================================================== */

    /* Registration API */
    const url =
        "https://script.google.com/macros/s/AKfycbxImKSfp7Dh4vDHTCEFwTpq2qoXaL8T8p5HbJNtoPi06EvLjuVEwiH0gBlebu7oKuSy/exec";

    /* Events API */
    const EVENTS_API_URL =
        "https://script.google.com/macros/s/AKfycbwoNQHZnU5j4Pb8NIwzuVsBg5TBKlKRhYJXsxmCK0J6Rb8QRCf6-ixVudn7-KReaDcu/exec";

    /* Email API */
    const apiUrl =
        "https://amra-amra.se/emailApi/";


    /* ======================================================
       LOAD REGISTRATION + EVENT DATA
    ====================================================== */

    useEffect(() => {

        const loadRegistrationData = async () => {

            try {

                setLoading(true);
                setError(null);


                /* ------------------------------------------
                   1. Load event configuration
                ------------------------------------------ */

                const eventResponse = await fetch(
                    `${EVENTS_API_URL}?id=${encodeURIComponent(EVENT_ID)}`
                );

                if (!eventResponse.ok) {
                    throw new Error(
                        "Unable to load event information."
                    );
                }

                const eventResult =
                    await eventResponse.json();


                if (
                    !eventResult.success ||
                    !eventResult.event
                ) {
                    throw new Error(
                        "Event information was not found."
                    );
                }


                setEventData(
                    eventResult.event
                );


                /* ------------------------------------------
                   2. Load existing registration information
                ------------------------------------------ */

                const registrationResponse =
                    await fetch(url);

                if (!registrationResponse.ok) {
                    throw new Error(
                        "Unable to load registration information."
                    );
                }

                const registrationResult =
                    await registrationResponse.json();


                console.log(
                    registrationResult.seatBooked
                );


                setSeatBooked(
                    registrationResult.seatBooked
                );


            } catch (error) {

                console.error(error);

                setError(
                    error.message
                );

            } finally {

                setLoading(false);

            }

        };


        loadRegistrationData();

    }, []);


    /* ======================================================
       SUBMIT
    ====================================================== */

    function Submit(e) {

        e.preventDefault();


        const registerButton =
            document.getElementById("register");

        registerButton.disabled = true;


        const formElm =
            document.getElementById("networkForm");

        const formData =
            new FormData(formElm);


        /* ------------------------------------------
           Tell backend which event is registering
        ------------------------------------------ */

        formData.append(
            "event_id",
            EVENT_ID
        );


        for (let [key, value] of formData.entries()) {

            console.log(
                key,
                value
            );

        }


        axios
            .post(
                url,
                formData
            )

            .then((response) => {

                console.log(
                    response.data
                );


                if (
                    Array.isArray(response.data) &&
                    response.data[0] === "successful"
                ) {

                    sendEmail(
                        formData
                    );


                    registerButton.disabled =
                        false;


                    formElm.reset();

                    setSelected(null);


                } else {

                    setTitle(
                        "Warning"
                    );


                    setMessage(
                        JSON.stringify(
                            response.data
                        )
                    );


                    setModalShow(
                        true
                    );


                    registerButton.disabled =
                        false;

                }

            })

            .catch((error) => {

                setResponse(error);

                setTitle(
                    "Failed to Register"
                );

                setMessage(
                    error.message
                );

                setModalShow(
                    true
                );

                registerButton.disabled =
                    false;

            });

    }


    /* ======================================================
       EMAIL
    ====================================================== */

    const sendEmail = (fData) => {

        fData.append(
            "request",
            "networkRegistrationEmail"
        );


        axios
            .post(
                apiUrl,
                fData
            )

            .then((response) => {

                console.log(
                    response.data
                );


                setTitle(
                    "Registration Completed"
                );


                setMessage(
                    response.data
                );


                setModalShow(
                    true
                );

            })

            .catch((error) => {

                console.log(
                    error
                );


                setTitle(
                    "Failed to Register"
                );


                setMessage(
                    error.message
                );


                setModalShow(
                    true
                );

            });

    };


    /* ======================================================
       REGISTRATION STATUS
    ====================================================== */

    const getRegistrationStatus = () => {

        if (!eventData) {
            return "loading";
        }


        /*
         * Both dates must exist in the events sheet.
         */

        if (
            !eventData.registration_open ||
            !eventData.registration_close
        ) {
            return "unavailable";
        }


        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        const openDate =
            new Date(
                `${eventData.registration_open}T00:00:00`
            );


        const closeDate =
            new Date(
                `${eventData.registration_close}T23:59:59`
            );


        /*
         * Protect against invalid spreadsheet dates
         */

        if (
            Number.isNaN(openDate.getTime()) ||
            Number.isNaN(closeDate.getTime())
        ) {
            return "unavailable";
        }


        if (today < openDate) {
            return "not-open";
        }


        if (today > closeDate) {
            return "closed";
        }


        return "open";

    };


    const registrationStatus =
        getRegistrationStatus();


    /* ======================================================
       FORMAT DATE
    ====================================================== */

    const formatRegistrationDate = (
        dateString
    ) => {

        if (!dateString) {
            return "";
        }


        const date =
            new Date(
                `${dateString}T00:00:00`
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {
            return dateString;
        }


        return date.toLocaleDateString(
            "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    };


    /* ======================================================
       PAGE
    ====================================================== */

    return (

        <main className="network-registration-page">


            {/* ==================================================
                BREADCRUMB
            ================================================== */}

            <div className="container network-registration-breadcrumb">

                <Link to="/">
                    Home
                </Link>

                <span>›</span>

                <Link to="/events">
                    Events
                </Link>

                <span>›</span>

                <span>
                    Registration
                </span>

            </div>


            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <section className="network-registration-header">

                <div className="container">

                    <div className="network-registration-header-content">

                        <span className="network-registration-label">
                            Event Registration
                        </span>

                        <h1>
                            Career Pathways
                        </h1>

                        <h2>
                            Networking for Bangladeshis in Sweden
                        </h2>

                        <p>
                            Complete the form below to register
                            for the event.
                        </p>

                    </div>

                </div>

            </section>


            {/* ==================================================
                REGISTRATION AREA
            ================================================== */}

            <section className="network-registration-section">

                <div className="container">

                    <div className="network-registration-card">


                        {/* ==========================================
                            CARD HEADER
                        ========================================== */}

                        <div className="network-form-heading">

                            <div className="network-form-heading-icon">
                                ✓
                            </div>

                            <div>

                                <h2>
                                    Registration Form
                                </h2>

                                <p>
                                    Please provide your information below.
                                </p>

                            </div>

                        </div>


                        {/* ==========================================
                            LOADING
                        ========================================== */}

                        {loading && (

                            <div className="network-form-message">

                                <div className="network-loading-spinner"></div>

                                <p>
                                    Please wait while loading the form...
                                </p>

                            </div>

                        )}


                        {/* ==========================================
                            FORM CONTENT
                        ========================================== */}

                        {!loading && (

                            <>


                                {/* ==================================
                                    ERROR
                                ================================== */}

                                {error && (

                                    <div className="network-form-alert network-form-alert-error">

                                        <strong>
                                            Unable to load registration
                                        </strong>

                                        <p>
                                            {error}
                                        </p>

                                    </div>

                                )}


                                {/* ==================================
                                    NO ERROR
                                ================================== */}

                                {!error && (

                                    <>


                                        {/* ==================================
                                            REGISTRATION NOT OPEN
                                        ================================== */}

                                        {registrationStatus === "not-open" && (

                                            <div className="network-form-alert network-form-alert-warning">

                                                <strong>
                                                    Registration Not Open Yet
                                                </strong>

                                                <p>
                                                    Registration will open on{" "}
                                                    {formatRegistrationDate(
                                                        eventData.registration_open
                                                    )}.
                                                </p>

                                            </div>

                                        )}


                                        {/* ==================================
                                            REGISTRATION CLOSED
                                        ================================== */}

                                        {registrationStatus === "closed" && (

                                            <div className="network-form-alert network-form-alert-warning">

                                                <strong>
                                                    Registration Closed
                                                </strong>

                                                <p>
                                                    Registration closed on{" "}
                                                    {formatRegistrationDate(
                                                        eventData.registration_close
                                                    )}.
                                                </p>

                                            </div>

                                        )}


                                        {/* ==================================
                                            REGISTRATION CONFIGURATION MISSING
                                        ================================== */}

                                        {registrationStatus === "unavailable" && (

                                            <div className="network-form-alert network-form-alert-warning">

                                                <strong>
                                                    Registration Unavailable
                                                </strong>

                                                <p>
                                                    Registration dates have not
                                                    been configured for this event.
                                                    Please contact us for further
                                                    information.
                                                </p>

                                            </div>

                                        )}


                                        {/* ==================================
                                            REGISTRATION OPEN
                                        ================================== */}

                                        {registrationStatus === "open" && (

                                            <>


                                                {/* ==========================
                                                    SEATS FILLED
                                                ========================== */}

                                                {seatsFilled && (

                                                    <div className="network-form-alert network-form-alert-warning">

                                                        <strong>
                                                            Registration Full
                                                        </strong>

                                                        <p>
                                                            Unfortunately, we
                                                            are unable to confirm
                                                            your registration as
                                                            all seats are fully
                                                            booked. Please
                                                            contact us for
                                                            further information.
                                                        </p>

                                                    </div>

                                                )}


                                                {/* ==========================
                                                    FORM
                                                ========================== */}

                                                {!seatsFilled && (

                                                    <form
                                                        id="networkForm"
                                                        className="network-registration-form"
                                                        onSubmit={(e) => Submit(e)}
                                                    >


                                                        {/* ======================
                                                            PERSONAL INFORMATION
                                                        ====================== */}

                                                        <div className="network-form-section">

                                                            <div className="network-form-section-title">

                                                                <span>
                                                                    01
                                                                </span>

                                                                <div>

                                                                    <h3>
                                                                        Personal Information
                                                                    </h3>

                                                                    <p>
                                                                        Tell us a little about yourself.
                                                                    </p>

                                                                </div>

                                                            </div>


                                                            <div className="network-form-grid">


                                                                {/* NAME */}

                                                                <div className="network-field">

                                                                    <label htmlFor="network-name">
                                                                        Full Name
                                                                        <span>*</span>
                                                                    </label>

                                                                    <input
                                                                        id="network-name"
                                                                        name="Name"
                                                                        type="text"
                                                                        placeholder="Enter your full name"
                                                                        required
                                                                    />

                                                                </div>


                                                                {/* EMAIL */}

                                                                <div className="network-field">

                                                                    <label htmlFor="network-email">
                                                                        Email Address
                                                                        <span>*</span>
                                                                    </label>

                                                                    <input
                                                                        id="network-email"
                                                                        name="Email"
                                                                        type="email"
                                                                        placeholder="name@example.com"
                                                                        required
                                                                    />

                                                                </div>


                                                                {/* PHONE */}

                                                                <div className="network-field network-field-full">

                                                                    <label htmlFor="network-phone">
                                                                        Phone Number
                                                                        <span>*</span>
                                                                    </label>

                                                                    <input
                                                                        id="network-phone"
                                                                        name="Phone"
                                                                        type="text"
                                                                        placeholder="Enter your phone number"
                                                                        required
                                                                    />

                                                                </div>


                                                                {/* GENDER */}

                                                                <div className="network-field network-field-full">

                                                                    <label>
                                                                        Gender
                                                                        <span>*</span>
                                                                    </label>

                                                                    <div className="network-choice-group">

                                                                        <label className="network-choice">

                                                                            <input
                                                                                type="radio"
                                                                                name="Gender"
                                                                                value="Male"
                                                                                required
                                                                            />

                                                                            <span>
                                                                                Male
                                                                            </span>

                                                                        </label>


                                                                        <label className="network-choice">

                                                                            <input
                                                                                type="radio"
                                                                                name="Gender"
                                                                                value="Female"
                                                                                required
                                                                            />

                                                                            <span>
                                                                                Female
                                                                            </span>

                                                                        </label>

                                                                    </div>

                                                                </div>


                                                                {/* AGE */}

                                                                <div className="network-field network-field-full">

                                                                    <label>
                                                                        Age Group
                                                                        <span>*</span>
                                                                    </label>

                                                                    <div className="network-choice-group network-age-group">

                                                                        <label className="network-choice">

                                                                            <input
                                                                                type="radio"
                                                                                name="Age"
                                                                                value="18-25"
                                                                                required
                                                                            />

                                                                            <span>
                                                                                18–25
                                                                            </span>

                                                                        </label>


                                                                        <label className="network-choice">

                                                                            <input
                                                                                type="radio"
                                                                                name="Age"
                                                                                value="26-35"
                                                                                required
                                                                            />

                                                                            <span>
                                                                                26–35
                                                                            </span>

                                                                        </label>


                                                                        <label className="network-choice">

                                                                            <input
                                                                                type="radio"
                                                                                name="Age"
                                                                                value="36-45"
                                                                                required
                                                                            />

                                                                            <span>
                                                                                36–45
                                                                            </span>

                                                                        </label>


                                                                        <label className="network-choice">

                                                                            <input
                                                                                type="radio"
                                                                                name="Age"
                                                                                value="45+"
                                                                                required
                                                                            />

                                                                            <span>
                                                                                45+
                                                                            </span>

                                                                        </label>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>


                                                        {/* ======================
                                                            EDUCATION & CAREER
                                                        ====================== */}

                                                        <div className="network-form-section">

                                                            <div className="network-form-section-title">

                                                                <span>
                                                                    02
                                                                </span>

                                                                <div>

                                                                    <h3>
                                                                        Education & Career
                                                                    </h3>

                                                                    <p>
                                                                        Help us understand your professional background.
                                                                    </p>

                                                                </div>

                                                            </div>


                                                            <div className="network-form-grid">


                                                                {/* EDUCATION */}

                                                                <div className="network-field">

                                                                    <label htmlFor="network-education">
                                                                        Highest Level of Education
                                                                        <span>*</span>
                                                                    </label>

                                                                    <input
                                                                        id="network-education"
                                                                        name="Education"
                                                                        type="text"
                                                                        placeholder="Your highest education"
                                                                        required
                                                                    />

                                                                </div>


                                                                {/* INSTITUTE */}

                                                                <div className="network-field">

                                                                    <label htmlFor="network-institute">
                                                                        Educational Institute
                                                                        <span>*</span>
                                                                    </label>

                                                                    <input
                                                                        id="network-institute"
                                                                        name="Institue"
                                                                        type="text"
                                                                        placeholder="School, university or institute"
                                                                        required
                                                                    />

                                                                </div>


                                                                {/* OCCUPATION */}

                                                                <div className="network-field network-field-full">

                                                                    <label htmlFor="network-occupation">
                                                                        Current Occupation
                                                                        <span>*</span>
                                                                    </label>

                                                                    <input
                                                                        id="network-occupation"
                                                                        name="Occupation"
                                                                        type="text"
                                                                        placeholder="Your current occupation"
                                                                        required
                                                                    />

                                                                </div>


                                                                {/* CAREER INTEREST */}

                                                                <div className="network-field network-field-full">

                                                                    <label htmlFor="network-subject">
                                                                        Career Interest
                                                                    </label>

                                                                    <select
                                                                        id="network-subject"
                                                                        name="Subject"
                                                                        value={selected || ""}
                                                                        onChange={(e) =>
                                                                            setSelected(e.target.value)
                                                                        }
                                                                    >

                                                                        <option value="">
                                                                            Select your career interest
                                                                        </option>

                                                                        <option value="Läkare">
                                                                            Läkare
                                                                        </option>

                                                                        <option value="Sjuksköterska">
                                                                            Sjuksköterska
                                                                        </option>

                                                                        <option value="Undersköterska">
                                                                            Undersköterska
                                                                        </option>

                                                                        <option value="Lärare">
                                                                            Lärare
                                                                        </option>

                                                                        <option value="Förskollärare">
                                                                            Förskollärare
                                                                        </option>

                                                                        <option value="Systemutvecklare">
                                                                            Systemutvecklare
                                                                        </option>

                                                                        <option value="IT-konsult">
                                                                            IT-konsult
                                                                        </option>

                                                                        <option value="Elektriker">
                                                                            Elektriker
                                                                        </option>

                                                                        <option value="Ekonom">
                                                                            Ekonom
                                                                        </option>

                                                                        <option value="Jurist">
                                                                            Jurist
                                                                        </option>

                                                                        <option value="Apotekare">
                                                                            Apotekare
                                                                        </option>

                                                                        <option value="Servitör/Servitris">
                                                                            Servitör/Servitris
                                                                        </option>

                                                                        <option value="Butikssäljare">
                                                                            Butikssäljare
                                                                        </option>

                                                                        <option value="Taxiförare">
                                                                            Taxiförare
                                                                        </option>

                                                                        <option value="Bussförare">
                                                                            Bussförare
                                                                        </option>

                                                                        <option value="Personlig assistent">
                                                                            Personlig assistent
                                                                        </option>

                                                                        <option value="Social Handlägare">
                                                                            Social Handlägare
                                                                        </option>

                                                                        <option value="Resturang Chef">
                                                                            Resturang Chef
                                                                        </option>

                                                                        <option value="Others">
                                                                            Others
                                                                        </option>

                                                                    </select>


                                                                    {selected === "Others" && (

                                                                        <input
                                                                            name="ExtSubject"
                                                                            type="text"
                                                                            className="network-other-input"
                                                                            placeholder="Please specify your career interest"
                                                                        />

                                                                    )}

                                                                </div>

                                                            </div>

                                                        </div>


                                                        {/* ======================
                                                            ADDITIONAL INFORMATION
                                                        ====================== */}

                                                        <div className="network-form-section">

                                                            <div className="network-form-section-title">

                                                                <span>
                                                                    03
                                                                </span>

                                                                <div>

                                                                    <h3>
                                                                        Additional Information
                                                                    </h3>

                                                                    <p>
                                                                        Anything else you would like us to know.
                                                                    </p>

                                                                </div>

                                                            </div>


                                                            {/* COMMENT */}

                                                            <div className="network-field">

                                                                <label htmlFor="network-comment">
                                                                    Comment
                                                                </label>

                                                                <textarea
                                                                    id="network-comment"
                                                                    name="Comment"
                                                                    rows="4"
                                                                    placeholder="Write your comment here..."
                                                                    onInput={(e) => {

                                                                        e.target.style.height =
                                                                            "auto";

                                                                        e.target.style.height =
                                                                            e.target.scrollHeight +
                                                                            "px";

                                                                    }}
                                                                />

                                                            </div>


                                                            {/* CONTRIBUTION */}

                                                            <div className="network-contribution">

                                                                <label>

                                                                    <input
                                                                        type="checkbox"
                                                                        name="Swish"
                                                                        id="swish"
                                                                    />

                                                                    <span className="network-contribution-check"></span>

                                                                    <span className="network-contribution-text">

                                                                        <strong>
                                                                            Support the event
                                                                        </strong>

                                                                        <small>
                                                                            I would like to contribute
                                                                            to the event and Swish
                                                                            to 1230432419. (Any amount and its optional).
                                                                        </small>

                                                                    </span>

                                                                </label>

                                                                <span
                                                                    id="swishTo"
                                                                    className="swishto"
                                                                ></span>

                                                            </div>

                                                        </div>


                                                        {/* ======================
                                                            SUBMIT
                                                        ====================== */}

                                                        <div className="network-form-submit">

                                                            <button
                                                                type="submit"
                                                                id="register"
                                                                className="network-register-button"
                                                            >

                                                                <span>
                                                                    Register Now
                                                                </span>

                                                                <span>
                                                                    →
                                                                </span>

                                                            </button>


                                                            <p>
                                                                By registering, you confirm that
                                                                the information provided above is
                                                                correct.
                                                            </p>

                                                        </div>


                                                    </form>

                                                )}

                                            </>

                                        )}

                                    </>

                                )}

                            </>

                        )}


                        {/* ==========================================
                            NOTIFICATION
                        ========================================== */}

                        <Notification
                            show={modalShow}
                            onHide={() =>
                                setModalShow(false)
                            }
                            title={title}
                            message={message}
                        />


                    </div>

                </div>

            </section>

        </main>

    );

}


export default RegisterToNetwork;