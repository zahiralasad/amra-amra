import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./AboutUs.css";


/* ======================================================
   ICONS
====================================================== */

const PeopleIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2" />
        <circle cx="17" cy="8" r="2.5" />
        <path d="M16 14a5 5 0 0 1 5 5v1" />
    </svg>
);


const ShieldIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
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
    </svg>
);


const FestivalIcon = () => (
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
        <path d="M6 20v-7" />
        <path d="M18 20v-7" />
        <path d="M4 13h16" />
        <path d="m5 13 3-5 4 5 4-5 3 5" />
        <path d="M12 4v4" />
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


function AboutUs() {
    const { t } = useLanguage();

    return (
        <div className="about-page">

            {/* ======================================================
                PAGE HERO
            ====================================================== */}

            <section className="about-hero">
                <div className="container about-hero-inner">

                    <span className="about-hero-label">
                        {t("aboutPage.label")}
                    </span>

                    <h1>
                        <span>{t("aboutPage.heroFirst")}</span>{" "}
                        <strong>{t("aboutPage.heroSecond")}</strong>
                    </h1>

                    <div className="about-page-heading-line">
                        <span></span>
                        <span></span>
                    </div>

                    <p>{t("aboutPage.heroDescription")}</p>

                </div>
            </section>


            {/* ======================================================
                WHO WE ARE
            ====================================================== */}

            <section className="about-section about-intro-section">
                <div className="container">

                    <div className="about-section-heading">
                        <h2>
                            <span>{t("aboutPage.whatTitleFirst")}</span>{" "}
                            <strong>{t("aboutPage.whatTitleSecond")}</strong>
                        </h2>

                        <div className="about-page-heading-line">
                            <span></span>
                            <span></span>
                        </div>
                    </div>


                    <div className="about-intro-grid">

                        <article className="about-info-card">
                            <div className="about-info-icon red">
                                <PeopleIcon />
                            </div>

                            <h3>{t("aboutPage.whatTitle")}</h3>

                            <p>{t("aboutPage.whatText")}</p>
                        </article>


                        <article className="about-info-card">
                            <div className="about-info-icon green">
                                <PeopleIcon />
                            </div>

                            <h3>{t("aboutPage.whoTitle")}</h3>

                            <p>{t("aboutPage.whoText")}</p>
                        </article>


                        <article className="about-info-card">
                            <div className="about-info-icon red">
                                <ShieldIcon />
                            </div>

                            <h3>{t("aboutPage.valuesTitle")}</h3>

                            <p>{t("aboutPage.valuesText")}</p>
                        </article>

                    </div>

                </div>
            </section>


            {/* ======================================================
                OUR GOAL
            ====================================================== */}

            <section className="about-goal-section">
                <div className="container about-goal-grid">

                    <div className="about-goal-icon">
                        <CultureIcon />
                    </div>

                    <div className="about-goal-content">

                        <span className="about-small-label">
                            {t("aboutPage.goalLabel")}
                        </span>

                        <h2>{t("aboutPage.goalTitle")}</h2>

                        <p>{t("aboutPage.goalText")}</p>

                    </div>

                </div>
            </section>


            {/* ======================================================
                OBJECTIVES
            ====================================================== */}

            <section className="about-section about-objectives-section">
                <div className="container">

                    <div className="about-section-heading">

                        <h2>
                            <span>{t("aboutPage.objectivesFirst")}</span>{" "}
                            <strong>{t("aboutPage.objectivesSecond")}</strong>
                        </h2>

                        <div className="about-page-heading-line">
                            <span></span>
                            <span></span>
                        </div>

                        <p>{t("aboutPage.objectivesIntro")}</p>

                    </div>


                    <div className="about-objectives-grid">

                        <article className="about-objective-card">
                            <div className="about-objective-icon red">
                                <FestivalIcon />
                            </div>

                            <h3>{t("aboutPage.festivalTitle")}</h3>

                            <p>{t("aboutPage.festivalText")}</p>
                        </article>


                        <article className="about-objective-card">
                            <div className="about-objective-icon green">
                                <PicnicIcon />
                            </div>

                            <h3>{t("aboutPage.picnicTitle")}</h3>

                            <p>{t("aboutPage.picnicText")}</p>
                        </article>


                        <article className="about-objective-card">
                            <div className="about-objective-icon red">
                                <GenerationIcon />
                            </div>

                            <h3>{t("aboutPage.generationTitle")}</h3>

                            <p>{t("aboutPage.generationText")}</p>
                        </article>

                    </div>

                </div>
            </section>


            {/* ======================================================
                JOIN CTA
            ====================================================== */}

            <section className="about-join">
                <div className="container about-join-inner">

                    <div>
                        <h2>{t("aboutPage.joinTitle")}</h2>
                        <p>{t("aboutPage.joinText")}</p>
                    </div>

                    <Link
                        to="/registermember"
                        className="about-join-button"
                    >
                        {t("aboutPage.joinButton")}
                        <span>→</span>
                    </Link>

                </div>
            </section>

        </div>
    );
}

export default AboutUs;