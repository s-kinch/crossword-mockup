import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import { Redirect } from 'react-router'
import SignIn from './components/SignIn'
import Game from './components/Game'

const URL = 'http://localhost:3000/api/v1/'

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentUser: null
    }
  }

  signIn = (username) => {
    fetch(URL + 'users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: username
      })
    }).then(this.setState({currentUser: username}))
  }

  MySignIn = () => {
    return (<SignIn signIn={this.signIn} />)
  }

  MyGame = () => {
    return (<Game currentUser={this.state.currentUser}/>)
  }

  render() {
    console.log("rendering");
    return (
      <Router>
        <div>
          {this.state.currentUser ? <Redirect to='/game'/> : <Redirect to='/signin'/>}
          <Route exact path='/game' render={this.MyGame} />
          <Route exact path='/signin' render={this.MySignIn} />
        </div>
      </Router>
    )
  }
}

export default App;
