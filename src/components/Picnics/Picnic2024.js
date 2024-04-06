import { useState, useEffect } from "react"
import Form from "react-bootstrap/Form"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./picnic.css"




function Picnic2024() {
  const [adults, setAdults] = useState(1);
  const [bigkids, setBigKids] = useState(0);
  const [smallkids, setSmallKids] = useState(0);
  const [babys, setBabys] = useState(0);
  const [selectednumber, setSelectedNumber] = useState(0);


  useEffect(()=>{
    let cost= adults*375 + bigkids*275 + smallkids* 245;
    document.getElementById("cost").innerHTML = cost;
  
  })

  const addInput = (event, divId) => {
    event.preventDefault();
    const number = event.target.value;
    var inputContainer = document.getElementById(divId);
    inputContainer.innerHTML = ''; // Clear previous inputs

    for (var i = 1; i <= number; i++) {
      const mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "form-group input-group mb-3");

      const icon = document.createElement("i");
      if (divId == "adultContainer") {
        icon.setAttribute("class", "bi bi-person-fill me-2");
      } else if (divId == "bigKidContainer") {
        icon.setAttribute("class", "bi bi-person-standing me-2");
      } else if (divId == "smallKidContainer"){
        icon.setAttribute("class", "bi bi-person-arms-up me-2");
      } else {
        icon.setAttribute("class", "bi bi-balloon-fill me-2");
      }
      
      mainDiv.appendChild(icon);

      const span2 = document.createElement("span")
      span2.setAttribute("class", "input-group-text");
      span2.setAttribute("style", "width: '80px'");

      if (divId == "adultContainer") {
        span2.textContent = "Adult " + i;
        setAdults(i);
      } else if (divId == "bigKidContainer") {
        span2.textContent = "Big Kid " + i;
        setBigKids(1);
      } 
      else if (divId == "smallKidContainer"){
        span2.textContent = "Small Kid " + i;
        setSmallKids(1);
      }else {
        span2.textContent = "Baby " + i;
        setBabys(i);
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
      {/* <i className="icon bi-envelope"></i> 
      <i class="bi bi-people"></i>
      */}
      <div className="container">
        <div className="p-4 rounded bg-dark">
          <h4>Registration Form for Picnic 2024</h4>
        </div>
      </div>
      <div className="container">
        <div className="mt-2 p-4 rounded bg-dark">
          <form>
            <div className="mt-2 p-4 rounded border">
              <div class="form-group input-group mb-3 border-bottom pb-1">
                <i className="bi bi-people-fill me-2"></i>
                <span className="input-group-text" style={{ width: "370px" }}> Number of adults</span>
                <select class="custom-select" onChange={(event) => addInput(event, "adultContainer")}>
                  <option value="1" b-1elected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="10">10</option>
                </select>
                <p className="ms-2">(375kr/adult)</p>
              </div>
              <div id="adultContainer">
                <div class="form-group input-group mb-3">
                 <i className="bi bi-person-fill me-2"></i>
                  <span class="input-group-text" style={{ width: "80px" }}>Adult 1</span>
                  <input name="" class="form-control" placeholder="Full name" type="text" />
                </div>
              </div>
            </div>
            <div className="mt-2 p-4 rounded border">
              <div class="form-group input-group mb-3 border-bottom pb-1">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                </div>
                <span className="input-group-text" style={{ width: "370px" }}> Number of children born between 2013 to 2018</span>
                <select class="custom-select" onChange={(event) => addInput(event, "bigKidContainer")}>
                  <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="10">10</option>
                </select>
                <p className="ms-2">(275kr/adult)</p>
              </div>
              <div id="bigKidContainer"></div>
            </div>
            <div className="mt-2 p-4 rounded border">
              <div class="form-group input-group  mb-3 border-bottom pb-1">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                </div>
                <span className="input-group-text" style={{ width: "370px" }}> Number of children born between 2019 to 2020</span>
                <select class="custom-select" onChange={(event) => addInput(event, "smallKidContainer")}>
                <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="10">10</option>
                </select>
                <p className="ms-2">(2455kr/adult)</p>
              </div>
              <div id="smallKidContainer"></div>
            </div>
            <div className="mt-2 p-4 rounded border">
              <div class="form-group input-group  mb-3 border-bottom pb-1">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                </div>
                <span className="input-group-text" style={{ width: "370px" }}> Number of children born between 2021 to 2024</span>
                <select class="custom-select" onChange={(event) => addInput(event, "babyContainer")}>
                <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="10">10</option>
                </select>
                <p className="ms-2">(0kr/adult)</p>
              </div>
              <div id="babyContainer"></div>
            </div>
            <div className="mt-2 p-4 rounded border">
              <div class="form-group input-group  mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                <span class="input-group-text" style={{ width: "80px" }}>Email</span>
                <input name="" class="form-control" placeholder="Email address" type="email" />
              </div>
            </div>
            <div className="mt-2 p-4 rounded border">
              <div class="form-group input-group  mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text"> <i class="fa fa-phone"></i> </span>
                </div>
                <span class="input-group-text" style={{ width: "80px" }}>Phone</span>
                <input name="" class="form-control" placeholder="Phone number" type="text" />
              </div>
            </div>
            <div className="mt-2 p-4 rounded border">
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
            </div>
            <div className="mt-2 rounded border">
              <div className="form-group input-group p-2">
                <p className="mx-2">Total fee:</p>
                <p className="p" id="cost"></p>
                <p>kr</p>
              </div>
            </div>
            <div class="form-group mt-3">
              <button type="submit" class="btn btn-primary btn-block"> Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>







    // </div>

  );
}



export default Picnic2024;