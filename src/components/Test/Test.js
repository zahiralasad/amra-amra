import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "./logo_in_header.png"

function Test() {
  const [male1, setMale1] = useState(""); // State for male1 input value
  const [isMale1Set, setIsMale1Set] = useState(false); // Flag to track if male1 is set

  const handleInput = () => {
    const male = document.getElementById("male1");
    if (male && !isMale1Set) { // Check if the input is not already set
      console.log("First Male 1 Input Value:", male.value);
      setMale1(male.value);
      setIsMale1Set(true); // Mark as set
    }
  };

  const createInput = (divId, i) => {
    const container = document.getElementById(divId);
    if (container && i === 1) {
      const input = document.createElement("input");
      input.setAttribute("class", "form-control");
      input.setAttribute("placeholder", "Full name");
      input.setAttribute("type", "text");
      input.setAttribute("id", "male1");
      input.addEventListener("focusout", handleInput);
      input.setAttribute("required", true);

      container.appendChild(input); // Append input to the container
    }
  };

  return (
    <div>
      <div id="maleContainer"></div>
      <button onClick={() => createInput("maleContainer", 1)}>
        Add Male Input
      </button>
      <p>First Male Input Value: {male1}</p>
    </div>
  );
}


export default Test;
