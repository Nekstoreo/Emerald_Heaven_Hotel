import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";

function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const target = useRef(null);

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const validateEmail = () => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const onButtonClick = () => {
    if (!fullName || !validateEmail() || !message) {
      setShowErrorMessage(true);
      setErrorMessage("Please fill in all fields correctly.");
      return;
    }

    setIsLoading(true);
    const formData = { fullName, email, message };
    fetch("http://localhost:5000/contact-us", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 500) {
            setErrorMessage("Lo sentimos, tenemos algunos problemas técnicos.");
          } else {
            throw new Error(`Network response was not ok (${response.status})`);
          }
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setShowErrorMessage(true);
        setErrorMessage(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });

    setFullName("");
    setEmail("");
    setMessage("");
  };

  useEffect(() => {
    if (showSuccessMessage || showErrorMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        setShowErrorMessage(false);
      }, 3000); // El overlay se ocultará después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage, showErrorMessage]);

  return (
    <div>
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
          <div className="flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="text-gray-900 font-semibold"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={fullName}
                  onChange={handleFullNameChange}
                  placeholder="Enter your full name"
                  className="w-full p-3 rounded-lg bg-gray-200 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-900 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full p-3 rounded-lg bg-gray-200 mt-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="text-gray-900 font-semibold"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={handleMessageChange}
                  placeholder="Enter your message"
                  className="w-full p-3 rounded-lg bg-gray-200 mt-1"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <Button
              onClick={onButtonClick}
              ref={target}
              className="w-full bg-blue-500 text-gray-100 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
            <Overlay
              target={target.current}
              show={showSuccessMessage || showErrorMessage}
              placement="right"
            >
              {(props) => (
                <div
                  {...props}
                  style={{
                    backgroundColor: showSuccessMessage
                      ? "rgba(76, 175, 80, 0.9)"
                      : "rgba(220, 53, 69, 0.9)",
                    padding: "10px 20px",
                    color: "white",
                    borderRadius: "10px",
                    ...props.style,
                  }}
                >
                  {showSuccessMessage
                    ? "Mensaje enviado con éxito"
                    : errorMessage ||
                      "Error al enviar el mensaje. Por favor, intente nuevamente más tarde."}
                </div>
              )}
            </Overlay>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactUs;
