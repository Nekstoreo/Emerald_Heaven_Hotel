import React from "react";
import MapView from "../components/Map";
import styles from "./Hotels.module.css";

function Hotels() {
  return (
    <div>
      {/* Banner Section */}
      <section className="banner" style={{ height: "85vh" }}>
        <div className="content">
          <div className="title">Our Hotels</div>
          <div className="top-subtitle subtitle">Emerald Haven</div>
        </div>
      </section>

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
