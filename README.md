<!-- banner img from raw.githubusercontent.com -->

<div align="center">
  <img src="https://raw.githubusercontent.com/Nekstoreo/Emerald_Heaven_Hotel/main/frontend/public/logo192.png" alt="Emerald Heaven Hotel" width="200" height="200">
  <h1>Emerald Heaven Hotel</h1>
</div>

This is a full-stack web application for a hotel booking system. The project consists of a backend and a frontend, both built using modern technologies.

The project uses the MERNG stack, which stands for:
 - MongoDB: A NoSQL database for storing data
 - Express.js: A web application framework for Node.js
 - React.js: A JavaScript library for building user interfaces
 - Node.js: A JavaScript runtime for server-side development

## Backend

The backend is built using Node.js and Express.js. It provides a RESTful API for handling various operations related to hotel bookings, user authentication, and data management.

### Features

- User authentication (login, register)
- Hotel and room management
- Booking management
- Contact information storage

### Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose (for MongoDB object modeling)
- JSON Web Tokens (JWT) for authentication
- bcrypt.js (for password hashing)
- cors (for Cross-Origin Resource Sharing)

## Frontend

The frontend is built using React.js and tailored with Tailwind CSS. It provides a user-friendly interface for interacting with the backend API and managing hotel bookings.

### Features

- Hotel listing
- Room booking
- User authentication
- Contact form
- Interactive map

### Technologies

- React.js
- Tailwind CSS
- React Router
- React Bootstrap

## Getting Started

### Prerequisites

- Node.js (latest LTS version)
- npm (Node.js package manager)
- MongoDB (NoSQL database)
- Git (version control system)

### Configuration

1. Create a mongodb database with the name `emeralddb` and a user with the username `usuarioEmerald` and password `contraseñasegura`. after that, use mongoimport to import the data from the `database/` folder. example:

```bash
mongoimport --db emeralddb --collection bookings --file bookings.json
mongoimport --db emeralddb --collection contacts --file contacts.json
mongoimport --db emeralddb --collection hotels --file hotels.json
mongoimport --db emeralddb --collection users --file users.json
```
Use the credentials you have created to connect to the database.

2. Update the `DB_USER`, `DB_PASS`, `DB_NAME`, `DB_HOST`, and `DB_PORT` variables in the `.env` file with the appropriate values.
   
3. Save the `.env` file.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Nekstoreo/Emerald_Heaven_Hotel.git
cd Emerald_Heaven_Hotel
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

4. Start both the backend and frontend servers:

```bash
cd ..
npm run dev
```

### Usage

- Open your web browser and navigate to `http://localhost:3000` to access the frontend application.
- Use the navigation bar to explore different sections of the application, such as hotel listings, room bookings, and contact information.
