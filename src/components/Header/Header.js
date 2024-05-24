import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "./logo_in_header.png"
import "./header.css";

function Header() {
  const [activeKey, setActiveKey] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('eventKey');
    if (storedKey) {
      setActiveKey(storedKey);
    }
    console.log(activeKey);
  })
  const handleSelect = (selectedKey) => {
    localStorage.setItem("eventKey", selectedKey);
    // setActiveKey(selectedKey);
  };

  const toggleMenu = () => {
    document.getElementById("smallmenu").classList.toggle('show');
    document.getElementById("crossicon").classList.toggle('show');
    document.getElementById("burgericon").classList.toggle('hide');
  }

  return (
    <div id="header">
      <div className="row text-white" id="menuicons">
        <div className='col mx-3'>
          <img className="" src={logo} alt="logo" style={{ height: "36px" }} />
          <span className="mx-2 text-white">আমরা-আমরা</span>
        </div>
        <div className='col text-end'>
          <i id="crossicon" className="bi bi-x" onClick={toggleMenu}></i>
          <i id="burgericon" className="bi bi-list fs-3" onClick={toggleMenu}></i>
        </div>
      </div>
      <Nav fill variant="tabs" id="smallmenu" activeKey={activeKey} onSelect={handleSelect} defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link eventKey="home" href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="events" href="events">Events</Nav.Link>
        </Nav.Item>

        {/* <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link}>
            Events
          </Dropdown.Toggle>

          <Dropdown.Menu className='dropdown-small'>
            <Dropdown.Item href="picnic2024" className="rounded">Picnic 2024</Dropdown.Item>
            <Dropdown.Item href="picnic2023" className="rounded">Picnic 2023</Dropdown.Item>
            <Dropdown.Item href="picnic2022" className="rounded">Picnic 2022</Dropdown.Item>
            <Dropdown.Item href="picnic2021" className="rounded">Picnic 2021</Dropdown.Item>
            <Dropdown.Item href="picnic2019" className="rounded">Picnic 2019</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        <Nav.Item>
          <Nav.Link eventKey="contacts" href="contacts">Contacts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="aboutus" href="aboutus">About Us</Nav.Link>
        </Nav.Item>
      </Nav>

      <Nav fill variant="tabs" id="bigmenu" activeKey={activeKey} onSelect={handleSelect} defaultActiveKey="/home">
        <Nav.Item>
          <img className="" src={logo} alt="logo" style={{ height: "36px" }} />
          <span className="mx-2 text-white">আমরা-আমরা</span>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="home" href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="events" href="events">Events</Nav.Link>
        </Nav.Item>

        {/* <Dropdown as={Nav.Item}>
          <Dropdown.Toggle as={Nav.Link}>
            Events
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="picnic2024" className="rounded">Picnic 2024</Dropdown.Item>
            <Dropdown.Item href="picnic2023" className="rounded">Picnic 2023</Dropdown.Item>
            <Dropdown.Item href="picnic2022" className="rounded">Picnic 2022</Dropdown.Item>
            <Dropdown.Item href="picnic2021" className="rounded">Picnic 2021</Dropdown.Item>
            <Dropdown.Item href="picnic2019" className="rounded">Picnic 2019</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}

        <Nav.Item>
          <Nav.Link eventKey="contacts" href="contacts">Contacts</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="aboutus" href="aboutus">About Us</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="admin" href="admin">Admin</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Header;
