import express from "express";
import cors from "cors";
import fs from "fs";

const router = express.Router();

router.use(express.json());
router.use(cors());

const mapJSON = "./map.geojson";

// Verifica si el archivo GeoJSON existe
if (!fs.existsSync(mapJSON)) {
    console.error("Error: map.geojson file not found");
    process.exit(1);
}

router.get("/geojson", (req, res) => {
    // Lee el archivo GeoJSON directamente como JSON
    fs.readFile(mapJSON, "utf8", (err, data) => {
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

export default router;

