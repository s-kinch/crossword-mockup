import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import { Redirect } from 'react-router'
import SignIn from './components/SignIn'
import Lobby from './components/Lobby'
import Game from './components/Game'

const URL = 'http://localhost:3000/api/v1/'

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentUser: null,
      games: [],
      openGameroom: null
    }

  }

  componentDidMount = () => {
    fetch(URL + 'games')
    .then(res => res.json())
    .then(res => this.setState({
      games: res
    }))
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

  handleClick = (gameId) => {
    fetch(URL + `games/${gameId}/join`)
    .then(resp => resp.json())
    .then(game =>
      this.setState({
      openGameroom: game
    }))
  }

  leaveGame = () => {
    this.setState({
      openGameroom: null
    })
  }

  createGame = () => {
    fetch(URL + 'games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }).then(res => res.json()).then(game =>
      this.setState({
        games: [...this.state.games, game]
      }))
  }

  // MySignIn = () => {
  //   return (<SignIn signIn={this.signIn} />)
  // }
  //
  // MyLobby = () => {
  //   return (<Lobby currentUser={this.state.currentUser} games={this.state.games}/>)
  // }

  render() {
    console.log(this.state.openGameroom);
    return (
      <Router>
        <div>
          {/*
          {this.state.currentUser ? <Redirect to='/lobby'/> : <Redirect to='/signin'/>}
          <Route exact path='/lobby' render={this.MyLobby} />
          <Route exact path='/signin' render={this.MySignIn} />
          */}

          {this.state.openGameroom ? <Game openGameroom={this.state.openGameroom} leaveGame={this.leaveGame} currentUser={this.state.currentUser}/> :
          <div>
            <SignIn signIn={this.signIn} />
            <Lobby currentUser={this.state.currentUser} games={this.state.games} handleClick={this.handleClick} createGame={this.createGame}/>
          </div>
           }
        </div>
      </Router>
    )
  }
}

export default App;
