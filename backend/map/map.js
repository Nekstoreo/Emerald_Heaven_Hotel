const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/hotels", (req, res) => {
    // Lee el archivo GeoJSON directamente como JSON
    fs.readFile("./map.geojson", "utf8", (err, data) => {
        if (err) {
            console.error("Error al leer el archivo GeoJSON:", err);
            res.status(500).json({ error: "Error al leer el archivo GeoJSON" });
            return;
        }
        const map = JSON.parse(data);
        res.json(map);
        console.log(map);
    });
});

const PORT = 3090;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
