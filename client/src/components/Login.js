import React, { Fragment, useState } from "react";

function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmitForm = async (e) => {
    e.preventDefault();

    let loginEmailError = document.getElementById("login-email-error");
    let loginPasswordError = document.getElementById("login-password-error");
    let wrongLoginInput = document.getElementById("wrong-login-input");

    if (loginEmail.trim() === "") {
      loginEmailError.innerHTML = "Email cannot be blank!";
    } else if (loginEmail.trim() !== "") {
      loginEmailError.innerHTML = "";
    }

    if (loginPassword.trim() === "") {
      loginPasswordError.innerHTML = "Password cannot be blank!";
    } else if (loginPassword.trim() !== "") {
      loginPasswordError.innerHTML = "";
    }

    if (loginEmail.trim() !== "" && loginPassword.trim() !== "") {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginEmail, loginPassword }),
      });
      console.log("reponse = ", response);
      if (response.status === 400) {
        wrongLoginInput.innerHTML = "Wrong username/password combination!";
        // loginUsernameError.innerHTML = "Wrong email!";
        console.log(response.status);
      } else {
        wrongLoginInput.innerHTML = "";
        window.location = "/";
      }
    }
  };

  // const response = axios
  //   .post("http://localhost:5000/login", {
  //     username: username, //check if database username matches input
  //     password: password, //check if database password matches input
  //   })
  //   .then((response) => {
  //     if (response.data.message) {
  //       setLoginStatus(response.data.message);
  //     } else {
  //       setLoginStatus(response.data[0].username);
  //       console.log(response.data);
  //     }
  //   });

  return (
    <Fragment>
      <div className="d-flex">
        <a href="/" className="ms-auto shadow-none mb-4 mt-3 me-4">
          <button type="button" className="btn btn-light shadow-none">
            Home
          </button>
        </a>
      </div>
      <div className="d-flex justify-content-center align-item-center my-4">
        <form className="signup-form" onSubmit={loginSubmitForm}>
          <h2 className="text-center mb-4">Login</h2>
          <p className="text-center" id="wrong-login-input"></p>
          <div className="mb-5">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              className="form-control rounded-0 shadow-none"
              placeholder="Email"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <p id="login-email-error"></p>
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              className=" form-control rounded-0 shadow-none"
              placeholder="Password"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <p id="login-password-error"></p>
          </div>
          <div className="d-flex justify-content-center py-3">
            <button
              id="loginModalButton"
              type="submit"
              className="btn btn-success shadow-none m-0 px-4"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default Login;
