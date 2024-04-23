import { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import banner from "../../images/form-banner.jpg"


import "./picnic.css"


function Picnic2024() {
  const [adults, setAdults] = useState(1);
  const [bigkids, setBigKids] = useState(0);
  const [smallkids, setSmallKids] = useState(0);
  const [babys, setBabys] = useState(0);
  // const [selectednumber, setSelectedNumber] = useState(0);


  useEffect(() => {
    let cost = adults * 375 + bigkids * 275 + smallkids * 245 + babys * 0;
    document.getElementById("cost").innerHTML = cost;
    const numbers = ["Zahir Al-Asad (0760141646)", "Hossain Jahan Adil Mahmud (0704050314)", "Md Shawon Hasan Reza (0739109544)", "Zamil Abedin (0763944014)", "Md Tarek Hasan (0700295808)", "Mohammad Delower Hossin (0760151904)", "Mohammad Haque (0762268977)"];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const number = numbers[randomIndex];
    document.getElementById('swishTo').innerHTML = number;
    // output.value = number;
    // formData.swishTo= number;

  })

  const addInput = (event, divId) => {
    event.preventDefault();
    const number = event.target.value;
    var inputContainer = document.getElementById(divId);
    inputContainer.innerHTML = ''; // Clear previous inputs

    for (var i = 1; i <= number; i++) {
      let id="";
      const mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "form-group input-group mb-3");

      const icon = document.createElement("i");
      if (divId === "adultContainer") {
        icon.setAttribute("class", "bi bi-person-fill me-2");
      } else if (divId === "bigKidContainer") {
        icon.setAttribute("class", "bi bi-person-standing me-2");
      } else if (divId === "smallKidContainer") {
        icon.setAttribute("class", "bi bi-person-arms-up me-2");
      } else {
        icon.setAttribute("class", "bi bi-balloon-fill me-2");
      }

      mainDiv.appendChild(icon);

      const span2 = document.createElement("span")
      span2.setAttribute("class", "input-group-text");
      span2.setAttribute("style", "width: '80px'");

      if (divId === "adultContainer") {
        span2.textContent = "Adult " + i;
        setAdults(i);
        id="adult"+i;
      } else if (divId === "bigKidContainer") {
        span2.textContent = "Big Kid " + i;
        setBigKids(1);
        id="bigkid"+i;
      }
      else if (divId === "smallKidContainer") {
        span2.textContent = "Small Kid " + i;
        setSmallKids(1);
        id="smallkid"+i;
      } else {
        span2.textContent = "Baby " + i;
        setBabys(i);
        id="baby"+i;
      }

      const input = document.createElement("input");
      input.setAttribute("class", "form-control");
      input.setAttribute("placeholder", "Full name");
      input.setAttribute("type", "text");
      input.setAttribute("id", id);
      input.setAttribute("required", true)

      mainDiv.appendChild(span2);
      mainDiv.appendChild(input);

      inputContainer.appendChild(mainDiv);
    }
  }

  return (
    <div className="picnic">
      <div className="p-4 text-center rounded bg-dark">
        <h4>Registration Form for Picnic 2024</h4>
        <img src={banner} className="img-fluid"/>
      </div>
      <div className="mt-1 p-2 rounded bg-dark">
        <form className="needs-validation" novalidate>
          <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
            <div className="d-flex mb-3 input-group border-bottom pb-1">  
                <i className="bi bi-people-fill me-2"></i>
                <span className="input-group-text"> Number of adults</span>
                <select className="custom-select" onChange={(event) => addInput(event, "adultContainer")}>
                  <option value="1" id="adult1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <p className="ms-2">(375kr/adult)</p>  
            </div>
            <div id="adultContainer">
              <div className="input-group  mb-3">
                <i className="bi bi-person-fill me-2"></i>
                <span className="input-group-text">Adult 1</span>
                <input name="" className="form-control" placeholder="Full name" type="text" required />
              </div>
            </div>
          </div>
          <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
            <div className="d-flex input-group mb-3 border-bottom pb-1">
                <i className="bi bi-person-standing me-2"></i>
                <span className="input-group-text text-wrap"> Number of children born between 2013 to 2018</span>
              <select className="custom-select" onChange={(event) => addInput(event, "bigKidContainer")}>
                <option value="0" selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <p className="ms-2">(275kr/child)</p>
            </div>
            <div id="bigKidContainer"></div>
          </div>
          <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
            <div className="input-group  mb-3 border-bottom pb-1">
              <i className="bi bi-person-arms-up me-2"></i>
              <span className="input-group-text text-wrap"> Number of children born between 2019 to 2020</span>
              <select className="custom-select" onChange={(event) => addInput(event, "smallKidContainer")}>
                <option value="0" selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <p className="ms-2">(2455kr/child)</p>
            </div>
            <div id="smallKidContainer"></div>
          </div>
          <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
            <div className="form-group input-group  mb-3 border-bottom pb-1">
              <i className="bi bi-balloon-fill me-2"></i>
              <span className="input-group-text text-wrap"> Number of children born between 2021 to 2024</span>
              <select className="custom-select" onChange={(event) => addInput(event, "babyContainer")}>
                <option value="0" selected>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <p className="ms-2">(0kr/child)</p>
            </div>
            <div id="babyContainer"></div>
          </div>
          <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
            <div className="form-group input-group  mb-3">
              <i className="bi bi-envelope-fill me-2"></i>
              <span className="input-group-text" style={{ width: "80px" }}>Email</span>
              <input id="email" className="form-control" placeholder="Email address" type="email" required />
            </div>
          </div>
          <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
            <div className="form-group input-group  mb-3">
              <i className="bi bi-telephone-fill me-2"></i>
              <span className="input-group-text" style={{ width: "80px" }}>Phone</span>
              <input id="phone" className="form-control" placeholder="Phone number" type="text" required />
            </div>
          </div>
          <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
            <div className="form-group input-group  mb-3">
              <i className="bi bi-bus-front-fill me-2"></i>
              <span className="input-group-text me-1" style={{ width: "90px" }}>Bus Stop</span>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="busstop" id="busstop1" required />
                <label className="form-check-label" htmlFor="busstop1">
                  Sollentuna
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="busstop" id="busstop2" required />
                <label className="form-check-label" htmlFor="busstop2">
                  Kungs Kurva
                </label>
              </div>
            </div>
          </div>
          <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
            <div className="form-group input-group ">
              <p className="mx-2">Total fee:</p>
              <p className="p" id="cost"></p>
              <p>kr</p>
            </div>
          </div>
          <div className="mt-2 rounded border p-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="swish" required />
              <label className="form-check-label" htmlFor="swish">
                I have swished to
              </label>
              <span id="swishTo" className="ms-2 h6"></span>
            </div>
          </div>
          <div className="form-group mt-3">
            <button type="submit" className="btn btn-primary btn-block"> Register</button>
          </div>
        </form>
      </div>
    </div>
  );
}



export default Picnic2024;