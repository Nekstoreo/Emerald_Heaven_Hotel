import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoomBookingPage.module.css";

function RoomBookingPage({ email }) {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  
  const validation = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
  
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
  
    if (!formDataObject.Name) {
      setErrorMessage("Please enter your name");
      return;
    }
  
    if (!formDataObject.Email) {
      setErrorMessage("Please enter your email");
      return;
    }
  
    if (!formDataObject.phoneNumber) {
      setErrorMessage("Please enter your phone number");
      return;
    }
  
    if (!formDataObject.checkInDate) {
      setErrorMessage("Please enter your check in date");
      return;
    }
  
    if (!formDataObject.checkOutDate) {
      setErrorMessage("Please enter your check out date");
      return;
    }
  
    if (!formDataObject.noOfPeople) {
      setErrorMessage("Please enter the number of people");
      return;
    }
  
    if (!formDataObject.typeOfRoom) {
      setErrorMessage("Please select a room type");
      return;
    }
  
    setErrorMessage("");

    if (!email) {
      setErrorMessage("Email cannot be null");
      return;
    }
  
    fetch("http://localhost:3008/roombooking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formDataObject, Email: email }), // Agregar el email aquí
    })
      .then((r) => r.json())
      .then((response) => {
        if (!response.success) {
          setErrorMessage(response.message || "An error occurred");
          return;
        }
        navigate("/bookingsuccessfull");
      })
      .catch((error) => {
        setErrorMessage("An error occurred while processing your request");
      });
  };
  

  return (
    <div>
      <div
        style={{
          marginTop: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form className={styles["BookingForm"]} onSubmit={validation}>
          <label style={{ marginTop: "10px" }}>
            Name <span>*</span>
          </label>
          <input type="text" name="Name" required />
          <br />
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input type="email" id="emailId" name="Email" required />
          <br />
          <label htmlFor="number">
            Phone Number <span>*</span>
          </label>
          <input type="number" id="phoneNumber" name="phoneNumber" required />
          <br />
          <label htmlFor="checkInDate">Check In date</label>
          <input
            type="date"
            name="checkInDate"
            id="date-input"
            placeholder="Check In"
            required
          />
          <br />
          <label htmlFor="checkOutDate">Check Out date</label>
          <input
            type="date"
            name="checkOutDate"
            id="date-output"
            placeholder="Check Out"
            required
          />
          <br />
          <label htmlFor="noOfPeople">
            Number of People <span>*</span>
          </label>
          <div className="newcontainer">
            <input type="number" name="noOfPeople" min="1" max="5" required />
          </div>
          <br />
          <label htmlFor="typeOfRoom">Type of Room : </label>
          <select name="typeOfRoom" id="typeOfRoom">
            <option value="singlebed">Single Bed</option>
            <option value="doublebed">Double Bed</option>
            <option value="queen">Queen</option>
            <option value="king">King</option>
          </select>
          <br />
          <input type="submit" className="btn" value={"Book Now"} />
          <label className="errorLabel">{errorMessage}</label>
        </form>
      </div>
    </div>
  );
}

export default RoomBookingPage;
