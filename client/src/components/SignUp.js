import React, { Fragment, useState, useEffect } from "react";

function SignUp({
  username,
  setUsername,
  email,
  setEmail,
  password,
  setPassword,
}) {
  const [validUsername, setValidUsername] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  useEffect(() => {
    setUsername("");
    setEmail("");
    setPassword("");
  }, []);


  // email validation
  const emailValidation = (email) => {
    const regEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regEx.test(email)) {
      return true;
    }
    return false;
  };

  // password validation
  // minimum 8 characters, at least one Uppercase letter, one number, one special character
  const passwordValidation = (password) => {
    const regEx2 =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (regEx2.test(password)) {
      return true;
    }
    return false;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    let usernameError = document.getElementById("signup-username-error");
    let emailError = document.getElementById("signup-email-error");
    let passwordError = document.getElementById("signup-password-error");

    if (username.trim() === "") {
      usernameError.innerHTML = "Username cannot be blank!";
    } else if (username.trim() !== "") {
      usernameError.innerHTML = "";
      setValidUsername(true);
    }
    console.log(username);
    if (email.trim() === "") {
      emailError.innerHTML = "Email cannot be blank!";
    } else if (email.trim() !== "") {
      if (!emailValidation(email.trim())) {
        emailError.innerHTML = "Email is not valid!";
      } else if (emailValidation(email.trim())) {
        emailError.innerHTML = "";
        setValidEmail(true);
      }
    }

    if (password.trim() === "") {
      passwordError.innerHTML = "Password cannot be blank!";
    } else if (password.trim() !== "") {
      if (!passwordValidation(password.trim())) {
        passwordError.innerHTML = "Password is not valid!";
      } else if (passwordValidation(password.trim())) {
        passwordError.innerHTML = "";
        setValidPassword(true);
      }
    }

    if (validUsername && validEmail && validPassword) {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.status === 400) {
        emailError.innerHTML = "Email already in use!";
        setValidEmail(false)
      }
      else {
        window.location = "/";
      }
    }
  };

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
        <form onSubmit={submitForm} className="signup-form">
          <h2 className="text-center mb-4">Create an Account</h2>
          <div className="mb-4">
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className="form-control rounded-0 shadow-none"
              placeholder="Username"
              maxLength="30"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <p id="signup-username-error"></p>
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="text"
              className="form-control rounded-0 shadow-none"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <p id="signup-email-error"></p>
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password:</label>
            <ul>
              <li>Minimum 8 characters</li>
              <li>At least one Uppercase letter</li>
              <li>At least one number</li>
              <li>At least one special character</li>
            </ul>
            <input
              id="password"
              type="password"
              className=" form-control rounded-0 shadow-none"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p id="signup-password-error"></p>
          </div>
          <div className="d-flex justify-content-center pt-3 pb-5">
            <button
              type="submit"
              className="btn btn-success shadow-none m-0 px-4"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center">
            Already have an account? <span className="pe-1" />
            <a href="/login" className="">
              Login
            </a>
          </div>
        </form>
      </div>
    </Fragment>
  );
}

export default SignUp;
