// GuestForm.jsx
import React from "react";

function GuestForm({guestFormData, setGuestFormData, profile}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === "phone") {
            formattedValue = value.replace(/\D/g, "");
            // Only allow numbers
            formattedValue = formattedValue.match(/\d/g)?.join("") || "";
            // Limit phone number to 10 digits
            formattedValue = formattedValue.slice(0, 10);
        }
        setGuestFormData((prev) => ({ ...prev, [name]: formattedValue }));
    };
    const today = new Date().toISOString().split("T")[0];

    return (
        <form className="space-y-4">
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 md:pr-2">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={guestFormData.firstName || profile?.firstName || ""}
                        onChange={handleChange}
                        minLength={2}
                        maxLength={20}
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
                        minLength={2}
                        maxLength={20}
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
                    maxLength={50}
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
                    minLength={7}
                    required
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
                    required
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
        </form>
    );
}

export default GuestForm;
