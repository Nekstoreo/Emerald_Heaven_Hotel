import React from "react";
import MapView from "../components/Map";
import styles from "./Hotels.module.css";
import { useNavigate } from "react-router-dom";

function Hotels() {

  const navigate = useNavigate(); 

  const handleCheckAvailability = () => {
    navigate("/check-availability"); 
  };

  return (
    <div>
      {/* Banner Section */}
      <section className="banner" style={{ height: "85vh" }}>
        <div className="content">
          <div className="title">Our Hotels</div>
          <div className="top-subtitle subtitle">Emerald Haven</div>
        </div>
      </section>

      {/* Hotels Section */}
      <div className={styles.hotelContainer}>
        <div className={styles.leftContent}>
          <img
            src="https://hotelcelestino.com/wp-content/uploads/2023/10/a05081_5bb94a6dd4994b58b7ff425cca3a0882mv2.jpg"
            alt="Hotel"
            width="300"
            height="250"
          />
        </div>
        <div className={styles.centerContent}>
          <div className={styles.hotelInfo}>
            <h2>Celestino Boutique Hotel</h2>
            <p>Hotel in El Poblado, Medellín</p>
            <p>
              Celestino Boutique Hotel is located in Medellín, 1 street away from
              Parque Lleras, and offers free WiFi.
            </p>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.hotelRating}>
            <p>Rating: 8.8</p>
            <p>Review: Fabulous</p>
            <p>2091 reviews</p>
          </div>
          <p>Prices starting from COP 441,600 per night</p>
          <button className={styles.viewAvailabilityBtn} onClick={handleCheckAvailability}>
            Check availability
          </button>
        </div>
      </div>

      <div className={styles.hotelContainer}>
        <div className={styles.leftContent}>
          <img
            src="https://cdn.precioyviajes.com/04/76/54/04765475_gp.jpeg"
            alt="Hotel"
            width="300"
            height="250"
          />
        </div>
        <div className={styles.centerContent}>
          <div className={styles.hotelInfo}>
            <h2>Hotel Cavalta</h2>
            <p>Hotel in Laureles, Medellín</p>
            <p>
              HOTEL CAVALTA, which has a restaurant and bar, is located in
              Medellín, 5.2 km from Parque El Poblado and 5.9 km from Parque
              Lleras.
            </p>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.hotelRating}>
            <p>Rating: 8.4</p>
            <p>Review: Very good</p>
            <p>3069 reviews</p>
          </div>
          <p>Prices starting from COP 375,000 per night</p>
          <button className={styles.viewAvailabilityBtn} onClick={handleCheckAvailability}>
            Check availability
          </button>
        </div>
      </div>

      <div className={styles.hotelContainer}>
        <div className={styles.leftContent}>
          <img
            src="https://scontent.feoh6-1.fna.fbcdn.net/v/t39.30808-6/279863115_4971729542880442_2451914972451667054_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dixBE5cPjjwAb4RQApb&_nc_ht=scontent.feoh6-1.fna&oh=00_AfCtZsIwg4fuOQwWrigPIwm_QI_C1rFSaA31wTiTQAiv9w&oe=661B85B5"
            alt="Hotel"
            width="300"
            height="250"
          />
        </div>
        <div className={styles.centerContent}>
          <div className={styles.hotelInfo}>
            <h2>Hotel Dann Carlton Belfort Medellin</h2>
            <p>Hotel in El Poblado, Medellín</p>
            <p>
              Hotel Dann Carlton Belfort Medellín is located in a residential area
              15 blocks from El Poblado metro station and 2.7 km from Pies
              Descalzos Park. Car rental service can be arranged.
            </p>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.hotelRating}>
            <p>Rating: 8.6</p>
            <p>Review: Fabulous</p>
            <p>4712 reviews</p>
          </div>
          <p>Prices starting from COP 398,000 per night</p>
          <button className={styles.viewAvailabilityBtn} onClick={handleCheckAvailability}>
            Check availability
          </button>
        </div>
      </div>

      <div className={styles.hotelContainer}>
        <div className={styles.leftContent}>
          <img
            src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/09/fe/7c/bluedoors-york-suite.jpg?w=1100&h=-1&s=1"
            alt="Hotel"
            width="300"
            height="250"
          />
        </div>
        <div className={styles.centerContent}>
          <div className={styles.hotelInfo}>
            <h2>Hotel York Luxury Suites Medellin</h2>
            <p>Hotel in El Poblado, Medellín</p>
            <p>
              Hotel York Luxury Suites Medellin by Preferred is located in
              Medellín and offers accommodation, restaurant, fitness center,
              outdoor pool, and free private parking. It also has a bar and
              common lounge. It is 2.9 km from El Poblado Park and 8 km from
              Pueblito Paisa. There is a 24-hour reception, room service, free
              WiFi, and airport shuttle service.
            </p>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.hotelRating}>
            <p>Rating: 9.1</p>
            <p>Review: Fantastic</p>
            <p>1233 reviews</p>
          </div>
          <p>Prices starting from COP 617,760 per night</p>
          <button className={styles.viewAvailabilityBtn} onClick={handleCheckAvailability}>
            Check availability
          </button>
        </div>
      </div>

      <div className={styles.hotelContainer}>
        <div className={styles.leftContent}>
          <img
            src="https://estelar-la-torre-suites.medellin-hotels.com/data/Photos/OriginalPhoto/12838/1283885/1283885608.JPEG"
            alt="Hotel"
            width="300"
            height="250"
          />
        </div>
        <div className={styles.centerContent}>
          <div className={styles.hotelInfo}>
            <h2>Estelar La Torre Suites</h2>
            <p>Hotel in El Poblado, Medellín</p>
            <p>
              Estelar La Torre Suites is located in Medellín, 1 street away from
              Parque Lleras, and offers free WiFi.
            </p>
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.hotelRating}>
            <p>Rating: 9.3</p>
            <p>Review: Fantastic</p>
            <p>193 reviews</p>
          </div>
          <p>Prices starting from COP 495,000 per night</p>
          <button className={styles.viewAvailabilityBtn} onClick={handleCheckAvailability}>
            Check availability
          </button>
        </div>
      </div>

      {/* Hotels Map */}
      <h1
        className="sec-head"
        style={{ textAlign: "center", marginTop: "20px" }}
      >
        The Best Hotels
      </h1>
      <div
        style={{
          textAlign: "justify",
          fontFamily: "Inter",
          fontSize: "18px",
          width: "60%",
          margin: "auto",
          marginTop: "10px",
        }}
      >
        We have over 50 high-quality hotels and resorts around the world. Our
        hotels are the ultimate location for individuals who enjoy a vibrant and
        upmarket lifestyle, thanks to their modern design that combines elegance
        in form and function. Emerald Heaven allows you to find more harmony
        every time you go with real hospitality, honest service, and clean
        decor.
      </div>
      <div class={styles["distribution-map"]}>
        <MapView />
      </div>
    </div>
  );
}

export default Hotels;
