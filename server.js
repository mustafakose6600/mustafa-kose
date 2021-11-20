const express = require('express');
const dotenv = require('dotenv');
const question = require('./routers/question');
const auth = require('./routers/auth');
const router = require('./routers/index');
const customErrorHandler = require('./middlewares/errors/customErrorHandler');
const connectDatabases = require('./helpers/database/connectDatabase');
const cookieParser = require('cookie-parser');
const path = require('path');

 // Enviroment Variables
 dotenv.config({
     path : "./config/env/config.env"
 });
 
connectDatabases();

const app = express();
app.use(cookieParser());
//EXpress - Body Middleawere
app.use(express.json());

const PORT = process.env.PORT;

//Routers Middleawer
app.use("/api",router);

//ERROR Handling
app.use(customErrorHandler);

//static files
app.use(express.static(path.join(__dirname,"public")));

app.listen(PORT,() => {
    console.log(`App started on ${PORT} : ${process.env.NODE_ENV}`);
})