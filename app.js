require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

const User = require('./models/User')

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Api-Test" });
});

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

// Parte de Registro de usuário
app.post('/auth/register', async(req, res) => {
    const { name, email, password, confirmpassword } = req.body;


    //Validações
    if(!name) {
        return res.status(422).json({msg: "o nome é obrigatório!"})
    }

    if(!email) {
        return res.status(422).json({msg: "o email é obrigatório!"})
    }

    if(!password) {
        return res.status(422).json({msg: "a senha é obrigatória!"})
    }

    if(password !== confirmpassword) {
        return res.status(422).json({msg: "As senhas não são iguais!"})
    }

})


mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@jwtappjson.wrtez.mongodb.net/?retryWrites=true&w=majority&appName=JWTAPPJson`)
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'));
        console.log('Connected to MongoDB');
    })
    .catch((err) => console.log(err));
