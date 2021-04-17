import React from 'react'
import User from './User'
function Users({ users }) {
    return (
        <ul className="mt-3">
            {users.map(user => <User key={user.id} user={user} />)}
        </ul>
    )
}

export default Users
