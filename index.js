const express = require("express");
require("dotenv/config");
dbConnection = require("./config/dbconnection");
const app = express();
const port = 3001;

//Establish Database connection 
dbConnection();

//Use Express Middleware https://expressjs.com/de/api.html
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Use Routes
app.use("/", require("./Routes/dataRoute"));

app.listen(port, () => console.log(`Server Running...`));
