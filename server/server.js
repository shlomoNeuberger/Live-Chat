const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io');
const api = require('./api');
const mongoose = require('mongoose');
const cors = require('cors')

require('dotenv').config()

const app = express()
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
    }
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api)
app.use(cors())

//app.use(express.static('build'))



const PORT = process.env.PORT
const db = process.env.MON_DB || "mongodb://localhost:27017/test"

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });


const User = mongoose.model('User')
const Message = mongoose.model('Message')
const Room = mongoose.model('Room')





io.on('connection', (socket) => {
    console.log("Connected " + socket.id);
    socket.on('msg', (msg) => {
        io.to(msg.room).emit('msg', msg)
    });

    socket.on('chat', (msg) => {
        io.emit('chat message', msg)
    })

    socket.on('conect room', (args) => {
        socket.join(args.room)
        io.to(args.room).emit('msg', args)
    });

    socket.on("disconnect", () => {
        console.log(socket.id + " Diconnected");
    });
    // socket.onAny((eventName, ...args) => {
    //     console.log(eventName);
    //     console.log(args);
    // });
});
io.on("disconnect", (socket) => {
    console.log("Disconnect " + socket.id);

})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.get("/react", (req, res) => {
    console.log("react");
    //res.sendFile(__dirname + "/build/index.html")
})


server.listen(PORT, () => {
    console.log(`start server at port ${PORT}`);
})