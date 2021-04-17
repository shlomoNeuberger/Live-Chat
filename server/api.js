const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

const route = express.Router()

const db = process.env.MON_DB || "mongodb://localhost:27017/test"

route.use(bodyParser.urlencoded({ extended: false }));
route.use(bodyParser.json());
route.use(cors());

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
    const _slug = name.split(" ").join("-") + "_" + randomString(5)
    const doc = await Room.findOne({ slug: _slug, })
    if (doc) {
        const slug = name.split(" ").join("-") + "_" + randomString(5)
        return slugGenerator(slug)
    } else {
        return _slug
    }
}


route.get("/api/rooms", (req, res) => {
    Room.find({}, (err, docs) => {
        if (err) {
            console.log(err);
            res.json({ Status: 500, Message: "Server Error" }).status(500)
        } else if (docs) {
            const rooms = docs.map(doc => { return { name: doc.name, id: doc._id, slug: doc.slug.split("_")[doc.slug.split("_").length - 1] } })
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

route.get('/api/:feild/:value', (req, res) => {
    console.log(req.params);
    const field = req.params.feild
    const value = req.params.value
    let filter = {}
    switch (field) {
        case 'email':
            filter = { email: value }
            break;
        case 'name':
            filter = { username: value }
            break;
        case 'password':
            filter = { password: value }
            break;
        default:
            console.log(feild);
            break;
    }
    User.find(filter, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            if (docs.length > 0) {
                res.json({ isTeaken: true }).status(200)
            } else {
                res.json({ isTeaken: false }).status(200)
            }
        }
    })

})



module.exports = route