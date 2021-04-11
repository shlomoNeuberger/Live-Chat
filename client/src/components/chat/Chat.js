import React from 'react'
import './Chat.css'
function makeid(length) {
    var result = [];
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(characters.charAt(Math.floor(Math.random() *
            charactersLength)));
    }
    return result.join('');
}
function Users() {
    let msg = []
    for (let index = 1; index < 50; index++) {
        if (index % 3) {
            msg.push({ index: makeid(index), style: "d-inline-flex msg in" })
        } else if (index % 7) {
            msg.push({ index: makeid(index), style: "d-inline-flex  msg out" })
        }
        else {
            msg.push({ index: makeid(index % 10 + 1), style: "d-inline-flex  msg join" })
        }
    }
    const v = msg.map(m => <div className="a"><p className={m.style}>{`${m.index}`}</p></div>)


    return (
        <div className="container-fluid" >
            <div className="outer-box  mx-auto ">
                <div className="chat-box-feild overflow-auto">

                </div>
                <div className="input-group mb-3 chat-box-message">
                    <span className="input-group-text" id="basic-addon1">Message</span>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                        aria-describedby="basic-addon1" />
                    <button type="submit" className="btn btn-outline-success" >Send</button>
                </div>
            </div>
        </div >
    )
}

export default Users
