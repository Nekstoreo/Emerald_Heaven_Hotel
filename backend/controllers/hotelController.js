// hotelController.js

import { Hotel } from "../models/hotelsModel.js";

export const getHotels = async (_req, res) => {
    try {
        const hotels = await Hotel.find(
            {},
            "_id description image price location rating name"
        );
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getHotelDetails = async (req, res) => {
    const hotelId = req.params.id;
    try {
        const hotel = await Hotel.findById(hotelId)
            .populate("hotelServices.service")
            .populate("roomtypes.rooms");

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        const modifiedRoomtypes = hotel.roomtypes.map((roomtype) => ({
            _id: roomtype.id,
            type: roomtype.type,
            price: roomtype.price,
            maxguests: roomtype.maxguests,
            availableRoomIds: roomtype.rooms.filter((room) => room.available).map((room) => room.id),
        }));

        const hotelDetails = {
            ...hotel._doc,
            roomtypes: modifiedRoomtypes
        }
        console.log(JSON.stringify(hotelDetails, null, 2));
        return res.json(hotelDetails);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
