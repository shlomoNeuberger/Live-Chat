import React from 'react'

function prettyPrintDateDiff(current, previous) {
    const delta = (current - previous) / 1000
    if (delta < 60) {
        return `${Math.floor(delta)} seconds ago`
    } else if ((delta / 60) < 60) {
        return `${Math.floor(delta / 60)} minutes ago`
    } else if ((delta / 3600) < 24) {
        return `${Math.floor(delta / 3600)} Hour ago`
    } else if ((delta / (3600 * 24)) < 30) {
        return `${Math.floor((delta / (3600 * 24)))} days ago`
    } else {
        return 'over a month ago'
    }
}

function prettyTextLength(text) {
    const splittedList = text.split('');
    const finalString = [];
    for (let index = 0; index < splittedList.length; index++) {
        const c = splittedList[index];
        finalString.push(c)
        if (index % 40 == 0) {
            finalString.push("\n")
        }
    }
    return finalString.join("")

}

function InMsg({ e, user }) {
    return (
        <div className="row my-2">
            <div className="col-sm">
                <div className='msg float-start in'>
                    <p className="msg ms-1">{prettyTextLength(e.msg)}</p>
                    <span className="muted">{prettyPrintDateDiff(Date.now(), e.timestemp)}</span>
                </div>
            </div>
            <div className="col-sm">
            </div>
            <div className="col-sm">
            </div>
        </div>
    )
}

function OutMsg({ e, user }) {
    return (
        <div className="row my-2">
            <div className="col-sm">
            </div>
            <div className="col-sm">

            </div>
            <div className="col-sm">
                <div className='msg float-end out'>
                    <p className="msg">{prettyTextLength(e.msg)}</p>
                    <span className="muted">{prettyPrintDateDiff(Date.now(), e.timestemp)}</span>
                </div>
            </div>
        </div >
    )
}

function JoinMsg({ e }) {
    return (
        <div className="row my-2">
            <div className="msg mx-auto join">
                <span>{`${e.user.name} has joined `}</span>
                <span className="muted ">{prettyPrintDateDiff(Date.now(), e.timestemp)}</span>
            </div>
        </div>
    )
}

function Message({ e, user }) {
    if (e.type === 'msg') {
        if (user.name === e.user.name) {
            return <OutMsg e={e} user={user} />
        } else {
            return <InMsg e={e} user={user} />
        }
    } else if (e.type === 'join') {
        return <JoinMsg e={e} />
    } else {
        console.log(e);
    }
}

export default Message