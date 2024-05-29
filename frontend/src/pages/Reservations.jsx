import React, {useState, useEffect} from 'react';

const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [email, setEmail] = useState('');
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [errorFetch, setErrorFetch] = useState('"Loading..." ');
    useEffect(() => {
        const profile = localStorage.getItem('profile');
        if (profile) {
            const {email} = JSON.parse(profile);
            setEmail(email);
            fetchReservations(email).then(r => r);
        } else {
            setShowEmailInput(true);
        }
    }, []);

    const fetchReservations = async (email) => {
        try {
            const response = await fetch(`http://localhost:5000/getReservations`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({email}),
                });
            if (response.ok) {
                const data = await response.json();
                setReservations(data.data);
            } else if (response.status === 404) {
                setErrorFetch('No reservations found.');
            } else {
                setErrorFetch('Error fetching reservations.');
                console.error('Error fetching reservations:', response.statusText);
            }
        } catch (error) {
            setErrorFetch('Error fetching reservations.');
            console.error('Error fetching reservations:', error);
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        fetchReservations(email).then(r => r);
    };

    return (
        <div className="container mx-auto py-8">
            {showEmailInput ? (
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold mb-2">
                        Enter Email:
                    </label>
                    <form onSubmit={handleEmailSubmit}>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="border border-gray-300 rounded px-3 py-2 w-full"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <p className="mb-4">
                    Displaying reservations for email: <span className="font-bold">{email}</span>
                </p>
            )}

            {reservations.length > 0 ? (
                <div className="flex overflow-x-auto py-4">
                    {reservations.map((reservation) => (
                        <div
                            key={reservation._id}
                            className="bg-white shadow-lg rounded-lg p-6 mx-4 flex-shrink-0 w-full md:w-1/2 lg:w-1/3"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-center">{reservation._id}</h2>
                            <p className="mb-2 text-center">
                                Hotel: {reservation.reservationDetails.hotel.name}
                            </p>
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2 text-center">Rooms:</h3>
                                <div className="overflow-x-auto">
                                    <div className="flex">
                                        {reservation.reservationDetails.rooms.map((room, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-100 rounded-md p-4 mr-4 text-center flex-shrink-0"
                                            >
                                                <p>Type: {room.type}</p>
                                                <p>Total Price: ${room.totalPrice}</p>
                                                <p>Reserved Room IDs: {room.reservedRoomIds.join(', ')}</p>
                                                <p>Selected Rooms: {room.selectedRooms}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2 text-center">Services:</h3>
                                <div className="overflow-x-auto">
                                    <div className="flex">
                                        {reservation.reservationDetails.services.map((service, index) => (
                                            <div
                                                key={index}
                                                className="bg-gray-100 rounded-md p-4 mr-4 text-center flex-shrink-0"
                                            >
                                                <p>Name: {service.service.name}</p>
                                                <div className="mb-2 max-w-full whitespace-normal">
                                                    <p>Description: {service.service.description}</p>
                                                </div>
                                                <p>Price: {service.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="mb-2 text-center">Name: {reservation.paymentData.name}</p>
                            <p className="mb-2 text-center">
                                First Name: {reservation.guestData.firstName}
                            </p>
                            <p className="mb-2 text-center">Last Name: {reservation.guestData.lastName}</p>
                            <p className="mb-2 text-center">Email: {reservation.guestData.email}</p>
                            <p className="mb-2 text-center">Phone: {reservation.guestData.phone}</p>
                            <p className="mb-2 text-center">
                                Check-In Date: {reservation.guestData.checkInDate}
                            </p>
                            <p className="mb-2 text-center">
                                Check-Out Date: {reservation.guestData.checkOutDate}
                            </p>
                            <p className="mb-2 text-center">
                                Credit Card/DNI/Passport: {reservation.guestData.ccDniPassport}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="min-h-lvh bg-white shadow-md rounded-lg p-6 flex justify-center items-center">
                    <p>{errorFetch}</p>
                </div>
            )}
        </div>
    );
};

export default Reservations;