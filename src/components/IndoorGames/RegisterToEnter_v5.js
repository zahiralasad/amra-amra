import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import banner from "../../images/form-banner-1.jpg";

import axios from 'axios';

import "../../css/form.css";
import Notification from '../Notification';


function RegisterToEnter() {
  const [males, setMales] = useState(0);
  const [females, setFemales] = useState(0);
  const [bigkids, setBigKids] = useState(0);
  const [babys, setBabys] = useState(0);
  const [response, setResponse] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
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
  const [codes, setCodes] = useState([]);

  const [male1, setMale1] = useState("");
  const [isMale1Set, setIsMale1Set] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [clearForm, setClearForm] = useState(false);

  const url = 'https://script.google.com/macros/s/AKfycbwwUoqG4sbWKvjZ2rjZ1F8zSaVCxqZ5aSl9f8TfU_eyV-vyMu2fkqrtXRFkyt1R3Ezy/exec';

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

  const totalFeeRef = useRef(null); // Reference for the hidden input
  const costRef = useRef(null);


  const [numberOfMales, setNumberOfMales] = useState(0);
  const [numberOfFemales, setNumberOfFemales] = useState(0);
  const [numberOfBigKids, setNumberOfBigKids] = useState(0);
  const [numberOfSmallKids, setNumberOfSmallKids] = useState(0);
  const [players, setPlayers] = useState([]);
  const [malePlayers, setMalePlayers] = useState([]);
  const [femalePlayers, setFemalePlayers] = useState([]);
  const [kidsPlayers, setKidsPlayers] = useState([]);
  const [smallKids, setSmallKids] = useState([]);



  const [categories] = useState(["male", "female", "bigKids", "smallKids"]);
  const [maleGames] = useState([{ id: "TableTannisSingles", name: "TableTannisSingles", label: "Table Tennis Singles " },
  { id: "TableTannisDoubles", name: "TableTannisDoubles", label: "Table Tennis Doubles " },
  { id: "CarromDoubles", name: "CarromDoubles", label: "Carrom Doubles " },
  { id: "InternationalBridge", name: "InternationalBridge", label: "International Bridge " },
  { id: "29", name: "29", label: "29 " },
  { id: "Chess", name: "Chess", label: "Chess " }]);
  const [femaleGames] = useState([{ id: "CarromDoubles", name: "CarromDoubles", label: "Carrom Doubles " },
  { id: "CallBridge", name: "CallBridge", label: "Call Bridge " },
  { id: "LudoSingles", name: "LudoSingles", label: "Ludo Singles " },
  { id: "LudoDoubles", name: "LudoDoubles", label: "Ludo Doubles " }]);
  const [kidsGames] = useState([{ id: "Chess", name: "Chess", label: "Chess " },
  { id: "LudoSingles", name: "LudoSingles", label: "Ludo Singles " },
  { id: "TableTannisSingles", name: "TableTannisSingles", label: "Table Tennis Singles " },
  { id: "Uno", name: "Uno", label: "Uno " }]);
  const [initialCode, setInitialCode] = useState("");

  const [entryNo, setEntryNo] = useState([]);
  const [numberOfPlayers, setNumberOfPlayers] = useState(0);

  const [maleGameCost, setMaleGameCost] = useState(0);
  const [femaleGameCost, setFemaleGameCost] = useState(0);
  const [kidsGameCost, setKidsGameCost] = useState(0);
  const [primaryMaleCode, setPrimaryMaleCode] = useState("");
  const [primaryFemaleCode, setPrimaryFemaleCode] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Male Game Cost: ",maleGameCost);
    // console.log("Female Game Cost: ",femaleGameCost);
    // console.log("Kids Game Cost: ",kidsGameCost);
    // let cost = males * 120 + females * 120 + bigkids * 80 + gameCost;
    let cost = numberOfMales * 120 + numberOfFemales * 120 + numberOfBigKids * 80 + maleGameCost + femaleGameCost + kidsGameCost;
    // let cost = 100;
    // document.getElementById("totalFee").value = cost;
    // document.getElementById("cost").innerHTML = cost;
    if (totalFeeRef.current && costRef.current) {
      totalFeeRef.current.value = cost;
      costRef.current.innerHTML = cost;
    }
  })

  function generateCode() {
    const randomNumber = Math.floor(100 + Math.random() * 900);
    console.log("Random 3-digit number:", randomNumber);
    return `AA${randomNumber}`;
  }


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
      .filter((entry) => entry["Names"]) // Ensure 'Adults Names' key is not empty
      .map((entry) => entry["Adults Names"])); // Extract the name

    setAdultPartners(entries
      .filter((entry) => entry["Adult Partner"])
      .map((entry) => entry["Adult Partner"]));

    setKidPartners(entries
      .filter((entry) => entry["Kid Partner"])
      .map((entry) => entry["Kid Partner"]));

    setTtDoubles(entries
      .filter((entry) => entry["Table Tannis Doubles"])
      .map((entry) => entry["Table Tannis Doubles"])
      .filter((value, index, self) => self.indexOf(value) === index));

    // console.log("ttDoubles: ", ttDoubles);

    setTtSingles(entries
      .filter((entry) => entry["Table Tannis Singles"])
      .map((entry) => entry["Table Tannis Singles"]));

    setCarromDoubles(entries
      .filter((entry) => entry["Carrom Doubles"])
      .map((entry) => entry["Carrom Doubles"])
      .filter((value, index, self) => self.indexOf(value) === index));

    setInternationalBridge(entries
      .filter((entry) => entry["International Bridge"])
      .map((entry) => entry["International Bridge"])
      .filter((value, index, self) => self.indexOf(value) === index));

    setCard29(entries
      .filter((entry) => entry["29"])
      .map((entry) => entry["29"])
      .filter((value, index, self) => self.indexOf(value) === index));

    setCallBridge(entries
      .filter((entry) => entry["Call Bridge"])
      .map((entry) => entry["Call Bridge"]));

    // console.log("Call bridge: ", callBridge);

    setLudoSingles(entries
      .filter((entry) => entry["Ludo Singles"])
      .map((entry) => entry["Ludo Singles"]));

    setLudoDoubles(entries
      .filter((entry) => entry["Ludo Doubles"])
      .map((entry) => entry["Ludo Dobles"])
      .filter((value, index, self) => self.indexOf(value) === index));

    setChess(entries
      .filter((entry) => entry["Chess"])
      .map((entry) => entry["Chess"]));

    setUno(entries
      .filter((entry) => entry["Uno"])
      .map((entry) => entry["Uno"]));

    setCodes(entries
      .filter((entry) => entry["Codes"])
      .map((entry) => entry["Codes"]));

    setEntryNo(entries
      .filter((entry) => entry["Entry no."])
      .map((entry) => entry["Entry no."]));
  }

  // function Submit(e) {
  //   e.preventDefault();
  //   console.log("carrom double: ", carromDoubles.lenght);
  // }
  function Submit(e) {
    document.getElementById("register").disabled = true;
    const formElm = document.querySelector('form');
    const playerData = malePlayers.concat(femalePlayers, kidsPlayers, smallKids);
    const formData = new FormData(formElm);
    e.preventDefault();
    console.log("PlayerData: ", playerData)
    formData.append("entry", JSON.stringify(playerData));

    // update add name to the playrData list
    formData.forEach((value, key) => {
      if (!["Email", "Phone", "Cost", "Swish", "entry"].includes(key)) {
        playerData.forEach(entry => {
          if (entry.id === key) {
            const element = document.getElementById(key);
            if (element) {
              entry.name = element.value; // Set the name from the input field
            }
          }
        });
      }
    })

    // prepare an important info to send in email
    const info = playerData.map(person => {
      const games = person.selectedGames.map(game => game.game).join(", ");
      if (person.id.includes("smallKids"))
        return `${person.name}`;
      else if (person.id.includes("bigKids"))
        return `${person.name}'s and Games: [${games}]`.trim();
      else
        return `${person.name}'s Code: ${person.ownCode} and Games: [${games}], `;

    });
    console.log("info: ", info.join("\n"));

    formData.append("Codes", info);

    // formData.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    // console.log("Player Data:", playerData);

    let testData = [
      { "email": formData.get('Email') },
      { "phone": formData.get('Phone') },
      { "cost": formData.get('Cost') },
      { "swish": formData.get('Swish') },
      { 'entry': playerData }
    ]
    console.log(JSON.stringify(testData));

    axios.post(url, JSON.stringify(testData))
      .then(response => {
        if (response.data === "successful") {
          console.log(response.data);
          sendEmail(formData);
        } else {
          // console.log(response.data)
          // console.log(JSON.stringify(response.data))
          setTitle("Warning");
          setMessage(response.data);
          setModalShow(true);
          document.getElementById("register").disabled = false;
        }
      }).catch(error => setResponse(error));
  }


  const sendEmail = (fData) => {
    fData.append('request', 'indoorgame'); // need to change
    fData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    axios.post(apiUrl, fData)
      .then(response => {
        console.log(response.data);
        document.getElementById("entryForm").reset();
        document.getElementById("register").disabled = false;
        categories.forEach(category => {
          handleNumberForPlayer(0, category);
        })
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
  }

  const handleNumberForPlayer = (number, catgo) => {
    // console.log("Number: ",number);
    const count = parseInt(number, 10) || 0;
    // setPlayerData(count);
    // console.log("count: ",count);

    const updatedPlayers =
      catgo === "smallKids"
        ? Array.from({ length: count }, (_, index) => ({
          id: `${catgo}${index + 1}`,
          age: "<=5",
          name: "",
          ownCode: "",
          selectedGames: [],
        }))
        : catgo === "bigKids"
          ? Array.from({ length: count }, (_, index) => ({
            id: `${catgo}${index + 1}`,
            age: "6+",
            name: "",
            ownCode: generateCode(),
            selectedGames: [],
          }))
          : Array.from({ length: count }, (_, index) => ({
            id: `${catgo}${index + 1}`,
            age: "13+",
            name: "",
            ownCode: generateCode(),
            selectedGames: [],
          }));



    if (catgo === "male") {
      setNumberOfMales(count);
      if (count == 0)
        // console.log("not here")
        setMaleGameCost(0);
      else
        setPrimaryMaleCode(updatedPlayers.find(player => player.id === "male1").ownCode);
      setMalePlayers(updatedPlayers);
    } else if (catgo === "female") {
      setNumberOfFemales(count);
      if (count == 0)
        setFemaleGameCost(0);
      setFemalePlayers(updatedPlayers);
    } else if (catgo === "bigKids") {
      setNumberOfBigKids(count);
      if (count == 0)
        setKidsGameCost(0);
      setKidsPlayers(updatedPlayers);
    } else {
      setNumberOfSmallKids(count);
      setSmallKids(updatedPlayers);
      // console.log(updatedPlayers);
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
                  <select className="custom-select" onChange={(event) => handleNumberForPlayer(event.target.value, "male")}>
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
                  {malePlayers.map((player, playerIndex) => {
                    //if (player.id === "male1"){}
                    const selectedGames = player.selectedGames || [];

                    const handleCodeInput = (event, gameName) => {
                      const checkedElement = document.getElementById(`checkedFor${gameName}${player.id}`);
                      const labelText = document.getElementById(`labelFor${gameName}${player.id}`);
                      let receivedCode = event.target.value;
                      console.log("Check id: ", checkedElement.checked);
                      if (receivedCode !== initialCode) {
                        console.log("received code has changed");
                        if ((receivedCode) && (receivedCode.length === 5)) {
                          // console.log("received code length is 5");
                          if (checkedElement.checked) {
                            // console.log("checked");
                            setMaleGameCost((prevGameCost) => prevGameCost - 50);
                            labelText.textContent = `${gameName} (0kr)`;
                            setMalePlayers((prevPlayers) =>
                              prevPlayers.map((p, index) =>
                                index === playerIndex
                                  ? {
                                    ...p,
                                    selectedGames: p.selectedGames.map((game) =>
                                      game.game === gameName
                                        ? { ...game, code: document.getElementById(`codeFor${gameName}${player.id}`).value } // Update code for InternationalBridge
                                        : game // Keep the other games as is
                                    ),
                                  }
                                  : p
                              )
                            );
                          }
                          else {
                            labelText.textContent = `${gameName} (0kr)`;
                          }
                        } else {
                          if (receivedCode.length >= 1) {
                            alert("Your partner's code is wrong");
                            document.getElementById(`codeFor${gameName}${player.id}`).value = "";
                          }
                          if (checkedElement.checked) {
                            setMaleGameCost((prevGameCost) => prevGameCost + 50);
                            labelText.textContent = `${gameName} (50kr)`;
                            setMalePlayers((prevPlayers) =>
                              prevPlayers.map((p, index) =>
                                index === playerIndex
                                  ? {
                                    ...p,
                                    selectedGames: p.selectedGames.map((game) =>
                                      game.game === gameName
                                        ? { ...game, code: "" } // Update code for InternationalBridge
                                        : game // Keep the other games as is
                                    ),
                                  }
                                  : p
                              )
                            );
                          }
                          else {
                            labelText.textContent = `${gameName} (50kr)`;
                          }
                        }
                      }
                    }

                    const handleGameSelection = (event, gameName) => {
                      let tempCost = 0;
                      const inputElement = document.getElementById(`codeFor${gameName}${player.id}`);
                      const labelText = document.getElementById(`labelFor${gameName}${player.id}`);
                      // console.log("Game name:", gameName);
                      // console.log("Selected Games: ", selectedGames);
                      // console.log("Entered Code", inputElement.value);

                      const gamesWithCode = [
                        "TableTannisSingles",
                        "LudoSingles",
                        "Chess",
                        "CallBridge",
                        "Uno"
                      ];

                      setMalePlayers((prevPlayers) =>
                        prevPlayers.map((p, index) =>
                          index === playerIndex
                            ? {
                              ...p,
                              selectedGames: event.target.checked
                                ? [
                                  ...selectedGames,
                                  //{ game: gameName, code: gamesWithCode.includes(gameName) ? p.ownCode : inputElement.value },
                                  { game: gameName, code: p.ownCode },
                                ]
                                : selectedGames.filter((game) => game.game !== gameName), // Remove game object if unchecked

                            }
                            : p
                        )
                      );

                      if (event.target.checked) {

                        if ((gameName === "TableTannisSingles")
                          || (gameName === "Chess")
                          || (gameName === "CallBridge")
                          || (gameName === "LudoSingles")
                          || (gameName === "Uno")) {
                          setMaleGameCost((prevGameCost) => prevGameCost + 25)
                        } else {
                          if (inputElement.value === "") {
                            setMaleGameCost((prevGameCost) => prevGameCost + 50)
                          }
                          // else
                          // labelText.textContent = `${gameName} (0kr)`;
                        }
                      } else
                        if ((gameName === "TableTannisSingles")
                          || (gameName === "Chess")
                          || (gameName === "CallBridge")
                          || (gameName === "LudoSingles")
                          || (gameName === "Uno")) {
                          setMaleGameCost((prevGameCost) => prevGameCost - 25)
                        } else {
                          if (inputElement.value === "") {
                            setMaleGameCost((prevGameCost) => prevGameCost - 50)
                          }
                        }

                    };

                    return (
                      <div key={playerIndex}>
                        <div className="input-group mb-3">
                          <i className="bi bi-person-fill me-2"></i>
                          <span className="input-group-text">{player.id}</span>
                          <input
                            className="form-control"
                            placeholder="Full Name"
                            type="text" name={player.id}
                            id={player.id}
                            required></input>
                        </div>
                        <p>Participate in:</p>
                        {maleGames.map((game) => {
                          console.log()
                          let availableSeats = checkAvailableSeats(game.name);
                          let infoText = "";
                          let code = "";
                          let singleGame = false;

                          if (game.name != "TableTannisSingles"
                            && game.name != "LudoSingles"
                            && game.name != "Chess"
                            && game.name != "CallBridge"
                            && game.name != "Uno") {
                            infoText = "Enter code from your partner or leave it empty";
                            code = "";
                          }
                          else {

                            infoText = "";
                            code = player.ownCode;
                            singleGame = true;
                          }
                          const handleFocus = (event) => {
                            setInitialCode(event.target.value);
                          }
                          const defineGameCost = (gameName, code) => {
                            if (
                              gameName.includes("Doubles") ||
                              gameName.includes("29") ||
                              gameName.includes("InternationalBridge")
                            ) {
                              return code && code.trim() ? "0kr" : "50kr";
                            }
                            return "25kr";
                          };
                          return (
                            <div key={game.name} className="row">
                              <div className="col-3 ms-3">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`checkedFor${game.name}${player.id}`}
                                    disabled={(availableSeats === 0) || (selectedGames.length >= 3 && !selectedGames.find(selectedGame => selectedGame.game === game.name))}
                                    checked={selectedGames.some(selectedGame => selectedGame.game === game.name)}
                                    onChange={(event) => handleGameSelection(event, game.name)}
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`labelFor${game.name}${player.id}`}
                                    htmlFor={game.id}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {game.label} ({defineGameCost(game.name, code)})
                                  </label>
                                </div>
                              </div>
                              <div className="col-3 " style={{ fontSize: "12px" }}>
                                {infoText}
                              </div>
                              <div className="col-2 ">
                                <input
                                  className="form-control"
                                  placeholder={code}
                                  id={`codeFor${game.name}${player.id}`}
                                  style={{ width: "60px", height: "25px", borderRadius: "8px" }}
                                  onFocus={(event) => handleFocus(event)}
                                  onBlur={(event) => handleCodeInput(event, game.name)}
                                  disabled={
                                    availableSeats === 0 ||
                                    (selectedGames.length >= 3 && !selectedGames.find(selectedGame => selectedGame.game === game.name) || (singleGame))
                                  }>
                                </input>
                              </div>
                              <div className="col-2 ms-3" style={{ fontSize: "12px" }}>
                                {availableSeats} seats left
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>

              </div>
              <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                <div className="d-flex input-group mb-3 border-bottom pb-1">
                  <i className="bi bi-person-standing me-2"></i>
                  <span className="input-group-text text-wrap"> Number of Females</span>
                  {/* <select className="custom-select" onChange={(event) => addInput(event.target.value, "femaleContainer")}> */}
                  <select className="custom-select" onChange={(event) => handleNumberForPlayer(event.target.value, "female")}>
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
                <div id="femaleContainer">
                  {femalePlayers.map((player, playerIndex) => {
                    // console.log(player);
                    const selectedGames = player.selectedGames || [];

                    const handleCodeInput = (event, gameName) => {
                      const checkedElement = document.getElementById(`checkedFor${gameName}${player.id}`);
                      const labelText = document.getElementById(`labelFor${gameName}${player.id}`);

                      let receivedCode = event.target.value;
                      if (receivedCode !== initialCode) { // if the code in the input is not changed
                        if ((receivedCode) && (receivedCode.length === 5)) { // if the input code has lenght 5
                          console.log("primary code1:", primaryMaleCode)
                          console.log("received code1:", receivedCode)
                          if (checkedElement.checked) { // if we have entered code and checked. 
                            console.log("Game Name: ", gameName)
                            if (receivedCode === primaryMaleCode) {
                              console.log("Checked with my husbands code");
                              setFemaleGameCost((prevGameCost) => prevGameCost + 50);
                              labelText.textContent = `${gameName} (50kr)`;
                              setFemalePlayers((prevPlayers) =>
                                prevPlayers.map((p, index) =>
                                  index === playerIndex
                                    ? {
                                      ...p,
                                      selectedGames: p.selectedGames.map((game) =>
                                        game.game === gameName
                                          ? { ...game, code: "" } // Update code for InternationalBridge
                                          : game // Keep the other games as is
                                      ),
                                    }
                                    : p
                                )
                              );
                            } else {
                              setFemaleGameCost((prevGameCost) => prevGameCost - 50);
                              labelText.textContent = `${gameName} (0kr)`;
                              setFemalePlayers((prevPlayers) =>
                                prevPlayers.map((p, index) =>
                                  index === playerIndex
                                    ? {
                                      ...p,
                                      selectedGames: p.selectedGames.map((game) =>
                                        game.game === gameName
                                          ? { ...game, code: document.getElementById(`codeFor${gameName}${player.id}`).value } // Update code for InternationalBridge
                                          : game // Keep the other games as is
                                      ),
                                    }
                                    : p
                                )
                              );
                            }


                          } else if (receivedCode === primaryMaleCode) {
                            console.log("my husbands code");
                            labelText.textContent = `${gameName} (50kr)`;
                          }
                          else { // if we havnt selected a game, but entered code then just the label change do not calculate
                            labelText.textContent = `${gameName} (0kr)`;
                          }
                        } else {
                          if (receivedCode.length >= 1) {
                            alert("Your partner's code is wrong");
                            document.getElementById(`codeFor${gameName}${player.id}`).value = "";
                          }
                          if (checkedElement.checked) {
                            setFemaleGameCost((prevGameCost) => prevGameCost + 50);
                            labelText.textContent = `${gameName} (50kr)`;
                            setFemalePlayers((prevPlayers) =>
                              prevPlayers.map((p, index) =>
                                index === playerIndex
                                  ? {
                                    ...p,
                                    selectedGames: p.selectedGames.map((game) =>
                                      game.game === gameName
                                        ? { ...game, code: "" } // Update code for InternationalBridge
                                        : game // Keep the other games as is
                                    ),
                                  }
                                  : p
                              )
                            );
                          }
                          else {
                            labelText.textContent = `${gameName} (50kr)`;
                          }
                        }
                      }
                    }

                    const handleGameSelection = (event, gameName) => {
                      let tempCost = 0;
                      const inputElement = document.getElementById(`codeFor${gameName}${player.id}`);
                      // console.log("Game name:", gameName);
                      // console.log("Selected Games: ", selectedGames);
                      // console.log("Entered Code", inputElement.value);

                      const gamesWithCode = [
                        "TableTannisSingles",
                        "LudoSingles",
                        "Chess",
                        "CallBridge",
                        "Uno"
                      ];

                      setFemalePlayers((prevPlayers) =>
                        prevPlayers.map((p, index) =>
                          index === playerIndex
                            ? {
                              ...p,
                              selectedGames: event.target.checked
                                ? [
                                  ...selectedGames,
                                  { game: gameName, code: p.ownCode },
                                ]
                                : selectedGames.filter((game) => game.game !== gameName), // Remove game object if unchecked

                            }
                            : p
                        )
                      );

                      if (event.target.checked) {

                        if ((gameName === "TableTannisSingles")
                          || (gameName === "Chess")
                          || (gameName === "CallBridge")
                          || (gameName === "LudoSingles")
                          || (gameName === "Uno")) {
                          setFemaleGameCost((prevGameCost) => prevGameCost + 25)
                        } else {
                          if (inputElement.value === "") {
                            setFemaleGameCost((prevGameCost) => prevGameCost + 50)
                          }
                        }
                      } else
                        if ((gameName === "TableTannisSingles")
                          || (gameName === "Chess")
                          || (gameName === "CallBridge")
                          || (gameName === "LudoSingles")
                          || (gameName === "Uno")) {
                          setFemaleGameCost((prevGameCost) => prevGameCost - 25)
                        } else {
                          if (inputElement.value === "") {
                            setFemaleGameCost((prevGameCost) => prevGameCost - 50)
                          }
                        }

                    };

                    return (
                      <div key={playerIndex}>
                        <div className="input-group mb-3">
                          <i className="bi bi-person-fill me-2"></i>
                          <span className="input-group-text">{player.id}</span>
                          <input
                            className="form-control"
                            placeholder="Full Name"
                            type="text" name={player.id}
                            id={player.id}
                            required></input>
                        </div>
                        <p>Participate in:</p>
                        {femaleGames.map((game) => {
                          console.log()
                          let availableSeats = checkAvailableSeats(game.name);
                          let infoText = "";
                          let code = "";
                          let singleGame = false;

                          if (game.name != "TableTannisSingles"
                            && game.name != "LudoSingles"
                            && game.name != "Chess"
                            && game.name != "CallBridge"
                            && game.name != "Uno") {
                            infoText = "Enter code from your partner or leave it empty";
                            code = "";
                          }
                          else {

                            infoText = "";
                            code = player.ownCode;
                            singleGame = true;
                          }
                          const handleFocus = (event) => {
                            setInitialCode(event.target.value);
                          }
                          const defineGameCost = (gameName, code) => {
                            if (
                              gameName.includes("Doubles") ||
                              gameName.includes("29") ||
                              gameName.includes("InternationalBridge")
                            ) {
                              return code && code.trim() ? "0kr" : "50kr";
                            }
                            return "25kr";
                          };
                          return (
                            <div key={game.name} className="row">
                              <div className="col-3 ms-3">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`checkedFor${game.name}${player.id}`}
                                    disabled={(availableSeats === 0) || (selectedGames.length >= 3 && !selectedGames.find(selectedGame => selectedGame.game === game.name))}
                                    checked={selectedGames.some(selectedGame => selectedGame.game === game.name)}
                                    onChange={(event) => handleGameSelection(event, game.name)}
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`labelFor${game.name}${player.id}`}
                                    htmlFor={game.id}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {game.label} ({defineGameCost(game.name, code)})
                                  </label>
                                </div>
                              </div>
                              <div className="col-3 " style={{ fontSize: "12px" }}>
                                {infoText}
                              </div>
                              <div className="col-2 ">
                                <input
                                  className="form-control"
                                  placeholder={code}
                                  id={`codeFor${game.name}${player.id}`}
                                  style={{ width: "60px", height: "25px", borderRadius: "8px" }}
                                  onFocus={(event) => handleFocus(event)}
                                  onBlur={(event) => handleCodeInput(event, game.name)}
                                  disabled={
                                    availableSeats === 0 ||
                                    (selectedGames.length >= 3 && !selectedGames.find(selectedGame => selectedGame.game === game.name) || (singleGame))
                                  }>
                                </input>
                              </div>
                              <div className="col-2 ms-3" style={{ fontSize: "12px" }}>
                                {availableSeats} seats left
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                <div className="d-flex input-group mb-3 border-bottom pb-1">
                  <i className="bi bi-person-standing me-2"></i>
                  <span className="input-group-text text-wrap"> Number of children between 6 to 13 years old</span>
                  {/* <select className="custom-select" onChange={(event) => addInput(event.target.value, "bigKidContainer")}> */}
                  <select className="custom-select" onChange={(event) => handleNumberForPlayer(event.target.value, "bigKids")}>
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
                <div id="bigKidContainer">
                  {kidsPlayers.map((player, playerIndex) => {
                    // console.log(player);
                    const selectedGames = player.selectedGames || [];

                    const handleCodeInput = (event, gameName) => {
                      const checkedElement = document.getElementById(`checkedFor${gameName}${player.id}`);
                      const labelText = document.getElementById(`labelFor${gameName}${player.id}`);
                      let receivedCode = event.target.value;

                      if (receivedCode !== initialCode) {
                        if ((receivedCode) && (receivedCode.length === 5)) {
                          const codeExist = () => {
                            if (gameName === "TableTannisSingles") {
                              return ttSingles.includes(receivedCode) // return true or false
                            }
                            if (gameName === "TableTannisDoubles") {
                              return ttDoubles.includes(receivedCode)
                            }
                            if (gameName === "CarromDoubles") {
                              return carromDoubles.includes(receivedCode)
                            }
                            if (gameName === "29") {
                              return card29.includes(receivedCode)
                            }
                            if (gameName === "LudoDoubles") {
                              return ludoDoubles.includes(receivedCode)
                            }
                          }
                          if (codeExist()) {
                            alert("Your partner's has paired up with others in this game");
                            document.getElementById(`codeFor${gameName}${player.id}`).value = "";
                          } else if (checkedElement.checked) {
                            setKidsGameCost((prevGameCost) => prevGameCost - 50);
                            labelText.textContent = `${gameName} (0kr)`;
                            setKidsPlayers((prevPlayers) =>
                              prevPlayers.map((p, index) =>
                                index === playerIndex
                                  ? {
                                    ...p,
                                    selectedGames: p.selectedGames.map((game) =>
                                      game.game === gameName
                                        ? { ...game, code: document.getElementById(`codeFor${gameName}${player.id}`).value } // Update code for InternationalBridge
                                        : game // Keep the other games as is
                                    ),
                                  }
                                  : p
                              )
                            );
                          }
                        } else {
                          if (receivedCode.length >= 1) {
                            alert("Your partner's code is wrong");
                            document.getElementById(`codeFor${gameName}${player.id}`).value = "";
                          }
                          if (checkedElement.checked) {
                            setKidsGameCost((prevGameCost) => prevGameCost + 50);
                            labelText.textContent = `${gameName} (50kr)`;
                            setKidsPlayers((prevPlayers) =>
                              prevPlayers.map((p, index) =>
                                index === playerIndex
                                  ? {
                                    ...p,
                                    selectedGames: p.selectedGames.map((game) =>
                                      game.game === gameName
                                        ? { ...game, code: "" } // Update code for InternationalBridge
                                        : game // Keep the other games as is
                                    ),
                                  }
                                  : p
                              )
                            );
                          }
                        }
                      }
                    }

                    const handleGameSelection = (event, gameName) => {
                      let tempCost = 0;
                      const inputElement = document.getElementById(`codeFor${gameName}${player.id}`);
                      // console.log("Game name:", gameName);
                      // console.log("Selected Games: ", selectedGames);
                      // console.log("Entered Code", inputElement.value);

                      const gamesWithCode = [
                        "TableTannisSingles",
                        "LudoSingles",
                        "Chess",
                        "CallBridge",
                        "Uno"
                      ];

                      setKidsPlayers((prevPlayers) =>
                        prevPlayers.map((p, index) =>
                          index === playerIndex
                            ? {
                              ...p,
                              selectedGames: event.target.checked
                                ? [
                                  ...selectedGames,
                                  { game: gameName, code: p.ownCode },
                                ]
                                : selectedGames.filter((game) => game.game !== gameName), // Remove game object if unchecked

                            }
                            : p
                        )
                      );

                      if (event.target.checked) {

                        if ((gameName === "TableTannisSingles")
                          || (gameName === "Chess")
                          || (gameName === "CallBridge")
                          || (gameName === "LudoSingles")
                          || (gameName === "Uno")) {
                          setKidsGameCost((prevGameCost) => prevGameCost + 25)
                        } else {
                          if (inputElement.value === "") {
                            setKidsGameCost((prevGameCost) => prevGameCost + 50)
                          }
                        }
                      } else
                        if ((gameName === "TableTannisSingles")
                          || (gameName === "Chess")
                          || (gameName === "CallBridge")
                          || (gameName === "LudoSingles")
                          || (gameName === "Uno")) {
                          setKidsGameCost((prevGameCost) => prevGameCost - 25)
                        } else {
                          if (inputElement.value === "") {
                            setKidsGameCost((prevGameCost) => prevGameCost - 50)
                          }
                        }

                    };

                    return (
                      <div key={playerIndex}>
                        <div className="input-group mb-3">
                          <i className="bi bi-person-fill me-2"></i>
                          <span className="input-group-text">{player.id}</span>
                          <input
                            className="form-control"
                            placeholder="Full Name"
                            type="text" name={player.id}
                            id={player.id}
                            required></input>
                        </div>
                        <p>Participate in:</p>
                        {kidsGames.map((game) => {
                          console.log()
                          let availableSeats = checkAvailableSeats(game.name);
                          let infoText = "";
                          let code = "";
                          let singleGame = false;

                          if (game.name != "TableTannisSingles"
                            && game.name != "LudoSingles"
                            && game.name != "Chess"
                            && game.name != "CallBridge"
                            && game.name != "Uno") {
                            infoText = "Enter code from your partner or leave it empty";
                            code = "";
                          }
                          else {

                            infoText = "";
                            code = player.ownCode;
                            singleGame = true;
                          }
                          const handleFocus = (event) => {
                            setInitialCode(event.target.value);
                          }
                          const defineGameCost = (gameName, code) => {
                            if (
                              gameName.includes("Doubles") ||
                              gameName.includes("29") ||
                              gameName.includes("InternationalBridge")
                            ) {
                              return code && code.trim() ? "0kr" : "50kr";
                            }
                            return "25kr";
                          };
                          return (
                            <div key={game.name} className="row">
                              <div className="col-3 ms-3">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`checkedFor${game.name}${player.id}`}
                                    disabled={(availableSeats === 0) || (selectedGames.length >= 3 && !selectedGames.find(selectedGame => selectedGame.game === game.name))}
                                    checked={selectedGames.some(selectedGame => selectedGame.game === game.name)}
                                    onChange={(event) => handleGameSelection(event, game.name)}
                                  />
                                  <label
                                    className="form-check-label"
                                    id={`labelFor${game.name}${player.id}`}
                                    htmlFor={game.id}
                                    style={{ fontSize: "12px" }}
                                  >
                                    {game.label} ({defineGameCost(game.name, code)})
                                  </label>
                                </div>
                              </div>
                              <div className="col-3 " style={{ fontSize: "12px" }}>
                                {infoText}
                              </div>
                              <div className="col-2 ">
                                <input
                                  className="form-control"
                                  placeholder={code}
                                  id={`codeFor${game.name}${player.id}`}
                                  style={{ width: "60px", height: "25px", borderRadius: "8px" }}
                                  onFocus={(event) => handleFocus(event)}
                                  onBlur={(event) => handleCodeInput(event, game.name)}
                                  disabled={
                                    availableSeats === 0 ||
                                    (selectedGames.length >= 3 && !selectedGames.find(selectedGame => selectedGame.game === game.name) || (singleGame))
                                  }>
                                </input>
                              </div>
                              <div className="col-2 ms-3" style={{ fontSize: "12px" }}>
                                {availableSeats} seats left
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="ps-1 pe-1 pt-3 pb-2 mb-1 rounded border">
                <div className="input-group  mb-3 border-bottom pb-1">
                  <i className="bi bi-person-arms-up me-2"></i>
                  <span className="input-group-text text-wrap"> Number of children between 0 to 5 years old</span>
                  {/* <select className="custom-select" onChange={(event) => addInput(event.target.value, "smallKidContainer")}> */}
                  <select className="custom-select" onChange={(event) => handleNumberForPlayer(event.target.value, "smallKids")}>
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
                  {smallKids.map((player, playerIndex) => (

                    <div key={playerIndex}>
                      <div className="input-group mb-3">
                        <i className="bi bi bi-person-standing me-2"></i>
                        <span className="input-group-text">{player.id}</span>
                        <input
                          className="form-control"
                          placeholder="Full Name"
                          type="text" name={player.id}
                          id={player.id}
                          required></input>
                      </div>

                    </div>
                  ))}
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