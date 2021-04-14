import React, { useState } from 'react'
import './UserLogin.css'
import InputCustom from '../inputs/Input'
import axios from 'axios';

const ENDPOINT = "http://127.0.0.1:3001/api/login"
function UserLogin({ setUser, user, errorFlag, errorMsg }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState({ errorFlag: errorFlag, errorMsg: errorMsg });
    const loginHandler = (e) => {
        if (username && password) {
            axios.post(ENDPOINT, {
                data: { name: username, password: password }
            }).then(({ data }) => {
                console.log(data);
                if (data !== 'Error')
                    setUser(data)
            })

        } else {
            setError(
                {
                    errorFlag: true,
                    errorMsg: `The fields: ${username === "" ? "usernmae\t" : ""} ${password === "" ? "Password\n" : ""}  are empty`
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
            <form className="container" method="POST" onSubmit={e => { e.preventDefault(); loginHandler(e); }}>
                <div className="login login-border">
                    <h1>User Login</h1>
                    <InputCustom name="Usernmae" fieldName="name" type="text" placeholder="Username" value={username} handler={setUsername} />
                    {/* <InputCustom name="Email" fieldName="email" type="email" placeholder="Insert email" value={email} handler={setEmail} /> */}
                    <InputCustom name="Password" fieldName="password" type="password" value={password} handler={setPassword} >
                        <button type="submit" className="btn btn-outline-success" >Login</button>
                    </InputCustom>
                    {
                        error.errorFlag ?
                            <div className="alert alert-danger" role="alert">
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
