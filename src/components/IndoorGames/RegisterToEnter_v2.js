import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import banner from "../../images/form-banner-1.jpg";

import axios from 'axios';

import "../../css/form.css";
import Notification from '../Notification';

// let trace = {};
// let counter = 0;
let gender = "";

function RegisterToEnter() {
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  const [bigkids, setBigKids] = useState(0);
  const [smallkids, setSmallKids] = useState(0);
  const [babys, setBabys] = useState(0);
  const [response, setResponse] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  // const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedGender, setSelectGender] = useState(null);
  
  const [adultNames, setAdultNames] = useState([]);
  const [adultPartners, setAdultPartners] = useState([]);
  const [kidPartners, setKidPartners] = useState([]);
  const [ttDoubles, setTtDoubles] = useState([]);
  const [ttSingles, setTtSingles] = useState([]);
  const [carromDoubles, setCarromDoubles] = useState([]);
  const [internationalBridge, setInternationalBridge] = useState([]);
  const [card29, setCard29] = useState([]);
  const [callBridge, setCallBridge] = useState([]);
  const [ludoSingles, setLudoSingles] = useState([]);
  const [ludoDoubles, setLudoDoubles] = useState([]);
  const [chess, setChess] = useState([]);
  const [uno, setUno] = useState([]);
  
  // const [perGameCost, setPerGameCost] = useState("");
  const [players, setPlayers] = useState([]);
  const [games, setGames] = useState([]);

  const [male1, setMale1] = useState("");
  const [isMale1Set, setIsMale1Set] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [clearForm, setClearForm] = useState(false);
  const url = 'https://script.google.com/macros/s/AKfycbzMbB5oTRwtu_GD6aZHbPHNVKzPokNaZVhVIv38X_mSC_-nSobfYn34DJS2JK_fgmUu/exec';

  const apiUrl = "https://amra-amra.se/emailApi/";

  const maxTTSinglesTeams = 16;
  const maxTTDoublesTeams = 16;
  const maxCarromDoublesteams = 16;
  const maxInternationalbridgeTeams = 16;
  const Max29Teams = 16;
  const maxCallbridgeTeams = 16;
  const maxLudoSinglesTeams = 16;
  const maxLudoDoublesTeams = 16;
  const maxChessTeams = 16;
  const maxUnoTeams = 16;
  
  const [doubesCost, setDoublescost] =  useState("");
  const [gameCost, setGameCost] = useState(0);
  const totalFeeRef = useRef(null); // Reference for the hidden input
  const costRef = useRef(null);

  useEffect(() => {
    console.log(males);
    let cost = males * 120 + females * 120 + bigkids * 80 + gameCost;
    // let cost = 100;
    // document.getElementById("totalFee").value = cost;
    // document.getElementById("cost").innerHTML = cost;
    if (totalFeeRef.current && costRef.current) {
      totalFeeRef.current.value = cost;
      costRef.current.innerHTML = cost;
    }
  })
  // useEffect (()=>{
  //   const span = document.getElementById("gamecost");
  //   console.log("span");
  //   // setAdultNames((prevAdultNames) => [male, ...prevAdultNames]);
  //   if (event.target.value === "") {
  //     span.textContent = "(50kr)"
  //   } else {
  //     return "(0kr)"
  //   }


  //   console.log("Code: ", span.get);
  // })

  function generateCode() {
    const randomNumber = Math.floor(100 + Math.random() * 900);
    console.log("Random 3-digit number:", randomNumber);
    return `AA${randomNumber}`;
  }

  // useEffect(() => {
  //   randomName();
  //   // addInput(1, "adultContainer")
  // }, []);

  // const fetchData = async() => {
  //   try {
  //     const response = await axios.get(url);
  //     setResponse(response.data.values);
  //   }
  //   catch(error) {
  //       setError(error.message);
  //       setLoading(false);
  //     };
  // }
  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data.data);
        // setEntries(data.data); // Update the state with JSON data
        setLoading(false);
        getColumnsData(data.data);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  function checkAvailableSeats(game) {
    let seatAvailable;
    if (game === "TableTannisSingles") {
      seatAvailable = maxTTSinglesTeams - ttSingles.length;
    } else if (game === "TableTannisDoubles") {
      seatAvailable = maxTTDoublesTeams - ttDoubles.length;
    } else if (game === "CarromDoubles") {
      seatAvailable = maxCarromDoublesteams - carromDoubles.length;
    } else if (game === "InternationalBridge") {
      seatAvailable = maxInternationalbridgeTeams - internationalBridge.length;
    } else if (game === "29") {
      seatAvailable = Max29Teams - card29.length;
    } else if (game === "CallBridge") {
      seatAvailable = maxCallbridgeTeams - callBridge.length;
    } else if (game === "LudoSingles") {
      seatAvailable = maxLudoSinglesTeams - ludoSingles.length;
    } else if (game === "LudoDoubles") {
      seatAvailable = maxLudoDoublesTeams - ludoDoubles.length;
    } else if (game === "Chess") {
      seatAvailable = maxChessTeams - chess.length;
    } else if (game === "Uno") {
      seatAvailable = maxUnoTeams - uno.length;
    } else {
      seatAvailable = 16;
    }
    return seatAvailable;
  }


  function getColumnsData(entries) {
    setAdultNames(entries
      .filter((entry) => entry["Adults Names"]) // Ensure 'Adults Names' key is not empty
      .map((entry) => entry["Adults Names"])); // Extract the name

    // console.log("Adult Names 1: ", adultNames);

    setAdultPartners(entries
      .filter((entry) => entry["Adult Partner"])
      .map((entry) => entry["Adult Partner"]));

    setKidPartners(entries
      .filter((entry) => entry["Kid Partner"])
      .map((entry) => entry["Kid Partner"]));

    setTtDoubles(entries
      .filter((entry) => entry["Table Tannis Doubles"])
      .map((entry) => entry["Table Tannis Doubles"]));

    // console.log("ttDoubles: ", ttDoubles);

    setTtSingles(entries
      .filter((entry) => entry["Table Tannis Singles"])
      .map((entry) => entry["Table Tannis Singles"]));

    setCarromDoubles(entries
      .filter((entry) => entry["Carrom Doubles"])
      .map((entry) => entry["Carrom Doubles"]));

    setInternationalBridge(entries
      .filter((entry) => entry["International Bridge"])
      .map((entry) => entry["International Bridge"]));

    setCard29(entries
      .filter((entry) => entry["29"])
      .map((entry) => entry["29"]));

    setCallBridge(entries
      .filter((entry) => entry["Call Bridge"])
      .map((entry) => entry["Call Bridge"]));

    // console.log("Call bridge: ", callBridge);

    setLudoSingles(entries
      .filter((entry) => entry["Ludo Singles"])
      .map((entry) => entry["Ludo Singles"]));

    setLudoDoubles(entries
      .filter((entry) => entry["Ludo Doubles"])
      .map((entry) => entry["Ludo Dobles"]));

    setChess(entries
      .filter((entry) => entry["Chess"])
      .map((entry) => entry["Chess"]));

    setUno(entries
      .filter((entry) => entry["Uno"])
      .map((entry) => entry["Uno"]));
  }

  function Submit(e) {
    // document.getElementById("register").disabled = true;
    const formElm = document.querySelector('form');
    e.preventDefault();
    const formData = new FormData(formElm);

    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    // if (formData.has())

    // for (let [key, value] of formData.entries()) {
    //   const nextKey = `${key}Code`;
    //   if ((value === "on") && (key != "Swish")) {
    //     if ((key === "TableTannisSingles")
    //       && (key === "Chess")
    //       && (key === "CallBridge")
    //       && (key === "LudoSingles")) {
    //       // formData.delete(key);
    //       formData.append(nextKey, playerCode);
    //     }
    //     // const nextKey = `${key}Code`;
    //     // console.log("test: ", nextKey)
    //     console.log("test: ", formData.get(nextKey))
    //     if (formData.get(nextKey) === "") {
    //       formData.delete(nextKey);
    //       formData.append(nextKey, playerCode);
    //       // console.log("Key: ", key);
    //     }
    //   }

    //   // console.log(`${key}: ${value}`);
    // }
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

  function handleInput(event) {
    const span = document.getElementById("gamecost");
    console.log(span);
    // setAdultNames((prevAdultNames) => [male, ...prevAdultNames]);
    if (event.target.value === "") {
      span.textContent = "(50kr)"
    } else {
      span.textContent = "(0kr)"
    }
    console.log("Updated span text:", span.textContent);
  }

  // const randomName = () => {
  //   const numbers = ["Zahir Al-Asad (0760141646)", "Hossain Jahan Adil Mahmud (0704050314)", "Md Shawon Hasan Reza (0739109544)", "Zamil Abedin (0763944016)", "Md Tarek Hasan (0700295808)"];
  //   const randomIndex = Math.floor(Math.random() * numbers.length);
  //   const number = numbers[randomIndex];
  //   // document.getElementById('swishTo').innerHTML = number;
  //   // document.getElementById('swish').value = number;
  // }
  const handleChecked = (event, game) => {
    if (event.target.checked) {
      if ((game.name === "TableTannisSingles")
        || (game.name === "Chess")
        || (game.name === "CallBridge")
        || (game.name === "LudoSingles")
        || (game.name === "Uno")) {
        setGameCost((prevGameCost) => prevGameCost + 25)
      }

    } else
      setGameCost((prevGameCost) => prevGameCost - 25)
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

  const addInput = (number, divId) => {
    console.log("Event: ", number);
    // event.preventDefault();
    // const number = event.target.value;

    let games = [];
    var inputContainer = document.getElementById(divId);
    inputContainer.innerHTML = ''; // Clear previous inputs

    if ((divId === "maleContainer") && (number === "0")) {
      setMales(0);
    } else if ((divId === "femaleContainer") && (number === "0")) {
      setFemales(0);
    } else if ((divId === "bigKidContainer") && (number === "0")) {
      setBigKids(0);
    } else if ((divId === "smallKidContainer") && (number === "0")) {
      setSmallKids(0);
    } else {
      setBabys(0);
    }

    for (var i = 1; i <= number; i++) {
      let name = "";
      let playerCode = generateCode();
      // console.log(generateCode());
      const mainDiv = document.createElement("div");
      mainDiv.setAttribute("class", "input-group mb-3");

      const icon = document.createElement("i");
      if (divId === "maleContainer") {
        icon.setAttribute("class", "bi bi-person-fill me-2");
      } else if (divId === "femaleContainer") {
        icon.setAttribute("class", "bi bi-person-standing-dress me-2");
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

      if (divId === "maleContainer") {
        span.textContent = "Male " + i;
        setMales(i);
        name = "Male" + i;
      } else if (divId === "femaleContainer") {
        span.textContent = "Female " + i;
        setFemales(i);
        name = "Adult" + i;
      } else if (divId === "bigKidContainer") {
        span.textContent = "Big Kid " + i;
        setBigKids(i);
        name = "Bigkid" + i;
      } else if (divId === "smallKidContainer") {
        span.textContent = "Small Kid " + i;
        setSmallKids(i);
        name = "Smallkid" + i;
      } else {
        span.textContent = "Baby " + i;
        setBabys(i);
        name = "Baby" + i;
      }

      mainDiv.appendChild(span);
      // const handleInput = () => {
      //   const male = document.getElementById("male1");
      //   if (male && !isMale1Set) { // Only update if male1 is not already set
      //     console.log("First Male 1 Input Value:", male.value);
      //     // setMale1(male.value);
      //     setIsMale1Set(true);
      //     // setAdultNames(prevAdultNames => [male.value, ...adultNames])
      //   }
      // }

      const input = document.createElement("input");
      input.setAttribute("class", "form-control");
      input.setAttribute("placeholder", "Full name");
      input.setAttribute("type", "text");
      input.setAttribute("Name", name);
      // if (divId === "maleContainer" && i === 1) {
      //   input.setAttribute("id", "male1");
      //   input.addEventListener("focusout", handleInput);
      // }
      input.setAttribute("required", true)

      mainDiv.appendChild(input);

      inputContainer.appendChild(mainDiv);
      const genderDiv = document.createElement("div");
      genderDiv.setAttribute("class", "mt-2 p-2");
      const genderP = document.createElement("p");
      genderP.textContent = "Gender:";
      genderDiv.appendChild(genderP);

      const participationDiv = document.createElement("div");
      participationDiv.setAttribute("class", "row align-items-center");
      participationDiv.setAttribute("id", "games");

      const participateText = document.createElement("p");
      participateText.textContent = "Participate in:";
      participationDiv.appendChild(participateText);

      // const renderParticipationList = () =>{
      //   console.log(gender);
      if (divId === "maleContainer") {
        games = [
          { id: "TableTannisSingles", name: "TableTannisSingles", label: "Table Tennis Singles " },
          { id: "TableTannisDoubles", name: "TableTannisDoubles", label: "Table Tennis Doubles " },
          { id: "CarromDoubles", name: "CarromDoubles", label: "Carrom Doubles " },
          { id: "InternationalBridge", name: "InternationalBridge", label: "International Bridge " },
          { id: "29", name: "29", label: "29 " },
          { id: "Chess", name: "Chess", label: "Chess " }
        ];
      } else if (divId === "femaleContainer") {
        games = [
          { id: "CarromDoubles", name: "CarromDoubles", label: "Carrom Doubles " },
          { id: "CallBridge", name: "CallBridge", label: "Call Bridge " },
          { id: "LudoSingles", name: "LudoSingles", label: "Ludo Singles " },
          { id: "LudoDoubles", name: "LudoDoubles", label: "Ludo Doubles " }
        ];
      } else if (divId === "bigKidContainer") {
        games = [
          { id: "Chess", name: "Chess", label: "Chess " },
          { id: "LudoSingles", name: "LudoSingles", label: "Ludo Singles " },
          { id: "TableTannisSingles", name: "TableTannisSingles", label: "Table Tennis Singles " },
          { id: "Uno", name: "Uno", label: "Uno " }
        ];
      }

      games.forEach(game => {
        // col
        let availableSeats = checkAvailableSeats(game.name);

        const gameCol = document.createElement("div");
        gameCol.setAttribute("class", "col-3 ms-3");
        const formCheck = document.createElement("div");
        formCheck.setAttribute("class", "form-check");

        const checkBox = document.createElement("input");
        checkBox.setAttribute("class", "form-check-input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("name", game.name);
        // checkbox.setAttribute("value", "Yes");
        checkBox.setAttribute("id", game.id);

        checkBox.addEventListener("change", (event) => handleChecked(event, game));
        if (availableSeats == 0) {
          checkBox.setAttribute("disabled", true);
        }
        const label = document.createElement("label");
        label.setAttribute("class", "form-check-label");
        label.setAttribute("for", game.id);
        label.textContent = `${game.label} `;

        const spanCost = document.createElement("span");
        spanCost.setAttribute("id", "gamecost");
        // spanCost.setAttribute("class", "");
        spanCost.textContent = " (25kr)";
        spanCost.style.fontSize = "12px";

        // const teamReamin = document.createElement("p");
        // teamReamin.textContent = "team number";
        // formCheck.appendChild(teamReamin);

        formCheck.appendChild(checkBox);
        formCheck.appendChild(label);
        formCheck.appendChild(spanCost);
        gameCol.appendChild(formCheck);

        participationDiv.appendChild(gameCol);

        const textCol = document.createElement("div");
        textCol.setAttribute("class", "col-3");
        textCol.style.fontSize = "12px";

        const partnerCol = document.createElement("div");
        partnerCol.setAttribute("class", "col-2");

        // seatsCol.textContent = "20 Seats left";
        if (game.name != "TableTannisSingles"
          && game.name != "LudoSingles"
          && game.name != "Chess"
          && game.name != "CallBridge"
          && game.name != "Uno") {
          textCol.textContent = "Enter code from your partner or leave it empty";
        }
        else {
          textCol.textContent = "";
        }
        participationDiv.appendChild(textCol);

        if (game.name != "TableTannisSingles"
          && game.name != "LudoSingles"
          && game.name != "Chess"
          && game.name != "CallBridge"
          && game.name != "Uno") {
          const codeInput = document.createElement("input");
          codeInput.setAttribute("class", "form-control");
          codeInput.setAttribute("placeholder", "code");
          codeInput.setAttribute("style", "width: 60px; height: 25px; border-radius: 8px;")
          codeInput.setAttribute("type", "text");
          codeInput.setAttribute("Name", `${game.name}Code`);
          codeInput.setAttribute("id", "code");
          codeInput.style.fontSize = "12px";
          if (availableSeats == 0) {
            codeInput.setAttribute("disabled", true);
          }

          codeInput.addEventListener("focusout", handleInput);
          
          partnerCol.appendChild(codeInput);
          participationDiv.appendChild(partnerCol);
        }
        else {
          const codeInput = document.createElement("input");
          codeInput.setAttribute("class", "form-control");
          codeInput.setAttribute("placeholder", "code");
          codeInput.setAttribute("style", "width: 60px; height: 25px; border-radius: 8px;")
          codeInput.setAttribute("type", "text");
          codeInput.setAttribute("Name", `${game.name}Code`);
          codeInput.setAttribute("value", playerCode);
          codeInput.setAttribute("disabled", true);

          // const emptyDiv = document.createElement("div");
          // emptyDiv.setAttribute("class", "border rounded")
          // emptyDiv.setAttribute("style", "width: 100px; height: 25px")
          // partnerCol.appendChild(emptyDiv);
          partnerCol.appendChild(codeInput);
          participationDiv.appendChild(partnerCol);
        }

        const seatsCol = document.createElement("div");
        seatsCol.setAttribute("class", "col-2 ms-3");
        seatsCol.style.fontSize = "12px";
        // console.log(game.name);
        seatsCol.textContent = `${availableSeats} seats left`;


        // if (game.name === "TableTannisSingles") {
        //   seatsCol.textContent = `${maxTTSinglesTeams - ttSingles.length} seats left`;
        // } else if (game.name == "TableTannisDoubles") {
        //   seatsCol.textContent = `${maxTTDoublesTeams - ttDoubles.length} seats left`;
        // } else if (game.name == "CarromDoubles") {
        //   seatsCol.textContent = `${maxCarromDoublesteams - carromDoubles.length} seats left`;
        // } else if (game.name == "InternationalBridge") {
        //   seatsCol.textContent = `${maxInternationalbridgeTeams - internationalBridge.length} seats left`;
        // } else if (game.name == "29") {
        //   seatsCol.textContent = `${Max29Teams - card29.length} seats left`;
        // } else if (game.name == "CallBridge") {
        //   seatsCol.textContent = `${maxCallbridgeTeams - callBridge.length} seats left`;
        // } else if (game.name == "LudoSingles") {
        //   seatsCol.textContent = `${maxLudoSinglesTeams - ludoSingles.length} seats left`;
        // } else if (game.name == "LudoDoubles") {
        //   seatsCol.textContent = `${maxLudoDoublesTeams - ludoDoubles.length} seats left`;
        // } else if (game.name == "Chess") {
        //   seatsCol.textContent = `${maxChessTeams - chess.length} seats left`;
        // } else if (game.name == "Uno") {
        //   seatsCol.textContent = `${maxUnoTeams - uno.length} seats left`;
        // } else {
        //   seatsCol.textContent = "16 Seats left";
        // }
        // Append all columns to the row


        participationDiv.appendChild(seatsCol);
      });

      // Append participationDiv to container
      inputContainer.appendChild(participationDiv);
      // }
    }
  }

  return (
    <div className="row">
      {loading && <div className="text-center  text-white my-5">Please wait while loading the from .........</div>}
      {error && <div className="text-center  text-white my-5">Error: {error}</div>}
      {!loading && !error && (
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
                  <span className="input-group-text"> Number of Males </span>
                  <select className="custom-select" onChange={(event) => addInput(event.target.value, "maleContainer")}>
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
                  <p className="ms-2">(120kr/adult)</p>
                </div>

                <div id="maleContainer">
                </div>

              </div>
              <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                <div className="d-flex input-group mb-3 border-bottom pb-1">
                  <i className="bi bi-person-standing me-2"></i>
                  <span className="input-group-text text-wrap"> Number of Females</span>
                  <select className="custom-select" onChange={(event) => addInput(event.target.value, "femaleContainer")}>
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
                  <p className="ms-2">(120kr/adult)</p>
                </div>
                <div id="femaleContainer"></div>
              </div>
              <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                <div className="d-flex input-group mb-3 border-bottom pb-1">
                  <i className="bi bi-person-standing me-2"></i>
                  <span className="input-group-text text-wrap"> Number of children between 6 to 13 years old</span>
                  <select className="custom-select" onChange={(event) => addInput(event.target.value, "bigKidContainer")}>
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
                  <p className="ms-2">(80kr/child)</p>
                </div>
                <div id="bigKidContainer"></div>
              </div>
              <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                <div className="input-group  mb-3 border-bottom pb-1">
                  <i className="bi bi-person-arms-up me-2"></i>
                  <span className="input-group-text text-wrap"> Number of children between 0 to 5 years old</span>
                  <select className="custom-select" onChange={(event) => addInput(event.target.value, "smallKidContainer")}>
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
                <div id="smallKidContainer"></div>
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
                  {/* <span id="swishTo" className="swishto ms-2 h9"></span> */}
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
      )}
    </div>
  );
}



export default RegisterToEnter;