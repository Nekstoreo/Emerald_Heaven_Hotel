import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelCard from "../components/HotelCard";

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [errorFetching, setErrorFetching] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("http://localhost:5000/hotels");
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels", error);
        setErrorFetching(true);
      }
    };
    fetchHotels().then(r => r);
  }, []);

  const handleCheckAvailability = (_id) => {
    navigate("/check-availability", { state: { _id } });
  };

  return (
    <div>
      <div className="p-5 items-center">
        <div className="flex items-center justify-between pb-5">
        <h2 className="text-4xl font-semibold text-gray-800">Hotels</h2>
        </div>
        {hotels.map((hotel, index) => (
          <HotelCard
            key={index}
            hotel={hotel}
            handleCheckAvailability={handleCheckAvailability}
          />
        ))}
        {errorFetching ? <div>Error fetching hotels</div> : null}
      </div>
    </div>
  );
};

export default Hotels;
