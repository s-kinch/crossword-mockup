import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './components/SignIn'
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
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
    })

    // this.setState({currentUser: username})
  }

  MySignIn = (props) => {
    return (<SignIn signIn={this.signIn} />)
  }

  render() {
    return (
      <Router>
        <div>
          // this.state.currentUser ? something : signin route
          <Route exact path='/signin' render={this.MySignIn} />
        </div>
      </Router>
    )
  }
}

export default App;
