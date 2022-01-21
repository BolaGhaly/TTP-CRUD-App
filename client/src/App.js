import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//components
import InputPlayer from "./components/InputPlayer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  //"Anonymous"
  const [username, setUsername] = useState("Anonymous");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <InputPlayer username={username} setUsername={setUsername} />
            }
          />
          <Route
            exact
            path="/signup"
            element={
              <SignUp
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            }
          />
          <Route exact path="/login" element={<Login username={username} />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
