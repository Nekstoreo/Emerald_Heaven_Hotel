import React, { useState } from "react";
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
        await logIn();
      } else {
        setEmailError("This email is not registered hey");
      }
    } catch (error) {
      console.error("Error checking account:", error);
      setEmailError("An error occurred");
    }
  };

  const logIn = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if ("success" === data.message) {
        localStorage.setItem("jwt-token", data.token);
        props.setLoggedIn(true);
        await getProfile();
      } else if ("Invalid password" === data.message) {
        setPasswordError("Wrong password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  async function getProfile() {
    try {
      const response = await fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "jwt-token": localStorage.getItem("jwt-token"),
        },
      });
      const data = await response.json();
      if (data.message === "success") {
        console.log("Profile retrieved successfully" + data.profile);
        localStorage.setItem("profile", JSON.stringify(data.profile));
        navigate("/");
      } else {
        console.error("Error retrieving profile:", data.message);
      }
    } catch (error) {
      console.error("Error retrieving profile:", error);
    }
  }

  return (
      <div className="flex flex-col items-center justify-center p-6 min-h-lvh">
        <div className="text-4xl font-bold mb-4">Login</div>
        <div className="mb-4">
          <input
              value={email}
              placeholder="Enter your email here"
              onChange={(ev) => setEmail(ev.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm text-red-500">{emailError}</label>
        </div>
        <div className="mb-4">
          <input
              type="password"
              value={password}
              placeholder="Enter your password here"
              onChange={(ev) => setPassword(ev.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm text-red-500">{passwordError}</label>
        </div>
        <div className="mb-4">
          <label className="text-sm">
            Don't have an account?
            <a href="/register" className="text-blue-500 hover:underline ml-1">
              Sign up
            </a>
          </label>
        </div>
        <div>
          <button
              onClick={onButtonClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Log in
          </button>
        </div>
      </div>
  );
};

export default Login;