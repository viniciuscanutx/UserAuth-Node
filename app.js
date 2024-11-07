require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()

// Middleware para interpretar JSON
app.use(express.json())

//Model do MongoDB
const User = require('./models/User')

app.get('/', (req, res) => {
    res.status(200).json({ msg: "Api-Test" })
});

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body

    // Validações
    if (!name) {
        return res.status(422).json({ msg: "o nome é obrigatório!" })
    }

    if (!email) {
        return res.status(422).json({ msg: "o email é obrigatório!" })
    }

    if (!password) {
        return res.status(422).json({ msg: "a senha é obrigatória!" })
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: "As senhas não são iguais!" })
    }

    // Verifica se já existe um usuário com esse email
    const userExists = await User.findOne({ email: email })
    if (userExists) {
        return res.status(422).json({ msg: "Já existe um usuário com esse email!" })
    }

    // Criando a senha / Criptografia da Senha
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Criando User
    const user = new User({
        name,
        email,
        password: hashedPassword,
    })

    // Try/Catch para validar se o usuário foi registrado.
    try {
        await user.save()
        res.status(201).json({ msg: "Usuário registrado com sucesso!" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ msg: "Houve um erro ao registrar o usuário!" })
    }
})

//Rota para Login de usuario
app.post('/auth/login', async (req, res) => {
    
    const { email, password } = req.body

    // Validações
    if (!email) {
        return res.status(422).json({ msg: "o email é obrigatório!" })
    }

    if (!password) {
        return res.status(422).json({ msg: "a senha é obrigatória!" })
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).json({ msg: "Usuario não encontrado!" })
    }

    // Verifica se a senha é válida
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(422).json({ msg: "Senha incorreta!" })
    }

    //

})

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@jwtappjson.wrtez.mongodb.net/?retryWrites=true&w=majority&appName=JWTAPPJson`)
    .then(() => {
        app.listen(3000, () => console.log('Server running on port 3000'))
        console.log('Connected to MongoDB')
    })
    .catch((err) => console.log(err))
