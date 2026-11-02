import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { useLanguage } from "../Context/LanguageContext";

import communityHands from "../../images/community-hands.png";

const EVENTS_API_URL = "https://script.google.com/macros/s/AKfycbzCoZH__LKTUdlIzg3WTcFwW5BSkjFYsYByGHKavfYGuEtNZgVE30lhpysE_OrxwK7L/exec";

const PeopleIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <circle
            cx="9"
            cy="7"
            r="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        />
        <path
            d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);


const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
        <path
            d="m9 12 2 2 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);


const LeafIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M20.84 4.61C18.5 2.27 14.7 2.27 12.36 4.61L4.61 12.36a6 6 0 0 0 8.48 8.48l7.75-7.75c2.34-2.34 2.34-6.14 0-8.48Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
        />
        <path
            d="M6 18C9 13 13 9 18 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);


const HeartIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
        />
    </svg>
);

const CultureIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M4 20h16" />
        <path d="M6 17h12" />
        <path d="M8 17V9" />
        <path d="M12 17V9" />
        <path d="M16 17V9" />
        <path d="M5 9h14L12 4 5 9Z" />
    </svg>
);


const PicnicIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="12" cy="6" r="3" />
        <path d="M4 20 10 9" />
        <path d="m20 20-6-11" />
        <path d="M7 15h10" />
        <path d="M5 20h14" />
    </svg>
);


const GenerationIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="12" cy="7" r="3" />
        <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
        <path d="M5 10a3 3 0 0 0-3 3" />
        <path d="M19 10a3 3 0 0 1 3 3" />
        <path d="M2 17v-1" />
        <path d="M22 17v-1" />
    </svg>
);


function Home() {
    const { t, language } = useLanguage();

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [eventsLoading, setEventsLoading] = useState(true);
    const [eventsError, setEventsError] = useState(false);
    const MEMBER_COMMUNITY_IMAGE = "/images/home/member-community.png";



    useEffect(() => {
        const loadEvents = async () => {
            try {
                setEventsLoading(true);
                setEventsError(false);

                const response = await fetch(EVENTS_API_URL);

                if (!response.ok) {
                    throw new Error("Could not load events");
                }

                const data = await response.json();

                setUpcomingEvents(data.upcoming || []);
                setPastEvents(data.past || []);
            } catch (error) {
                console.error("Error loading events:", error);
                setEventsError(true);
            } finally {
                setEventsLoading(false);
            }
        };

        loadEvents();
    }, []);

    const formatEventDate = (dateString) => {
        if (!dateString) return "";

        const date = new Date(`${dateString}T00:00:00`);

        return date.toLocaleDateString(
            language === "bn" ? "bn-BD" : "en-GB",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );
    };

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

    const ClockIcon = () => (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </svg>
    );

    return (
        <div className="home-page">

            <section className="hero">
                <div className="hero-shade"></div>

                <div className="container hero-container">
                    <div className="hero-content">

                        <p className="hero-intro">
                            {t("hero.intro")}
                        </p>

                        <h1 className="hero-title">
                            <span className="hero-green">
                                {t("hero.nameFirst")}
                            </span>

                            <span className="hero-red">
                                {t("hero.nameSecond")}
                            </span>
                        </h1>

                        <p className="hero-description">
                            {t("hero.description")}
                        </p>

                        <div className="hero-actions">

                            <Link
                                to="/aboutus"
                                className="hero-btn hero-btn-primary"
                            >
                                {t("hero.aboutButton")}
                                <span>→</span>
                            </Link>

                            <Link
                                to="/members"
                                className="hero-btn hero-btn-secondary"
                            >
                                {t("hero.memberButton")}
                            </Link>

                        </div>

                    </div>
                </div>
            </section>
            <section className="about-preview">

                <div className="container about-preview-grid">

                    {/* IMAGE */}
                    <div className="about-preview-image-wrap">
                        <div className="about-preview-image-ring">
                            <img
                                src={communityHands}
                                alt="Amra-Amra community"
                                className="about-preview-image"
                            />
                        </div>
                    </div>


                    {/* TEXT */}
                    <div className="about-preview-content">

                        <div className="about-preview-heading">
                            <h2>
                                <span className="about-title-green">
                                    {t("aboutHome.titleFirst")}
                                </span>{" "}
                                <span className="about-title-red">
                                    {t("aboutHome.titleSecond")}
                                </span>
                            </h2>

                            <div className="about-heading-line">
                                <span></span>
                                <span></span>
                            </div>
                        </div>

                        <p className="about-preview-description">
                            {t("aboutHome.description")}
                        </p>

                        <Link
                            to="/aboutus"
                            className="about-preview-button"
                        >
                            {t("aboutHome.readMore")}
                            <span>→</span>
                        </Link>

                    </div>


                    {/* VALUE CARDS */}
                    <div className="about-values">

                        <div className="about-value-card">
                            <div className="about-value-icon icon-red">
                                <PeopleIcon />
                            </div>

                            <h3>{t("aboutHome.openTitle")}</h3>

                            <p>{t("aboutHome.openText")}</p>
                        </div>


                        <div className="about-value-card">
                            <div className="about-value-icon icon-green">
                                <ShieldIcon />
                            </div>

                            <h3>{t("aboutHome.equalityTitle")}</h3>

                            <p>{t("aboutHome.equalityText")}</p>
                        </div>


                        <div className="about-value-card">
                            <div className="about-value-icon icon-green">
                                <LeafIcon />
                            </div>

                            <h3>{t("aboutHome.cultureTitle")}</h3>

                            <p>{t("aboutHome.cultureText")}</p>
                        </div>


                        <div className="about-value-card">
                            <div className="about-value-icon icon-red">
                                <HeartIcon />
                            </div>

                            <h3>{t("aboutHome.generationTitle")}</h3>

                            <p>{t("aboutHome.generationText")}</p>
                        </div>

                    </div>

                </div>

            </section>
            <section className="home-events">
                <div className="container">

                    <div className="home-events-heading">
                        <h2 className="home-events-title">
                            <span>{t("eventsHome.titleFirst")}</span>{" "}
                            <strong>{t("eventsHome.titleSecond")}</strong>
                        </h2>

                        <div className="home-events-line">
                            <span></span>
                            <span></span>
                        </div>
                    </div>


                    <div className="upcoming-events-header">
                        <div className="event-section-icon">
                            <CalendarIcon />
                        </div>

                        <div className="event-section-heading-text">
                            <h3>{t("eventsHome.upcoming")}</h3>

                            <p>{t("eventsHome.upcomingSubtitle")}</p>
                        </div>
                    </div>

                    {eventsLoading ? (
                        <div className="home-events-message">
                            {t("eventsHome.loading")}
                        </div>
                    ) : eventsError ? (
                        <div className="home-events-message error">
                            {t("eventsHome.error")}
                        </div>
                    ) : upcomingEvents.length > 0 ? (
                        (() => {
                            const event = upcomingEvents[0];

                            const title =
                                language === "bn"
                                    ? event.title_bn
                                    : event.title_en;

                            const location =
                                language === "bn"
                                    ? event.location_bn
                                    : event.location_en;

                            return (
                                <article className="featured-event">

                                    {/* LEFT: IMAGE */}
                                    <div className="featured-event-image">

                                        {event.image ? (
                                            <img
                                                src={event.image}
                                                alt={title}
                                            />
                                        ) : (
                                            <div className="featured-event-placeholder">
                                                <span>আমরা-আমরা</span>
                                            </div>
                                        )}

                                        <div className="featured-event-date">
                                            <strong>
                                                {new Date(
                                                    `${event.date}T00:00:00`
                                                ).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                })}
                                            </strong>

                                            <span>
                                                {new Date(
                                                    `${event.date}T00:00:00`
                                                )
                                                    .toLocaleDateString("en-GB", {
                                                        month: "short",
                                                    })
                                                    .toUpperCase()}
                                            </span>

                                            <span>
                                                {new Date(
                                                    `${event.date}T00:00:00`
                                                ).getFullYear()}
                                            </span>
                                        </div>
                                    </div>


                                    {/* RIGHT: INFORMATION */}
                                    <div className="featured-event-content">

                                        <span className="featured-event-label">
                                            {t("eventsHome.nextEvent")}
                                        </span>

                                        <h3>{title}</h3>

                                        <div className="featured-event-meta">

                                            <div>
                                                <CalendarIcon />

                                                <span>
                                                    {formatEventDate(event.date)}
                                                </span>
                                            </div>

                                            <div>
                                                <LocationIcon />

                                                <span>{location}</span>
                                            </div>

                                        </div>

                                        <Link
                                            to={event.detail_url || "/events"}
                                            className="featured-event-button"
                                        >
                                            {t("eventsHome.details")}
                                            <span>→</span>
                                        </Link>

                                    </div>

                                </article>
                            );
                        })()
                    ) : (
                        <div className="home-events-message">
                            <strong>
                                {t("eventsHome.noUpcomingTitle")}
                            </strong>

                            <p>
                                {t("eventsHome.noUpcomingText")}
                            </p>
                        </div>
                    )}

                    {/* ======================================================    PAST EVENTS   ====================================================== */}

                    <div className="past-events-section">

                        <div className="past-events-header">
                            <div className="event-section-icon">
                                <ClockIcon />
                            </div>

                            <div className="event-section-heading-text">
                                <h3>{t("eventsHome.past")}</h3>
                                <p>{t("eventsHome.pastSubtitle")}</p>
                            </div>
                        </div>


                        {eventsLoading ? (
                            <div className="home-events-message">
                                {t("eventsHome.loading")}
                            </div>
                        ) : eventsError ? (
                            <div className="home-events-message error">
                                {t("eventsHome.error")}
                            </div>
                        ) : pastEvents.length > 0 ? (

                            <div className="past-events-grid">

                                {pastEvents.map((event) => {

                                    const title =
                                        language === "bn"
                                            ? event.title_bn
                                            : event.title_en;

                                    const location =
                                        language === "bn"
                                            ? event.location_bn
                                            : event.location_en

                                    const eventDate =
                                        new Date(`${event.date}T00:00:00`);

                                    return (
                                        <article
                                            className="past-event-card"
                                            key={event.id}
                                        >

                                            {/* IMAGE */}

                                            <div className="past-event-image">

                                                {event.image ? (
                                                    <img
                                                        src={event.image}
                                                        alt={title}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="past-event-placeholder">
                                                        <span>আমরা-আমরা</span>
                                                    </div>
                                                )}

                                                {/* DATE BADGE */}

                                                <div className="past-event-date">

                                                    <strong>
                                                        {eventDate.toLocaleDateString(
                                                            "en-GB",
                                                            {
                                                                day: "2-digit",
                                                            }
                                                        )}
                                                    </strong>

                                                    <span>
                                                        {eventDate
                                                            .toLocaleDateString(
                                                                "en-GB",
                                                                {
                                                                    month: "short",
                                                                }
                                                            )
                                                            .toUpperCase()}
                                                    </span>

                                                    <span>
                                                        {eventDate.getFullYear()}
                                                    </span>

                                                </div>

                                            </div>


                                            {/* CONTENT */}

                                            <div className="past-event-body">

                                                <h3>{title}</h3>

                                                <div className="past-event-meta">

                                                    <div>
                                                        <LocationIcon />
                                                        <span>{location}</span>
                                                    </div>

                                                </div>


                                                <Link
                                                    to={event.detail_url || "/events"}
                                                    className="past-event-button"
                                                >
                                                    {t("eventsHome.memories")}
                                                    <span>→</span>
                                                </Link>

                                            </div>

                                        </article>
                                    );
                                })}

                            </div>

                        ) : (
                            <div className="home-events-message">
                                {t("eventsHome.noPast")}
                            </div>
                        )}


                        <div className="all-events-action">
                            <Link
                                to="/events"
                                className="all-events-button"
                            >
                                {t("eventsHome.viewAll")}
                                <span>→</span>
                            </Link>
                        </div>

                    </div>

                </div>
            </section>
            {/* ======================================================    GOALS & OBJECTIVES   ====================================================== */}

            <section className="home-objectives">

                <div className="container">

                    {/* SECTION HEADING */}
                    <div className="objectives-heading">

                        <h2 className="objectives-title">
                            <span>
                                {t("objectivesHome.titleFirst")}
                            </span>{" "}

                            <strong>
                                {t("objectivesHome.titleSecond")}
                            </strong>
                        </h2>

                        <div className="objectives-heading-line">
                            <span></span>
                            <span></span>
                        </div>

                        <p className="objectives-intro">
                            {t("objectivesHome.intro")}
                        </p>

                    </div>


                    {/* OBJECTIVE CARDS */}
                    <div className="objectives-grid">


                        {/* CULTURE */}
                        <article className="objective-card">

                            <div className="objective-icon objective-icon-red">
                                <CultureIcon />
                            </div>

                            <h3>
                                {t("objectivesHome.cultureTitle")}
                            </h3>

                            <p>
                                {t("objectivesHome.cultureText")}
                            </p>

                        </article>


                        {/* PICNIC */}
                        <article className="objective-card">

                            <div className="objective-icon objective-icon-green">
                                <PicnicIcon />
                            </div>

                            <h3>
                                {t("objectivesHome.picnicTitle")}
                            </h3>

                            <p>
                                {t("objectivesHome.picnicText")}
                            </p>

                        </article>


                        {/* NEXT GENERATION */}
                        <article className="objective-card">

                            <div className="objective-icon objective-icon-red">
                                <GenerationIcon />
                            </div>

                            <h3>
                                {t("objectivesHome.generationTitle")}
                            </h3>

                            <p>
                                {t("objectivesHome.generationText")}
                            </p>

                        </article>

                    </div>


                    {/* BUTTON */}
                    <div className="objectives-action">

                        <Link
                            to="/aboutus"
                            className="objectives-button"
                        >
                            {t("objectivesHome.learnMore")}
                            <span>→</span>
                        </Link>

                    </div>

                </div>

            </section>
            {/* ======================================================  BECOME A MEMBER  ====================================================== */}

            <section className="home-membership">

                <div className="membership-banner">

                    <div className="container membership-inner">

                        <div className="membership-content">

                            <h2>
                                {t("memberHome.title")}
                            </h2>

                            <p>
                                {t("memberHome.description")}
                            </p>

                            <Link
                                to="/registermember"
                                className="membership-button"
                            >
                                {t("memberHome.joinButton")}
                                <span>→</span>
                            </Link>

                        </div>

                    </div>

                    <div className="membership-image">
                        <img
                            src={MEMBER_COMMUNITY_IMAGE}
                            alt="Amra-Amra community"
                        />
                    </div>

                </div>

            </section>
        </div>
    );
}

export default Home;