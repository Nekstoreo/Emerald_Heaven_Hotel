import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function TeamSlider() {
  const members = [
    {
      name: "Nestor Miguel Gutierrez Arias",
      twitter: "https://twitter.com/",
      linkedin: "https://www.linkedin.com",
      image:
        "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_boy_person_avatar_people_white_tone_icon_159357.png",
    },
    {
      name: "Emanuel Rios Bolivar",
      twitter: "https://twitter.com/",
      linkedin: "https://www.linkedin.com",
      image:
        "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_people_person_avatar_white_tone_icon_159363.png",
    },
    {
      name: "Carlos Andres Sanabria Torres",
      twitter: "https://twitter.com/",
      linkedin: "https://www.linkedin.com",
      image:
        "https://cdn.icon-icons.com/icons2/2643/PNG/512/male_man_person_people_avatar_white_tone_icon_159365.png",
    },
    {
      name: "Estefanía López Varelas",
      twitter: "https://twitter.com/tomholland",
      linkedin: "https://www.linkedin.com/in/tomholland",
      image:
        "https://cdn.icon-icons.com/icons2/2643/PNG/512/female_woman_avatar_people_person_white_tone_icon_159370.png",
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
