import {Button} from "react-bootstrap";
import React from "react";

export default function HotelServicesCard({service, price, onSelectService, isSelected}) {
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
