import React from 'react';
import { useState, useEffect, useRef } from "react";
import banner from "../../images/form-banner-1.jpg";
import 'bootstrap/dist/css/bootstrap.css';


import TeamsGroup from "./TeamsGroup";
import SelectionMenu from '../Menus/SelectionMenu';
import "./indoorGames.css";

function RegisterdTeams() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [ttSingles, setTtSingles] = useState([]);
    const [ttKidsSingles, setTtKidsSingles] = useState([]);
    const [ttDoubles, setTtDoubles] = useState([]);
    const [carromDoubles, setCarromDoubles] = useState([]);
    const [carromWomenDoubles, setCarromWomenDoubles] = useState([]);
    const [internationalBridge, setInternationalBridge] = useState([]);
    const [card29, setCard29] = useState([]);
    const [callBridge, setCallBridge] = useState([]);
    const [ludoSingles, setLudoSingles] = useState([]);
    const [ludoKidsSingles, setLudoKidsSingles] = useState([]);
    const [ludoDoubles, setLudoDoubles] = useState([]);
    const [chess, setChess] = useState([]);
    const [chessKids, setChessKids] = useState([]);
    const [uno, setUno] = useState([]);
    const [codes, setCodes] = useState([]);

    const [entryNo, setEntryNo] = useState([]);
    const [showMenu, setShowMenu] = useState(false);
    const [heading, setHeading] = useState("");
    const [items, setItems] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");


    const url = 'https://script.google.com/macros/s/AKfycby5oTs-F0XfLQ5eKzJJ183u4ziTtRxzeYwLwT81-njo1tyla405pvm_qSULsYLvBma8/exec';

    const [maleGames] = useState([{ id: "TableTannisSingles", name: "TableTannisSingles", label: "Table Tennis Men's Singles " },
    { id: "TableTannisDoubles", name: "TableTannisDoubles", label: "Table Tennis Men's Doubles " },
    { id: "CarromDoubles", name: "CarromDoubles", label: "Carrom Men's Doubles " },
    { id: "InternationalBridge", name: "InternationalBridge", label: "International Bridge " },
    { id: "29", name: "29", label: "29 " },
    { id: "Chess", name: "Chess", label: "Chess " }]);
    const [femaleGames] = useState([{ id: "CarromWomenDoubles", name: "CarromWomenDoubles", label: "Carrom Women's Doubles " },
    { id: "CallBridge", name: "CallBridge", label: "Call Bridge " },
    { id: "LudoSingles", name: "LudoSingles", label: "Ludo Women's Singles " },
    { id: "LudoDoubles", name: "LudoDoubles", label: "Ludo Doubles " }]);
    const [kidsGames] = useState([{ id: "ChessKids", name: "ChessKids", label: "Chess Kids" },
    { id: "LudoKidsSingles", name: "LudoKidsSingles", label: "Ludo Kid's Singles " },
    { id: "TableTannisKidsSingles", name: "TableTannisKidsSingles", label: "Table Tennis Kid's Singles " },
    { id: "Uno", name: "Uno", label: "Uno " }]);

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

    function processPair(entries, game){
        const map = {};
        const playerCode = entries
        .filter((entry) => entry[game])
        .map((entry) => [entry["Names"], entry[game]]);
        
        playerCode.forEach(([first, second]) => {
            if(!map[second]) {
                map[second] = [];
            }
            map[second].push(first);
        });
        const teams = Object.values(map);
        // teams.map(array =>{
        //     if (!array[1])
        //         array[1] = "";
        // })
        // console.log(teams)
        return teams;
    
    }

    function getColumnsData(entries) {
       
        // const grouped = test.reduce((acc, [name, code]) => {
        //     if (!acc[code]) acc[code] = [];
        //     acc[code].push(name);
        //     return acc;
        // }, {});
        // grouped.array.forEach(element => {
        //     console.log(key[])
        // });
        // console.log("team: ", grouped)
        setTtSingles(entries
            .filter((entry) => entry["Table Tennis Singles"])
            .map((entry) => entry["Names"]));

        setTtKidsSingles(entries
            .filter((entry) => entry["Table Tennis Kids Singles"])
            .map((entry) => entry["Names"]));

        setTtDoubles(           
            processPair(entries, "Table Tennis Doubles"));

        setCarromDoubles(
            processPair(entries, "Carrom Doubles"));

        setCarromWomenDoubles(
            processPair(entries, "Carrom Women Doubles"));

        setInternationalBridge(
            processPair(entries, "International Bridge"));

        setCard29(
            processPair(entries, "29"));

        setCallBridge(entries
            .filter((entry) => entry["Call Bridge"])
            .map((entry) => entry["Names"]));

        setLudoSingles(entries
            .filter((entry) => entry["Ludo Singles"])
            .map((entry) => entry["Names"]));

        setLudoKidsSingles(entries
            .filter((entry) => entry["Ludo Kids Singles"])
            .map((entry) => entry["Names"]));

        setLudoDoubles(
            processPair(entries, "Ludo Doubles"));

        setChess(entries
            .filter((entry) => entry["Chess"])
            .map((entry) => entry["Names"]));

        setChessKids(entries
            .filter((entry) => entry["Chess Kids"])
            .map((entry) => entry["Names"]));

        setUno(entries
            .filter((entry) => entry["Uno"])
            .map((entry) => entry["Names"]));

        setCodes(entries
            .filter((entry) => entry["Codes"])
            .map((entry) => entry["Codes"]));

        setEntryNo(entries
            .filter((entry) => entry["Entry no."])
            .map((entry) => entry["Entry no."]));
    }

    const handleSelection = (event) => {
        // console.log(ttKidsSingles);
        // console.log(event.target.value);
        if (event.target.value === "") {
            setShowMenu(false);
            // console.log(event.target.value);
        } else if (event.target.value === "men") {
            setShowMenu(true);
            // console.log(event.target.value);
            setHeading("Men's Games: ");
            setItems(maleGames);
        } else if (event.target.value === "women") {
            setShowMenu(true);
            // console.log(event.target.value);
            setHeading("Women's Games");
            setItems(femaleGames);
        } else if (event.target.value === "kid") {
            setShowMenu(true);
            // console.log(event.target.value);
            setHeading("Kid's Games");
            setItems(kidsGames);
        }
    }

    function gameEntries(game) {
        if (game === "TableTannisSingles") {
            // console.log(ttSingles);
            return ttSingles;
        }
        else if (game === "TableTannisDoubles") {
            // console.log(ttDoubles);
            return ttDoubles;
        }
        else if (game === "CarromDoubles") {
            // console.log(carromDoubles);
            return carromDoubles;
        }
        else if (game === "InternationalBridge") {
            // console.log(internationalBridge);
            return internationalBridge;
        }
        else if (game === "29") {
            // console.log(card29);
            return card29;
        }
        else if (game === "Chess") {
            console.log(chess);
            return chess;
        }
        else if (game === "CarromWomenDoubles"){
            // console.log(carromWomenDoubles);
            return carromWomenDoubles;
        }
        else if (game === "CallBridge"){
            // console.log(callBridge);
            return  callBridge;
        }
        else if (game === "LudoSingles"){
            // console.log(ludoSingles);
            return  ludoSingles;
        }
        else if (game === "LudoDoubles"){
            // console.log(ludoDoubles);
            return  ludoDoubles;
        }
        else if (game === "ChessKids"){
            // console.log(chessKids);
            return  chessKids;
        }
        else if (game === "LudoKidsSingles"){
            // console.log(ludoKidsSingles);
            return  ludoKidsSingles;
        }
        else if (game === "TableTannisKidsSingles"){
            // console.log(ttKidsSingles);
            return  ttKidsSingles;
        }
        else if (game === "Uno"){
            // console.log(uno);
            return  uno;
        }
    }

    return (
        <div className="row">
            {loading && <div className="text-center  text-white my-5">Please wait while loading the from .........</div>}
            {error && <div className="text-center  text-white my-5">Error: {error}</div>}
            {!loading && !error && (
                <div className="text-white">
                    <div className="p-4 text-center bg-dark">
                        <img src={banner} className="img-fluid" />
                    </div>
                    <div className="mt-1 p-2 rounded bg-dark">
                        <h5 className='p-2 text-center rounded border'>Registered Teams</h5>
                        <div className="d-flex mb-3 input-group">
                            <span className="input-group-text"> Show Games of  </span>
                            <select className="custom-select" onChange={(event) => {
                                handleSelection(event);
                                setSelectedGame("game");
                            }}>
                                <option value="" selected>Select cetagory:</option>
                                <option value="men">Men's</option>
                                <option value="women">Women's</option>
                                <option value="kid">Kid's</option>
                            </select>
                        </div>
                        {showMenu ?
                            <SelectionMenu
                                heading={heading}
                                items={items}
                                selectedValue={selectedGame}
                                onSelectionChange={setSelectedGame}
                            />
                            : ""}
                        {selectedGame != "game" && showMenu && (
                            <TeamsGroup
                                game={selectedGame}
                                team={{
                                    "Count": "",
                                    "Player": "",
                                    "Partner": ""
                                }}
                                data={gameEntries(selectedGame)}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default RegisterdTeams;