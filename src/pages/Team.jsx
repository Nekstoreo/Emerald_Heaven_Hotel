import React, {  } from "react";
import TeamSlider from "../components/TeamSlider";

function Team() {
    return (
    <div>
      {/* Banner Section */}
      <section className="banner" style={{ height: "85vh" }}>
        <div className="content">
          <div className="title">Our Team</div>
          <div className="top-subtitle subtitle">Emerald Haven</div>
        </div>
      </section>

      {/* Carousel for Team Members */}
      <TeamSlider />
    </div>
  );
}

export default Team;
