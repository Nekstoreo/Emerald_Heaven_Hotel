import React from 'react';

export default function HotelCard({ hotel, handleCheckAvailability }) {
    const { _id, image, name, location, description, rating, price } = hotel;

    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-6 border rounded-lg mb-8">
            <div className="mb-4 md:mb-0 md:mr-4">
                <img
                    src={image}
                    alt="Hotel"
                    className="rounded-lg aspect-video min-w-72 max-w-72 min-h-40 max-h-40"
                />
            </div>
            <div className="flex-grow mr-4">
                <div>
                    <h2 className="text-2xl font-semibold mb-2">{name}</h2>
                    <p className="text-gray-600 mb-2">{location}</p>
                    <p className="text-gray-600 mb-4 max-w-fit ">{description}</p>
                </div>
            </div>
            <div className="flex flex-col md:items-start">
                <div className="mb-4 flex flex-col md:flex-col items-start md:items-start">
                    <p className="text-gray-600 mb-2">Rating: {rating}</p>
                    <p className="text-gray-600">Prices starting from {price} per night</p>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                    onClick={() => handleCheckAvailability(_id)}
                >
                    Check availability
                </button>
            </div>
        </div>
    );
}