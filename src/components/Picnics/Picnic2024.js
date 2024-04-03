import { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"

import "./picnic.css"

function Picnic2024() {
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
  
      if (divId == "adultContainer") {
        span2.textContent = "Adult " + i;
      } else if(divId == "childContainer") {
        span2.textContent = "Child " + i;
      } else {
        span2.textContent = "Baby " + i;

      } 

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
    <div className="picnic">
      <div>
        <h4>Registration Form for Picnic 2024</h4>
      </div>
      <form>
        <div class="form-group input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
          </div>
          <span className="input-group-text" style={{ width: "370px" }}> Number of adults</span>
          <select class="custom-select" onChange={(event) => onChange(event, "adultContainer")}>
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="10">10</option>
          </select>
        </div>
        <div id="adultContainer">
          <div class="form-group input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="bi bi-person-fillr"></i> </span>
            </div>
            <span class="input-group-text" style={{ width: "80px" }}>Adult 1</span>
            <input name="" class="form-control" placeholder="Full name" type="text" />
          </div>
        </div>
        <div class="form-group input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
          </div>
          <span className="input-group-text" style={{ width: "370px" }}> Number of children born between 2013 to 2020</span>
          <select class="custom-select" onChange={(event) => onChange(event, "childContainer")}>
            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="10">10</option>
          </select>
        </div>
        <div id="childContainer">
          <div class="form-group input-group  mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="bi bi-person-fillr"></i> </span>
            </div>
            <span class="input-group-text" style={{ width: "80px" }}>Child 1</span>
            <input name="" class="form-control" placeholder="Full name" type="text" />
          </div>
        </div>

        <div class="form-group input-group  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
          </div>
          <span className="input-group-text" style={{ width: "370px" }}> Number of children born between 2013 to 2020</span>
          <select class="custom-select" onChange={(event) => onChange(event, "babyContainer")}>

            <option value="1" selected>1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="10">10</option>
          </select>
        </div>
        <div id="babyContainer">
          <div class="form-group input-group  mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="bi bi-person-fillr"></i> </span>
            </div>
            <span class="input-group-text" style={{ width: "80px" }}>Baby 1</span>
            <input name="" class="form-control" placeholder="Full name" type="text" />
          </div>
        </div>
        <div class="form-group input-group  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
          </div>
          <span class="input-group-text" style={{ width: "80px" }}>Email</span>
          <input name="" class="form-control" placeholder="Email address" type="email" />
        </div>
        <div class="form-group input-group  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
          </div>
          <span class="input-group-text" style={{ width: "80px" }}>Phone</span>
          <input name="" class="form-control" placeholder="Phone number" type="text" />
        </div>
        <div class="form-group input-group  mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
          </div>
          <span class="input-group-text" style={{ width: "90px" }}>Bus Stop</span>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="busstop" id="busstop1" />
            <label class="form-check-label" for="busstop1">
              Sollentuna
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="busstop" id="busstop2" />
            <label class="form-check-label" for="busstop2">
              Kungs Kurva
            </label>
          </div>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block"> Register</button>
        </div>
      </form>

    </div>







    // </div>

  );
}



export default Picnic2024;