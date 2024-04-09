import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RoomBookingPage.module.css";

function RoomBookingPage({ email }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [today, setToday] = useState("");
  const navigate = useNavigate();

  const validation = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const checkInDate = new Date(formData.get("checkInDate"));
    const checkOutDate = new Date(formData.get("checkOutDate"));

    if (checkInDate < today) {
      setErrorMessage("Check-in date must be today or later");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setErrorMessage("Check-out date must be after check-in date");
      return;
    }

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

    const t = new Date();
    const BookingID = `${t.getFullYear()}${t.getMonth()}${t.getDate()}${t.getHours()}${t.getMinutes()}${t.getSeconds()}`;
    formDataObject["BookingID"] = BookingID;

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

  function emailValidate(event) {
    var emailField = document.getElementById("emailId");
    var email = event.target.value; // Obtener el valor del campo de entrada
    var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email.match(pattern)) {
      emailField.classList.add("valid");
      emailField.classList.remove("invalid");
    } else {
      emailField.classList.add("invalid");
      emailField.classList.remove("valid");
    }
  }

  function numberValidate(event) {
    var numberField = document.getElementById("phoneNumber");
    var number = event.target.value; // Obtener el valor del campo de entrada
    var pattern = /^[0-9]{10}$/;
    if (number.match(pattern)) {
      numberField.classList.add("valid");
      numberField.classList.remove("invalid");
    } else {
      numberField.classList.add("invalid");
      numberField.classList.remove("valid");
    }
  }

  function checkOutDateValidation(event) {
    var checkOutDate = document.getElementsById("date-output");
    var checkOut = event.target.value;
    var checkIn = document.getElementById("date-input").value;
    if (checkOut < checkIn) {
      checkOutDate.classList.add("invalid");
      checkOutDate.classList.remove("valid");
    } else {
      checkOutDate.classList.add("valid");
      checkOutDate.classList.remove("invalid");
    }
  }

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);

    // Asegúrate de seleccionar los elementos después de que el componente se monte
    const checkInDateInput = document.getElementsByName("checkInDate")[0];
    const checkOutDateInput = document.getElementsByName("checkOutDate")[0];

    if (checkInDateInput && checkOutDateInput) {
      checkInDateInput.setAttribute("min", todayDate);
      checkOutDateInput.setAttribute("min", todayDate);
    }

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      if (checkInDateInput && checkOutDateInput) {
        checkInDateInput.removeAttribute("min");
        checkOutDateInput.removeAttribute("min");
      }
    };
  }, []);

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
          <input
            type="email"
            id="emailId"
            name="Email"
            onKeyDown={emailValidate}
            value={email}
            required
          />
          <br />
          <label htmlFor="number">
            Phone Number <span>*</span>
          </label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            required
            onKeyDown={numberValidate}
          />
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
            onKeyDown={checkOutDateValidation}
          />
          <br />
          <label htmlFor="noOfPeople">
            Number of People <span>*</span>
          </label>
          <input type="number" name="noOfPeople" min="1" max="5" required />
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
