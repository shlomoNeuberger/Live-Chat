import React from 'react'
import Rooms from './Rooms'
import UserLogin from './UserLogin/UserLogin'
function getFromRedirect(redirectState) {
    if (redirectState) {
        switch (redirectState.src) {
            case "Chat":
                return {
                    errorFlag: true,
                    errorMsg: "Plese login first"
                }
                break;
            default:
                return {
                    errorFlag: true,
                    errorMsg: "unknown error"
                }
                break;
        }
    } else {
        return {
            errorFlag: false,
            errorMsg: null
        }
    }
}

const Home = ({ rooms, setUser, user, location }) => {
    const redirectState = location.state
    const { errorFlag, errorMsg } = getFromRedirect(redirectState)
    return (
        <div className="container" style={{ height: "100%" }}>
            <div className="row" >
                <div className="container col-8 col-md-6 col-lg-8">
                    <UserLogin setUser={setUser} user={user} errorFlag={errorFlag} errorMsg={errorMsg} />
                </div>
                <div className="container col-4 col-md-6 col-lg-4 ">
                    <Rooms rooms={rooms} setUser={setUser} user={user} />
                </div>
            </div>
        </div>
    )
}

export default Home
