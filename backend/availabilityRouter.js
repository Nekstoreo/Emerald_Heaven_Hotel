import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

const databasePath = './availabilitydb.json';

let availabilityData;

// Lee los datos de disponibilidad del archivo de base de datos
if (fs.existsSync(databasePath)) {
    const data = fs.readFileSync(databasePath);
    availabilityData = JSON.parse(data);
} else {
    console.error('Error: availability database file not found');
    process.exit(1);
}
// Middleware para registrar solicitudes recibidas
router.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] Received ${req.method} request at ${req.url}`);
    next();
});

// Endpoint para obtener datos de disponibilidad y precios
router.get('/availability', (req, res) => {
    console.log(`[${new Date().toISOString()}] Responding with availability data`);
    res.json(availabilityData);
});

// Endpoint para actualizar datos de disponibilidad (simulación de selección de habitación)
router.delete('/availability/:roomId', (req, res) => {
    const roomId = parseInt(req.params.roomId);
    const roomIndex = availabilityData.findIndex(room => room.id === roomId);

    if (roomIndex === -1) {
        console.log(`[${new Date().toISOString()}] Room with ID ${roomId} not found`);
        return res.status(404).json({ error: "Room not found" });
    }

    availabilityData.splice(roomIndex, 1); // Elimina la habitación del array

    // Guarda los datos actualizados en el archivo availabilityData.json
    fs.writeFileSync(databasePath, JSON.stringify(availabilityData));

    console.log(`[${new Date().toISOString()}] Room with ID ${roomId} deleted`);
    res.json({ message: "Room deleted successfully" });
});

export default router;
