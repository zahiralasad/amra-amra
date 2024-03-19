import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import '../css/Sidebar.css'


function Sidebar() {
    return (
        <div className="col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100">
            <div className="mt-2">
                {/* I will add logo here */}
                <a className="text-decoration-none ms-4 d-flex align-items-center text-white d-none d-sm-inline" role="button">
                    <span className="f5-4">আমরা আমরা</span>
                </a>
                <hr className="text-white d-none d-sm-block"></hr>
                <ul
                    class="nav nav-pills flex-column" id="parentM"
                >
                    <li class="nav-item my-1">
                        <a href="/" class="nav-link text-white" aria-current="page">
                            <i className="bi bi-house"></i>
                            <span className="ms-2">Home</span>
                        </a>
                    </li>
                    <li class="nav-itemmy-1">
                        <a href="#submenu" class="nav-link text-white" data-bs-toggle="collapse" aria-current="page">
                            <i className="bi bi-grid"></i>
                            <span className="ms-2">Events</span>
                            <i className="bi bi-arrow-down-short text-end"></i>
                        </a>
                        <ul class="nav collapse ms-2 flex-column" id="submenu" data-bas-parent="#parentM">
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#" aria-current="page"
                                >Picnic 2024</a
                                >
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Picnic 2023</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link text-white" href="#">Picnic 2022</a>
                            </li>
                        </ul>

                    </li>
                    <li class="nav-item my-1">
                        <a href="contacts" class="nav-link text-white" aria-current="page">
                            <i className="bi bi-people"></i>
                            <span className="ms-2">Contact</span>
                        </a>
                    </li>
                </ul>

            </div>
            {/* <div class="dropdown open">
                        <a
                            class="btn border-none dropdown-toggle text-white"
                            type="button"
                            id="triggerId"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="bi bi-person f5-4"></i><span className="fs-4 ms-3">Zahir</span>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="triggerId">
                            <a class="dropdown-item" href="#">Profile</a>
                            <a class="dropdown-item disabled" href="#">Setting</a>
                        </div>
                    </div> */}
        </div>
    )
}
export default Sidebar;