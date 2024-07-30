import React from 'react';

const StickyLoginButton = () => {
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
    alert('Login button clicked!');
  };

  return (
    <button style={buttonStyle} onClick={handleClick}>
      Admin Login
    </button>
  );
};

export default StickyLoginButton;