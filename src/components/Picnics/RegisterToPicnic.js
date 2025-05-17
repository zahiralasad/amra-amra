import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import banner from "../../images/form-banner.jpg";

import axios from 'axios';

import "./picnic.css";
import Notification from '../Notification';


function RegisterToPicnic() {
  const [adults, setAdults] = useState([]);
  const [numberOfAdults, setNumberOfAdults] = useState(0);
  const [bigKids, setBigKids] = useState([]);
  const [numberOfBigkids, setNumberOfBigKids] = useState(0);
  const [smallKids, setSmallKids] = useState([]);
  const [numberOfSmallkids, setNumberOfSmallKids] = useState([]);
  const [response, setResponse] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const [modalShow, setModalShow] = useState(false);
  // const [clearForm, setClearForm] = useState(false);
  // const url = 'https://script.google.com/macros/s/AKfycbxDY3yAoz4dHJtWv9JfL9Xkb7yLhvl28urLLd_X7UsD3Tc_A1pCBlVKz_eMuRHuAosF/exec';
  const url = 'https://script.google.com/macros/s/AKfycbz3FE7L9Trr-07A4d4I7q-s2wr4VxfRSDxlSezttDxkzOmonlw-_wlE6itN1X4cNrZ5ig/exec';
  const apiUrl = "https://amra-amra.se/emailApi/";

  const [adultCost, setAdultCost] = useState(450);
  const [kidCost, setKidCost] = useState(350);
  const totalFeeRef = useRef(null); // Reference for the hidden input
  const costRef = useRef(null);

  useEffect(() => {
    let cost = numberOfAdults * adultCost + numberOfBigkids * kidCost + numberOfSmallkids * 0;
    // document.getElementById("totalFee").value = cost;
    // document.getElementById("cost").innerHTML = cost;
    if (totalFeeRef.current && costRef.current) {
      totalFeeRef.current.value = cost;
      costRef.current.innerHTML = cost;
    }
  })

  const isDateExpired = () => {
    const dateString = "2025-05-30";
    const givenDate = new Date(dateString);
    const today = new Date();
    return givenDate < today;
  };

  function Submit(e) {
    document.getElementById("register").disabled = true;
    const formElm = document.querySelector('form');
    e.preventDefault();
    const formData = new FormData(formElm);

    axios.post(url, formData)
      .then(response => {
        console.log(response.data)
        if (Array.isArray(response.data) && response.data[0] === "successful") {
          formData.append("Code",response.data[1]);
          sendEmail(formData);
          document.getElementById("register").disabled = false;
          document.getElementById("picnicForm").reset();
        } else {
          setTitle("Warning");
          setMessage(JSON.stringify(response.data));
          setModalShow(true);
          document.getElementById("register").disabled = false;
        }
      }).catch(error => setResponse(error));
  }

  // const randomName = () => {
  //   const numbers = ["Zahir Al-Asad (0760141646)", "Hossain Jahan Adil Mahmud (0704050314)", "Md Shawon Hasan Reza (0739109544)", "Zamil Abedin (0763944016)", "Md Tarek Hasan (0700295808)"];
  //   const randomIndex = Math.floor(Math.random() * numbers.length);
  //   const number = numbers[randomIndex];
  //   document.getElementById('swishTo').innerHTML = number;
  //   document.getElementById('swish').value = number;
  // }

  const adjustPrice = (vehicle) => {
    console.log("Selected vehicle:", vehicle);
    if(vehicle === "Car"){
      console.log(vehicle);
      setAdultCost(350);
      setKidCost(250);
    }else {
      console.log(vehicle);
      setAdultCost(450);
      setKidCost(350);
    }
  }

  const sendEmail = (fData) => {
    fData.append('request', 'picnicRegistrationEmail');
    axios.post(apiUrl, fData)
      .then(response => {
        console.log(response.data);
        //setClearForm(true);
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
    // if (clearForm === true) {
    //   document.getElementById("picnicForm").reset();
    // }
  }

  const handleNumberForPlayer = (number, catgo) => {
    console.log("Date Exired:", isDateExpired());
    // console.log("Number: ",number);
    const count = parseInt(number, 10) || 0;
    // setPlayerData(count);
    // console.log("count: ", count);

    const updatedPlayers =
      catgo === "SmallKid"
        ? Array.from({ length: count }, (_, index) => ({
          id: `${catgo}${index + 1}`,
          age: "<=3",
          name: "",
        }))
        : catgo === "BigKid"
          ? Array.from({ length: count }, (_, index) => ({
            id: `${catgo}${index + 1}`,
            age: "3+",
            name: "",
          }))
          : Array.from({ length: count }, (_, index) => ({
            id: `${catgo}${index + 1}`,
            age: "13+",
            name: "",
          }));

    if (catgo === "Adult") {
      setNumberOfAdults(count);
      setAdults(updatedPlayers);
    } else if (catgo === "BigKid") {
      setNumberOfBigKids(count);
      setBigKids(updatedPlayers);
    } else {
      setNumberOfSmallKids(count);
      setSmallKids(updatedPlayers);
    }
  }

  return (
    <div className="picnic">
      <div className="p-4 text-center rounded bg-dark">
        <h4>Registration Form for Picnic 2025</h4>
        <img src={banner} className="img-fluid" />
      </div>
      <div className="mt-1 p-2 rounded bg-dark">
        {isDateExpired() && <div className="text-center  text-white my-5">Registrion date to the picnic has passed. Please contact us for further information</div>}
        {!isDateExpired() && (
          <form className="needs-validation" id="picnicForm" onSubmit={(e) => Submit(e)}>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="form-group input-group  mb-3">
                <i className="bi bi-bus-front-fill me-2"></i>
                <span className="input-group-text me-1" style={{ width: "120px" }}>Prefered Transport: </span>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="Busstop" value="Sollentuna" id="busstop1" onChange={(event) => adjustPrice(event.target.value)} required />
                  <label className="form-check-label" htmlFor="busstop1">
                    Bus from Sollentuna
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="Busstop" value="Kungens Kurva" id="busstop2" onChange={(event) => adjustPrice(event.target.value)} required />
                  <label className="form-check-label" htmlFor="busstop2">
                    Bus from Kungens Kurva
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="Busstop" value="Car" id="busstop3" onChange={(event) => adjustPrice(event.target.value)} required />
                  <label className="form-check-label" htmlFor="busstop3">
                    Own Car
                  </label>
                </div>
              </div>
            </div>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="d-flex mb-3 input-group border-bottom pb-1">
                <i className="bi bi-people-fill me-2"></i>
                <span className="input-group-text"> Number of 12+ old</span>
                <select className="custom-select" onChange={(event) => handleNumberForPlayer(event.target.value, "Adult")}>
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
                <p className="ms-2">({adultCost}kr/adult)</p>
              </div>
              <div id="adultContainer">
                {adults.map((adult, adultIndex) => {
                  // console.log(adult);
                  // console.log(adultIndex);
                  return (
                    <div key={adultIndex}>
                      <div className="input-group mb-3">
                        <i className="bi bi-person-fill me-2"></i>
                        <span className="input-group-text">{adult.id}</span>
                        <input
                          className="form-control"
                          placeholder="Full Name"
                          type="text" name={adult.id}
                          id={adult.id}
                          required></input>
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="d-flex input-group mb-3 border-bottom pb-1">
                <i className="bi bi-person-standing me-2"></i>
                <span className="input-group-text text-wrap"> Number of kids between 3 to 12 years old</span>
                <select className="custom-select" onChange={(event) => handleNumberForPlayer(event.target.value, "BigKid")}>
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
                <p className="ms-2">({kidCost}kr/child)</p>
              </div>
              <div id="bigKidContainer">
                {bigKids.map((bigKid, bigKidIndex) => {
                  // console.log(bigKid.id);
                  return (
                    <div key={bigKidIndex}>
                      <div className="input-group mb-3">
                        <i className="bi bi-person-fill me-2"></i>
                        <span className="input-group-text">{bigKid.id}</span>
                        <input
                          className="form-control"
                          placeholder="Full Name"
                          type="text" name={bigKid.id}
                          id={bigKid.id}
                          required></input>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="input-group  mb-3 border-bottom pb-1">
                <i className="bi bi-person-arms-up me-2"></i>
                <span className="input-group-text text-wrap"> Number of kids under 3 years old</span>
                <select className="custom-select" onChange={(event) => handleNumberForPlayer(event.target.value, "SmallKid")}>
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
              <div id="smallKidContainer">
                {smallKids.map((smallKid, smallKidIndex) => {
                  // console.log(smallKid);
                  return (
                    <div key={smallKidIndex}>
                      <div className="input-group mb-3">
                        <i className="bi bi-person-fill me-2"></i>
                        <span className="input-group-text">{smallKid.id}</span>
                        <input
                          className="form-control"
                          placeholder="Full Name"
                          type="text" name={smallKid.id}
                          id={smallKid.id}
                          required></input>
                      </div>
                    </div>
                  )
                })}
              </div>
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
                <p className="p" Name="Cost" id="cost" ref={costRef}></p>
                <p>kr</p>
              </div>
              <input type="hidden" Name="Cost" id="totalFee" ref={totalFeeRef} />
            </div>
            <div className="mt-2 rounded border p-2">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" Name="Swish" id="swish" required />
                <label className="form-check-label" htmlFor="swish">
                  I have swished to 1230432419
                </label>
                <span id="swishTo" className="swishto ms-2 h9"></span>
              </div>
            </div>
            <div className="form-group mt-3">
              <button type="submit" id="register" className="btn btn-primary btn-block"> Register</button>
            </div>
          </form>
        )}
      </div>
      <Notification
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={title}
        message={message}
      />
    </div>
  );
}



export default RegisterToPicnic;