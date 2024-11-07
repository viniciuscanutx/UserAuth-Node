require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Model do MongoDB
const User = require('./models/User');

// Rota pública - Teste da API
app.get('/', (req, res) => {
    res.status(200).json({ msg: "API funcionando!" });
});

// Rota privada - Buscar usuário por ID
app.get('/user/:id', checkToken, async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id, '-password'); // Não retorna o campo de senha
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao buscar usuário!" });
    }
});

// Registro de usuário
app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    // Validações
    if (!name) {
        return res.status(422).json({ msg: "O nome é obrigatório!" });
    }

    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: "As senhas não são iguais!" });
    }

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(422).json({ msg: "Já existe um usuário com esse email!" });
    }

    // Criptografia da senha
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criando o usuário
    const user = new User({
        name,
        email,
        password: hashedPassword,
    });

    try {
        await user.save();
        res.status(201).json({ msg: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Houve um erro ao registrar o usuário!" });
    }
});

// Rota para login de usuário
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    // Validações
    if (!email) {
        return res.status(422).json({ msg: "O email é obrigatório!" });
    }

    if (!password) {
        return res.status(422).json({ msg: "A senha é obrigatória!" });
    }

    // Verifica se o usuário existe
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "Usuário não encontrado!" });
        }

        // Verifica se a senha está correta
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(422).json({ msg: "Senha inválida!" });
        }

        // Gerando o token
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret
        );

        res.status(200).json({ msg: "Autenticação realizada com sucesso!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Houve um erro ao fazer login, tente novamente mais tarde!" });
    }
});

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
        return res.status(401).json({ msg: "Acesso negado!" });
    }

    try {

        const secret = process.env.JWT_SECRET

        jwt.verify(token, secret)
        next();

    } catch(error) {
        console.error(error)
        return res.status(400).json({ msg: "Erro ao verificar o token!" });
    }

}

// Conexão ao MongoDB e inicialização do servidor
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPass}@jwtappjson.wrtez.mongodb.net/?retryWrites=true&w=majority&appName=JWTAPPJson`)
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
            console.log('Conectado ao MongoDB');
        });
    })
    .catch((err) => console.error('Erro de conexão com o MongoDB:', err));
