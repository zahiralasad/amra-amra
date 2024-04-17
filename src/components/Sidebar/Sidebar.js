import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "./Sidebar.css"
import logo from "./logo_125x125.png"


function Sidebar() {
    return (
        <div id="sidebar" className="flex-shrink-0 p-3 bg-dark" style={{ width: "280px", height: "100vh" }}>
            {/* brand and logo */}
            <a className="brand text-decoration-none text-white" href="/">
                <img className="" src={logo} alt="logo" />
                <span>আমরা-আমরা</span>
            </a>
            {/* sidebar menu  */}
            <ul className="list-unstyled ps-0">
                <li className="mb-1">
                    <a href="/" className="btn btn-toggle align-items-center">
                        Home
                    </a>
                </li>

                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                        Events
                    </button>
                    <div className="collapse " id="dashboard-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="picnic2024" className="rounded">Picnic 2024</a></li>
                            <li><a href="picnic2023" className="rounded">Picnic 2023</a></li>
                            <li><a href="picnic2022" className="rounded">Picnic 2022</a></li>
                            <li><a href="picnic2021" className="rounded">Picnic 2021</a></li>
                            <li><a href="picnic2019" className="rounded">Picnic 2019</a></li>
                        </ul>
                    </div>
                </li>
                <li className="mb-1">
                    <a href="contacts" className="btn btn-toggle align-items-center">
                        Contacts
                    </a>
                </li>
                <li className="mb-1">
                    <a href="aboutus" className="btn btn-toggle align-items-center">
                        About Us
                    </a>
                </li>
                <li className="border-top my-3"></li>
                {/* sidebar admin part */}
                <li className="mb-1">
                    <button className="btn btn-toggle align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                        Admin
                    </button>
                    <div className="collapse" id="account-collapse">
                        <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                            <li><a href="#" className="rounded">New...</a></li>
                            <li><a href="#" className="rounded">Profile</a></li>
                            <li><a href="#" className="rounded">Settings</a></li>
                            <li><a href="#" className="rounded">Sign out</a></li>
                        </ul>
                    </div>
                </li>


            </ul>


        </div>
    )
}
export default Sidebar;