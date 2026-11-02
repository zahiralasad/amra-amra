import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../Context/LanguageContext";
import "./Header.css";

import logo from "../../images/logo.png";

function Header() {
  const { language, setLanguage, t } = useLanguage();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">

        {/* BRAND */}
        <Link
          to="/"
          className="header-brand"
          onClick={closeMenu}
        >
          <img
            src={logo}
            alt="আমরা-আমরা"
            className="header-logo"
          />

          <div className="header-brand-text">
            <strong>আমরা-আমরা</strong>

            <span>
              {language === "bn"
                ? "একতা • সংস্কৃতি • সবার জন্য"
                : "Unity • Culture • Community"}
            </span>
          </div>
        </Link>


        {/* DESKTOP / MOBILE NAVIGATION */}
        <nav
          className={`header-nav ${menuOpen ? "menu-open" : ""
            }`}
        >
          <NavLink to="/" onClick={closeMenu}>
            {t("nav.home")}
          </NavLink>

          <NavLink to="/events" onClick={closeMenu}>
            {t("nav.events")}
          </NavLink>

          <NavLink to="/aboutus" onClick={closeMenu}>
            {t("nav.about")}
          </NavLink>

          <NavLink to="/members" onClick={closeMenu}>
            {t("nav.members")}
          </NavLink>

          <NavLink to="/gallery" onClick={closeMenu}>
            {t("nav.gallery")}
          </NavLink>

          <NavLink to="/contacts" onClick={closeMenu}>
            {t("nav.contact")}
          </NavLink>
        </nav>


        {/* RIGHT SIDE */}
        <div className="header-actions">

          {/* LANGUAGE */}
          <div className="language-switcher">
            <button
              type="button"
              className={
                language === "bn"
                  ? "selected"
                  : ""
              }
              onClick={() => setLanguage("bn")}
            >
              বাংলা
            </button>

            <span>|</span>

            <button
              type="button"
              className={
                language === "en"
                  ? "selected"
                  : ""
              }
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>


          {/* HAMBURGER */}
          <button
            type="button"
            className={`menu-toggle ${menuOpen ? "open" : ""
              }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;