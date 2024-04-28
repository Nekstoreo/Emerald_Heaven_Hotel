import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const onButtonClick = async () => {
    setEmailError("");
    setPasswordError("");

    if ("" === email) {
      setEmailError("Please enter your email");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if ("" === password) {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/check-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.userExists) {
        logIn();
      } else {
        setEmailError("This email is not registered hey");
      }
    } catch (error) {
      console.error("Error checking account:", error);
      // Handle error if needed
      setEmailError("An error occurred");
    }
  };

  const logIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if ("success" === data.message) {
        localStorage.setItem("user", JSON.stringify({ token: data.token }));
        props.setLoggedIn(true);
        props.setEmail(email);
        navigate("/");
      } else if ("Invalid password" === data.message) {
        setPasswordError("Wrong password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error if needed
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={"titleContainer"}>
        <div>Login</div>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <input
          type="password"
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className={"inputBox"}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div>
        <label className="alreadyHaveAccount">
          Don't have an account?
          <a href="/signup" className={"linkLabel"}> Sign up</a>
        </label>
      </div>
      <br />
      <div className={"inputContainer"}>
        <Button variant="primary" onClick={onButtonClick} className={"button"}>
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Login;
