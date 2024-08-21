//server instantiated
const express = require("express");
const app = express();

//loading config from env file into the process object
require('dotenv').config();

const PORT = process.env.PORT || 4000; 

//middleware to parse JSON request body
app.use(express.json());

//import routes for Blog API and mount(add) it
const blogRoutes = require('./routes/blogs');
app.use('/api/v1',blogRoutes);

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

const dbConnect = require('./config/database');
dbConnect();

//default route
app.get('/',(req, res) => {
    res.send("<h1>This is my Blog App</h1>");
})