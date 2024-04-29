import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styles from "./BookingConfirmation.module.css";
import {
  emailValidate,
  numberValidate,
  checkOutDateValidation,
} from "./formValidations";

function BookingConfirmation() {
  const [errorMessage, setErrorMessage] = useState("");
  const [today, setToday] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { hotelName, roomType, guests, requiredRooms, totalPrice } =
    location.state.reservationData;

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

    formDataObject["roomType"] = roomType;
    formDataObject["totalPrice"] = totalPrice;

    const validations = {
      Name: "Please enter your name",
      Email: "Please enter your email",
      phoneNumber: "Please enter your phone number",
      checkInDate: "Please enter your check in date",
      checkOutDate: "Please enter your check out date",
      noOfGuests: "Please enter the number of Guests",
      typeOfRoom: "Please select a room type",
      requiredRooms: "Please enter the number of rooms",
      totalPrice: "Please enter the total price",
      hotelName: "Please enter the hotel name",
    };

    for (const field in validations) {
      if (!formDataObject[field]) {
        setErrorMessage(validations[field]);
        return;
      }
    }

    const t = new Date();
    const BookingID = `${t.getFullYear()}${t.getMonth()}${t.getDate()}${t.getHours()}${t.getMinutes()}${t.getSeconds()}`;
    formDataObject["BookingID"] = BookingID;

    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formDataObject }),
    })
      .then((r) => r.json())
      .then((response) => {
        if (!response.success) {
          setErrorMessage(response.message || "An error occurred");
          return;
        }
        if (response.bookedRoomIds) {
          navigate("/bookingsuccessful", {
            state: {
              reservationData: formDataObject,
              bookedRoomIds: response.bookedRoomIds,
            },
          });
        }
      })
      .catch((error) => {
        setErrorMessage("An error occurred while processing your request");
      });
  };

  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);

    const checkInDateInput = document.getElementsByName("checkInDate")[0];
    const checkOutDateInput = document.getElementsByName("checkOutDate")[0];

    if (checkInDateInput && checkOutDateInput) {
      checkInDateInput.setAttribute("min", todayDate);
      checkOutDateInput.setAttribute("min", todayDate);
    }

    return () => {
      if (checkInDateInput && checkOutDateInput) {
        checkInDateInput.removeAttribute("min");
        checkOutDateInput.removeAttribute("min");
      }
    };
  }, []);

  const tryGetEmailFromUserToken = () => {
    // Fetch the user email from the decoded token from local storage
    const userToken = JSON.parse(localStorage.getItem("user"))?.token;
    const decodedToken = jwtDecode(userToken);
    return decodedToken.email;
  }

  useEffect(() => {
    const userEmail = tryGetEmailFromUserToken();
    if (userEmail) {
      document.getElementsByName("Email")[0].value = userEmail;
      // disable the email input field
      document.getElementsByName("Email")[0].setAttribute("readonly", true);
    }
  }
  , []);
  

  return (
    <div className={styles["BookingContainer"]}>
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
          required
        />
        <br />
        <label htmlFor="number">
          Phone Number <span>*</span>
        </label>
        <input
          type="text"
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
          // value={startDate}
          required
        />
        <br />
        <label htmlFor="checkOutDate">Check Out date</label>
        <input
          type="date"
          name="checkOutDate"
          id="date-output"
          placeholder="Check Out"
          // value={endDate}
          required
          onKeyDown={checkOutDateValidation}
        />
        <br />
        <label htmlFor="hotelName">Hotel Name</label>
        <input type="text" name="hotelName" value={hotelName} readOnly />
        <br />
        <label htmlFor="noOfGuests">
          Number of Guests <span>*</span>
        </label>
        <input
          type="number"
          name="noOfGuests"
          min="1"
          max="5"
          required
          readOnly
          value={guests}
        />
        <br />
        <label htmlFor="typeOfRoom">Type of Room : </label>
        <input
          name="typeOfRoom"
          id="typeOfRoom"
          value={roomType}
          required
          readOnly
        />
        <br />
        <label htmlFor="requiredRooms">Number of Rooms</label>
        <input
          type="number"
          name="requiredRooms"
          value={requiredRooms}
          readOnly
        />
        <label htmlFor="totalPrice">Total Price</label>
        <input type="text" name="totalPrice" value={totalPrice} readOnly />
        <br />
        <input type="submit" className="btn" value={"Book Now"} />
        <label className="errorLabel">{errorMessage}</label>
      </form>
    </div>
  );
}

export default BookingConfirmation;
