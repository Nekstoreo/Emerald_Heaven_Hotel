import UserReview from "../components/UserReview";
import ImageSlider from "../components/ImageSlider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const onButtonClick = () => {
    console.log("prueba");
    const formData = { fullName, email, message };
    try {
      fetch('http://localhost:3020/contactame', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    finally{

    }
    // limpiar campos
    setFullName("");
    setEmail("");

    setMessage("");
  }

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

  const images = [
    "/assets/img/hotels/h1.jpg",
    "/assets/img/hotels/h2.jpg",
    "/assets/img/hotels/h3.jpg",
    "/assets/img/hotels/h4.jpg",
    "/assets/img/hotels/h5.jpg",
    "/assets/img/hotels/h6.jpg",
    "/assets/img/hotels/h7.jpg",
    "/assets/img/hotels/h8.jpg",
  ];
  return (
    <div>
      {/* Banner Section */}
      <section className="banner">
        <div className="content">
          <div className="title">Emerald Haven</div>
          <div className="top-subtitle subtitle">Best Memories Start Here</div>
        </div>
      </section>
      {/* About Section */}
      <section
        className="text-gray-600 body-font"
        id="about"
        style={{ fontFamily: "Inter", marginTop: "12%" }}
      >
        <div
          className="container mx-auto flex md:flex-row flex-col items-center"
          style={{ margin: "auto", width: "70%" }}
        >
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bHV4dXJ5JTIwcmVzb3J0fGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="sec-head">About Us</h1>
            <p className="mb-8 leading-relaxed" style={{ width: "auto" }}>
              Over the last 25 years, Emerald Haven organisation has been known
              for dependably providing the best Colombian hospitality
              experience. It combines modern style and comfort with the warmth
              of Old World hospitality. With more than 50 hotels and resorts
              across the world, it is one of the world's largest hotel chains.
              We believe in the values of Colombian hospitality, and our crew is
              our most valuable asset, providing passionate and memorable
              hospitality to everyone we meet.
            </p>
            <div className="flex justify-center">
              <span className="inline-flex rounded-md shadow-sm">
                <a
                  href="team"
                  className="button button__header focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Know More
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="hotels" id="hotels">
        <h1 className="sec-head" id="hotels-head">
          Our Hotels
        </h1>
      </section>

      <ImageSlider slides={images} />

      {/* Vision Section */}
      <div className="vision">
        <div className="row">
          <div className="column">
            <div className="vision-column">
              <h1 className="sec-head">Our Vision</h1>
              <p>
                Emerald Haven shall be the world's largest and best hotel and
                resort chain, with upscale, mid-scale, and budget properties. We
                will be dedicated to ensuring the well-being and self-worth of
                our coworkers, who are vital to our success. Making a difference
                in our community and in India as a whole. Our fundamental reason
                for being is to delight our guests, whose comfort, safety,
                security, and well-being are our primary concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <h1
        className="sec-head"
        style={{ textAlign: "center", margin: "40px", marginTop: "100px" }}
      >
        Testimonials
      </h1>
      <div className="wrapper-rev">
        <UserReview
          quote="Beyond 5 stars! Stayed last week at this wonderful hotel. Everything exceeds ones wildest dream of a hotel. On top they have the most wonderful staff, extremely kind and helpful with every wish."
          name="Pedro"
          stars={["bxs-star", "bxs-star", "bxs-star", "bxs-star", "bxs-star"]}
          image="https://png.pngtree.com/png-vector/20190930/ourlarge/pngtree-hooded-computer-hacker-with-laptop-icon-png-image_1762179.jpg"
        />

        <UserReview
          quote="This is indeed a place you do not want to leave, and when you do it is with one hope to come back. Everything was great, staff was very helpful and we were extremely happy with the meeting!"
          name="Pablo"
          stars={["bxs-star", "bxs-star", "bxs-star", "bxs-star", "bx-star"]}
          image="https://png.pngtree.com/png-vector/20190930/ourlarge/pngtree-hooded-computer-hacker-with-laptop-icon-png-image_1762179.jpg"
        />

        <UserReview
          quote="The service here has just been fantastic; whatever we needed was brought to us right away. The food was so delicious; the entire experience was really great. A must stay hotel for everyone."
          name="Paco"
          stars={[
            "bxs-star",
            "bxs-star",
            "bxs-star",
            "bxs-star",
            "bxs-star-half",
          ]}
          image="https://png.pngtree.com/png-vector/20190930/ourlarge/pngtree-hooded-computer-hacker-with-laptop-icon-png-image_1762179.jpg"
        />
      </div>

          {/* Contact Section */}
      <section
        className="text-gray-100 px-8 py-12"
        style={{ fontFamily: "Inter" }}
      >
        <div className="text-center w-full"></div>
        <div className="max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-gray-100 text-gray-900 rounded-lg">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="sec-head">Contact Us</h2>
              <img
                src="assets/img/contact.svg"
                style={{ marginTop: "50px", paddingRight: "50px" }}
                alt=""
              />
            </div>
          </div>
          <div className="mt-8">
            <div>
              <span className="uppercase text-sm text-gray-600 font-bold">
                Full Name
              </span>
              <input
                className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
              />
            </div>
            <div className="mt-8">
              <span className="uppercase text-sm text-gray-600 font-bold">
                Email
              </span>
              <input
                id="emailId"
                className="w-full bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                value={email}
                onKeyDown={emailValidate}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mt-8">
              <span className="uppercase text-sm text-gray-600 font-bold">
                Message
              </span>
              <textarea
                className="w-full h-32 bg-gray-200 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                value={message}
                onChange={handleMessageChange}
              ></textarea>
            </div>
            <div className="mt-8">
              <button
                className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline"
                onClick={onButtonClick}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
