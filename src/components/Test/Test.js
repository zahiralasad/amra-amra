import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "./logo_in_header.png"

function Test() {
  const [activeKey, setActiveKey] = useState('home');

  const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
  };
  
  return (
    <Nav fill variant="tabs" activeKey={activeKey} onSelect={handleSelect} defaultActiveKey="/home">
      <Nav.Item>
        <img className="" src={logo} alt="logo" style={{height: "36px"}} />
        <span className="mx-2">আমরা-আমরা</span>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="home" href="/">Home</Nav.Link>
      </Nav.Item>
     
      <Dropdown as={Nav.Item}>
      <Dropdown.Toggle as={Nav.Link}>
        Events
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

      <Nav.Item>
        <Nav.Link eventKey="contacts">Contacts</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="aboutus">About Us</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Test;
