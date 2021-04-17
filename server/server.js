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


function update() {
    io.sockets.emit('update', '')
    setTimeout(() => {
        update();
    }, Math.floor(Math.random() * 5000))
}


io.on('connection', (socket) => {
    update()
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

app
    .post("/login", (req, res) => {
        const username = req.body.data.name
        const password = req.body.data.password
        User.findOne({ username: username }, (err, doc) => {
            if (err) {
                console.log('error in server call to  monngose');
                res.status(500).json("Error")
            } else if (doc) {
                if (doc.get('password') === password) {
                    res.status(200).json({
                        name: username,
                        email: doc.get('email'),
                        active: true
                    })
                } else {
                    console.log("unknoewn user");
                    res.status(203).send("Error")
                }
            } else {
                res.status(404).send("Error")
            }
        })
    })
    .get("/login", (req, res) => {
        res.send().status(404)
    })




server.listen(PORT, () => {
    console.log(`start server at port ${PORT}`);
})