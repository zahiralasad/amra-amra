import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "./logo_in_header.png"

function Test() {
  const [count, setCount] = useState(0);

  // Function to re-render the div
  const handleReRender = () => {
    setCount((prev) => prev + 1); // Updating state triggers a re-render
  };

  return (
    <div>
      <button onClick={handleReRender}>Re-render Div</button>
      <div key={count} style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
        This div re-renders when the button is clicked. Render Count: {count}
      </div>
    </div>
  );
};


export default Test;
