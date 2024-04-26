import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./CheckAvailability.module.css";

function CheckAvailability() {
  const [startDate, setStartDate] = useState(new Date()); // State for check-in date
  const [endDate, setEndDate] = useState(new Date()); // State for check-out date
  const [adults, setAdults] = useState(1); // State for number of adults
  const [children, setChildren] = useState(0); // State for number of children
  const [rooms, setRooms] = useState(1); // State for number of rooms
  const [priceData, setPriceData] = useState([]); // State for room price data
  const [selectedOptions, setSelectedOptions] = useState([]); // State for selected options
  const [modified, setModified] = useState(false); // State to track if search has been modified
  const navigate = useNavigate();

  const location = useLocation();

  const fetchAvailabilityData = async () => {
    try {
      const response = await fetch("http://localhost:6030/availability");
      if (!response.ok) {
        throw new Error("Failed to fetch availability data");
      }
      const priceData = await response.json();
      setPriceData(priceData);
    } catch (error) {
      console.error("Error fetching availability data:", error);
    }
  };

  useEffect(() => {
    fetchAvailabilityData();
  }, []); // Fetch availability data on component mount

  const calculatePrices = () => {
    // Calculate room prices based on number of adults, children, and rooms
    const newData = [
      { id: 1, type: "Single Room", price: adults * 180 * rooms }, // Adjust price for single room
      { id: 2, type: "Double Room", price: (adults + children) * 180 * rooms }, // Adjust price for double room
      { id: 3, type: "Family Suite", price: (adults + children) * 250 * rooms },
      {
        id: 4,
        type: "Executive Studio",
        price: (adults + children) * 180 * rooms,
      },
      { id: 5, type: "Luxury Suite", price: (adults + children) * 300 * rooms },
    ];

    // Update prices based on selected options
    const updatedData = newData.map((room, index) => {
      let price = room.price;
      if (selectedOptions[index] === "All-Inclusive") {
        price += 100; // Increase price by $100 if "All-Inclusive" is selected
      } else if (selectedOptions[index] === "Meal Options") {
        price += 80; // Increase price by $80 if "Meal Options" is selected
      } else if (selectedOptions[index] === "Gym Discount") {
        price -= 40; // Decrease price by $40 if "Gym Discount" is selected
      }
      return { ...room, price };
    });

    setPriceData(updatedData);
  };

  useEffect(() => {
    if (modified) {
      calculatePrices();
      setModified(false); // Reset modification state after updating data
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modified, adults, children, rooms, selectedOptions]);

  const handleModifySearch = () => {
    setModified(true);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = value;
    setSelectedOptions(updatedOptions);

    // Mark search as modified to recalculate price
    setModified(true);
  };

  const handleRoomSelection = async (roomId) => {
    const confirmSelection = window.confirm(
      "Do you want to select this room? Keep in mind that once selected, it will no longer be available."
    );

    if (confirmSelection) {
      try {
        const deleteResponse = await fetch(
          `http://localhost:6030/availability/${roomId}`,
          {
            method: "DELETE",
          }
        );
        if (!deleteResponse.ok) {
          throw new Error("Failed to delete room");
        }
        alert(
          "Room selected successfully! It has been removed from availability."
        );
        setModified(true); // Trigger recalculation of prices

        // Redirection to roombooking page with parameters
        const selectedRoom = priceData.find((room) => room.id === roomId);

        if (selectedRoom) {
          const roomType = selectedRoom.type;
          const numberOfGuests = adults + children;
          const pricePerNight = selectedRoom.price;
          const hotelName = location.state.hotelName;
          navigate(
            "/roombooking",
            {
              state: {
                hotelName,
                roomType,
                numberOfGuests,
                pricePerNight,
                startDate,
                endDate,
              },
            }
          );
        }
      } catch (error) {
        console.error("Error selecting room:", error);
      }
    }
  };


  return (
    <div className={styles.container}>
      <h1>Availability</h1>

      <div className={styles.searchContainer}>
        <div className={styles.calendar}>
          {/* Calendar component for selecting check-in date */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            minDate={new Date()}
          />
          {/* Calendar component for selecting check-out date */}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            // Set minimum date to today date more one day
            minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)}
          />
        </div>

        <div className={styles.options}>
          {/* Dropdown menu for adults */}
          <div className={styles.guests}>
            <label htmlFor="adults">Adults:</label>
            <select
              id="adults"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value))}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
          {/* Dropdown menu for children */}
          <div className={styles.guests}>
            <label htmlFor="children">Children:</label>
            <select
              id="children"
              value={children}
              onChange={(e) => setChildren(parseInt(e.target.value))}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          {/* Dropdown menu for rooms */}
          <div className={styles.rooms}>
            <label htmlFor="rooms">Rooms:</label>
            <select
              id="rooms"
              value={rooms}
              onChange={(e) => setRooms(parseInt(e.target.value))}
            >
              {[...Array(10).keys()].map((num) => (
                <option key={num} value={num + 1}>
                  {num + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className={styles.modifySearchBtn} onClick={handleModifySearch}>
          Modify Search
        </button>
      </div>

      <div className={styles.infoContainer}>
        <table className={styles.infoTable}>
          <thead>
            <tr>
              <th>Room Type</th>
              <th>Number of Guests</th>
              <th>Price per Night</th>
              <th>Your Options</th>
              <th>Select Rooms</th>
            </tr>
          </thead>
          <tbody>
            {priceData.map((room) => (
              <tr key={room.id}>
                <td>{room.type}</td>
                <td>{adults + children}</td>
                <td>${room.price}</td>
                <td>
                  <select
                    value={selectedOptions[room.id - 1] || ""}
                    onChange={(e) =>
                      handleOptionChange(room.id - 1, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="All-Inclusive">All-Inclusive</option>
                    <option value="Meal Options">Meal Options</option>
                    <option value="Gym Discount">Gym Discount</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleRoomSelection(room.id)}>
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CheckAvailability;
