import React, { } from 'react'
import { Redirect } from 'react-router-dom'
import './Chat.css'
import socketIOClient from 'socket.io-client'
import Message from './Message'
import env from 'react-dotenv'



const ENDPOINT = env.BASE_IO_SOCKET

class Chat extends React.Component {
    messagesEndRef = React.createRef()
    socket
    roomSlug
    constructor(props) {
        super(props);
        if (this.props.location)
            this.roomSlug = this.props.location.pathname.replace('/room/', '')
        this.state = {
            msg: "",
            messages: [],
        }

    }
    componentDidMount() {
        const joinRoom = {
            room: this.roomSlug,
            type: 'join',
            user: this.props.user,
            timestemp: Date.now(),
        }
        this.socket = socketIOClient(ENDPOINT);
        this.socket.emit("conect room", joinRoom)
        this.socket
            .on('update', () => this.forceUpdate())
            .on('msg', (args) => {
                let tArray = [...this.state.messages]
                tArray.push(args)
                this.setState({ messages: tArray })
                this.scrollIntoEndChat()
            });
    }

    scrollIntoEndChat() {
        this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
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
                id: Math.random() * 4000,
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
                <div className="container-fluid " >
                    <div className="outer-box mx-auto  ">
                        <div className="chat-box-feild px-4 overflow-auto">
                            {
                                this.state.messages.map(e =>
                                    <Message key={e.id} e={e} user={this.props.user} />
                                )
                            }
                            <div ref={this.messagesEndRef}></div>
                        </div>
                        <form className="chat-box-message" onSubmit={e => this.submitHandle(e)}>
                            <div className="input-group ">
                                <span className="input-group-text" id="basic-addon1">Message</span>
                                <input
                                    name="msg"
                                    type="text"
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
