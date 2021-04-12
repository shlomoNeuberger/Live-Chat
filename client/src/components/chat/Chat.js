import React from 'react'
import { Redirect, useParams } from 'react-router-dom'
import './Chat.css'

// function makeid(length) {
//     var result = [];
//     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result.push(characters.charAt(Math.floor(Math.random() *
//             charactersLength)));
//     }
//     return result.join('');
// }


function Users({ user, setUser }) {
    const { roomId, roomName } = useParams()
    console.log(roomId);
    console.log(roomName);
    if (user.active)
        return (
            <div className="container-fluid" >
                <div className="outer-box  mx-auto ">
                    <div className="chat-box-feild overflow-auto">
                        {
                            //In: classname float-start msg in
                            //Out: classname float-end msg out
                            //Join: classname msg join mx-auto
                        }
                        <div className="msg join mx-auto"><span>in:Hello How Are you</span> </div><br />
                        <div className="float-start msg in"><span>in:Hello How Are you</span> </div><br />
                        <div className="float-end msg out"><span>out:I'm ok 10x</span> </div><br />
                        <div className="float-start msg in"><span>in:Hello How Are you</span> </div><br />
                        <div className="float-end msg out"><span>out:I'm ok 10x</span> </div><br />
                        <div className="float-start msg in"><span>in:Hello How Are you</span> </div><br />
                        <div className="float-end msg out"><span>out:I'm ok 10x</span> </div><br />
                        <div className="float-start msg in"><span>in:Hello How Are you</span> </div><br />
                        <div className="float-end msg out"><span>out:I'm ok 10x</span> </div><br />
                        <div className="float-start msg in"><span>in:Hello How Are you</span> </div><br />
                        <div className="float-end msg out"><span>out:I'm ok 10x</span> </div><br />
                    </div>
                    <div className="input-group mb-3 chat-box-message">
                        <span className="input-group-text" id="basic-addon1">Message</span>
                        <input
                            type="msg"
                            name="msg"
                            className="form-control"
                            placeholder="Insert your message..."
                            aria-label="msg"
                            aria-describedby="basic-addon1" />
                        <button type="submit" className="btn btn-outline-success" >Send</button>
                    </div>
                </div>
            </div >
        );
    else
        return (
            <Redirect to={{
                pathname: "/",
                state: { src: 'Chat' },
            }} />
        );
}

export default Users
