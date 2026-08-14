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
  const [numberOfSmallkids, setNumberOfSmallKids] = useState(0);
  const [response, setResponse] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [today, seToday] = useState(new Date().toLocaleDateString('sv-SE'));
  const [loading, setLoading] = useState(true);
  const [loadFormInput, setLoadFormInput] = useState(true);
  const [loadMembersInput, setLoadMembersInput] = useState(true);
  const [loadMembersData, setLoadMembersData] = useState(true);
  const [error, setError] = useState(null);
  const [busSeatsFilled, setBusSeatsFilled] = useState(0);
  const [carSeatsFilled, setCarSeatsFilled] = useState(0);
  const [seatsFilled, setSeatsFilled] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  // const url = 'https://script.google.com/macros/s/AKfycbwDEhysFSGZ-0Ry5VuEBVlht2riKJwcJdumz9tLL_ADPtQuXS5z5yswg6s4RzYJZNhy/exec';
  const url = 'https://script.google.com/macros/s/AKfycbzAE1DhkGuKpWDIPwNC-e74EnS0zQfNl28vtin-_aNuw8FrnRx7dmwZrtIlaB4jkXy0/exec';
  const dataUrl = "https://amra-amra.se/db/";
  const memberUrl = "https://script.google.com/macros/s/AKfycbw3zL12yxAeHhFubKpPNm2DXIeINp7_RZYPij4oKjiBzRUuY6aVEFFUCdBQugIeUsMljg/exec";
  const apiUrl = "https://amra-amra.se/emailApi/";

  const [picnicName, setPicnicName] = useState(null);
  const [picnicDate, setPicnicDate] = useState(null);

  const [acceptCar, setAcceptCar] = useState(null);
  const [maxSmallKidsAge, setMaxSmallKidsAge] = useState(null);
  const [maxBigKidsAge, setMaxBigKidsAge] = useState(null);
  const [maxBusSeats, setMaxBusSeats] = useState(0);
  const [maxCarSeats, setMaxCarSeats] = useState(0);
  const [prefix, setPrefix] = useState(null);
  const [busStops, setBusStops] = useState(null);
  const [registrationOpenDateForMembersOnly, setRegistrationOpenDateForMembersOnly] = useState(null);
  const [registrationAvailable, setRegistrationAvailable] = useState(null);
  const [members, setMembers] = useState(null);
  const [isMember, setIsMember] = useState(null);
  const [validMember, setValidMember] = useState(null);
  const [memberName, setMemberName] = useState("");
  const [enteredMemberId, setEnteredMemberId] = useState("");

  const [adultMemberFeeInBus, setAdultMemberFeeInBus] = useState(0);
  const [adultMemberFeeInCar, setAdultMemberFeeInCar] = useState(0);
  const [juniorMemberFeeInBus, setJuniorMemberFeeInBus] = useState(0);
  const [juniorMemberFeeInCar, setJuniorMemberFeeInCar] = useState(0);
  const [adultNonMemberFeeInBus, setAdultNonMemberFeeInBus] = useState(0);
  const [adultNonMemberFeeInCar, setAdultNonMemberFeeInCar] = useState(0);
  const [juniorNonMemberFeeInBus, setJuniorNonMemberFeeInBus] = useState(0);
  const [juniorNonMemberFeeInCar, setJuniorNonMemberFeeInCar] = useState(0);

  const [smallKidsFeeInBus, setSmallKidsFeeInBus] = useState(0);  // 0kr (bus)
  const [smallKidsFeeInCar, setSmallKidsFeeInCar] = useState(0);  // 0kr (car)


  const [adultMemberFee, setAdultMemberFee] = useState(0);         // bus:430 | car:360
  const [juniorMemberFee, setJuniorMemberFee] = useState(0);       // bus:350 | car:280
  const [adultNonMemberFee, setAdultNonMemberFee] = useState(0);   // bus:475 | car:390
  const [juniorNonMemberFee, setJuniorNonMemberFee] = useState(0); // bus:375 | car:290

  const [smallKidsFee, setSmallKidsFee] = useState(0);             // bus:0   | car:0

  const isBMorGM = validMember && (enteredMemberId.startsWith("BM") || enteredMemberId.startsWith("M"));
  const isJM = validMember && enteredMemberId.startsWith("JM");

  const totalFeeRef = useRef(null); // Reference for the hidden input
  const costRef = useRef(null);

  const [inputData, setInputData] = useState([])

  const getMemberType = (id) => {
    if (!id) return null;
    if (id.startsWith("BM") || id.startsWith("M")) return "adult_member";
    if (id.startsWith("JM")) return "junior_member";
    return null;
  };

  const getFeeForPerson = (memberType, category) => {
    if (category === "SmallKid") return smallKidsFee; // ✅ CHANGED: was hardcoded 0, now uses state
    switch (memberType) {
      case "adult_member": return adultMemberFee;
      case "junior_member": return juniorMemberFee;
      default:
        return category === "Adult" ? adultNonMemberFee : juniorNonMemberFee;
    }
  };

  useEffect(() => {
    axios.get(`${dataUrl}?request=picnicinput`)
      .then(function (response) {
        if (response.data !== "") {
          console.log(response.data);
          setLoadFormInput(false);
          setPicnicName(response.data[0].picnic_name);
          setPicnicDate(response.data[0].picnic_date);
          setMaxSmallKidsAge(Number(response.data[0].max_kids_age));
          setMaxBigKidsAge(Number(response.data[0].max_juniors_age));
          setMaxBusSeats(Number(response.data[0].max_bus_seats));
          setMaxCarSeats(Number(response.data[0].max_car_seats));
          setPrefix(response.data[0].registration_code_prefix);
          setBusStops(response.data[0].bus_stops.split(","));
          setAcceptCar(response.data[0].car === "yes"); // ✅ CHANGED: simplified one-liner
          // setAcceptCar(response.data[0].car);                      
          setAdultMemberFeeInBus(Number(response.data[0].adult_member_fee_bus));
          setAdultMemberFeeInCar(Number(response.data[0].adult_member_fee_car));
          setJuniorMemberFeeInBus(Number(response.data[0].junior_member_fee_bus));
          setJuniorMemberFeeInCar(Number(response.data[0].junior_member_fee_car));
          setAdultNonMemberFeeInBus(Number(response.data[0].adult_non_member_fee_bus));
          setAdultNonMemberFeeInCar(Number(response.data[0].adult_non_member_fee_car));
          setJuniorNonMemberFeeInBus(Number(response.data[0].junior_non_member_fee_bus));
          setJuniorNonMemberFeeInCar(Number(response.data[0].junior_non_member_fee_car));

          setSmallKidsFeeInBus(Number(response.data[0].kids_fee_bus));
          setSmallKidsFeeInCar(Number(response.data[0].kids_fee_car));

          // const startDateForMember = new Date(response.data[0].registration_start_date_for_members);
          // const startDate = new Date(response.data[0].registration_start);
          // const endDate = new Date(response.data[0].registration_end);
          const startDateForMember = new Date("2026-05-22");
          const startDate = new Date("2026-05-27");
          const endDate = new Date("2026-06-10");

          const currentDate = new Date(today);
          // Reset time to midnight for accurate date comparison
          startDateForMember.setHours(0, 0, 0, 0);
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0, 0, 0, 0);
          currentDate.setHours(0, 0, 0, 0);
          // setBusStops(response.data[0].bus_stops.split(","));
          // if (response.data[0].car === "yes")
          //   setAcceptCar(true);
          // else
          //   setAcceptCar(false);        
          setRegistrationOpenDateForMembersOnly(currentDate >= startDateForMember && currentDate < startDate);
          setRegistrationAvailable(currentDate >= startDate && currentDate <= endDate);

          console.log("Today: ", currentDate);
          console.log("Start Date: ", startDate);
          console.log("End Date: ", endDate);
          console.log("members", members)
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
          // console.log(response.data);
          setLoadMembersInput(false);
        }
        else {
          alert("Failed to fetch member data");
          setLoadMembersInput(false);
        }
      })
      .catch(error => {
        setError(error.message);
        setLoadMembersInput(false);
      })

  }, []);

  useEffect(() => {
    axios.get(memberUrl)
      .then(function (response) {
        if (response.data !== "") {
          // console.log(response.data.ids);
          setMembers(response.data);
          setLoadMembersData(false);
        }
        else {
          alert("Failed to fetch member data");
          setLoadMembersData(false);
        }
      })
      .catch(error => {
        setError(error.message);
        setLoadMembersData(false);
      })

  }, []);

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
    const adultsCost = adults.reduce((sum, adult, index) => {
      const type = (index === 0 && isBMorGM) ? "adult_member" : (adult.memberType || "non_member");
      return sum + getFeeForPerson(type, "Adult");
    }, 0);

    const bigKidsCost = bigKids.reduce((sum, kid, index) => {
      const type = (index === 0 && isJM) ? "junior_member" : (kid.memberType || "non_member");
      return sum + getFeeForPerson(type, "BigKid");
    }, 0);

    const smallKidsCost = smallKids.reduce((sum) => sum + smallKidsFee, 0);

    const total = adultsCost + bigKidsCost + smallKidsCost;

    if (totalFeeRef.current && costRef.current) {
      totalFeeRef.current.value = total;
      costRef.current.innerHTML = total;
    }
  }, [
    adults, bigKids, smallKids,
    adultMemberFee, juniorMemberFee,
    adultNonMemberFee, juniorNonMemberFee,
    smallKidsFee, // added to deps
    isBMorGM, isJM
  ]);

  function validateMember(e) {
    e.preventDefault();

    if (!members) return; // ✅ guard — members not loaded yet

    const id = enteredMemberId.trim();

    if (id.startsWith("JM")) {
      setValidMember(false);
      setMemberName("");
      return;
    }

    // if (!id.startsWith("BM") && !id.startsWith("M")) { // need to check this condition
    //   setValidMember(false);
    //   setMemberName("");
    //   return;
    // }

    const memberIndex = members.ids.indexOf(id);
    const isValid = memberIndex !== -1;

    setValidMember(isValid);

    if (isValid) {
      setMemberName(members.names[memberIndex]);
    } else {
      setMemberName("");
      setAdults([]);
      setNumberOfAdults(0);
      setBigKids([]);
      setNumberOfBigKids(0);
      setSmallKids([]);
      setNumberOfSmallKids(0);
    }
  }
  const resetForm = () => {
    // Reset validation form back to initial "Are you a member?" state
    setIsMember(null);
    setValidMember(null);
    setEnteredMemberId("");
    setMemberName("");

    // Reset participant arrays and counts
    setAdults([]);
    setNumberOfAdults(0);
    setBigKids([]);
    setNumberOfBigKids(0);
    setSmallKids([]);
    setNumberOfSmallKids(0);

    // Reset fees back to bus defaults
    setAdultMemberFee(adultMemberFeeInBus);
    setJuniorMemberFee(juniorMemberFeeInBus);
    setAdultNonMemberFee(adultNonMemberFeeInBus);
    setJuniorNonMemberFee(juniorNonMemberFeeInBus);
    setSmallKidsFee(smallKidsFeeInBus);

    // Reset total fee display
    if (totalFeeRef.current) totalFeeRef.current.value = 0;
    if (costRef.current) costRef.current.innerHTML = 0;

    document.getElementById("validationForm")?.reset(); // ✅ resets validation form
    document.getElementById("picnicForm")?.reset();
  };

  useEffect(() => {
    if (isBMorGM && memberName) {
      setNumberOfAdults(prev => (prev === 0 ? 1 : prev));
      setAdults(prev => {
        const base = prev.length === 0
          ? [{ id: "Adult1", age: "13+", name: memberName, memberId: enteredMemberId, memberType: "adult_member" }]
          : prev.map((a, i) => i === 0
            ? { ...a, name: memberName, memberId: enteredMemberId, memberType: "adult_member" }
            : a);
        return base;
      });
    }
    if (isJM && memberName) {
      setNumberOfBigKids(prev => (prev === 0 ? 1 : prev));
      setBigKids(prev => {
        const base = prev.length === 0
          ? [{ id: "Junior1", age: "3+", name: memberName, memberId: enteredMemberId, memberType: "junior_member" }]
          : prev.map((a, i) => i === 0
            ? { ...a, name: memberName, memberId: enteredMemberId, memberType: "junior_member" }
            : a);
        return base;
      });
    }
  }, [validMember, memberName, enteredMemberId]);


  function Submit(e) {
    e.preventDefault();
    document.getElementById("register").disabled = true;

    // const formElm = document.querySelector('picnicForm'); // instead using e.target, since its returning null
    const formData = new FormData(e.target); // e.target alwasy refers to the form that triggered the submit event. 
    formData.append("Date", new Date(today).toLocaleDateString());
    formData.append("request", "picnic");
    formData.append("Prefix", prefix);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    axios.post(url, formData)
      .then(response => {
        console.log(response.data);
        if (Array.isArray(response.data) && response.data[0] === "successful") {
          formData.append("Code", response.data[1]);
          sendEmail(formData);
          document.getElementById("register").disabled = false;
          // document.getElementById("picnicForm").reset();          
          // document.getElementById("validationForm")?.reset(); // ✅ resets validation form
          // document.getElementById("picnicForm")?.reset();
          e.target.reset();
          resetForm();
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
      setAdultMemberFee(adultMemberFeeInCar);         // 360kr
      setJuniorMemberFee(juniorMemberFeeInCar);       // 280kr
      setAdultNonMemberFee(adultNonMemberFeeInCar);   // 390kr
      setJuniorNonMemberFee(juniorNonMemberFeeInCar); // 290kr
      setSmallKidsFee(smallKidsFeeInCar);             // 0kr
    } else {
      setAdultMemberFee(adultMemberFeeInBus);         // 430kr
      setJuniorMemberFee(juniorMemberFeeInBus);       // 350kr
      setAdultNonMemberFee(adultNonMemberFeeInBus);   // 475kr
      setJuniorNonMemberFee(juniorNonMemberFeeInBus); // 375kr
      setSmallKidsFee(smallKidsFeeInBus);             // 0kr
    }
  };

  const sendEmail = (fData) => {
    fData.append('request', 'picnicRegistrationEmail');
    axios.post(apiUrl, fData)
      .then(response => {
        console.log(response.data);
        setTitle("Registration Completed");
        setMessage(response.data);
        setModalShow(true);
      })
      .catch(error => {
        console.log(error);
        setTitle("Failed to Register");
        setMessage(error);
        setModalShow(true);
      });
  };

  const handleNumberForParticipent = (number, catgo) => {
    // console.log("Number: ", number);
    let count = parseInt(number, 10) || 0;

    if (catgo === "Adult" && isBMorGM) count = Math.max(1, count);
    if (catgo === "BigKid" && isJM) count = Math.max(1, count);

    if (catgo === "Adult") {
      setNumberOfAdults(count);
      setAdults(prev => Array.from({ length: count }, (_, index) => {
        if (prev[index]) return prev[index];
        return {
          id: `Adult${index + 1}`,
          age: "13+",
          name: index === 0 && isBMorGM ? memberName : "",
          memberId: index === 0 && isBMorGM ? enteredMemberId : "",
          memberType: index === 0 && isBMorGM ? "adult_member" : "non_member",
        };
      }));
    } else if (catgo === "BigKid") {
      setNumberOfBigKids(count);
      setBigKids(prev => Array.from({ length: count }, (_, index) => {
        if (prev[index]) return prev[index];
        return {
          id: `Junior${index + 1}`,
          age: "3+",
          name: index === 0 && isJM ? memberName : "",
          memberId: index === 0 && isJM ? enteredMemberId : "",
          memberType: index === 0 && isJM ? "junior_member" : "non_member",
        };
      }));
    } else {
      setNumberOfSmallKids(count);
      setSmallKids(prev => Array.from({ length: count }, (_, index) => {
        if (prev[index]) return prev[index];
        return {
          id: `Kid${index + 1}`,
          age: "<=3",
          name: "",
          memberId: "",
          memberType: "free",
        };
      }));
    }
  };

  return (
    <div className="picnic">
      <div className="p-4 text-center rounded bg-dark">
        <h4>Registration Form for {picnicName}</h4>
        <img src={banner} className="img-fluid" />
      </div>
      <div className="mt-1 p-2 rounded bg-dark">

        {/* Validation form — stays visible during members-only period */}
        {registrationOpenDateForMembersOnly && (
          <form className="needs-validation" id="validationForm" onSubmit={(e) => validateMember(e)}>
            <div className="form-check">
              <label className="form-check-label me-3 mb-2" htmlFor="">
                Are you a MEMBER?
              </label>
              <select className="custom-select"
                value={isMember ?? "no"}
                onChange={(event) => {
                  setIsMember(event.target.value);
                  setValidMember(null); //  null to reset cleanly
                  setEnteredMemberId(""); //  clear ID on dropdown change
                }}>
                <option value="no" defaultValue>No</option>
                <option value="yes">Yes</option>
              </select>
              {isMember === "yes" && (
                <div>
                  <label className="form-check-label me-1" htmlFor="memberId">
                    Enter your member ID:
                  </label>
                  <input
                    placeholder="Member ID"
                    type="text"
                    id="memberId"
                    value={enteredMemberId}
                    onChange={(e) => {
                      setEnteredMemberId(e.target.value);
                      setValidMember(null); // reset to null while typing                      
                      // reset the form.
                      setMemberName("");
                      setAdults([]);
                      setNumberOfAdults(0);
                      setBigKids([]);
                      setNumberOfBigKids(0);
                      setSmallKids([]);
                      setNumberOfSmallKids(0);

                    }}
                    required
                  />
                  {validMember === false && (
                    <p className="text-danger mt-1">
                      ❌ Member ID <strong>{enteredMemberId}</strong> is not valid or you are not Adult Member. Please check and try again.
                    </p>
                  )}
                  {validMember === true && (
                    <p className="text-success mt-1">
                      ✓ Welcome <strong>{memberName}</strong>!
                    </p>
                  )}
                  <div className="mt-2 mb-3">
                    <button type="submit" className="btn btn-info">Validate</button>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}

        {error ? (
          <div className="text-center text-white my-5">Error: {error}</div>

        ) : (loading || loadFormInput || loadMembersData || loadMembersInput) ? (
          <div className="text-center text-white my-5">Please wait while loading...</div>

        ) : (!registrationOpenDateForMembersOnly && !registrationAvailable) ? (
          <div className="text-center text-white my-5">
            Registration is currently unavailable. Please contact us for further information.
          </div>

        ) : seatsFilled ? (
          <div className="text-center text-white my-5">
            All seats are fully booked. Please contact us for further information.
          </div>

        ) : (registrationAvailable || (registrationOpenDateForMembersOnly && validMember === true)) ? (
          <form className="needs-validation" id="picnicForm" onSubmit={(e) => Submit(e)}>

            {/* Transport */}
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="form-group input-group mb-3">
                <i className="bi bi-bus-front-fill me-2"></i>
                <span className="input-group-text me-1" style={{ width: "120px" }}>Preferred Transport:</span>
                <div className="form-check me-1">
                  <input className="form-check-input" type="radio" name="Busstop" value="Sollentuna" id="busstop1"
                    onChange={(event) => adjustPrice(event.target.value)} required disabled={busSeatsFilled >= maxBusSeats} />
                  <label className="form-check-label" htmlFor="busstop1">
                    Bus from {busStops?.[0]}
                  </label>
                </div>
                <div className="form-check me-1">
                  <input className="form-check-input" type="radio" name="Busstop" value="Kungens Kurva" id="busstop2"
                    onChange={(event) => adjustPrice(event.target.value)} required disabled={busSeatsFilled >= maxBusSeats} />
                  <label className="form-check-label" htmlFor="busstop2">
                    Bus from {busStops?.[1]}
                  </label>
                </div>
                {acceptCar && (
                  <div className="form-check me-1">
                    <input className="form-check-input" type="radio" name="Busstop" value="Car" id="busstop3"
                      onChange={(event) => adjustPrice(event.target.value)} required disabled={carSeatsFilled >= maxCarSeats} />
                    <label className="form-check-label" htmlFor="busstop3">Own Car</label>
                  </div>
                )}
              </div>
            </div>

            {/* Adults (12+) */}
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="d-flex mb-3 input-group border-bottom pb-1">
                <i className="bi bi-people-fill me-2"></i>
                <span className="input-group-text">Number of {maxBigKidsAge}+ old</span>
                <select className="custom-select" value={numberOfAdults}
                  onChange={(event) => handleNumberForParticipent(event.target.value, "Adult")}>
                  {!isBMorGM && <option value="0">0</option>}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <p className="ms-2 small text-white-50">
                  Adult member: {adultMemberFee}kr &nbsp;|&nbsp;
                  {/* Junior member: {juniorMemberFee}kr &nbsp;|&nbsp; */}
                  Non-member: {adultNonMemberFee}kr
                </p>
              </div>
              <div id="adultContainer">
                {adults.map((adult, adultIndex) => {
                  const isLockedSlot = adultIndex === 0 && isBMorGM;

                  const nameIsLocked = isLockedSlot || adult.memberType === "adult_member";

                  const personFee = getFeeForPerson(
                    isLockedSlot ? "adult_member" : (adult.memberType || "non_member"),
                    "Adult"
                  );

                  const handleMemberIdChange = (e) => {
                    const enteredId = e.target.value.trim();
                    const memberIndex = members?.ids.indexOf(enteredId);

                    const isValidAdult = memberIndex !== -1 && enteredId !== "" &&
                      (enteredId.startsWith("BM") || enteredId.startsWith("M") || enteredId.startsWith("JM"));
                    const memberType = isValidAdult ? "adult_member" : "non_member";

                    setAdults(prev => prev.map((a, i) =>
                      i === adultIndex ? {
                        ...a,
                        memberId: enteredId,
                        name: isValidAdult ? members.names[memberIndex] : "",
                        memberType: memberType,
                      } : a
                    ));
                  };

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
                          value={isLockedSlot ? memberName : (adult.name || "")}
                          onChange={nameIsLocked ? () => { } : (e) =>
                            setAdults(prev => prev.map((a, i) =>
                              i === adultIndex ? { ...a, name: e.target.value } : a
                            ))
                          }
                          readOnly={nameIsLocked}
                          style={isLockedSlot ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                          required
                        />
                        <input
                          className="form-control ms-2"
                          placeholder="Member ID (optional)"
                          type="text"
                          name={`${adult.id}_MemberId`}
                          id={`${adult.id}_MemberId`}
                          value={isLockedSlot ? enteredMemberId : (adult.memberId || "")}
                          readOnly={isLockedSlot}
                          style={isLockedSlot ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                          onChange={isLockedSlot ? () => { } : handleMemberIdChange}
                        />
                        <span className="input-group-text ms-1">{personFee} kr</span>
                      </div>
                      {adultIndex > 0 &&
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" name="FamilyMember" id="familymember" required />
                          <label className="form-check-label" htmlFor="familymember">
                            I confirm this person is my family member.
                          </label>
                        </div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Big Kids (4–12) */}
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="d-flex input-group mb-3 border-bottom pb-1">
                <i className="bi bi-person-standing me-2"></i>
                <span className="input-group-text text-wrap">
                  Number of kids between {maxSmallKidsAge} to {maxBigKidsAge} years old
                </span>
                <select className="custom-select" value={numberOfBigkids}
                  onChange={(event) => handleNumberForParticipent(event.target.value, "BigKid")}>
                  {!isJM && <option value="0">0</option>}
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <p className="ms-2 small text-white-50">
                  Junior member: {juniorMemberFee}kr &nbsp;|&nbsp;
                  Non-member: {juniorNonMemberFee}kr
                </p>
              </div>
              <div id="bigKidContainer">
                {bigKids.map((bigKid, bigKidIndex) => {
                  const isLockedSlot = bigKidIndex === 0 && isJM;

                  const nameIsLocked = isLockedSlot || bigKid.memberType === "junior_member";

                  const personFee = getFeeForPerson(
                    isLockedSlot ? "junior_member" : (bigKid.memberType || "non_member"),
                    "BigKid"
                  );

                  const handleMemberIdChange = (e) => {
                    const enteredId = e.target.value.trim();
                    const memberIndex = members?.ids.indexOf(enteredId);
                    const isValidJM = memberIndex !== -1 && enteredId !== "" && enteredId.startsWith("JM");
                    const memberType = isValidJM ? "junior_member" : "non_member";

                    setBigKids(prev => prev.map((a, i) =>
                      i === bigKidIndex ? {
                        ...a,
                        memberId: enteredId,
                        name: isValidJM ? members.names[memberIndex] : "",
                        memberType: memberType,
                      } : a
                    ));
                  };

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
                          value={isLockedSlot ? memberName : (bigKid.name || "")}
                          onChange={nameIsLocked ? () => { } : (e) =>
                            setBigKids(prev => prev.map((a, i) =>
                              i === bigKidIndex ? { ...a, name: e.target.value } : a
                            ))
                          }
                          readOnly={nameIsLocked}
                          style={isLockedSlot ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                          required
                        />
                        <input
                          className="form-control ms-2"
                          placeholder="Member ID (optional)"
                          type="text"
                          name={`${bigKid.id}_MemberId`}
                          id={`${bigKid.id}_MemberId`}
                          value={isLockedSlot ? enteredMemberId : (bigKid.memberId || "")}
                          readOnly={isLockedSlot}
                          style={isLockedSlot ? { backgroundColor: "#e9ecef", cursor: "not-allowed" } : {}}
                          onChange={isLockedSlot ? () => { } : handleMemberIdChange}
                        />
                        <span className="input-group-text ms-1">{personFee} kr</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Small Kids (under 4) — fee from DB, currently 0kr */}
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="input-group mb-3 border-bottom pb-1">
                <i className="bi bi-person-arms-up me-2"></i>
                <span className="input-group-text text-wrap">
                  Number of kids under {maxSmallKidsAge} years old
                </span>
                <select className="custom-select"
                  onChange={(event) => handleNumberForParticipent(event.target.value, "SmallKid")}>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <p className="ms-2 small text-white-50">
                  {/* Bus: {smallKidsFeeInBus === 0 ? "Free" : `${smallKidsFeeInBus}kr`} &nbsp;|&nbsp;
                  Car: {smallKidsFeeInCar === 0 ? "Free" : `${smallKidsFeeInCar}kr`} */}
                  Registration fee: 0 kr | No individual bus seat
                </p>
              </div>
              <div id="smallKidContainer">
                {smallKids.map((smallKid, smallKidIndex) => (
                  <div key={smallKidIndex}>
                    <div className="input-group mb-3">
                      <i className="bi bi-person-fill me-2"></i>
                      <span className="input-group-text">{smallKid.id}</span>
                      <input
                        className="form-control"
                        placeholder="Full Name"
                        type="text"
                        name={smallKid.id}
                        id={smallKid.id}
                        required
                      />
                      <span className="input-group-text ms-1">
                        {smallKidsFee === 0 ? "Free" : `${smallKidsFee} kr`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email */}
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="form-group input-group mb-3">
                <i className="bi bi-envelope-fill me-2"></i>
                <span className="input-group-text" style={{ width: "80px" }}>Email</span>
                <input name="Email" className="form-control" placeholder="Email address" type="email" required />
              </div>
            </div>

            {/* Phone */}
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="form-group input-group mb-3">
                <i className="bi bi-telephone-fill me-2"></i>
                <span className="input-group-text" style={{ width: "80px" }}>Phone</span>
                <input name="Phone" className="form-control" placeholder="Phone number" type="text" required />
              </div>
            </div>

            {/* Total Fee */}
            <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
              <div className="form-group input-group">
                <p className="mx-2">Total fee:</p>
                <p className="p" name="Cost" id="cost" ref={costRef}></p>
                <p className="ms-1">kr</p>
              </div>
              <input type="hidden" name="Cost" id="totalFee" ref={totalFeeRef} />
            </div>

            {/* Swish */}
            <div className="mt-2 rounded border p-2">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="Term1" id="term1" required />
                <label className="form-check-label" htmlFor="term1">
                  I confirm that everyone registered in this form belongs to the same family.
                </label>
                <span id="swishTo" className="swishto ms-2 h9"></span>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="Term2" id="term2" required />
                <label className="form-check-label" htmlFor="term2">
                  My family and I agree to follow all picnic rules and instructions.
                </label>
                <span id="swishTo" className="swishto ms-2 h9"></span>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="Term3" id="term3" required />
                <label className="form-check-label" htmlFor="term3">
                  We agree to help keep the spot clean and cooperate in necessary activities.
                </label>
                <span id="swishTo" className="swishto ms-2 h9"></span>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" name="Swish" id="swish" required />
                <label className="form-check-label" htmlFor="swish">
                  I have swished to 1230432419
                </label>
                <span id="swishTo" className="swishto ms-2 h9"></span>
              </div>
            </div>

            <div className="form-group mt-3">
              <button type="submit" id="register" className="btn btn-primary btn-block">Register</button>
            </div>
          </form>
        ) : null}
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