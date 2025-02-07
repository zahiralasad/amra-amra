import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import banner from "../../images/form-banner-1.jpg";

import axios from 'axios';

import "../../css/form.css";
import Notification from '../Notification';


function RegisterToEnter() {
  const [adults, setAdults] = useState(1);
  const [bigkids, setBigKids] = useState(0);
  const [smallkids, setSmallKids] = useState(0);
  const [babys, setBabys] = useState(0);
  const [response, setResponse] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [modalShow, setModalShow] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const url = 'https://script.google.com/macros/s/AKfycbzMbB5oTRwtu_GD6aZHbPHNVKzPokNaZVhVIv38X_mSC_-nSobfYn34DJS2JK_fgmUu/exec';

  const apiUrl = "https://amra-amra.se/emailApi/";

  useEffect(() => {
    let cost = adults * 385 + bigkids * 285 + smallkids * 255 + babys * 0;
    document.getElementById("totalFee").value = cost;
    document.getElementById("cost").innerHTML = cost;
  })

  useEffect(() => {
    randomName();
  }, []);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data.data);
        setEntries(data.data); // Update the state with JSON data
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const adultNames = entries
    .filter((entry) => entry["Adults Names"]) // Ensure 'Adults Names' key is not empty
    .map((entry) => entry["Adults Names"]); // Extract the name

  // console.log(adultNames);

  const adultPartners = entries
  .filter((entry) => entry["Adult Partner"])
  .map((entry)=>entry["Adult Partner"]);

  const kidPartners = entries
  .filter((entry) => entry["Kid Partner"])
  .map((entry)=>entry["Kid Partner"]);

  function Submit(e) {
    document.getElementById("register").disabled = true;
    const formElm = document.querySelector('form');
    e.preventDefault();
    const formData = new FormData(formElm);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    // axios.post(url, formData)
    //   .then(response => {
    //     if (response.data === "successful") {
    //       sendEmail(formData);
    //     } else {
    //       setTitle("Warning");
    //       setMessage(response.data);
    //       setModalShow(true);
    //       document.getElementById("register").disabled = false;
    //     }
    //   }).catch(error => setResponse(error));
  }

  const randomName = () => {
    const numbers = ["Zahir Al-Asad (0760141646)", "Hossain Jahan Adil Mahmud (0704050314)", "Md Shawon Hasan Reza (0739109544)", "Zamil Abedin (0763944016)", "Md Tarek Hasan (0700295808)"];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const number = numbers[randomIndex];
    document.getElementById('swishTo').innerHTML = number;
    document.getElementById('swish').value = number;
  }

  const sendEmail = (fData) => {
    fData.append('request', 'picnicRegistrationEmail'); // need to change
    axios.post(apiUrl, fData)
      .then(response => {
        console.log(response.data);
        setClearForm(true);
        setTitle("Registration Completed");
        setMessage(response.data);
        setModalShow(true);
      })
      .catch(error => {
        console.log(error);
        setTitle("Failed to Register");
        setMessage(error);
        setModalShow(true);
      })
    //alert(error));
    console.log("In Clear form: ", clearForm);
    if (clearForm === true) {
      console.log("In Clear form: ", clearForm);
      document.getElementById("entryForm").reset();
    }
  }

  const addInput = (event, divId) => {
    // event.preventDefault();
    const number = event.target.value;
    let games = [];
    var inputContainer = document.getElementById(divId);
    inputContainer.innerHTML = ''; // Clear previous inputs

    for (var i = 1; i <= number; i++) {
      let name = "";
      const mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "input-group mb-3");

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

      const span = document.createElement("span")
      span.setAttribute("class", "input-group-text");

      if (divId === "adultContainer") {
        span.textContent = "Adult " + i;
        setAdults(i);
        name = "Adult" + i;
      } else if (divId === "bigKidContainer") {
        span.textContent = "Big Kid " + i;
        setBigKids(i);
        name = "Bigkid" + i;
      }
      else if (divId === "smallKidContainer") {
        span.textContent = "Small Kid " + i;
        setSmallKids(i);
        name = "Smallkid" + i;
      } else {
        span.textContent = "Baby " + i;
        setBabys(i);
        name = "Baby" + i;
      }

      mainDiv.appendChild(span);

      const input = document.createElement("input");
      input.setAttribute("class", "form-control");
      input.setAttribute("placeholder", "Full name");
      input.setAttribute("type", "text");
      input.setAttribute("Name", name);
      input.setAttribute("required", true)

      mainDiv.appendChild(input);

      inputContainer.appendChild(mainDiv);

      const participationDiv = document.createElement("div");
      participationDiv.setAttribute("class", "row align-items-center");

      const participateText = document.createElement("p");
      participateText.textContent = "Participate in:";
      participationDiv.appendChild(participateText);
      // games = [
      //   { id: "TableTannisSingle", name: "TableTannisSingle", label: "Table Tennis Single" },
      //   { id: "TableTannisDoubles", name: "TableTannisDoubles", label: "Table Tennis Doubles" },
      //   { id: "CarromDoubles", name: "CarromDoubles", label: "Carrom Doubles" },
      //   { id: "InternationalBridge", name: "InternationalBridge", label: "International Bridge" },
      //   { id: "29", name: "29", label: "29" },
      //   { id: "CallBridge", name: "CallBridge", label: "Call Bridge" },
      //   { id: "Ludo", name: "Ludo", label: "Ludo" },
      //   { id: "LudoDoubles", name: "LudoDoubles", label: "Ludo Doubles" },
      //   { id: "Chess", name: "Chess", label: "Chess" },
      //   { id: "Uno", name: "Uno", label: "Uno" },
      // ];
      if (divId === "adultContainer") {
        games = [
          { id: "TableTannisSingle", name: "TableTannisSingle", label: "Table Tennis Single" },
          { id: "TableTannisDoubles", name: "TableTannisDoubles", label: "Table Tennis Doubles" },
          { id: "CarromDoubles", name: "CarromDoubles", label: "Carrom Doubles" },
          { id: "InternationalBridge", name: "InternationalBridge", label: "International Bridge" },
          { id: "29", name: "29", label: "29" },
          { id: "LudoDoubles", name: "LudoDoubles", label: "Ludo Doubles" },
          { id: "Chess", name: "Chess", label: "Chess" }
        ];
      } else if (divId === "bigKidContainer") {
        games = [
          { id: "Chess", name: "Chess", label: "Chess" },
          { id: "Ludo", name: "Ludo", label: "Ludo" },
          { id: "LudoDoubles", name: "LudoDoubles", label: "Ludo Doubles" },
          { id: "Uno", name: "Uno", label: "Uno" }
        ];
      }

      games.forEach(game => {
        // col
        const gameCol = document.createElement("div");
        gameCol.setAttribute("class", "col-4 ms-3");
        const formCheck = document.createElement("div");
        formCheck.setAttribute("class", "form-check");

        const checkbox = document.createElement("input");
        checkbox.setAttribute("class", "form-check-input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("name", game.name);
        checkbox.setAttribute("value", "Yes");
        checkbox.setAttribute("id", game.id);

        const label = document.createElement("label");
        label.setAttribute("class", "form-check-label");
        label.setAttribute("for", game.id);
        label.textContent = game.label;

        // const teamReamin = document.createElement("p");
        // teamReamin.textContent = "team number";
        // formCheck.appendChild(teamReamin);

        formCheck.appendChild(checkbox);
        formCheck.appendChild(label);
        gameCol.appendChild(formCheck);

        const partnerCol = document.createElement("div");
        partnerCol.setAttribute("class", "col-4 ms-3");

        const select = document.createElement("select");
        select.setAttribute("class", "form-select");
        select.setAttribute("style", "width: 150px");

        const defaultOption = document.createElement("option");
        defaultOption.setAttribute("value", "");
        defaultOption.textContent = "Select your partner";
        select.appendChild(defaultOption);

        adultNames.forEach((name) => {
          if (!adultPartners.includes(name)) {
          const option = document.createElement("option");
          option.setAttribute("value", name);
          option.textContent = name;
          select.appendChild(option);
          }
        });

        partnerCol.appendChild(select);

        const seatsCol = document.createElement("div");
        seatsCol.setAttribute("class", "col-2 ms-3");
        seatsCol.textContent = "20 Seats left";

        // Append all columns to the row
        participationDiv.appendChild(gameCol);
        participationDiv.appendChild(partnerCol);
        participationDiv.appendChild(seatsCol);
      });

      // Append participationDiv to container
      inputContainer.appendChild(participationDiv);

    }
  }

  return (
    <div className="row">
      <div className="form">
        <div className="p-4 text-center rounded bg-dark">
          <h4>Registration Form for the Indoor Games Event</h4>
          <img src={banner} className="img-fluid" />
        </div>
        <div className="mt-1 p-2 rounded bg-dark">
          <form className="needs-validation" id="entryForm" onSubmit={(e) => Submit(e)}>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="d-flex mb-3 input-group border-bottom pb-1">
                <i className="bi bi-people-fill me-2"></i>
                <span className="input-group-text"> Number of adults</span>
                <select className="custom-select" onChange={(event) => addInput(event, "adultContainer")}>
                  <option value="1" selected>1</option>
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
                <p className="ms-2">(385kr/adult)</p>
              </div>
              <div id="adultContainer">
                <div className="input-group mb-3">
                  <i className="bi bi-person-fill me-2"></i>
                  <span className="input-group-text">Adult 1</span>
                  <input Name="Adult1" className="form-control" placeholder="Full name" type="text" required />
                </div>
                <div className="row align-items-center">
                  <p>Participate in:</p>
                  <div className="col-4 me-3">
                    <div className="form-check ms-3">
                      <input Name="TableTannis" Value="Yes" className="form-check-input" type="checkbox" id="TableTannis" />
                      <label className="form-check-label" for="TableTannis">
                        Table Tennis Double
                      </label>
                    </div>
                  </div>
                  <div className="col-4 ms-3">
                    <select className="form-select" style={{ width: "150px" }}>
                      <option value="">Select your partner</option>
                      {adultNames
                      .filter((name) => !adultPartners.includes(name)) 
                      .map((name, index) => (
                        <option key={index} value={name} >
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-2 ms-3">
                    20 Seats left
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-4 ms-3">
                    <div className="form-check">
                      <input Name="Ludo" Value="Yes" className="form-check-input" type="checkbox" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Ludo
                      </label>
                    </div>
                  </div>
                  <div className="col-4 ms-3">
                    <select className="form-select" style={{ width: "150px" }}>
                      <option value="">Select your partner</option>
                      {adultNames
                      .filter((name) => !adultPartners.includes(name)) 
                      .map((name, index) => (
                        <option key={index} value={name} >
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-2 ms-3">
                    20 Seats left
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-4 ms-3">
                    <div className="form-check">
                      <input Name="29" Value="Yes" className="form-check-input" type="checkbox" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        29
                      </label>
                    </div>
                  </div>
                  <div className="col-4 ms-3">
                    <select className="form-select" style={{ width: "150px" }}>
                      <option value="">Select your partner</option>
                      {adultNames
                      .filter((name) => !adultPartners.includes(name)) 
                      .map((name, index) => (
                        <option key={index} value={name} >
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-2 ms-3">
                    20 Seats left
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-4 ms-3">
                    <div className="form-check">
                      <input Name="Chess" Value="Yes" className="form-check-input" type="checkbox" id="flexCheckDefault" />
                      <label className="form-check-label" for="flexCheckDefault">
                        Chess
                      </label>
                    </div>
                  </div>
                  <div className="col-4 ms-3">
                    <select className="form-select" style={{ width: "150px" }}>
                      <option value="">Select your partner</option>
                      {adultNames
                      .filter((name) => !adultPartners.includes(name)) 
                      .map((name, index) => (
                        <option key={index} value={name} >
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-2 ms-3">
                    20 Seats left
                  </div>
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
                <p className="ms-2">(285kr/child)</p>
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
                <p className="ms-2">(255kr/child)</p>
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
                <input Name="Email" className="form-control" placeholder="Email address" type="email" required />
              </div>
            </div>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="form-group input-group  mb-3">
                <i className="bi bi-telephone-fill me-2"></i>
                <span className="input-group-text" style={{ width: "80px" }}>Phone</span>
                <input Name="Phone" className="form-control" placeholder="Phone number" type="text" required />
              </div>
            </div>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="form-group input-group ">
                <p className="mx-2">Total fee:</p>
                <p className="p" Name="Cost" id="cost"></p>
                <p>kr</p>
              </div>
              <input type="hidden" Name="Cost" id="totalFee" />
            </div>
            <div className="mt-2 rounded border p-2">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" Name="Swish" id="swish" required />
                <label className="form-check-label" htmlFor="swish">
                  I have swished to
                </label>
                <span id="swishTo" className="swishto ms-2 h9"></span>
              </div>
            </div>
            <div className="form-group mt-3">
              <button type="submit" id="register" className="btn btn-primary btn-block"> Register</button>
            </div>
          </form>
        </div>
        <Notification
          show={modalShow}
          onHide={() => setModalShow(false)}
          title={title}
          message={message}
        />
      </div>
    </div>
  );
}



export default RegisterToEnter;