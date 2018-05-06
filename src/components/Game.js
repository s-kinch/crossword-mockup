import React from 'react'
import TileContainer from './TileContainer'
import Pile from './Pile'
import { ActionCable } from 'react-actioncable-provider'

const URL = 'http://localhost:3000/api/v1/'


class Game extends React.Component {

  state = {
    available_letters : [],
    player_letters: []
  }

  componentDidMount = () => {
    fetch(URL + `games/${this.props.openGameroom.id}/letters`)
    .then(res => res.json())
    .then(letters => this.setState({
      available_letters: letters
    }))
  }

  getRandomLetter = () => {
    const randomIndex = Math.floor(Math.random()*this.state.available_letters.length);
    const letter = this.state.available_letters[randomIndex]

    fetch(URL + `letters/${letter.id}`, {
      method: 'DELETE',
    })

    // console.log(letter)
    return letter
  }

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

  pickTile = (letter) => {
    let index = this.state.available_letters.indexOf(letter)
    this.setState({
      available_letters: [...this.state.available_letters.slice(0,index), ...this.state.available_letters.slice(index+1)], 
      player_letters: [...this.state.player_letters, letter]
    })
    fetch(URL + `letters/${letter.id}`, {
      method: 'DELETE',
    })
  }

  render(){
    console.log(this.state.available_letters.length)
    return(
      <div>
        <h1> {this.props.openGameroom.id} </h1>
        <ActionCable channel={{ channel: 'GameroomChannel', gameroom_id: this.props.openGameroom.id}}     />
        <button onClick={this.props.leaveGame}>Leave Game</button>
        <Pile shuffled_letters={this.shuffle(this.state.available_letters)} pickTile={this.pickTile}/>
        <TileContainer available_letters={this.state.available_letters} getRandomLetter = {this.getRandomLetter} player_letters={this.state.player_letters} />

      </div>
    )
  }
}

export default Game
