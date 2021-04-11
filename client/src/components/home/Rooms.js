import React from 'react'
import { Link } from 'react-router-dom'

function Rooms({ rooms }) {
    let _rooms = rooms.map(elem => {

        return <li key={elem.id} className="list-group-item" > <Link to={`/room/${elem.id}/${elem.name}`}>{elem.name}</Link></li>
    });

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className="card-header">
                Featured
            </div>
            <ul className="list-group list-group-flush">
                {_rooms}
            </ul>
        </div>
    )
}

export default Rooms
