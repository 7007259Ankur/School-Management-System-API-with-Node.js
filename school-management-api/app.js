require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school_management'
};

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

// API Endpoints

// Add School
app.post('/addSchool', async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;
        
        // Validation
        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        if (isNaN(latitude) || isNaN(longitude)) {
            return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
        }
        
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
            [name, address, latitude, longitude]
        );
        await connection.end();
        
        res.status(201).json({
            message: 'School added successfully',
            schoolId: result.insertId
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// List Schools sorted by proximity
app.get('/listSchools', async (req, res) => {
    try {
        const userLat = parseFloat(req.query.latitude);
        const userLon = parseFloat(req.query.longitude);
        
        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Valid latitude and longitude parameters are required' });
        }
        
        const connection = await mysql.createConnection(dbConfig);
        const [schools] = await connection.query('SELECT * FROM schools');
        await connection.end();
        
        // Calculate distance for each school and add it to the object
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(
                userLat, 
                userLon, 
                school.latitude, 
                school.longitude
            );
            return {
                ...school,
                distance: parseFloat(distance.toFixed(2)) // Distance in km with 2 decimal places
            };
        });
        
        // Sort by distance (nearest first)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);
        
        res.json(schoolsWithDistance);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});