import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

function AlredyAlert() {
    const [seconds, setSeconds] = useState(5)

    useEffect(() => {

        const timer = setTimeout(() => {
            setSeconds(seconds - 1)
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [seconds])
    return (

        <div style={{
            position: 'absolute', height: "100%", width: "100%", backgroundColor: "rgba(128,128,128,0.5)"
        }}>
            {seconds == 0 ? <Redirect to={'/'} /> : null}
            <div className="container" style={{
                padding: '5% 2%', borderRadius: '5%',
                boxShadow: " 10px 10px 5px 2px rgba(0, 0, 0, 0.2)", position: 'absolute', alignContent: 'center', top: "20%", left: "30%", width: '20%', background: 'white'
            }}   >
                <h3 className="">Alredy Log in</h3>
                <h6>You will be redirected in {seconds} seconds to the home page</h6>
            </div>
        </div >

    )
}

export default AlredyAlert
