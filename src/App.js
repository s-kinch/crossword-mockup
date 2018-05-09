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
    }).then(res => res.json()).then((res) => {
      this.setState({
        currentUser: res
      })
    })
  }

  handleClick = (gameId) => {
    console.log(this.state.currentUser)
    fetch(URL + `games/${gameId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: this.state.currentUser.id})
    })
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

  removeLetter = (letter_id) => {
		let newLetters = this.state.openGameroom.letters.filter(letter => letter.id !== letter_id)

		let newGameroom = {...this.state.openGameroom}

		newGameroom.letters = newLetters

		this.setState({
			openGameroom: newGameroom
		})

	}

  peelLetter = (users_letters) => {
    console.log('here')
    Object.values(users_letters).forEach(letter => this.removeLetter(letter.id))

    // let newLetters = this.state.openGameroom.letters.filter(letter => letter.id !== letter_id)
    //
		// let newGameroom = {...this.state.openGameroom}
    //
		// newGameroom.letters = newLetters
    //
		// this.setState({
		// 	openGameroom: newGameroom
		// })
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
    console.log(this.state.currentUser);
    return (
      <Router>
        <div>
          {/*
          {this.state.currentUser ? <Redirect to='/lobby'/> : <Redirect to='/signin'/>}
          <Route exact path='/lobby' render={this.MyLobby} />
          <Route exact path='/signin' render={this.MySignIn} />
          */}
          {this.state.currentUser ? null : <SignIn signIn={this.signIn} />}
          {this.state.openGameroom && this.state.currentUser ? <Game openGameroom={this.state.openGameroom} leaveGame={this.leaveGame} currentUser={this.state.currentUser} removeLetter = {this.removeLetter} peelLetter={this.peelLetter}/>: null}
          {!this.state.openGameroom && this.state.currentUser ? <Lobby currentUser={this.state.currentUser} games={this.state.games} handleClick={this.handleClick} createGame={this.createGame}/> : null}
        </div>
      </Router>
    )
  }
}

export default App;
