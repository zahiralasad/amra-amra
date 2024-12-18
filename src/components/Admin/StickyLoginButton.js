import {React, useState} from 'react';
import Admin from './Admin';

const StickyLoginButton = () => {
  const [modalShow, setModalShow]=useState(false);
  
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    fontSize: '16px',
  };

  const handleClick = () => {
    // Handle the login action here
    setModalShow(true);  
  };

  return (
    <>
      <button style={buttonStyle} onClick={handleClick}>
        Admin Login
      </button>
      {/* <Admin 
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
      <div>Help</div>
    </>
  );
};

export default StickyLoginButton;