const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs'); // Importa el módulo 'fs' para trabajar con archivos

const app = express();
const PORT = 6030;

app.use(cors());
app.use(bodyParser.json());

let availabilityData;

// Lee los datos de disponibilidad del archivo availabilityData.json si existe
if (fs.existsSync('availabilityData.json')) {
    const data = fs.readFileSync('availabilityData.json');
    availabilityData = JSON.parse(data);
}

// Middleware para registrar solicitudes recibidas
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Received ${req.method} request at ${req.url}`);
    next();
});

// Endpoint para obtener datos de disponibilidad y precios
app.get('/availability', (req, res) => {
    console.log(`[${new Date().toISOString()}] Responding with availability data`);
    res.json(availabilityData);
});

// Endpoint para actualizar datos de disponibilidad (simulación de selección de habitación)
app.delete('/availability/:roomId', (req, res) => {
    const roomId = parseInt(req.params.roomId);
    const roomIndex = availabilityData.findIndex(room => room.id === roomId);

    if (roomIndex === -1) {
        console.log(`[${new Date().toISOString()}] Room with ID ${roomId} not found`);
        return res.status(404).json({ error: "Room not found" });
    }

    availabilityData.splice(roomIndex, 1); // Elimina la habitación del array

    // Guarda los datos actualizados en el archivo availabilityData.json
    fs.writeFileSync('availabilityData.json', JSON.stringify(availabilityData));

    console.log(`[${new Date().toISOString()}] Room with ID ${roomId} deleted`);
    res.json({ message: "Room deleted successfully" });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
