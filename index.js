const express = require('express');
require('./db/mongoose');
const customErrorHandler = require('./middleware/errorController');

const authRoute = require('./routes/auth');
const movieRoute = require('./routes/movies');
const userRoute = require('./routes/users');
const reviewRoute = require('./routes/review');
const ratingRoute = require('./routes/rating');
const { BadRequest } = require('./errors');

const app = express();
app.use(express.json({ limit: '5mb' }));

app.use('/api/auth', authRoute);
app.use('/api/movies', movieRoute);
app.use('/api/users', userRoute);
app.use('/api/reviews', reviewRoute);
app.use('/api/ratings', ratingRoute);

app.all('*', (req, res, next) => {
  throw new BadRequest(`Requested url ${req.path} not found`);
});

app.use(customErrorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
