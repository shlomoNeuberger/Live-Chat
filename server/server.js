const express = require('express');
const bodyParser = require('body-parser')
const http = require('http')
const socketIO = require('socket.io');
const api = require('./api');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config()

const app = express()
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {}
})
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(api.route)
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
    socket
        .on('msg', (msg) => {
            io.to(msg.room).emit('msg', msg)
        })
        .on('conect room', (args) => {
            socket.user = args.user
            //#region cheack if user us alredy in room if not add him
            Room.findOne({ slug: args.room }, (err, room) => {
                if (err) {
                    console.log(err)
                } else {
                    User.findById(args.user.id, (err, user) => {
                        if (err) {
                            console.log(err);
                        } else {
                            const users = room.get('users') ?? []
                            const inUsers = users.filter((value, index, array) => String(user._id) === String(value._id))
                            const nUsers = users.filter((value, index, array) => String(user._id) !== String(value._id))
                            console.log(`inUsers`, inUsers.length)
                            if (inUsers.length > 1) {
                                socket.emit("already in")
                            } else {
                                nUsers.push(user)
                                room.users = nUsers
                                room.save()
                                socket.join(args.room)
                                io.to(args.room).emit('msg', args)
                                io.to(args.room).emit('update user', nUsers)
                            }
                        }
                    });
                }
            });
            //#endregion
        })
        .on("disconnecting", () => {
            console.log(socket.user, "disconnected from room", socket.rooms);
            socket.rooms.forEach(iRoom => {
                console.log(iRoom);
                Room.findOne({ slug: iRoom }, (err, room) => {
                    if (err) {
                        console.log(err)
                    } else if (room) {
                        User.findById(socket.user.id, (err, user) => {
                            if (err) {
                                console.log(err);
                            } else {
                                const users = room.get('users') ?? []
                                const nUsers = users.filter((value, index, array) => {
                                    return String(user._id) !== String(value._id)
                                })
                                room.users = nUsers
                                console.log("sendeing new Users", room.slug);
                                io.to(room.slug).emit('update user', nUsers)
                                room.save()
                            }
                        });
                    }

                });
            });

        })
        .on("disconnect", () => {
            console.log("diconnect", socket.id)
        })

});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})


app.post("/login", (req, res) => {
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
                    id: doc.get('_id'),
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
