const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression"); // import compression to reduce size of response
const bcrypt = require("bcryptjs"); // hash password
const port = 5000;
const pool = require("./db");

//middleware
app.use(compression()); // use compression middleware
app.use(cors());
app.use(express.json());

//------------------------------------------ ROUTES -----------------------------------------------------

//create a new player
app.post("/players", async (req, res) => {
  try {
    const player_name = req.body.playerName;
    const player_team = req.body.playerTeam;
    const player_number = req.body.playerNumber;
    const newPlayer = await pool.query(
      "INSERT INTO players (player_name, player_team, player_number) VALUES ($1, $2, $3) RETURNING *",
      [player_name, player_team, player_number]
    );
    res.json(newPlayer);
  } catch (error) {
    console.error(error.message);
  }
});

//get all players
app.get("/players", async (req, res) => {
  try {
    const allPlayers = await pool.query("SELECT * FROM players");
    res.json(allPlayers.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a player with an id
app.get("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await pool.query(
      "SELECT * FROM players WHERE player_id = $1",
      [id]
    );
    res.json(player.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a player
app.put("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const new_player_name = req.body.newPlayerName;
    const new_player_team = req.body.newPlayerTeam;
    const new_player_number = req.body.newPlayerNumber;
    const updatePlayer = await pool.query(
      "UPDATE players SET player_name = $1, player_team = $2, player_number = $3 WHERE player_id = $4",
      [new_player_name, new_player_team, new_player_number, id]
    );
    res.json("Player was updated");
  } catch (error) {
    console.error(error.message);
  }
});

//delete a player
app.delete("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePlayer = await pool.query(
      "DELETE FROM players WHERE player_id = $1",
      [id]
    );
    res.json("Player Was Deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

//sign up new user
app.post("/users", async (req, res) => {
  try {
    let errors = {};
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const isEmailInUse = await pool.query(
      "SELECT * FROM login_info WHERE email = $1",
      [email]
    );
    if (isEmailInUse.rows.length > 0) {
      errors.emailInUse = "Email is already in use";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json("Email is already in use!");
    }

    const signUpUser = await pool.query(
      "INSERT INTO login_info (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    res.json(signUpUser);
  } catch (error) {
    console.error(error.message);
  }
});

//get all users
app.get("/users", async (req, res) => {
  try {
    const loginUser = await pool.query("SELECT * FROM login_info");
    res.json(loginUser.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get one user based on id
app.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const loginUser = await pool.query(
      "SELECT * FROM login_info WHERE user_id = $1",
      [id]
    );
    res.json(loginUser.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//LOGIN
app.post("/login", async (req, res) => {
  try {
    const loginEmail = req.body.loginEmail;
    const loginPassword = req.body.loginPassword;
    const loginUser = await pool.query(
      "SELECT * FROM login_info WHERE email = $1 AND password = $2",
      [loginEmail, loginPassword]
    );
    if (loginUser.rows.length === 0) {
      return res.status(400).json("Wrong username/password combination!");
    } else {
      res.json(loginUser.rows);
    }
  } catch (error) {
    console.error(error.message);
  }
});

//delete a user based on user's id
app.delete("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletePlayer = await pool.query(
      "DELETE FROM login_info WHERE user_id = $1",
      [id]
    );
    res.json("User Was Deleted!");
  } catch (error) {
    console.error(error.message);
  }
});

//Listen to port
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
