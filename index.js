const express = require("express");
require("dotenv/config");
dbConnection = require("./config/dbconnection");
const app = express();
const port = process.env.PORT || 3001;

dbConnection();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./Routes/dataRoute"));

app.listen(port, () => console.log(`Server Running...`));
