import React from "react";
import "./BookingSuccessfull.module.css";
function BookingSuccessfull() {
  return (
    <div
      style={{
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <body>
        <div class="success">
          You are all SET!!.
          <br />
          Your booking is Done.
          <br />
          You can check your Mail for the confirmation of your details
        </div>
        <form action="/" method="get">
          <button class="btn btn-dark">Go to Home page</button>
        </form>
      </body>
    </div>
  );
}

export default BookingSuccessfull;
