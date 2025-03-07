import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import logo from "./logo_in_header.png"

function Test() {
  const [numPlayers, setNumPlayers] = useState(0);
  const [players, setPlayers] = useState([]);
  const [games] = useState(["Game A", "Game B", "Game C"]);

  // Handle the change in the number of players
  const handleNumPlayersChange = (event) => {
    const count = parseInt(event.target.value, 10) || 0;
    setNumPlayers(count);
    setPlayers(
      Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        name: "",
        games: [],
      }))
    );
  };

  // Update player name
  const handleNameChange = (index, name) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index ? { ...player, name } : player
      )
    );
  };

  // Toggle game selection
  const toggleGame = (index, game) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) =>
        i === index
          ? {
              ...player,
              games: player.games.includes(game)
                ? player.games.filter((g) => g !== game)
                : [...player.games, game],
            }
          : player
      )
    );
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create FormData object
    const formData = new FormData();

    players.forEach((player, index) => {
      formData.append(`player_${index + 1}_name`, player.name);
      formData.append(`player_${index + 1}_games`, player.games.join(", "));
    });

    // Log formData content
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    alert("Form submitted! Check the console for FormData output.");
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Player Registration Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Number of Players */}
        <div>
          <label className="block mb-2 font-semibold">
            Number of Players:
          </label>
          <input
            type="number"
            min="1"
            value={numPlayers}
            onChange={handleNumPlayersChange}
            className="form-input border rounded px-3 py-1 w-full"
          />
        </div>

        {/* Player Details */}
        {players.map((player, index) => (
          <div key={player.id} className="p-4 border rounded bg-gray-100 mb-4">
            <h3 className="font-semibold mb-2">Player {index + 1}</h3>
            {/* Player Name */}
            <div className="mb-2">
              <label className="block mb-1">Player Name:</label>
              <input
                type="text"
                value={player.name}
                onChange={(e) => handleNameChange(index, e.target.value)}
                placeholder="Enter player's name"
                className="form-input border rounded px-3 py-1 w-full"
              />
            </div>
            {/* Games Selection */}
            <div>
              <p className="font-semibold mb-1">Games:</p>
              {games.map((game) => (
                <label
                  key={game}
                  className="flex items-center space-x-2 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={player.games.includes(game)}
                    onChange={() => toggleGame(index, game)}
                  />
                  <span>{game}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};


export default Test;
