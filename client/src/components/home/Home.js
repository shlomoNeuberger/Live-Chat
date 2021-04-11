import React from 'react'
import Rooms from './Rooms'
import UserLogin from './UserLogin/UserLogin'

const Home = ({ title, rooms, setUser, user }) => {
    return (
        <div className="container" style={{ height: "100%" }}>
            <div className="row" >
                <div className="container col-8 col-md-6 col-lg-8">
                    <UserLogin setUser={setUser} user={user} />
                </div>
                <div className="container col-4 col-md-6 col-lg-4 ">
                    <Rooms rooms={rooms} />
                </div>
            </div>
        </div>
    )
}

export default Home
