import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ListPlayers from "./ListPlayers";

function InputPlayer({ username, setUsername }) {
  const [playerName, setPlayerName] = useState("");
  const [playerTeam, setPlayerTeam] = useState("");
  const [playerNumber, setPlayerNumber] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerName, playerTeam, playerNumber }),
      });
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  // useEffect(() => {
  //   setUsername("Anonymous");
  // }, [username]);

  return (
    <Fragment>
      <div>
        <div className="d-flex align-items-center mb-2 login-form">
          <p className="login-title d-flex justify-content-center align-items-center">
            <i className="fas fa-user pe-2 username-top" />
            {username}
          </p>
          <a href="/signup" className="ms-auto login-button shadow-none">
            <button type="button" className="btn btn-warning shadow-none">
              Sign Up
            </button>
          </a>
          {/* <Link>
          <button
            type="button"
            className="btn btn-warning ms-auto login-button shadow-none"
          >
            Sign Up
          </button>
          </Link> */}
        </div>
        <div>
          <h1 className="text-center nba-title">
            <i className="fas fa-basketball-ball pe-2"></i>NBA Players
            <i className="fas fa-basketball-ball ps-2"></i>
          </h1>
        </div>
        <div className="player-form">
          <h2>Add a Player</h2>
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                className="form-control rounded-0 shadow-none"
                placeholder="Name"
                onChange={(e) => {
                  setPlayerName(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="team">Current Team:</label>
              <input
                id="team"
                type="text"
                className=" form-control rounded-0 shadow-none"
                placeholder="Current Team"
                onChange={(e) => {
                  setPlayerTeam(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="number">Jersey Number:</label>
              <input
                id="number"
                type="number"
                className="form-control rounded-0 shadow-none"
                placeholder="Jersey Number"
                onChange={(e) => {
                  setPlayerNumber(e.target.value);
                }}
                required
              />
            </div>
            <div className="mb-4">
              <button className="btn shadow-none form-submit-button mx-auto d-flex">
                Add
              </button>
            </div>
          </form>
        </div>
        <ListPlayers />
      </div>
    </Fragment>
  );
}

export default InputPlayer;
