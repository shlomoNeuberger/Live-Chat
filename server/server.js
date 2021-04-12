const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io');
const api = require('./api');
const mongoose = require('mongoose')


require('dotenv').config()

const app = express()
const server = http.createServer(app);
const io = socketIO(server)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api)
const PORT = process.env.PORT
const db = process.env.MON_DB || "mongodb://localhost:27017/test"

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
const RoomSchema = new mongoose.Schema(
    {
        name: String,
        slug: String
    }
)
const UserSchema = new mongoose.Schema(
    {
        username: String,
        email: String,
        logged: Boolean,
        lastLoggin: Date,
        currentRoom: RoomSchema
    }
)
const MessageSchema = new mongoose.Schema(
    {
        owner: UserSchema,
        timestemp: Date,
        message: String,
        room: RoomSchema,
    }
)

const User = mongoose.model('User')
const Message = mongoose.model('Message')
const Room = mongoose.model('Room')




io.on('connection', (socket) => {
    socket.onAny((eventName, ...args) => {
        console.log(eventName);
        console.log(args);
    });
});




server.listen(PORT, () => {
    console.log(`start server at port ${PORT}`);
})