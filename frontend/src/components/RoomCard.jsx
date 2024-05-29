import React from "react";
import { Button } from "react-bootstrap";

export default function RoomCard({ type, price, maxguests, availableRoomIds, selectedRoomsCount, reserveRoomId, removeRoomId }) {
    const handleAdd = () => {
        if (selectedRoomsCount < availableRoomIds.length) {
            reserveRoomId({ type, price, maxguests, availableRoomIds });
        }
    };

    const handleRemove = () => {
        if (selectedRoomsCount > 0) {
            removeRoomId({ type, price, maxguests, availableRoomIds });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-5 shadow-md mr-4">
            <h3 className="text-xl font-bold mb-4">{type}</h3>
            <p className="mb-2">Price: ${price}</p>
            <p className="mb-2">Max Guests: {maxguests}</p>
            <p className="mb-2">Available Rooms: {availableRoomIds.length}</p>
            <div className="flex items-center gap-2">
                <Button onClick={handleRemove} disabled={selectedRoomsCount === 0}>
                    Remove
                </Button>
                <span>{selectedRoomsCount}</span>
                <Button onClick={handleAdd} disabled={selectedRoomsCount === availableRoomIds.length}>
                    Add
                </Button>
            </div>
        </div>
    );
}