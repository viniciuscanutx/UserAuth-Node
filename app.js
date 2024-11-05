require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Api-Test" });
});

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@jwtappjson.wrtez.mongodb.net/?retryWrites=true&w=majority&appName=JWTAPPJson`)
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'));
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.log(err));
