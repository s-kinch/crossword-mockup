import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
const URL = 'https://localhost:3000/api/v1/'

class App extends Component {

  signIn = (username) => {
    fetch(URL + 'users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: username})
    })
  }

  MySignIn = (props) => {
    return (<SignIn signIn={this.signIn} />)
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path='/signin' render={this.MySignIn} />
        </div>
      </Router>
    )
  }
}

export default App;
