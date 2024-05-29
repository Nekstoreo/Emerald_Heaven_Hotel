// PaymentForm.jsx
import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

function PaymentForm({ paymentFormData, setPaymentFormData }) {
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        let formattedValue = value;
        if (name === "expiry") {
            if (value.length === 2 && !value.includes("/")) {
                formattedValue = value + "/";
            }
        }
        if (name === "number") {
            formattedValue = value.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim();
            formattedValue = formattedValue.slice(0, 19);
            formattedValue = formattedValue.replace(/\D/g, "");
            formattedValue = formattedValue.match(/.{1,4}/g)?.join(" ") || "";
        }
        if (name === "cvc") {
            // Minimum 3 digits, maximum 4 digits
            formattedValue = value.slice(0, 4);
            formattedValue = formattedValue.replace(/\D/g, "");
        }
        if (name === "name") {
            // Only letters and spaces
            formattedValue = value.replace(/[^a-zA-Z ]/g, "");
            formattedValue = formattedValue.toUpperCase().slice(0, 26);
        }
        setPaymentFormData((prev) => ({ ...prev, [name]: formattedValue }));
    };

    const handleInputFocus = (evt) => {
        setPaymentFormData((prev) => ({ ...prev, focus: evt.target.name }));
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
                    minLength={19} // 16 digits + 3 spaces
                    maxLength={19} // 16 digits + 3 spaces
                    className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={paymentFormData.name}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <div className="flex gap-4">
                    <input
                        type="text"
                        name="expiry"
                        placeholder="MM/YY Expiry"
                        value={paymentFormData.expiry}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        minLength={5} // MM/YY
                        maxLength={5} // MM/YY
                        className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <input
                        type="number"
                        name="cvc"
                        placeholder="CVC"
                        value={paymentFormData.cvc}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        minLength={3} // Mínimo 3 dígitos
                        maxLength={4} // Máximo 4 dígitos
                        className="w-full px-4 py-1 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
            </form>
        </div>
    );
}

export default PaymentForm;