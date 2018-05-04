import React from 'react'
import TileContainer from './TileContainer'
import { ActionCable } from 'react-actioncable-provider'

const available_letters = {"A": 13,
                           "B": 3,
                           "C": 3,
                           "D": 6,
                           "E": 18,
                           "F": 3,
                           "G": 4,
                           "H": 3,
                           "I": 12,
                           "J": 2,
                           "K": 2,
                           "L": 5,
                           "M": 3,
                           "N": 8,
                           "O": 11,
                           "P": 3,
                           "Q": 2,
                           "R": 9,
                           "S": 6,
                           "T": 9,
                           "U": 6,
                           "V": 3,
                           "W": 3,
                           "X": 2,
                           "Y": 3,
                           "Z": 2}

let letter_array = []
for (var key in available_letters) {
  letter_array = letter_array.concat(Array(available_letters[key]).fill(key))
}

class Game extends React.Component {

  state = {
    available_letters : letter_array
  }

  getRandomLetter = () => {
    var randomIndex = Math.floor(Math.random()*letter_array.length);
    return letter_array.splice(randomIndex, 1)[0];

    this.setState({
      available_letters: letter_array
    })
  }

  render(){
    return(
      <div>
        <h1> {this.props.openGameroom.id} </h1>
        <ActionCable channel={{ channel: 'GameroomChannel', gameroom_id: this.props.openGameroom.id}}     />
        <button onClick={this.props.leaveGame}>Leave Game</button>
        <TileContainer available_letters={this.state.available_letters} getRandomLetter = {this.getRandomLetter} />
      </div>
    )
  }
}

export default Game
