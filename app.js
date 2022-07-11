const express = require('express')
const http = require('http')
const env = require('dotenv')
const morgan = require("morgan");
const mongoose = require('mongoose')
const bodyParser = require("body-parser");


env.config()

//setup db
const dbUrl = 'mongodb://localhost:27017/ptbinasentrapurna'
mongoose.connect(dbUrl).then(() => console.log('database connected')).catch((error) => error.message) 

mongoose.Promise = global.Promise;
//endsetup

const app = express()
const server = http.createServer(app)
const port = process.env.APP_PORT
const url = process.env.APP_URL
const router = require('./app/router/index')
const apiVersion = 'v1' 


app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handle CORS
app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (request.method === "OPTIONS") {
        response.header(
            "Access-Control-Allow-Methods",
            "PUT, POST, PATCH, DELETE, GET"
        );
        return response.status(200).json({});
    }
    next();
});

app.use(`/api/${apiVersion}`, router)

// handle error
app.use((request, response, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({
        status: false,
        message: error.message || "Server error",
    });
});

app.use('/', async(req,res) => {
    res.send('hello world')
})





server.listen(port, () => console.log(`app listen to ${url}:${port}`))
