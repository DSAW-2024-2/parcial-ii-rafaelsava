const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const usuario = {
    email:"admin@admin.com",
    password:"admin"};

router.post('/', (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.status(400).json({ message: 'You must use email and password.' });
        return;
    }
    const { email, password } = req.body;
    if (email === usuario.email && password === usuario.password) {
        const token = jwt.sign({ email }, process.env.TOKEN_SECRET);
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

function authToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {router, authToken};
