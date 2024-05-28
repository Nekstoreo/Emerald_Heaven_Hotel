import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Table} from "react-bootstrap";

const RoomCard = ({type, price, maxguests, availablecount, onReserve, onRemove, selectedRoomsCount}) => {
    const [selectedRooms, setSelectedRooms] = useState(0);

    const handleAdd = () => {
        if (selectedRooms < availablecount) {
            setSelectedRooms(selectedRooms + 1);
            onReserve({
                type, price, maxguests, selectedRooms: selectedRooms + 1, totalPrice: price * (selectedRooms + 1)
            });
        }
    };

    const handleRemove = () => {
        if (selectedRooms > 0) {
            setSelectedRooms(selectedRooms - 1);
            onRemove({
                type, price, maxguests, selectedRooms: selectedRooms - 1, totalPrice: price * (selectedRooms - 1)
            });
        }
    };

    useEffect(() => {
        setSelectedRooms(selectedRoomsCount);
    }, [selectedRoomsCount]);

    return (
        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-5 shadow-md mr-4">
            <h3 className="text-xl font-bold mb-4">{type}</h3>
            <p className="mb-2">Price: ${price}</p>
            <p className="mb-2">Max Guests: {maxguests}</p>
            <p className="mb-2">Available Rooms: {availablecount - selectedRooms}</p>
            <div className="flex items-center gap-2">
                <Button onClick={handleRemove} disabled={selectedRooms === 0}>
                    Remove
                </Button>
                <span>{selectedRooms}</span>
                <Button onClick={handleAdd} disabled={selectedRooms === availablecount}>
                    Add
                </Button>
            </div>
        </div>);
};

const HotelServicesCard = ({service, price, onSelectService, isSelected}) => {
    const handleServiceSelection = () => {
        onSelectService({service, price: price === "0" ? "FREE" : price});
    };

    return (<div className="mx-2 max-w-64 min-w-64">
        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-5 shadow-md">
            <h3 className="text-xl font-bold mb-2">{service.name}</h3>
            <div className="mb-2 max-w-full whitespace-normal">
                <p>{service.description}</p>
            </div>
            <p className="mb-2">Price: {price === "0" ? "FREE" : `$${price}`}</p>
            <div className="flex items-center gap-2">
                <Button
                    className="mt-2"
                    onClick={handleServiceSelection}
                    disabled={price === "0"}
                    variant={isSelected ? "success" : "primary"}
                >
                    {isSelected ? "Agregado" : "Agregar"}
                </Button>
            </div>
        </div>
    </div>);
};


const HotelInfoAvailability = () => {
    const [hotel, setHotel] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [warning, setWarning] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const {_id} = location.state;

    useEffect(() => {
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
                // Parse roomType.price to number
                data.roomtypes.forEach(roomType => {
                    const price = parseInt(roomType.price);
                    roomType.price = isNaN(price) ? 0 : price;
                });
                setHotel(data);
                // Add FREE services to the selected list by default
                const freeServices = data.hotelServices.filter(service => service.price === "0").map(service => ({
                    service: service.service, price: "FREE"
                }));
                setSelectedServices(freeServices);
            } catch (error) {
                console.error("Error fetching hotel details:", error);
            }
        };

        if (_id) {
            fetchHotelDetails();
        }
    }, [_id]);

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

    const handleRoomReservation = (roomType) => {
        setSelectedRooms((prevRooms) => {
            const existingRoomIndex = prevRooms.findIndex((room) => room.type === roomType.type);
            if (existingRoomIndex > -1) {
                const updatedRooms = [...prevRooms];
                updatedRooms[existingRoomIndex].selectedRooms += 1;
                updatedRooms[existingRoomIndex].totalPrice += roomType.price;
                return updatedRooms;
            } else {
                return [...prevRooms, {...roomType, selectedRooms: 1, totalPrice: roomType.price}];
            }
        });
    };

    const handleRoomRemoval = (roomType) => {
        setSelectedRooms((prevRooms) => {
            const existingRoomIndex = prevRooms.findIndex((room) => room.type === roomType.type);
            if (existingRoomIndex > -1) {
                const updatedRooms = [...prevRooms];
                updatedRooms[existingRoomIndex].selectedRooms -= 1;
                updatedRooms[existingRoomIndex].totalPrice -= roomType.price;
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
        const reservationDetails = {
            hotelId: hotel._id,
            hotelName: hotel.name,
            services: selectedServices,
            rooms: selectedRooms
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
            {hotel.roomtypes.map((roomType) => (<RoomCard
                key={roomType.type}
                {...roomType}
                availablecount={roomType.availablecount - (selectedRooms.find(room => room.type === roomType.type)?.selectedRooms || 0)}
                onReserve={handleRoomReservation}
                onRemove={handleRoomRemoval}
                selectedRoomsCount={selectedRooms.find(room => room.type === roomType.type)?.selectedRooms || 0}
            />))}
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
                    <td>Max Guests: {room.maxguests}</td>
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
