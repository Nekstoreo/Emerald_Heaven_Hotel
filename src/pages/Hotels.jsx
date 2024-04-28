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

    fetchHotels();
  }, []);

  const handleCheckAvailability = (hotelName) => {
    navigate("/check-availability", { state: { hotelName } });
  };

  return (
    <div>
      {/* Banner Section */}
      <section className="banner" style={{ height: "60vh" }}>
        <div className="content">
          <div className="title">Our Hotels</div>
          <div className="top-subtitle subtitle">Emerald Haven</div>
        </div>
      </section>

      <div className="py-5 px-5 items-center">
        {/* Hotels Section */}
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
