import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Rooms from '../Rooms'
import UserLogin from '../UserLogin/UserLogin'

function getFromRedirect(redirectState) {
    if (redirectState) {
        switch (redirectState.src) {
            case "Chat":
                return {
                    errorFlag: true,
                    errorMsg: "Plese login first"
                }
            default:
                return {
                    errorFlag: true,
                    errorMsg: "unknown error"
                }
        }
    } else {
        return {
            errorFlag: false,
            errorMsg: null
        }
    }
}

const Home = ({ setUser, user, location }) => {

    const redirectState = location.state
    const { errorFlag, errorMsg } = getFromRedirect(redirectState)
    const [rooms, setRooms] = useState([])
    useEffect(() => {
        const getData = async () => {
            const resp = await axios
                .get('http://localhost:3001/api/rooms')
                .catch(err => console.log(err))
            if (resp)
                setRooms(resp.data.rooms)
        }
        getData();
    }, [])



    return (
        <div className="container" style={{ height: "100%" }}>
            <div className="row" >
                <div className="container col-8 col-md-6 col-lg-8">
                    <UserLogin setUser={setUser} user={user} errorFlag={errorFlag} errorMsg={errorMsg} />
                </div>
                <div className="container col-4 col-md-6 col-lg-4 ">
                    {user.active ? <Rooms rooms={rooms} setUser={setUser} user={user} /> : null}
                </div>
            </div>
        </div>
    )
}

export default Home
