import React from "react";
import "bootstrap/dist/css/bootstrap.css"
import "../css/style.css"


function Sidebar() {
    const handleClick = () => {
        document.querySelector("#sidebar").classList.toggle("expand")
    }
    return (
        <aside id="sidebar">
            <div className="d-flex tmp">
                <button className="toggle-btn" type="button" onClick={handleClick}>
                    <i class="lni lni-grid-alt"></i>
                </button>
                <div class="sidebar-logo">
                    <a href="#">আমরা আমরা</a>
                </div>
            </div>
            <ul class="sidebar-nav">
                <li class="sidebar-item">
                    <a href="/" class="sidebar-link">
                        <i class="lni lni-user"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
                        data-bs-target="#multi" aria-expanded="false" aria-controls="multi">
                        <i class="lni lni-layout"></i>
                        <span>Events</span>
                    </a>
                    <ul id="multi" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                        <li class="sidebar-subitem">
                            <a href="picnic2024" class="sidebar-link">Picnic 2024</a>
                        </li>
                        <li class="sidebar-subitem">
                            <a href="#" class="sidebar-link">Picnic 2023</a>
                        </li>
                        <li class="sidebar-subitem">
                            <a href="#" class="sidebar-link">Picnic 2022</a>
                        </li>
                    </ul>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-agenda"></i>
                        <span>About Us</span>
                    </a>
                </li>
                <li class="sidebar-item">
                    <a href="#" class="sidebar-link">
                        <i class="lni lni-popup"></i>
                        <span>Contacts</span>
                    </a>
                </li>
            </ul>
            <div class="sidebar-footer">
                <div>Admin</div>
                <a href="#" class="sidebar-link">
                    <i class="lni lni-exit"></i>
                    <span>Logout</span>
                </a>
            </div>
        </aside>

    )
}
export default Sidebar;