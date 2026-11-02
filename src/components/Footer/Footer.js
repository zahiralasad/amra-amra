import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import logo from "../../images/logo.png";
import "./Footer.css";


const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v7h4v-7h3l1-4h-4V9c0-.7.3-1 1-1Z" />
    </svg>
);

const InstagramIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
    >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
);

const YouTubeIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M21.5 7.2a2.8 2.8 0 0 0-2-2C17.7 4.7 12 4.7 12 4.7s-5.7 0-7.5.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.5-4.8ZM10 15.2V8.8l5.5 3.2-5.5 3.2Z" />
    </svg>
);

const EmailIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
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


function Footer() {

    const { t } = useLanguage();

    return (
        <footer className="site-footer">

            <div className="container footer-main">


                {/* BRAND */}
                <div className="footer-brand">

                    <div className="footer-brand-row">

                        <img
                            src={logo}
                            alt="Amra-Amra"
                            className="footer-logo"
                        />

                        <div className="footer-brand-text">
                            <strong>আমরা-আমরা</strong>

                            <span>
                                {t("footer.tagline")}
                            </span>
                        </div>

                    </div>

                </div>


                {/* QUICK LINKS */}
                <div className="footer-links">

                    <h3>
                        {t("footer.quickLinks")}
                    </h3>

                    <div className="footer-links-grid">

                        <Link to="/">
                            {t("footer.home")}
                        </Link>

                        <Link to="/aboutus">
                            {t("footer.about")}
                        </Link>

                        <Link to="/events">
                            {t("footer.events")}
                        </Link>

                        <Link to="/members">
                            {t("footer.members")}
                        </Link>

                        <Link to="/gallery">
                            {t("footer.gallery")}
                        </Link>

                        <Link to="/contacts">
                            {t("footer.contact")}
                        </Link>

                    </div>

                </div>


                {/* CONTACT */}
                <div className="footer-contact">

                    <h3>
                        {t("footer.contact")}
                    </h3>

                    <a
                        href="mailto:info@amra-amra.se"
                        className="footer-contact-item"
                    >
                        <span className="footer-contact-icon">
                            <EmailIcon />
                        </span>

                        <span>info@amra-amra.se</span>
                    </a>

                    <div className="footer-contact-item">
                        <span className="footer-contact-icon">
                            <LocationIcon />
                        </span>

                        <span>{t("footer.location")}</span>
                    </div>

                    <div className="footer-socials">

                        <a
                            href="YOUR_FACEBOOK_URL"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <FacebookIcon />
                        </a>

                        <a
                            href="YOUR_INSTAGRAM_URL"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <InstagramIcon />
                        </a>

                        <a
                            href="YOUR_YOUTUBE_URL"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                        >
                            <YouTubeIcon />
                        </a>

                    </div>

                </div>


            </div>


            {/* COPYRIGHT */}
            <div className="footer-bottom">

                <div className="container">

                    <p>
                        © {new Date().getFullYear()}{" "}
                        {t("footer.copyright")}
                    </p>

                </div>

            </div>

        </footer>
    );
}


export default Footer;