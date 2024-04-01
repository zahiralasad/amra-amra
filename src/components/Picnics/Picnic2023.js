import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"

import "./picnic.css"
import { event } from "jquery";

// function onChange(event,divId) {
//     const number = event.target.value;
//     var divContainer = document.getElementById("inputContainer");
//     divContainer.innerHTML = ''; // Clear previous inputs

//     for (var i = 0; i < number; i++) {
//         const mainDiv = document.createElement("div");
//         mainDiv.setAttribute("class", "form-group input-group mb-3");

//         const nextedDiv1 = document.createElement("div");
//         nextedDiv1.setAttribute("class", "input-group-prepend");

//         const span1 = document.createElement("span");
//         span1.setAttribute("class","input-group-text");
        
//         const icon = document.createElement("i");
//         icon.setAttribute("class", "fa fa-phone");
//         span1.appendChild(icon);

//         nextedDiv1.appendChild(span1);
//         mainDiv.appendChild(nextedDiv1);

//         const span2 = document.createElement("span")
//         span2.setAttribute("class", "input-group-text");
//         span2.setAttribute("style", "width: '80px'");

//         const input = document.createElement("input");
//         input.setAttribute("class", "form-control");
//         input.setAttribute("placeholder", "Full name");
//         input.setAttribute("type", "text");

//         mainDiv.appendChild(span2);
//         mainDiv.appendChild(input);

//         divContainer.appendChild(mainDiv);
//     }

// }

const test = (event,id) => {
    console.log("Event: ", event);
    console.log("id: ", id);
    const number = event.target.value;
}

function Picnic2023() {


    const [adults, setAdults] = useState(0);
    const [kids, setKids] = useState(0);
    const [babys, setBabys] = useState(0);
    const [selectednumber, setSelectedNumber] = useState(0);
  
    const onChange = (event, divId) => {
      const number = event.target.value;
      var inputContainer = document.getElementById(divId);
      inputContainer.innerHTML = ''; // Clear previous inputs
  
      for (var i = 1; i <= number; i++) {
        const mainDiv = document.createElement("div");
        mainDiv.setAttribute("class", "form-group input-group mb-3");
  
        const nextedDiv1 = document.createElement("div");
        nextedDiv1.setAttribute("class", "input-group-prepend");
  
        const span1 = document.createElement("span");
        span1.setAttribute("class", "input-group-text");
  
        const icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-phone");
        span1.appendChild(icon);
  
        nextedDiv1.appendChild(span1);
        mainDiv.appendChild(nextedDiv1);
  
        const span2 = document.createElement("span")
        span2.setAttribute("class", "input-group-text");
        span2.setAttribute("style", "width: '80px'");
        span2.textContent ="Adult " + i;
  
        const input = document.createElement("input");
        input.setAttribute("class", "form-control");
        input.setAttribute("placeholder", "Full name");
        input.setAttribute("type", "text");
  
        mainDiv.appendChild(span2);
        mainDiv.appendChild(input);
  
        inputContainer.appendChild(mainDiv);
      }
    }

    return (
        <form>
            <div class="form-group input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                </div>
                <span className="input-group-text" style={{ width: "370px" }}> Number of adults</span>
                <select class="custom-select" onChange={(event)=>  onChange(event,"inputContainer")}>
                    <option selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div id="inputContainer">
          <div class="form-group input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="bi bi-person-fillr"></i> </span>
            </div>
            <span class="input-group-text" style={{ width: "80px" }}>Adult 1</span>
            <input name="" class="form-control" placeholder="Full name" type="text" />
          </div>
        </div>
            
        </form>
    )
}
export default Picnic2023;