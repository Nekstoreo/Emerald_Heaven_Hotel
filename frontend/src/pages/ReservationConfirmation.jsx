import React, {useState, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import GuestForm from "../components/GuestForm";
import PaymentForm from "../components/PaymentForm";

function ReservationConfirmation() {
    const [reservationDetails, setReservationDetails] = useState(
        {
            hotel: {
                _id: "",
            },
            rooms: [],
            services: []
        }
    );
    let [errorForms, setErrorForms] = useState("");
    const location = useLocation();
    const [profile, setProfile] = useState([""]);
    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem("profile"));
        if (profile) {
            setProfile(profile);
        } else console.log("No email found");
    }, []);
    useEffect(() => {
        if (profile) {
            setGuestFormData({
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                email: profile.email || "",
                phone: profile.phone || "",
                checkInDate: "",
                checkOutDate: "",
                ccDniPassport: "",
            });
        }
    }, [profile]);
    useEffect(() => {
        if (location.state && location.state.reservationDetails) {
            setReservationDetails(location.state.reservationDetails);
        } else {
            console.log("No reservation data found");
        }
    }, [location]);
    const [guestFormData, setGuestFormData] = useState({
        firstName: "", lastName: "", email: "", phone: "", checkInDate: "", checkOutDate: "", ccDniPassport: "",
    });
    const [paymentFormData, setPaymentFormData] = useState({
        cvc: "", expiry: "", name: "", number: "", focused: "",
    });
    const validateGuestForm = () => {
        if ((!guestFormData.firstName || guestFormData.firstName.length < 2 || guestFormData.firstName.length > 20) && !profile?.firstName) {
            console.log("Please enter a valid first name.");
            return false;
        }
        if ((!guestFormData.lastName || guestFormData.lastName.length < 2 || guestFormData.lastName.length > 20) && !profile?.lastName) {
            console.log("Please enter a valid last name.");
            return false;
        }
        if ((!guestFormData.email || !guestFormData.email.includes("@")) && !profile?.email) {
            console.log("Please enter a valid email address.");
            return false;
        }
        if ((!guestFormData.phone || guestFormData.phone.length < 10) && !profile?.phone) {
            console.log("Please enter a valid phone number.");
            return false;
        }
        if (!guestFormData.checkInDate) {
            console.log("Please enter a valid check-in date.");
            return false;
        }
        if (!guestFormData.checkOutDate) {
            console.log("Please enter a valid check-out date.");
            return false;
        }
        if (!guestFormData.ccDniPassport || guestFormData.ccDniPassport.length < 6 || guestFormData.ccDniPassport.length > 20) {
            console.log("Please enter a valid credit card, DNI, or passport number.");
            return false;
        }
        return true;
    };
    const validatePaymentForm = () => {
        if (!paymentFormData.cvc || paymentFormData.cvc.length < 3 || paymentFormData.cvc.length > 4 || isNaN(paymentFormData.cvc)) {
            console.log("Please enter a valid CVC number.");
            return false;
        }
        if (!paymentFormData.expiry || paymentFormData.expiry.length !== 5 || !paymentFormData.expiry.includes("/")) {
            console.log("Please enter a valid expiration date.");
            return false;
        }
        if (!paymentFormData.name || paymentFormData.name.length < 2 || paymentFormData.name.length > 26) {
            console.log("Please enter a valid name.");
            return false;
        }
        if (!paymentFormData.number || paymentFormData.number.length < 19) {
            console.log("Please enter a valid card number.");
            return false;
        }
        return true;
    };
    const createReservation = async () => {
        const isGuestFormValid = validateGuestForm();
        const isPaymentFormValid = validatePaymentForm();
        setErrorForms("");
        if (isGuestFormValid && isPaymentFormValid) {
            await handlePostReservation();
        } else {
            if (!isGuestFormValid) {
                setErrorForms("Please fill out all required fields in the Personal Information section.");
            } else if (!isPaymentFormValid) {
                setErrorForms("Please fill out all required fields in the Payment Information section.");
            }
        }
    };

    async function handlePostReservation() {
        try {
            const response = await fetch("http://localhost:5000/reservations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    reservationDetails: {
                        hotel: reservationDetails.hotel,
                        rooms: reservationDetails.rooms,
                        services: reservationDetails.services,
                    },
                    paymentData: {
                        totalRoomsAndServicesPrice: reservationDetails.totalRoomsAndServicesPrice,
                        name: paymentFormData.name,
                        number: paymentFormData.number,
                        cvc: paymentFormData.cvc,
                        expiry: paymentFormData.expiry,
                    },
                    guestData: {
                        firstName: guestFormData.firstName,
                        lastName: guestFormData.lastName,
                        email: guestFormData.email,
                        phone: guestFormData.phone,
                        checkInDate: guestFormData.checkInDate,
                        checkOutDate: guestFormData.checkOutDate,
                        ccDniPassport: guestFormData.ccDniPassport,
                    },
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                setErrorForms("Error creating reservation. Please try again later.");
                console.error("Error creating reservation:", data);
            }
            console.log("Reservation created successfully:", data);
            window.location.href = "/reservationssuccess";
        } catch (error) {
            console.error("Error creating reservation:", error);
            setErrorForms("An error occurred. Please try again later.");
        }
    }

    const handleReservationConfirmation = (e) => {
        e.preventDefault();
        createReservation();
    };
    if (!reservationDetails) {
        return <div className="min-h-screen flex items-center justify-center text-4xl">Loading...</div>;
    } else {
        return (<div className="flex flex-col md:flex-row justify-center gap-4 min-h-lvh mt-4 px-6">
            <div className="w-full p-3">
                <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
                <GuestForm guestFormData={guestFormData} setGuestFormData={setGuestFormData}
                           validateGuestForm={validateGuestForm} profile={profile}/>
            </div>
            <div className="w-full p-3">
                <h2 className="text-2xl font-bold mb-4">Payment Information</h2>
                <PaymentForm paymentFormData={paymentFormData} setPaymentFormData={setPaymentFormData}
                             validatePaymentForm={validatePaymentForm}/>
                <div className="flex justify-center py-3">
                    {errorForms && (<div className="text-red-500 text-sm">
                        {errorForms}
                    </div>)}
                    {reservationDetails.totalRoomsAndServicesPrice > 0 && (<Button onClick={handleReservationConfirmation}
                                                                   className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Confirm Reservation ${reservationDetails.totalRoomsAndServicesPrice}
                    </Button>)}
                </div>
                <h2 className="text-2xl font-bold p-6 mb-4">Reservation Details</h2>
                {reservationDetails.rooms && reservationDetails.services && (
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
                            {reservationDetails && reservationDetails.rooms && reservationDetails.rooms.map((room, index) => (
                                <tr key={index}>
                                    <td>Room: {room.type}</td>
                                    <td>${room.totalPrice}</td>
                                    <td>Selected RoomIds: {room.reservedRoomIds.join(", ")}</td>
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
                )}
            </div>
        </div>);
    }
}

export default ReservationConfirmation;
