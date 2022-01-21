import React, { Fragment, useEffect, useState } from "react";
import EditPlayer from "./EditPlayer";

function ListPlayers() {
  const [players, setPlayers] = useState([]);

  //Get all players
  const getPlayers = async () => {
    try {
      const response = await fetch("http://localhost:5000/players");
      const jsonData = await response.json();
      setPlayers(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //Delete the selected player
  const deletePlayer = async (id) => {
    try {
      const deletePlayer = await fetch(`http://localhost:5000/players/${id}`, {
        method: "DELETE",
      });

      setPlayers(players.filter((players) => players.player_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid py-5 d-flex justify-content-center align-items-center">
        <div className="row px-4 justify-content-center align-items-center">
          {players.map((e) => {
            return (
              <div className="card text-center w-fit me-4 mt-4" key={e.player_id}>
                <div className="card-body">
                  <h5 className="card-title">{e.player_name}</h5>
                  <div className="card-text">
                    <p>Current Team: {e.player_team}</p>
                    <p>Jersey Number: {e.player_number}</p>
                  </div>
                  <div>
                    <EditPlayer player={e} />
                    <button
                      className="btn btn-danger shadow-none"
                      onClick={() => {
                        deletePlayer(e.player_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
}

export default ListPlayers;
