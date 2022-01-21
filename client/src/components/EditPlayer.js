import React, { Fragment, useState } from "react";

function EditPlayer({ player }) {
  const [newPlayerName, setNewPlayerName] = useState(player.player_name);
  const [newPlayerTeam, setNewPlayerTeam] = useState(player.player_team);
  const [newPlayerNumber, setNewPlayerNumber] = useState(player.player_number);
  
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/players/${player.player_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            newPlayerName,
            newPlayerTeam,
            newPlayerNumber,
          }),
        }
      );
      window.location = "/";
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-success shadow-none me-3"
        data-bs-toggle="modal"
        data-bs-target={`#id${player.player_id}`}
        onClick={() => {
          setNewPlayerName(player.player_name);
          setNewPlayerTeam(player.player_team);
          setNewPlayerNumber(player.player_number);
        }}
      >
        Edit
      </button>

      <div
        className="modal fade"
        id={`id${player.player_id}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                Edit Player
              </h5>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setNewPlayerName(player.player_name);
                  setNewPlayerTeam(player.player_team);
                  setNewPlayerNumber(player.player_number);
                }}
              ></button>
            </div>
            <div className="modal-body text-start">
              <form onSubmit={submitForm}>
                <div className="mb-3">
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    className="form-control rounded-0 shadow-none"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="team">Current Team:</label>
                  <input
                    id="team"
                    type="text"
                    className=" form-control rounded-0 shadow-none"
                    value={newPlayerTeam}
                    onChange={(e) => setNewPlayerTeam(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="number">Jersey Number:</label>
                  <input
                    id="number"
                    type="number"
                    className="form-control rounded-0 shadow-none"
                    value={newPlayerNumber}
                    onChange={(e) => setNewPlayerNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="d-flex justify-content-center py-3">
                  <button
                    type="submit"
                    className="btn btn-success shadow-none m-0 px-3"
                    data-bs-toggle="modal"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditPlayer;
