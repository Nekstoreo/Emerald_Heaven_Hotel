import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import Cards from 'react-credit-cards-2';

function ReservationConfirmation() {
    const [reservationDetails, setReservationDetails] = useState(null);
    const location = useLocation();
    useEffect(() => {
        if (location.state && location.state.reservationDetails) {
            setReservationDetails(location.state.reservationDetails);
        } else {
            console.log("No reservation data found");
        }
    }, [location]);


    const createReservation = () => {
        // if (validateGuestForm() && validatePaymentForm()) {
        //     const reservationData = {
        //         reservationDetails: reservationDetails,
        //         paymentData: paymentFormData,
        //         guestData: guestFormData,
        //     };
        //     console.log("Reservation Data:", reservationData);
        // } else {
        //     console.log("Form validation failed.");
        // }
    };

    const handleReservationConfirmation = (e) => {
        e.preventDefault();
        createReservation();
    };
    function ReservationForm() {
        const [profile, setProfile] = useState(null);
        const today = new Date().toISOString().split("T")[0];
        const [guestFormData, setGuestFormData] = useState({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            checkInDate: "",
            checkOutDate: "",
            ccDniPassport: "",
        });

        const validateGuestForm = () => {
            // Validar que los campos del formulario de reservación no estén vacíos
            if (!guestFormData.firstName || !guestFormData.lastName || !guestFormData.email || !guestFormData.phone || !guestFormData.checkInDate || !guestFormData.checkOutDate || !guestFormData.ccDniPassport) {
                console.log("Please fill out all fields.");
                return false;
            }
            return true;
        };

        useEffect(() => {
            const profile = JSON.parse(localStorage.getItem("profile"));
            if (profile) {
                setProfile(profile);
            } else console.log("No email found");
        }, []);

        const handleChange = (e) => {
            const {name, value} = e.target;
            setGuestFormData((prev) => ({...prev, [name]: value}));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(guestFormData);
        };

        return (
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 md:pr-2">
                        <label htmlFor="firstName">First Name:</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={guestFormData.firstName || profile?.firstName || ""}
                            onChange={handleChange}
                            minLength="2"
                            maxLength="20"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label htmlFor="lastName">Last Name:</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={guestFormData.lastName || profile?.lastName || ""}
                            onChange={handleChange}
                            required
                            minLength="2"
                            maxLength="20"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={guestFormData.email || profile?.email || ""}
                        onChange={handleChange}
                        required
                        maxLength="50"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={guestFormData.phone || profile?.phone || ""}
                        onChange={handleChange}
                        required
                        minLength={7}
                        maxLength={15}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="checkInDate">Check-In Date:</label>
                    <input
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={guestFormData.checkInDate}
                        onChange={handleChange}
                        min={today}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="checkOutDate">Check-Out Date:</label>
                    <input
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        min={guestFormData.checkInDate}
                        value={guestFormData.checkOutDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div>
                    <label htmlFor="ccDniPassport">CC, DNI or Passport:</label>
                    <input
                        type="text"
                        id="ccDniPassport"
                        name="ccDniPassport"
                        value={guestFormData.ccDniPassport}
                        onChange={handleChange}
                        minLength="5"
                        maxLength="20"
                        required
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Submit
                </button>
            </form>
        );
    }

    function PaymentForm() {
        const [paymentFormData, setPaymentFormData] = useState({
            number: '',
            expiry: '',
            cvc: '',
            name: '',
            focus: '',
        });
        const validatePaymentForm = () => {
            // Validar que los campos del formulario de pago no estén vacíos
            if (!paymentFormData.number || !paymentFormData.expiry || !paymentFormData.cvc || !paymentFormData.name) {
                console.log("Please fill out all fields.");
                return false;
            }
            return true;
        };
        const handleInputChange = (evt) => {
            const {name, value} = evt.target;
            let formattedValue = value;
            if (name === "expiry") {
                if (value.length === 2 && !value.includes("/")) {
                    formattedValue = value + "/";
                }
            }
            if (name === "number") {
                formattedValue = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
            }
            setPaymentFormData((prev) => ({...prev, [name]: formattedValue}));
        };

        const handleInputFocus = (evt) => {
            setPaymentFormData((prev) => ({...prev, focus: evt.target.name}));
        };

        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <Cards
                    number={paymentFormData.number}
                    expiry={paymentFormData.expiry}
                    cvc={paymentFormData.cvc}
                    name={paymentFormData.name}
                    focused={paymentFormData.focus}
                />
                <form className="space-y-4">
                    <input
                        type="text"
                        name="number"
                        placeholder="Card Number"
                        value={paymentFormData.number}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        minLength="19" // 16 digits + 3 spaces
                        maxLength="19" // 16 digits + 3 spaces
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={paymentFormData.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY Expiry"
                        value={paymentFormData.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        minLength="5" // MM/YY
                        maxLength="5" // MM/YY
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="number"
                        name="cvc"
                        placeholder="CVC"
                        value={paymentFormData.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        minLength="3"
                        maxLength="4"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </form>
            </div>
        );
    }

    if (!reservationDetails) {
        return <div className="min-h-screen flex items-center justify-center text-4xl">Loading...</div>;
    } else {
        return (
            <div className="flex flex-col md:flex-row justify-center gap-8 min-h-lvh mt-8 px-6">
                <div className="w-full p-6">
                    <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                    <ReservationForm/>
                </div>
                <div className="w-full p-6">
                    <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                    <PaymentForm/>
                    <div className="flex justify-center py-6">
                        <Button onClick={handleReservationConfirmation}
                                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Confirm Reservation and Pay
                        </Button>
                    </div>
                    <h2 className="text-2xl font-bold p-6 mb-4">Reservation Details</h2>
                    <div className="w-full">
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reservationDetails.rooms.map((room, index) => (
                                <tr key={index}>
                                    <td>Room: {room.type}</td>
                                    <td>${room.totalPrice}</td>
                                    <td>Max Guests: {room.maxguests}</td>
                                </tr>
                            ))}
                            {reservationDetails.services.map((service, index) => (
                                <tr key={index}>
                                    <td>Service: {service.service.name}</td>
                                    <td>{service.price === "FREE" ? "FREE" : `$${service.price}`}</td>
                                    <td>{service.service.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>

                </div>
            </div>
        );
    }
}

export default ReservationConfirmation;
