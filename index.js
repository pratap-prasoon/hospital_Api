const express = require('express');
const app = express();
const port = 8080;

//to load the env variable
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

//to load the database
const db = require('./config/mongoose');

//load global error handler
const globalErrorsHandler = require('./controllers/err_controller');

const passport = require('passport');
const jwtPassport = require('./config/passport-jwt-strategy');

//initialize and session the passport
app.use(passport.initialize());
app.use(passport.session());

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', require('./routes'));

//middleware use to handle the global error
app.use(globalErrorsHandler);

//server start
app.listen(port, (err) => {
    if (err) {
      console.log(`App is not running ${err}`);
    }
    console.log(`App is running on port ${port}`);
  });