const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT
const db = process.env.MON_DB || "mongodb://localhost:27017/test"

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });


console.log(`We are using ${db} Database`);


const UserSchema = new mongoose.Schema(
    {
        username: String,
        Email: String,
        Massages: [],
    }
)

const User = mongoose.model('User', UserSchema)

app.listen(PORT, () => {
    console.log(`start server at port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})