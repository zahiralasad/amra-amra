import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import banner from "../../images/form-banner.jpg";

import axios from 'axios';

import "./picnic.css";
import Notification from '../Others/Notification';


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
  const [today, seToday] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [loadFormInput, setLoadFormInput] = useState(true);
  const [loadMembersInput, setLoadMembersInput] = useState(true);
  const [loadMembersData, setLoadMembersData] = useState(true);
  const [error, setError] = useState(null);
  const [busSeatsFilled, setBusSeatsFilled] = useState(0);
  const [carSeatsFilled, setCarSeatsFilled] = useState(0);
  const [seatsFilled, setSeatsFilled] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  // const [clearForm, setClearForm] = useState(false);
  // const url = 'https://script.google.com/macros/s/AKfycbzhJEYdp7P7JUUKobwayasrY5_9Vt8aR9i-DJMO1MvwaosZx6gK5eBvKtfcg_hEL8PgaA/exec'; // picnic2025
  const url = 'https://script.google.com/macros/s/AKfycbwDEhysFSGZ-0Ry5VuEBVlht2riKJwcJdumz9tLL_ADPtQuXS5z5yswg6s4RzYJZNhy/exec';
  const dataUrl = "https://amra-amra.se/db/";
  const memberUrl = "https://script.google.com/macros/s/AKfycbw3zL12yxAeHhFubKpPNm2DXIeINp7_RZYPij4oKjiBzRUuY6aVEFFUCdBQugIeUsMljg/exec";
  // const dataUrl1 = 'https://script.google.com/macros/s/AKfycbysHW9GVTvmUFq70OC638nhiBNoiDmR7RybkeMlN5Wl1jGAFIEshuM1dXxsfClI5m87/exec';
  const apiUrl = "https://amra-amra.se/emailApi/";

  const [picnicName, setPicnicName] = useState(null);
  const [picnicDate, setPicnicDate] = useState(null);

  // const [endDate, setEndDate] = useState(null);
  const [acceptCar, setAcceptCar] = useState(null);
  const [maxSmallKidsAge, setMaxSmallKidsAge] = useState(null);
  const [maxBigKidsAge, setMaxBigKidsAge] = useState(null);
  const [adultsFeeInBus, setAdultsFeeInBus] = useState(0);
  const [adultsFeeInCar, setAdultsFeeInCar] = useState(0);
  const [smallKidsFeeInBus, setSmallKidsFeeInBus] = useState(0);
  const [smallKidsFeeInCar, setSmallKidsFeeInCar] = useState(0);
  const [bigKidsFeeInBus, setBigKidsFeeInBus] = useState(0);
  const [bigKidsFeeInCar, setBigKidsFeeInCar] = useState(0);
  const [maxBusSeats, setMaxBusSeats] = useState(0);
  const [maxCarSeats, setMaxCarSeats] = useState(0);
  const [prefix, setPrefix] = useState(null);
  const [adultsFee, setAdultsFee] = useState(null);
  const [smallKidsFee, setSmallKidsFee] = useState(null);
  const [bigKidsFee, setBigKidsFee] = useState(null);
  const [busStops, setBusStops] = useState(null);
  const [registrationOpenDateForMembersOnly, setRegistrationOpenDateForMembersOnly] = useState(null);
  const [registrationAvailable, setRegistrationAvailable] = useState(null);
  const [members, setMembers] = useState(null);
  const [isMember, setIsMember] = useState(null);
  const [validMember, setValidMember] = useState(null);

  const [memberName, setMemberName] = useState("");
  const [enteredMemberId, setEnteredMemberId] = useState("");
  const [familyMembers, setFamilyMembers] = useState([]);

  const isBMorGM = validMember && (enteredMemberId.startsWith("BM") || enteredMemberId.startsWith("M"));
  const isJM = validMember && enteredMemberId.startsWith("JM");

  const totalFeeRef = useRef(null); // Reference for the hidden input
  const costRef = useRef(null);

  const [inputData, setInputData] = useState([])

  // const maxBusSeats = 280;
  // const maxCarSeats = 20;

  useEffect(() => {
    axios.get(`${dataUrl}?request=picnicinput`)
      .then(function (response) {
        if (response.data !== "") {
          console.log(response.data);
          setLoadFormInput(false);
          setPicnicName(response.data[0].picnic_name);
          setPicnicDate(response.data[0].picnic_date);
          setAcceptCar(response.data[0].car);
          setMaxSmallKidsAge(response.data[0].max_small_kids_age);
          setMaxBigKidsAge(response.data[0].max_big_kids_age);
          setAdultsFeeInBus(response.data[0].adults_fee_for_bus);
          setAdultsFeeInCar(response.data[0].adults_fee_for_car);
          setSmallKidsFeeInBus(response.data[0].small_kids_fee_for_bus);
          setSmallKidsFeeInCar(response.data[0].small_kids_fee_for_car);
          setBigKidsFeeInBus(response.data[0].big_kids_fee_for_bus);
          setBigKidsFeeInCar(response.data[0].big_kids_fee_for_car);
          setMaxBusSeats(response.data[0].max_bus_seats);
          setMaxCarSeats(response.data[0].max_car_seats);
          setPrefix(response.data[0].registration_code_prefix);
          setBusStops(response.data[0].bus_stops.split(","));
          if (response.data[0].car === "yes")
            setAcceptCar(true);
          else
            setAcceptCar(false);
          // const startDateForMember = new Date(response.data[0].registration_start_date_for_members);
          // const startDate = new Date(response.data[0].registration_start);
          // const endDate = new Date(response.data[0].registration_end);
          const startDateForMember = new Date("2026-04-12");
          const startDate = new Date("2026-05-25");
          const endDate = new Date("2026-05-15");
          const currentDate = new Date(today);

          // Reset time to midnight for accurate date comparison
          startDateForMember.setHours(0, 0, 0, 0);
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0, 0, 0, 0);
          currentDate.setHours(0, 0, 0, 0);

          setRegistrationOpenDateForMembersOnly(currentDate >= startDateForMember && currentDate < startDate);
          // setRegistrationOpenDateForMembersOnly(today >= response.data[0].registration_start_date_for_members || today <= startDate);
          setRegistrationAvailable(currentDate >= startDate && currentDate <= endDate);
          console.log("Today: ", currentDate);

          console.log("Start Date: ", startDate);
          console.log("End Date: ", endDate);
          console.log("registrationAvailableForMember: ", currentDate >= startDateForMember && currentDate < startDate);
          console.log("registrationAvailable: ", currentDate >= startDate && currentDate <= endDate);
        }
        else {
          alert("Failed to fetch inputs for picnic form");
        }
      })
      .catch(error => {
        setError(error.message);
        setLoadFormInput(false);
      })

  }, []);

  useEffect(() => {
    axios.get(`${dataUrl}?request=memberinput`)
      .then(function (response) {
        if (response.data !== "") {
          console.log(response.data);
        }
        else {
          alert("Failed to fetch member data");
        }
      })
      .catch(error => {
        setError(error.message);
        setLoadMembersInput(false);
      })

  }, []);

  useEffect(() => {
    let cost = numberOfAdults * adultsFee + numberOfBigkids * bigKidsFee + numberOfSmallkids * smallKidsFee;
    console.log(adultsFee);
    // document.getElementById("totalFee").value = cost;
    // document.getElementById("cost").innerHTML = cost;
    if (totalFeeRef.current && costRef.current) {
      totalFeeRef.current.value = cost;
      costRef.current.innerHTML = cost;
    }
  });

  useEffect(() => {
    if (maxBusSeats && maxCarSeats) {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          //console.log(data.busSeats);
          // setEntries(data.data); // Update the state with JSON data
          setLoading(false);
          setBusSeatsFilled(data.busSeats);
          setCarSeatsFilled(data.carSeats);
          if ((data.busSeats >= maxBusSeats) && (data.carSeats >= maxCarSeats)) {
            setSeatsFilled(true);
          }
          //getColumnsData(data.data);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [maxBusSeats, maxCarSeats]);

  useEffect(() => {
    axios.get(memberUrl)
      .then(function (response) {
        if (response.data !== "") {
          // console.log(response.data.ids);
          setMembers(response.data);
        }
        else {
          alert("Failed to fetch member data");
        }
      })
      .catch(error => {
        setError(error.message);
        setLoadMembersData(false);
      })

  }, []);

  function validateMember(e) {
    e.preventDefault();
    const memberIdInput = document.getElementById("memberId");
    const enteredMemberId = memberIdInput ? memberIdInput.value : "";

    // console.log(members.ids);
    setValidMember(members.ids.includes(enteredMemberId));
    console.log(members.ids.includes(enteredMemberId));
    setMemberName(members.names[members.ids.indexOf(enteredMemberId)]); // need to update it.
    console.log(members.names[members.ids.indexOf(enteredMemberId)]);
    // console.log(isValidMember);


    console.log("Entered Member ID:", enteredMemberId);
    console.log("Type of enteredMemberId:", typeof enteredMemberId);
    console.log("Form Event", e);
    // members.ids.map()
  }

  useEffect(() => {
    if (isBMorGM && memberName) {
      setNumberOfAdults(prev => (prev === 0 ? 1 : prev));
      setAdults(prev => {
        const base = prev.length === 0
          ? [{ id: "Adult1", age: "13+", name: memberName }]
          : prev.map((a, i) => i === 0 ? { ...a, name: memberName } : a);
        return base;
      });
    }
    if (isJM && memberName) {
      setNumberOfBigKids(prev => (prev === 0 ? 1 : prev));
      setBigKids(prev => {
        const base = prev.length === 0
          ? [{ id: "BigKid1", age: "3+", name: memberName }]
          : prev.map((a, i) => i === 0 ? { ...a, name: memberName } : a);
        return base;
      });
    }
  }, [validMember, memberName, enteredMemberId]);


  function Submit(e) {
    document.getElementById("register").disabled = true;
    const formElm = document.querySelector('form');
    e.preventDefault();
    const formData = new FormData(formElm);
    formData.append("Date", today.toLocaleDateString());
    formData.append("request", "picnic");

    axios.post(url, formData)
      .then(response => {
        console.log(response.data)
        if (Array.isArray(response.data) && response.data[0] === "successful") {
          formData.append("Code", response.data[1]);
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


  const adjustPrice = (vehicle) => {
    console.log("Selected vehicle:", vehicle);
    if (vehicle === "Car") {
      console.log(vehicle);
      setAdultsFee(adultsFeeInCar);
      setBigKidsFee(bigKidsFeeInCar);
      setSmallKidsFee(smallKidsFeeInCar);
    } else {
      console.log(vehicle);
      setAdultsFee(adultsFeeInBus);
      setBigKidsFee(bigKidsFeeInBus);
      setSmallKidsFee(smallKidsFeeInBus);
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

  const handleNumberForParticipent = (number, catgo) => {
    // console.log("Date Exired:", registrationDateExpired);
    console.log("Number: ", number);
    let count = parseInt(number, 10) || 0;
    // setPlayerData(count);
    // console.log("count: ", count);

    if (catgo === "Adult" && isBMorGM) count = Math.max(1, count);
    if (catgo === "BigKid" && isJM) count = Math.max(1, count);

    const updatedParticipents =
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
            name: index === 0 && isJM ? memberName : "",
          }))
          : Array.from({ length: count }, (_, index) => ({
            id: `${catgo}${index + 1}`,
            age: "13+",
            name: index === 0 && isBMorGM ? memberName : "",
          }));

    if (catgo === "Adult") {
      setNumberOfAdults(count);
      console.log(updatedParticipents);
      setAdults(updatedParticipents);
    } else if (catgo === "BigKid") {
      setNumberOfBigKids(count);
      setBigKids(updatedParticipents);
    } else {
      setNumberOfSmallKids(count);
      setSmallKids(updatedParticipents);
    }
  }

  // const handleIfMember = (isMember) => {
  //   isMember
  // }

  return (
    <div className="picnic">
      <div className="p-4 text-center rounded bg-dark">
        <h4>Registration Form for {picnicName}</h4>
        <img src={banner} className="img-fluid" />
      </div>
      <div className="mt-1 p-2 rounded bg-dark">
        {registrationOpenDateForMembersOnly &&
          <form className="needs-validation" id="validationForm" onSubmit={(e) => validateMember(e)}>
            <div className="form-check">
              <label className="form-check-label me-3 mb-2" htmlFor="">
                Are you a MEMBER?
              </label>
              <select className="custom-select" onChange={(event) => {
                setIsMember(event.target.value);
                setValidMember(false);
              }}>
                <option value="no" selected>No</option>
                <option value="yes">Yes</option>
              </select>
              {isMember === "yes" &&
                <div>
                  <label className="form-check-label me-1" htmlFor="swish">
                    Enter your member ID:
                  </label>
                  <input
                    className=""
                    placeholder="Member id"
                    type="text"
                    name=""
                    id="memberId"
                    value={enteredMemberId}
                    onChange={(e) => setEnteredMemberId(e.target.value)}
                    required
                  />
                  {/* Submit button inside member condition */}
                  <div className="mt-2 mb-3">
                    <button type="submit" className="btn btn-info">
                      Validate
                    </button>
                  </div>
                </div>
              }
            </div>
          </form>
        }
        {!registrationOpenDateForMembersOnly && !registrationAvailable && <div className="text-center  text-white my-5">Registrion to the picnic is not available. Please contact us for further information</div>}
        {loading && loadFormInput && loadMembersInput && loadMembersData && <div className="text-center  text-white my-5">Please wait while loading the from .........</div>}
        {error && <div className="text-center  text-white my-5">Error: {error}</div>}
        {seatsFilled && <div className="text-center  text-white my-5">Unfortunately, we are unable to confirm your registration as all bus seats are fully booked. Please contact us for further information</div>}
        {((validMember && registrationOpenDateForMembersOnly)
          ||
          (!loading &&
            !error &&
            !seatsFilled &&
            !registrationOpenDateForMembersOnly &&
            registrationAvailable))
          &&
          (<form className="needs-validation" id="picnicForm" onSubmit={(e) => Submit(e)}>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="form-group input-group  mb-3">
                <i className="bi bi-bus-front-fill me-2"></i>
                <span className="input-group-text me-1" style={{ width: "120px" }}>Prefered Transport: </span>
                <div className="form-check me-1">
                  <input className="form-check-input" type="radio" name="Busstop" value="Sollentuna" id="busstop1" onChange={(event) => adjustPrice(event.target.value)} required disabled={busSeatsFilled >= maxBusSeats} />
                  <label className="form-check-label" htmlFor="busstop1">
                    Bus from {busStops[0]}
                  </label>
                </div>
                <div className="form-check me-1">
                  <input className="form-check-input" type="radio" name="Busstop" value="Kungens Kurva" id="busstop2" onChange={(event) => adjustPrice(event.target.value)} required disabled={busSeatsFilled >= maxBusSeats} />
                  <label className="form-check-label" htmlFor="busstop2">
                    Bus from {busStops[1]}
                  </label>
                </div>
                {acceptCar &&
                  <div className="form-check me-1">
                    <input className="form-check-input" type="radio" name="Busstop" value="Car" id="busstop3" onChange={(event) => adjustPrice(event.target.value)} required disabled={carSeatsFilled >= maxCarSeats} />
                    <label className="form-check-label" htmlFor="busstop3">
                      Own Car
                    </label>
                  </div>
                }
              </div>
            </div>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="d-flex mb-3 input-group border-bottom pb-1">
                <i className="bi bi-people-fill me-2"></i>
                <span className="input-group-text"> Number of {maxBigKidsAge}+ old</span>
                <select className="custom-select" onChange={(event) => handleNumberForParticipent(event.target.value, "Adult")}>
                  {!isBMorGM && <option value="0" selected>0</option>}
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
                <p className="ms-2">({adultsFee}kr/adult)</p>
              </div>
              <div id="adultContainer">
                {adults.map((adult, adultIndex) => {
                  // console.log(adult);
                  // console.log(adultIndex);
                  const isLockedSlot = adultIndex === 0 && isBMorGM;
                  return (
                    <div key={adultIndex}>
                      <div className="input-group mb-3">
                        <i className="bi bi-person-fill me-2"></i>
                        <span className="input-group-text">{adult.id}</span>
                        <input
                          className="form-control"
                          placeholder="Full Name"
                          type="text"
                          name={adult.id}
                          id={adult.id}
                          value={isLockedSlot ? memberName : undefined}
                          onChange={isLockedSlot ? () => { } : undefined}
                          disabled={isLockedSlot}
                          style={isLockedSlot ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                          required>
                        </input>
                        <input
                          className="form-control ms-2"
                          placeholder="Member ID (optional)"
                          type="text"
                          name={`${adult.id}_MemberId`}
                          id={`${adult.id}_MemberId`}
                          defaultValue={isLockedSlot ? enteredMemberId : ""}
                          disabled={isLockedSlot}
                          style={isLockedSlot ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                        />
                      </div>

                    </div>
                  )
                })}
              </div>
            </div>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="d-flex input-group mb-3 border-bottom pb-1">
                <i className="bi bi-person-standing me-2"></i>
                <span className="input-group-text text-wrap"> Number of kids between {maxSmallKidsAge} to {maxBigKidsAge} years old</span>
                <select className="custom-select" onChange={(event) => handleNumberForParticipent(event.target.value, "BigKid")}>
                  {!isJM && <option value="0" selected>0</option>}
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
                <p className="ms-2">({bigKidsFee}kr/child)</p>
              </div>
              <div id="bigKidContainer">
                {bigKids.map((bigKid, bigKidIndex) => {
                  // console.log(bigKid.id);
                  const isLockedSlot = bigKidIndex === 0 && isJM;
                  return (
                    <div key={bigKidIndex}>
                      <div className="input-group mb-3">
                        <i className="bi bi-person-fill me-2"></i>
                        <span className="input-group-text">{bigKid.id}</span>
                        <input
                          className="form-control"
                          placeholder="Full Name"
                          type="text"
                          name={bigKid.id}
                          id={bigKid.id}
                          value={isLockedSlot ? memberName : undefined}
                          onChange={isLockedSlot ? () => { } : undefined}
                          disabled={isLockedSlot}
                          style={isLockedSlot ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                          required>
                        </input>
                        <input
                          className="form-control ms-2"
                          placeholder="Member ID (optional)"
                          type="text"
                          name={`${bigKids.id}_MemberId`}
                          id={`${bigKids.id}_MemberId`}
                          defaultValue={isLockedSlot ? enteredMemberId : ""}
                          disabled={isLockedSlot}
                          style={isLockedSlot ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="input-group  mb-3 border-bottom pb-1">
                <i className="bi bi-person-arms-up me-2"></i>
                <span className="input-group-text text-wrap"> Number of kids under {maxSmallKidsAge} years old</span>
                <select className="custom-select" onChange={(event) => handleNumberForParticipent(event.target.value, "SmallKid")}>
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
                <p className="ms-2">({smallKidsFee}kr/child)</p>
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