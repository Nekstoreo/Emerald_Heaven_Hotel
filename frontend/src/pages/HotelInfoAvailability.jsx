import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Table} from "react-bootstrap";
import RoomCard from "../components/RoomCard";
import HotelServicesCard from "../components/HotelServiceCard";

const HotelInfoAvailability = () => {
    const [hotel, setHotel] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [warning, setWarning] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const {_id} = location.state;

    useEffect(() => {
        if (_id) {
            fetchHotelDetails().then(r => r);
        }
    }, [_id]);

    const fetchHotelDetails = async () => {
        try {
            const response = await fetch(`http://localhost:5000/hotels/${_id}`, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            if (!response.ok) {
                console.error("Error fetching hotel details:", data.message);
            }
            data.roomtypes.forEach(roomType => {
                const price = parseInt(roomType.price);
                roomType.price = isNaN(price) ? 0 : price;
            });
            setHotel(data);
            const freeServices = data.hotelServices.filter(service => service.price === "0").map(service => ({
                service: service.service, price: "FREE"
            }));
            setSelectedServices(freeServices);
        } catch (error) {
            console.error("Error fetching hotel details:", error);
        }
    };

    const handleServiceSelection = (service) => {
        setSelectedServices((prevServices) => {
            const isAlreadySelected = prevServices.some((selectedService) => selectedService.service._id === service.service._id);
            if (isAlreadySelected) {
                return prevServices.filter((selectedService) => selectedService.service._id !== service.service._id);
            } else {
                return [...prevServices, service];
            }
        });
    };

    const reserveRoomId = (roomType) => {
        setSelectedRooms((prevRooms) => {
            const existingRoomIndex = prevRooms.findIndex((room) => room.type === roomType.type);
            if (existingRoomIndex > -1) {
                const updatedRooms = [...prevRooms];
                updatedRooms[existingRoomIndex].selectedRooms += 1;
                updatedRooms[existingRoomIndex].totalPrice += roomType.price;
                updatedRooms[existingRoomIndex].availableRoomIds = roomType.availableRoomIds.filter(
                    (roomId) => !updatedRooms[existingRoomIndex].reservedRoomIds.includes(roomId)
                );
                updatedRooms[existingRoomIndex].reservedRoomIds.push(
                    roomType.availableRoomIds.find(
                        (roomId) => !updatedRooms[existingRoomIndex].reservedRoomIds.includes(roomId)
                    )
                );
                return updatedRooms;
            } else {
                const reservedRoomId = roomType.availableRoomIds[0];
                const updatedRoomType = {
                    ...roomType,
                    selectedRooms: 1,
                    totalPrice: roomType.price,
                    reservedRoomIds: [reservedRoomId],
                    availableRoomIds: roomType.availableRoomIds.filter((roomId) => roomId !== reservedRoomId),
                };
                return [...prevRooms, updatedRoomType];
            }
        });
    };

    const removeRoomId = (roomType) => {
        setSelectedRooms((prevRooms) => {
            const existingRoomIndex = prevRooms.findIndex((room) => room.type === roomType.type);
            if (existingRoomIndex > -1) {
                const updatedRooms = [...prevRooms];
                updatedRooms[existingRoomIndex].selectedRooms -= 1;
                updatedRooms[existingRoomIndex].totalPrice -= roomType.price;
                const releasedRoomId = updatedRooms[existingRoomIndex].reservedRoomIds.pop();
                updatedRooms[existingRoomIndex].availableRoomIds.push(releasedRoomId);
                if (updatedRooms[existingRoomIndex].selectedRooms === 0) {
                    updatedRooms.splice(existingRoomIndex, 1);
                }
                return updatedRooms;
            }
            return prevRooms;
        });
    };

    const handleReservation = () => {
        // Check if any room is selected
        if (selectedRooms.length === 0) {
            setWarning("Please select at least one room to proceed with the reservation");
            return;
        }
        const totalRoomsPrice = parseInt(selectedRooms.reduce((acc, room) => acc + room.totalPrice, 0));
        const totalServicesPrice = parseInt(selectedServices.reduce((acc, service) => acc + (service.price === "FREE" ? 0 : parseInt(service.price)), 0));
        const totalRoomsAndServicesPrice = totalRoomsPrice + totalServicesPrice;

        const totalGuests = selectedRooms.reduce((acc, room) => acc + room.selectedRooms, 0);
        const formatedSelectedRooms = selectedRooms.map(room => {
            return {
                type: room.type,
                totalPrice: room.totalPrice,
                reservedRoomIds: room.reservedRoomIds,
                selectedRooms: room.selectedRooms,
            };
        });
        if (totalGuests === 0) {
            setWarning("Please select at least one guest to proceed with the reservation");
            return;
        }
        if (totalRoomsAndServicesPrice === 0) {
            setWarning("Please select at least one service to proceed with the reservation");
            return;
        }
        const reservationDetails = {
            hotel: {
                _id,
                name: hotel.name,
            },
            services: selectedServices,
            rooms: formatedSelectedRooms,
            totalRoomsAndServicesPrice: totalRoomsAndServicesPrice,
        };
        navigate("/reservationconfirmation", {state: {reservationDetails}});
    };

    if (!hotel) {
        return <div className="min-h-screen flex items-center justify-center text-4xl">Loading...</div>;
    }

    return (<div className="flex flex-col items-center gap-5 mt-20 mx-5">
        <div className=" flex flex-col md:flex-row items-center rounded-lg border-2 border-gray-100 p-6 mx-6">
            <div className="md:w-1/2 mb-4 md:mb-0 flex justify-center">
                <div className="px-4">
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full max-w-xs max-h-48 min-h-48 min-w-64 rounded-lg object-cover shadow-md"
                    />
                </div>
            </div>
            <div className="md:w-1/2 md:ml-4">
                <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
                <p className="mb-2">{hotel.description}</p>
                <p className="mb-2">Location: {hotel.location}</p>
                <p className="mb-2">Rating: {hotel.rating}</p>
                <p className="mb-2">Reviews Count: {hotel.review} ({hotel.reviewCount})</p>
                <p className="mb-2">Price: ${hotel.price}</p>
            </div>
        </div>
        <h2 className="text-2xl font-bold">Hotel Services</h2>
        <div className="w-full overflow-x-auto whitespace-nowrap flex p-2 md:px-0">
            {hotel.hotelServices.map((hotelService) => (<HotelServicesCard
                key={hotelService.service._id}
                service={hotelService.service}
                price={hotelService.price}
                onSelectService={handleServiceSelection}
                isSelected={selectedServices.some((selectedService) => selectedService.service._id === hotelService.service._id)}
            />))}
        </div>
        <h2 className="text-2xl font-bold">Room Availability</h2>
        <div className="w-full overflow-x-auto whitespace-nowrap flex p-2 md:px-0">
            {hotel.roomtypes.map((roomType) => (
                <RoomCard
                    key={roomType.type}
                    {...roomType}
                    availableRoomIds={roomType.availableRoomIds}
                    reserveRoomId={reserveRoomId}
                    removeRoomId={removeRoomId}
                    selectedRoomsCount={selectedRooms.find((room) => room.type === roomType.type)?.selectedRooms || 0}
                />
            ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">Reservation Details</h2>
        <div className="w-full max-w-screen-lg">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Details</th>
                </tr>
                </thead>
                <tbody>
                {selectedRooms.map((room, index) => (<tr key={index}>
                    <td>Room: {room.type}</td>
                    <td>${room.totalPrice}</td>
                    <td>Selected RoomIds: {room.reservedRoomIds.join(", ")}</td>
                </tr>))}
                {selectedServices.map((service, index) => (<tr key={index}>
                    <td>Service: {service.service.name}</td>
                    <td>{service.price === "FREE" ? "FREE" : `$${service.price}`}</td>
                    <td>{service.service.description}</td>
                </tr>))}
                </tbody>
            </Table>
        </div>
        {warning && <p className="text-red-500 text-lg font-bold">{warning}</p>}
        <Button onClick={handleReservation} className="mt-4" variant="primary">
            Confirm Reservation
        </Button>
    </div>);
};

export default HotelInfoAvailability;
