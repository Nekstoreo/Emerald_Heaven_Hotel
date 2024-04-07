import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function TeamSlider() {
  const members = [
    {
      name: "Tom Hardy",
      twitter: "https://twitter.com/tomhardy",
      linkedin: "https://www.linkedin.com/in/tomhardy",
      image:
        "https://pbs.twimg.com/profile_images/757629484463820800/XCgZ56hW_400x400.jpg",
    },
    {
      name: "Tom Holland",
      twitter: "https://twitter.com/tomholland",
      linkedin: "https://www.linkedin.com/in/tomholland",
      image:
        "https://pbs.twimg.com/profile_images/826578156849074177/VPb4WgnY_400x400.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = members.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(members) || members.length <= 0) {
    return null;
  }

  return (
    <section className="slider">
      <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
      <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
      {members.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <div>
                <img
                  src={slide.image}
                  alt="travel"
                  className="pfp"
                  style={{
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                  }}
                />
                <div 
                    className="member-info"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "black",
                        textAlign: "center",
                        padding: "1rem",
                                            
                    }}
                >
                  <h3>{slide.name}</h3>
                  <a href={slide.twitter} target="_blank" rel="noreferrer">
                    Twitter
                  </a>
                  <a href={slide.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}

export default TeamSlider;
