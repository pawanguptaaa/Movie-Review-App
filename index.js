const express = require('express');
const req = require('express/lib/request');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const authRoute = require('./routes/auth');
const movieRoute = require('./routes/movies');
const userRoute = require('./routes/users');

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true},() => console.log('Connected to db!'));


app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);

app.listen(3000, () => console.log('Server up and running'));


