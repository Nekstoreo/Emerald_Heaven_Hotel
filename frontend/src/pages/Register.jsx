import React from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

function Register(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Add state variables for error messages
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [userExists, setUserExists] = useState("");

    const navigate = useNavigate();

    const onSignUpButtonClick = async () => {
        setFirstNameError("");
        setLastNameError("");
        setPhoneError("");
        setEmailError("");
        setPasswordError("");
        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }
        if ("" === password) {
            setPasswordError("Please enter a password");
            return;
        }
        if (password.length < 8 || password.length > 30) {
            setPasswordError("The password must be 8 characters or longer");
            return;
        }
        if ("" === firstName) {
            setFirstNameError("Please enter your first name");
            return;
        }
        if ("" === lastName) {
            setLastNameError("Please enter your last name");
            return;
        }
        if ("" === phone) {
            setPhoneError("Please enter your phone number");
            return;
        }
        if (!/^\d{10}$/.test(phone)) {
            setPhoneError("Please enter a valid phone number");
            return;
        }
        if (firstName.length < 2 || firstName.length > 20) {
            setFirstNameError("First name must be between 2 and 20 characters");
            return;
        }
        if (lastName.length < 2 || lastName.length > 20) {
            setLastNameError("Last name must be between 2 and 20 characters");
            return;
        }
        try {
            const response = await fetch("http://localhost:5000/check-account", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({email}),
            });
            const data = await response.json();
            if (data.userExists) {
                setUserExists("User already exists, please ");
                console.log("User already exists");
            } else if (!data.userExists) {
                await signUp();
            }
        } catch (error) {
            console.error("Error checking account:", error);
        }
    };

    const signUp = async () => {
        try {
            const response = await fetch("http://localhost:5000/register", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({firstName, lastName, phone, email, password}),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem("jwt-token", data.token);
                props.setLoggedIn(true);
                await getProfile();
            } else {
                console.error("Error logging in:", data.message);
                navigate("/login")
            }
        } catch (error) {
            console.error("Error signing up:", error);
            // Handle error if needed
        }
    };

    async function getProfile() {
        try {
            const response = await fetch("http://localhost:5000/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "jwt-token": localStorage.getItem("jwt-token"),
                },
            });
            const data = await response.json();
            if (data.message === "success") {
                console.log("Profile retrieved successfully" + data.profile);
                localStorage.setItem("profile", JSON.stringify(data.profile));
                navigate("/");
            } else {
                console.error("Error retrieving profile:", data.message);
            }
        } catch (error) {
            console.error("Error retrieving profile:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center pt-14 lg:pt-2 min-h-lvh">
            <div className="text-4xl font-bold mb-4">Create an account</div>
            <div className="mb-4">
                <input
                    type="text"
                    value={firstName}
                    minLength={2}
                    maxLength={20}
                    placeholder="Enter your first name here"
                    onChange={(ev) => setFirstName(ev.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm text-red-500">{firstNameError}</label>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={lastName}
                    minLength={2}
                    maxLength={20}
                    placeholder="Enter your last name here"
                    onChange={(ev) => setLastName(ev.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm text-red-500">{lastNameError}</label>
            </div>
            <div className="mb-4">
                <input
                    type="text"
                    value={phone}
                    minLength={10}
                    maxLength={10}
                    placeholder="Enter your phone number here"
                    onChange={(ev) => setPhone(ev.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm text-red-500">{phoneError}</label>
            </div>
            <div className="mb-4">
                <input
                    type="email"
                    value={email}
                    maxLength={50}
                    placeholder="Enter your email here"
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded -md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm text-red-500">{emailError}</label>
            </div>
            <div className="mb-4">
                <input
                    type="password"
                    value={password}
                    minLength={8}
                    maxLength={30}
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label className="text-sm text-red-500">{passwordError}</label>
            </div>
            <div className="mb-4">
                {userExists ? (
                    <div>
                        <label>{userExists}</label>
                        <a href="/login" className="text-blue-500 hover:underline ml-1">
                            Log in
                        </a>
                    </div>
                ) : (
                    <div>
                        <label>Already have an account?</label>
                        <a href="/login" className="text-blue-500 hover:underline ml-1">
                            Log in
                        </a>
                    </div>
                )}
            </div>
            <div>
                <Button
                    variant="primary"
                    onClick={onSignUpButtonClick}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                >
                    Sign up
                </Button>
            </div>
        </div>
    );

}

export default Register;
