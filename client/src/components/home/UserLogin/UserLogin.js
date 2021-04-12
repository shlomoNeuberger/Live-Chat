import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import './UserLogin.css'

function UserLogin({ setUser, user, errorFlag, errorMsg }) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState({ errorFlag: errorFlag, errorMsg: errorMsg })
    const loginHandler = (e) => {
        if (username && email) {
            setUser({
                name: username,
                email: email,
                active: true
            })
        } else {
            setError(
                {
                    errorFlag: true,
                    errorMsg: `The fields: ${username === "" ? "usernmae\t" : ""} ${email === "" ? "Email\n" : ""} are empty`
                })
        }
    }
    const logoutHandler = (e) => {
        setUser({
            name: "",
            email: "",
            active: false
        })
    }
    if (!user.active) {
        return (
            <form className="container" method="GET" onSubmit={e => { e.preventDefault(); loginHandler(e); }}>
                <div className="login login-border">
                    <h1>User Login</h1>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Username</span>
                        <input
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Email</span>
                        <input
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1" />
                        <button type="submit" className="btn btn-outline-success" >Login</button>
                    </div>
                    {
                        error.errorFlag ? <div className="alert alert-danger" role="alert">
                            {error.errorMsg}
                        </div> : null
                    }
                </div>
            </form >
        )
    } else {
        return (
            <div className="container login-border" >
                <h1>Hello {user.name}</h1>
                <h6 className=" text-muted">Email: {user.email}</h6>
                <p>please choose room</p>
                <div className="d-flex align-items-end flex-column">
                    <form method="GET" onSubmit={e => { e.preventDefault(); logoutHandler(e); }}>
                        <button
                            type="submit"
                            className="btn btn-outline-danger ml-auto"
                        >
                            Logout
                        </button>
                    </form>
                </div>
            </div >
        )
    }
}

export default UserLogin
