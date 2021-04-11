import Nav from './components/Navbar'
import Home from './components/home/Home'
import About from './components/about/About'
import Chat from './components/chat/Chat'
import PageNotFound from './components/PageNotFound'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { useState } from 'react'

const rooms = [
  {
    name: "room1",
    id: 1
  },
  {
    name: "room2",
    id: 2
  }
]


function App() {
  const [user, setUser] = useState({ name: '', email: '', active: false })

  console.log(user);
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home title="Home" rooms={rooms} setUser={setUser} user={user}></Home>
        </Route>
        <Route exact path="/about">
          <About ></About>
        </Route>
        <Route exact path="/chat">
          <Chat setUser={setUser} user={user}></Chat>
        </Route>
        <Route >
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
