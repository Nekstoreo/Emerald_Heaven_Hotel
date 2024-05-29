import React from "react";
import { useLocation } from "react-router-dom";

function ReservationSuccessful() {
    const location = useLocation();

    return (
        <div className="flex flex-col items-center justify-center space-y-4 min-h-lvh">
            <h1 className="text-3xl font-semibold">Reservation Successful!</h1>
            <div className="flex items-center justify-center">
                <img
                    src={"assets/img/reservation-successful.gif"}
                    width="360"
                    alt={"Reservation successful"}
                />
            </div>
            <p className="text-lg">Your reservation has been successfully booked.</p>
            <p className="text-lg">
                Thank you for booking with us, {location.state?.firstName}!
            </p>
            <p className="text-lg">
                We have sent a confirmation email to {location.state?.email}.
            </p>
        </div>
    );
}

export default ReservationSuccessful;