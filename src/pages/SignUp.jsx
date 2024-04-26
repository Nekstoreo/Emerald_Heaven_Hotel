import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userExists, setUserExists] = useState("");

  const navigate = useNavigate();

  const onSignUpButtonClick = async () => {
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
    // Verify if the email is registered
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
        // If the email is registered, tell the user already exists
        setUserExists("User already exists, please ");
      } else if (!data.userExists) {
        // If the email is not registered, sign up the user
        signUp();
      }
    } catch (error) {
      console.error("Error checking account:", error);
      // Handle error if needed
    }
  };

  const signUp = async () => {
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
        <div>Create an account</div>
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
      <div className={"alreadyHaveAccount"}>
        {userExists ? (
          <div>
            <label>{userExists}</label>
            <a href="/login" className={"linkLabel"}> Log in</a>
          </div>
        ) : (
          <div>
            <label>Already have an account?</label>
            <a href="/login" className={"linkLabel"}> Log in</a>
          </div>
        )}
      </div>
      <br />
      <div className={"inputContainer"}>
        <Button
          variant="primary"
          onClick={onSignUpButtonClick}
          className={"button"}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default SignUp;
