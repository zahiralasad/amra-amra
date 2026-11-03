import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./EventDetails.css";


const EVENTS_API_URL =
    "https://script.google.com/macros/s/AKfycbwoNQHZnU5j4Pb8NIwzuVsBg5TBKlKRhYJXsxmCK0J6Rb8QRCf6-ixVudn7-KReaDcu/exec";


/* ======================================================
   ICONS
====================================================== */

const CalendarIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
    </svg>
);


const LocationIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
    </svg>
);


const FacebookIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
);


/* ======================================================
   EVENT DETAILS
====================================================== */

function EventDetails() {

    const { eventId } = useParams();

    const { language } = useLanguage();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    /* ==================================================
       LOAD EVENT
    ================================================== */

    useEffect(() => {

        const loadEvent = async () => {

            try {

                setLoading(true);
                setError(false);

                const response = await fetch(
                    `${EVENTS_API_URL}?id=${encodeURIComponent(eventId)}`
                );

                if (!response.ok) {
                    throw new Error("Could not load event");
                }

                const data = await response.json();

                if (!data.success || !data.event) {
                    throw new Error("Event not found");
                }

                setEvent(data.event);

            } catch (err) {

                console.error("Error loading event:", err);

                setError(true);

            } finally {

                setLoading(false);

            }

        };


        loadEvent();

    }, [eventId]);


    /* ==================================================
       LOADING
    ================================================== */

    if (loading) {

        return (
            <main className="event-details-page">

                <div className="container event-details-status">
                    <p>
                        {language === "bn"
                            ? "অনুষ্ঠানের তথ্য লোড হচ্ছে..."
                            : "Loading event..."}
                    </p>
                </div>

            </main>
        );
    }


    /* ==================================================
       ERROR
    ================================================== */

    if (error || !event) {

        return (
            <main className="event-details-page">

                <div className="container event-details-status">

                    <h1>
                        {language === "bn"
                            ? "অনুষ্ঠানটি পাওয়া যায়নি"
                            : "Event not found"}
                    </h1>

                    <Link
                        to="/events"
                        className="event-back-button"
                    >
                        ←{" "}
                        {language === "bn"
                            ? "সব অনুষ্ঠান দেখুন"
                            : "View all events"}
                    </Link>

                </div>

            </main>
        );
    }


    /* ==================================================
       LANGUAGE DATA
    ================================================== */

    const title =
        language === "bn"
            ? event.title_bn
            : event.title_en;


    const location =
        language === "bn"
            ? event.location_bn
            : event.location_en;


    const description =
        language === "bn"
            ? event.description_bn
            : event.description_en;


    const highlightsText =
        language === "bn"
            ? event.highlights_bn
            : event.highlights_en;


    /* ==================================================
       HIGHLIGHTS
    ================================================== */

    const highlights = highlightsText
        ? highlightsText
            .split("|")
            .map((item) => item.trim())
            .filter(Boolean)
        : [];


    /* ==================================================
       GALLERY
    ================================================== */

    const galleryImages = event.gallery_images
        ? event.gallery_images
            .split(",")
            .map((name) => name.trim())
            .filter(Boolean)
            .map((name) => ({
                name,
                src: `/images/events/${event.id}/${name}`
            }))
        : [];


    /* ==================================================
       DATE
    ================================================== */

    const formatEventDate = (dateString) => {

        if (!dateString) {
            return "";
        }

        const date = new Date(
            `${dateString}T00:00:00`
        );

        return date.toLocaleDateString(
            language === "bn"
                ? "bn-BD"
                : "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );
    };


    /* ==================================================
       UPCOMING EVENT
    ================================================== */

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const eventDate = event.date
        ? new Date(`${event.date}T00:00:00`)
        : null;

    const isUpcoming =
        eventDate &&
        eventDate >= today;


    return (

        <main className="event-details-page">


            {/* ==================================================
                BREADCRUMB
            ================================================== */}

            <div className="container event-breadcrumb">

                <Link to="/">
                    {language === "bn"
                        ? "হোম"
                        : "Home"}
                </Link>

                <span>›</span>

                <Link to="/events">
                    {language === "bn"
                        ? "অনুষ্ঠান"
                        : "Events"}
                </Link>

                <span>›</span>

                <span>{title}</span>

            </div>


            {/* ==================================================
                EVENT INFORMATION
            ================================================== */}

            <section className="event-detail-hero">

                <div className="container event-detail-grid">


                    {/* EVENT IMAGE */}

                    <div className="event-detail-image">

                        {event.image ? (

                            <img
                                src={event.image}
                                alt={title}
                            />

                        ) : (

                            <div className="event-detail-image-placeholder">
                                <span>আমরা-আমরা</span>
                            </div>

                        )}

                    </div>


                    {/* EVENT CONTENT */}

                    <div className="event-detail-content">

                        <span className="event-detail-label">
                            {language === "bn"
                                ? "আমরা-আমরা আয়োজন"
                                : "Amra-Amra Event"}
                        </span>


                        <h1>
                            {title}
                        </h1>


                        <div className="event-detail-meta">

                            <div>
                                <span className="event-detail-meta-icon">
                                    <CalendarIcon />
                                </span>

                                <span>
                                    {formatEventDate(event.date)}
                                </span>
                            </div>


                            <div>
                                <span className="event-detail-meta-icon">
                                    <LocationIcon />
                                </span>

                                <span>
                                    {location}
                                </span>
                            </div>

                        </div>


                        {description && (

                            <p className="event-detail-description">
                                {description}
                            </p>

                        )}


                        {/* HIGHLIGHTS */}

                        {highlights.length > 0 && (

                            <div className="event-highlights">

                                <h2>
                                    {language === "bn"
                                        ? "মূল আকর্ষণ"
                                        : "Event Highlights"}
                                </h2>

                                <ul>

                                    {highlights.map(
                                        (highlight, index) => (

                                            <li key={index}>
                                                <span>✓</span>

                                                <p>
                                                    {highlight}
                                                </p>
                                            </li>

                                        )
                                    )}

                                </ul>

                            </div>

                        )}


                        {/* ==================================================
                            REGISTRATION
                            Only shown for upcoming events
                        ================================================== */}

                        {isUpcoming && event.registration_url && (

                            <div className="event-registration">

                                {event.registration_url.startsWith("http") ? (

                                    <a
                                        href={event.registration_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="event-registration-button"
                                    >
                                        {language === "bn"
                                            ? "রেজিস্ট্রেশন করুন"
                                            : "Register Now"}

                                        <span>→</span>
                                    </a>

                                ) : (

                                    <Link
                                        to={event.registration_url}
                                        className="event-registration-button"
                                    >
                                        {language === "bn"
                                            ? "রেজিস্ট্রেশন করুন"
                                            : "Register Now"}

                                        <span>→</span>
                                    </Link>

                                )}

                            </div>

                        )}

                    </div>

                </div>

            </section>


            {/* ==================================================
                EVENT GALLERY
            ================================================== */}

            {galleryImages.length > 0 && (

                <section className="event-gallery-section">

                    <div className="container">


                        <div className="event-section-heading">

                            <h2>
                                {language === "bn"
                                    ? "অনুষ্ঠানের ছবি"
                                    : "Event Photos"}
                            </h2>

                            <div className="event-heading-line">
                                <span></span>
                                <span></span>
                            </div>

                        </div>


                        <div className="event-gallery-grid">

                            {galleryImages.map(
                                (image, index) => (

                                    <div
                                        className="event-gallery-item"
                                        key={image.name}
                                    >

                                        <img
                                            src={image.src}
                                            alt={`${title} ${index + 1}`}
                                            loading="lazy"
                                        />

                                    </div>

                                )
                            )}

                        </div>

                    </div>

                </section>

            )}


            {/* ==================================================
                FACEBOOK PHOTOS
            ================================================== */}

            {event.facebook_url && (

                <section className="event-facebook-section">

                    <div className="container">

                        <div className="event-facebook-box">


                            {/* FACEBOOK ICON */}

                            <div className="event-facebook-icon">
                                <FacebookIcon />
                            </div>


                            {/* DIVIDER */}

                            <div className="event-facebook-divider"></div>


                            {/* TEXT */}

                            <div className="event-facebook-content">

                                <h2>
                                    {language === "bn"
                                        ? "আরও ছবি দেখতে চান?"
                                        : "Want to see more photos?"}
                                </h2>

                                <p>
                                    {language === "bn"
                                        ? "এই অনুষ্ঠানের সম্পূর্ণ ছবির অ্যালবাম আমাদের Facebook পেজে দেখুন।"
                                        : "See the complete photo album from this event on our Facebook page."}
                                </p>

                            </div>


                            {/* FACEBOOK BUTTON */}

                            <a
                                href={event.facebook_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="event-facebook-button"
                            >
                                <span className="event-facebook-external-icon">
                                    ↗
                                </span>

                                <span>
                                    {language === "bn"
                                        ? "Facebook-এ সব ছবি দেখুন"
                                        : "View all photos on Facebook"}
                                </span>

                                <span className="event-facebook-arrow">
                                    →
                                </span>
                            </a>


                        </div>

                    </div>

                </section>

            )}


        </main>
    );
}


export default EventDetails;