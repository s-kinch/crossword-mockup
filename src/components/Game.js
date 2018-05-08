import React from 'react'
import TileContainer from './TileContainer'
import Pile from './Pile'
import Gameboard from './Gameboard'
import { ActionCable } from 'react-actioncable-provider'

const URL = 'http://localhost:3000/api/v1/'


class Game extends React.Component {

  state = {
    player_letters: [],
    board_letters: Array(15).fill(Array(15).fill(null)),
    row_words: Array(15).fill([]),
    column_words: Array(15).fill([]),
    game_started: null,
    number_of_players: null,
    winner: null,
    invalid_words: []
    // row: null,
    // column: null,
    // start_row: null,
    // start_column: null
  }

  handleSocketResponse = data => {
    switch (data.type) {
      case "DELETE_LETTER":
      		this.props.removeLetter(data.payload.letter_id)
       		break;
      case "PEEL_LETTER":
          this.props.peelLetter(data.payload.users_letters)
          this.setState({
            player_letters: [...this.state.player_letters, data.payload.users_letters[this.props.currentUser.id]],
            number_of_players: Object.keys(data.payload.users_letters).length
          })
          break;
      case "WINNER":
          this.setState({winner: data.payload.winner})
          break;
      default:
        console.log(data);
    }
  }

  storeWords = (row, column, callback = null) => {
    row = parseInt(row)
    column = parseInt(column)

    let row_letters = []
    let column_letters = []

    for (let i = 0; i < 15; i++){
      if (this.state.board_letters[row][i]){
        row_letters.push(this.state.board_letters[row][i].value)
      } else {
        row_letters.push(null)
      }

      if (this.state.board_letters[i][column]){
        column_letters.push(this.state.board_letters[i][column].value)
      } else {
        column_letters.push(null)
      }
    }

    const new_row_words = row_letters.map(x => x ? x : ' ').join('').split(/  */).filter(x => x !== "")
    const new_column_words = column_letters.map(x => x ? x : ' ').join('').split(/  */).filter(x => x !== "")
    let row_words_copy = this.state.row_words.slice()
    let column_words_copy = this.state.column_words.slice()

    row_words_copy[row] = new_row_words
    column_words_copy[column] = new_column_words


    this.setState({
      row_words: row_words_copy,
      column_words: column_words_copy
    }, () => {
      if (callback) {
        callback()
      } else {
        this.checkWords()
      }
    })
  }

  checkWords = () => {
    let all_words = this.state.row_words.reduce((a,b) => a.concat(b)).concat(this.state.column_words.reduce((a,b) => a.concat(b)))
    all_words = all_words.filter(word => word.length > 1)
    fetch(URL + `letters/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        words: all_words
      })
    }).then(res => res.json()).then(res => this.setState({
      invalid_words: Object.keys(res)
    }))
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
    event.preventDefault()
    // const {letter, game} = event.dataTransfer.getData('object')
    // console.log(event.dataTransfer)
    // this.pickTile(letter, game)
    let data = event.dataTransfer.getData('text')
    data = data.split(',')
    const letter = data[0]
    const game = data[1]

    if (!this.state.game_started) {
      this.pickTile(letter, game)
    } else {
      let start_row = data[2]
      let start_column = data[3]
      let board_letters_copy = this.state.board_letters.map(function(arr) {return arr.slice()})
      let letter = this.state.board_letters[start_row][start_column]

      board_letters_copy[start_row][start_column] = null

      this.setState({
        player_letters: [...this.state.player_letters, letter],
        board_letters: board_letters_copy
      })
    }
  }

  onBoardDrop = (event) => {
    const data = event.dataTransfer.getData('text').split(',')
    let letter_id = data[0]
    let start_row = data[2]
    let start_column = data[3]
    let coordinates = event.target.id.split(',')
    let row = coordinates[0]
    let column = coordinates[1]
    let board_letters_copy = this.state.board_letters.map(function(arr) {return arr.slice()})
    if (row && column) {
      if (start_row && start_column) {
        let letter = this.state.board_letters[start_row][start_column]
        board_letters_copy[row][column] = letter
        board_letters_copy[start_row][start_column] = null
        this.setState({
          board_letters: board_letters_copy,
          // row: row,
          // column: column,
          // start_row: start_row,
          // start_column: start_column
        }, () => {
          this.storeWords(row, column, () => this.storeWords(start_row, start_column))
        })
        if ((this.state.number_of_players > this.props.openGameroom.letters.length) && this.state.player_letters.length === 0 && this.state.winner===null) {
          this.win()
        }
      } else {
        let letter = this.state.player_letters.find(l => l.id === parseInt(letter_id)) || this.state.board_letters[start_row][start_column]

        board_letters_copy[row][column] = letter
        let letter_index = this.state.player_letters.indexOf(letter)

        this.setState({
          board_letters: board_letters_copy,
          player_letters: [...this.state.player_letters.slice(0,letter_index), ...this.state.player_letters.slice(letter_index+1)]
        }, () => {
          this.storeWords(row, column)

          if ((this.state.number_of_players > this.props.openGameroom.letters.length) && this.state.player_letters.length === 0 && this.state.winner===null) {
            this.win()
          }
        })


      }
    }
  }

  onDragStart = (event, letter, game={id:0}, position) => {
    const data = `${letter.id},${game.id},${position}`
    event.dataTransfer.setData('text', data)
  }

  pickTile = (letterId, gameId) => {
    if (this.state.player_letters.length === 3) {
      this.setState({
        game_started: true
      })
    }
    this.setState({
      player_letters: [...this.state.player_letters, this.props.openGameroom.letters.find(x => x.id === parseInt(letterId))],
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

  peel = () => {
    fetch(URL + `games/${this.props.openGameroom.id}/peel`)
  }

  win = () => {
    fetch(URL + `games/${this.props.openGameroom.id}/winner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: this.props.currentUser
      })
    })
  }

  render(){
    // console.log(this.state.row_words, this.state.column_words);
    // console.log(this.state.board_letters);
    const invalid_words = this.state.invalid_words.map(word => <li key={word}>{word}</li>)
    return(
      <div className="noselect">
        { this.state.winner ? <h1>{this.state.winner} won!!!!!!</h1> : null}
        <h1> {this.props.openGameroom.id} </h1>
        <h2> Letters remaining: {this.props.openGameroom.letters.length} </h2>
        <ActionCable channel={{ channel: 'GameChannel', game_id: this.props.openGameroom.id}} onReceived={this.handleSocketResponse}/>
        <button onClick={this.props.leaveGame}>Leave Game</button>
        <div> Invalid words: <ul>{invalid_words}</ul> </div>

        {
          this.state.game_started && (this.state.number_of_players > this.props.openGameroom.letters.length) && this.state.invalid_words.length === 0 ?
          null :
          <button onClick={this.peel}>Peel</button>
        }

        { this.state.game_started ?
          <Gameboard onBoardDrop={this.onBoardDrop} board_letters={this.state.board_letters} onDragStart={this.onDragStart}/> :
          <Pile onDrop={this.onDrop} onDragStart={this.onDragStart} shuffled_letters={this.shuffle(this.props.openGameroom.letters)} pickTile={this.pickTile} openGameroom= {this.props.openGameroom}/>
        }
        <TileContainer onDrop={this.onDrop} onDragStart={this.onDragStart} available_letters={this.state.available_letters} getRandomLetter = {this.getRandomLetter} player_letters={this.state.player_letters} />
      </div>
    )
  }
}

export default Game
