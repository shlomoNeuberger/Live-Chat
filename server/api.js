const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const route = express.Router()
const db = process.env.MON_DB || "mongodb://localhost:27017/test"

route.use(bodyParser.urlencoded({ extended: false }));
route.use(bodyParser.json());

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

const User = mongoose.model('User', UserSchema)
const Message = mongoose.model('Message', MessageSchema)
const Room = mongoose.model('Room', RoomSchema)

function randomString(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}


async function slugGenerator(name) {
    const doc = await Room.findOne({ slug: name })
    if (doc) {
        const slug = name.replace(" ", "-") + "_" + randomString(5)
        return await slugGenerator(slug)
    } else {
        return name.replace(" ", "-")
    }
}


route.get("/api/rooms", async (req, res) => {
    Room.find({}, (err, docs) => {
        if (err) {
            console.log(err);
            res.json({ Status: 500, Message: "Server Error" }).status(500)
        } else if (docs) {
            const rooms = docs.map(doc => { return { name: doc.name, id: doc._id } })
            res.json({ Status: 200, Message: "Success", rooms: rooms }).status(200)
        }
    })
}).post("/api/rooms", async (req, res) => {
    const name = req.body.name || null
    const slug = await slugGenerator(name)
    const room = Room({ name: name, slug: slug })
    room.save(() => {
        res.json({ Message: "OK", room: room }).status(200)
    })
})

module.exports = route