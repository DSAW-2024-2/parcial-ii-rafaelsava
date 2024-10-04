require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const {router:loginRouter} = require('./routes/login');
const {router:weatherRouter} = require('./routes/weather');

app.get('/', (req, res) => {
    res.json({ message: 'Endpoint Funcionando' });
});

app.use('/login', loginRouter);
app.use('/weather', weatherRouter);
app.use((req,res)=>{
    res.status(404).json({error: 'Not Found'});
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});