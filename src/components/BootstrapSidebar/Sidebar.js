import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import "./Sidebar.css"

/* global bootstrap: false */
// (function () {
//   'use strict'
//   var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
//   tooltipTriggerList.forEach(function (tooltipTriggerEl) {
//     new bootstrap.Tooltip(tooltipTriggerEl)
//   })
// })()

function sidebar() {
  return (
    <div className="flex-shrink-0 p-3 bg-dark " style={{width: "280px", height: "100vh"}}>
      <a href="/" className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom text-white">
        <span className="fs-5 fw-semibold">Collapsible</span>
      </a>
      <ul className="list-unstyled ps-0 text-white">
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded ">
            Home
          </button>
         
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
            Dashboard
          </button>
          <div className="collapse" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="picnic2024" className="link-dark rounded">Overview</a></li>
              <li><a href="#" className="link-dark rounded">Weekly</a></li>
              <li><a href="#" className="link-dark rounded">Monthly</a></li>
              <li><a href="#" className="link-dark rounded">Annually</a></li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
            Orders
          </button>
          <div className="collapse" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" className="link-dark rounded">New</a></li>
              <li><a href="#" className="link-dark rounded">Processed</a></li>
              <li><a href="#" className="link-dark rounded">Shipped</a></li>
              <li><a href="#" className="link-dark rounded">Returned</a></li>
            </ul>
          </div>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
          <button className="btn btn-toggle align-items-center rounded collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
            Account
          </button>
          <div className="collapse" id="account-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li><a href="#" className="link-dark rounded">New...</a></li>
              <li><a href="#" className="link-dark rounded">Profile</a></li>
              <li><a href="#" className="link-dark rounded">Settings</a></li>
              <li><a href="#" className="link-dark rounded">Sign out</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </div>

  )
}

export default sidebar;