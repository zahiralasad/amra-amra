import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "./logo_40x40.png";
import "./header.css";
import {useState, useEffect} from "react"

function Header() {
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        document.getElementById("menu").classList.toggle('show');
        document.getElementById("crossicon").classList.toggle('show');
        document.getElementById("menuicon").classList.toggle('hide');
    }
    // const toggleBtn = document.querySelector(".toggle-btn");
    // const toggleBtnIcon = document.querySelector(".toggle-btn i");
    // const toggleMenu = document.querySelector(".menu");

    return (
        <div id="header">
            <div className="text-white d-flex justify-content-end " onClick={toggleMenu}>
                    <i id="crossicon" className="bi bi-x"></i>
                    <i id="menuicon" className="bi bi-list fs-3"></i>
                </div>
            <div id="menu">
                <div className="d-flex justify-content-center">
                    <ul className="list-unstyled list-group">
                        <li><a className="text-decoration-none text-white" href="/">Home</a></li>
                        <li id="event-menu">
                            <button className="btn-ext align-items-center collapsed events-btn">
                                Events
                            </button>
                            <ul id="events" className="list-unstyled">
                                <li><a href="picnic2024" className="rounded">Picnic 2024</a></li>
                                <li><a href="picnic2023" className="rounded">Picnic 2023</a></li>
                                <li><a href="picnic2022" className="rounded">Picnic 2022</a></li>
                                <li><a href="picnic2021" className="rounded">Picnic 2021</a></li>
                                <li><a href="picnic2019" className="rounded">Picnic 2019</a></li>
                            </ul>
                        </li>
                        <li><a className="list-group_item text-decoration-none text-white">Contacts</a></li>
                        <li><a className="list-group_item text-decoration-none text-white">About Us</a></li>
                        <li>
                            <button type="button" className="btn-ext" data-toggle="collapse">Admin</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="toggle-btn text-white d-flex justify-content-end" onClick={toggleMenu}>
                
            </div>


        </div>
    )
}
export default Header;