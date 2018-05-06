import React from 'react'
import TileContainer from './TileContainer'
import Pile from './Pile'
import { ActionCable } from 'react-actioncable-provider'

const URL = 'http://localhost:3000/api/v1/'


class Game extends React.Component {

  state = {
    player_letters: []
  }

  handleSocketResponse = data => {
    switch (data.type) {
      case "DELETE_LETTER":
      		this.props.removeLetter(data.payload.letter_id)
       		break;
      default:
        console.log(data);
    }

  }

  // componentDidMount = () => {
  //   fetch(URL + `games/${this.props.openGameroom.id}/letters`)
  //   .then(res => res.json())
  //   .then(letters => this.setState({
  //     available_letters: letters
  //   }))
  // }

  // getRandomLetter = () => {
  //   const randomIndex = Math.floor(Math.random()*this.state.available_letters.length);
  //   const letter = this.state.available_letters[randomIndex]
  //
  //   fetch(URL + `letters/${letter.id}`, {
  //     method: 'DELETE',
  //
  //   })
  //
  //   // console.log(letter)
  //   return letter
  // }

  shuffle = (letters) => {
    let shuffled_letters = letters
    let currentIndex = shuffled_letters.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = shuffled_letters[currentIndex];
      shuffled_letters[currentIndex] = shuffled_letters[randomIndex];
      shuffled_letters[randomIndex] = temporaryValue;
    }

    return shuffled_letters;
  }

  pickTile = (letter, game) => {
    this.setState({
      player_letters: [...this.state.player_letters, letter]
    })
    fetch(URL + `letters/${letter.id}`, {
      method: 'DELETE',
      headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				letter_id: letter.id,
				game_id: game.id
			})
    })
  }

  render(){
    // console.log(this.state.available_letters.length)
    return(
      <div>
        <h1> {this.props.openGameroom.id} </h1>
        <ActionCable channel={{ channel: 'GameChannel', game_id: this.props.openGameroom.id}} onReceived={this.handleSocketResponse}/>
        <button onClick={this.props.leaveGame}>Leave Game</button>
        <Pile shuffled_letters={this.shuffle(this.props.openGameroom.letters)} pickTile={this.pickTile} openGameroom= {this.props.openGameroom}/>
        <TileContainer available_letters={this.state.available_letters} getRandomLetter = {this.getRandomLetter} player_letters={this.state.player_letters} />
      </div>
    )
  }
}

export default Game
