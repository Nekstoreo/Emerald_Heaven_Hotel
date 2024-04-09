import React from "react";
import './BookingCancelled.module.css';

function BookingCancelled() {
  return (
    <div style={{
      marginTop: "100px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
      <body>
        <div class="success">
          We are sad to hear that you are leaving !!
          <br />
          Your booking is Cancelled. You can confirm in My Bookings
        </div>
        <form action="/" method="get">
          <button class="btn btn-dark">Go to Home page</button>
        </form>
      </body>
    </div>
  );
}

export default BookingCancelled;
