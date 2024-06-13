const express = require("express");
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const db = require('./db');
db.connect();


app.get("/", (req, res) => {
    res.send("Hello World!");
});


const userRouter = require('./router');
app.use('/api/v1/user', userRouter);

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
