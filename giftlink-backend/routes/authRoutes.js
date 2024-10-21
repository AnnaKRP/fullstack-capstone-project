// Step 1 - Task 2: Import necessary packages
const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db'); // Adjust path as necessary
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino'); // Import Pino logger

// Create a Pino logger instance
const logger = pino(); // Create a Pino logger instance

// Load environment variables
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to parse JSON request bodies
router.use(express.json());

// User registration route
router.post('/register', async (req, res) => {
    try {
        // Connect to `giftsdb` in MongoDB through `connectToDatabase` in `db.js`
        const db = await connectToDatabase();

        // TAccess MongoDB collection
        const collection = db.collection("users");

        // Check for existing email
        const existingEmail = await collection.findOne({ email: req.body.email });
        if (existingEmail) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
        
        // Save user details in database
        const newUser = await collection.insertOne({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

        // Create JWT authentication with user._id as payload
        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        logger.info('User registered successfully');
        res.json({ authtoken, email: req.body.email });
    } catch (e) {
        logger.error(`Registration error: ${e.message}`);
        return res.status(500).send('Internal server error');
    }
});

module.exports = router;