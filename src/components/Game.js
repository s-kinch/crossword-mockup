import React from 'react'
import TileContainer from './TileContainer'
import Pile from './Pile'
import Gameboard from './Gameboard'
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

  onDrop = (event) => {
    // const {letter, game} = event.dataTransfer.getData('object')
    // console.log(event.dataTransfer)
    // this.pickTile(letter, game)
    let data = event.dataTransfer.getData('text')
    data = data.split(',')
    const letter = data[0]
    const game = data[1]
    this.pickTile(letter, game)
  }

  onDragStart = (event, letter, game) => {
    const data = `${letter.id},${game.id}`
    // console.log(data)
    event.dataTransfer.setData('text', data)

  }

  pickTile = (letterId, gameId) => {
    
    this.setState({
      player_letters: [...this.state.player_letters, this.props.openGameroom.letters.find(x => x.id === parseInt(letterId))]
    })
    fetch(URL + `letters/${letterId}`, {
      method: 'DELETE',
      headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				letter_id: parseInt(letterId),
				game_id: parseInt(gameId)
			})
    })
  }

  render(){
    console.log(this.props.openGameroom)
    return(
      <div>
        <h1> {this.props.openGameroom.id} </h1>
        <ActionCable channel={{ channel: 'GameChannel', game_id: this.props.openGameroom.id}} onReceived={this.handleSocketResponse}/>
        <button onClick={this.props.leaveGame}>Leave Game</button>

        {
          this.state.player_letters.length === 21 ?
          <Gameboard /> :
          <Pile onDrop={this.onDrop} onDragStart={this.onDragStart} shuffled_letters={this.shuffle(this.props.openGameroom.letters)} pickTile={this.pickTile} openGameroom= {this.props.openGameroom}/>
        }
        <TileContainer onDrop={this.onDrop} available_letters={this.state.available_letters} getRandomLetter = {this.getRandomLetter} player_letters={this.state.player_letters} />
      </div>
    )
  }
}

export default Game
