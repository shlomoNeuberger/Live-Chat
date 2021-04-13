import React, { } from 'react'
import { Redirect } from 'react-router-dom'
import './Chat.css'

import socketIOClient from 'socket.io-client'
import Message from './Message'
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


const ENDPOINT = "ws://127.0.0.1:3001/"


class Chat extends React.Component {
    socket
    roomSlug
    async endlessUpdate() {
        this.setState({ msg: this.state.msg })
        setTimeout(() => {
            this.endlessUpdate()
        }, Math.random() * 5000);
    }
    constructor(props) {
        super(props);
        if (this.props.location)
            this.roomSlug = this.props.location.pathname.replace('/room/', '')
        this.state = {
            msg: "",
            messages: [],
        }
        this.endlessUpdate()

    }
    componentDidCatch() {
        console.log("Did Catch")
    }
    componentDidMount() {
        const joinRoom = {
            room: this.roomSlug,
            type: 'join',
            user: this.props.user,
            timestemp: Date.now(),
        }
        console.log("Did Mount")
        this.socket = socketIOClient(ENDPOINT);
        this.socket.emit("conect room", joinRoom)

        this.socket.on('msg', (args) => {
            let tArray = [...this.state.messages]
            tArray.push(args)
            this.setState({ messages: tArray })

        });
    }
    componentDidUpdate() {
    }
    componentWillUnmount() {
        this.socket.disconnect()
    }
    /** 
    *
    * @param { Event } e sender event
    */
    submitHandle(e) {
        e.preventDefault()
        if (this.state.msg !== '') {
            this.setState({ msg: '' })
            const message = {
                msg: this.state.msg,
                user: this.props.user,
                room: this.roomSlug,
                timestemp: Date.now(),
                type: 'msg'
            }
            this.socket.emit('msg', message)
        }
    }




    render() {
        if (this.props.user.active && this.props.location) {
            return (
                <div className="container-fluid" >
                    <div className="outer-box  mx-auto ">
                        <div className="chat-box-feild p-2 overflow-auto container-fluid">
                            {
                                this.state.messages.map(e =>
                                    <Message key={e.id} e={e} user={this.props.user} />

                                )
                            }
                        </div>
                        <form className="form-controls" onSubmit={e => this.submitHandle(e)}>
                            <div className="input-group chat-box-message">
                                <span className="input-group-text" id="basic-addon1">Message</span>
                                <input
                                    name="msg"
                                    className="form-control"
                                    placeholder="Insert your message..."
                                    aria-label="msg"
                                    value={this.state.msg}
                                    onChange={e => { this.setState({ msg: e.target.value }) }}
                                    aria-describedby="basic-addon1" />
                                <button
                                    type="submit"
                                    className="btn btn-outline-success"

                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            );
        }
        else
            return (
                <Redirect to={{
                    pathname: "/",
                    state: { src: 'Chat' },
                }} />
            );
    }
}



export default Chat
