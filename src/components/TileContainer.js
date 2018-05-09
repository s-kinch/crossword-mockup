import React from 'react'
import Tile from './Tile'

class TileContainer extends React.Component {

  state = {
    yourLetters: []
  }

  takeLetter = () => {
    this.setState({
      yourLetters: [...this.state.yourLetters, this.props.getRandomLetter()]
    })
  }

  render(){
    // const letters = this.state.yourLetters.map(letter => <Tile {...letter}/>)
    let first_column
    let second_column
    if (this.props.player_letters.length <= 11){
      first_column = this.props.player_letters.map(letter => <Tile onDragStart={this.props.onDragStart} key={letter.id} letter={letter}/>)
    } else {
      first_column = this.props.player_letters.slice(0,11).map(letter => <Tile onDragStart={this.props.onDragStart} key={letter.id} letter={letter}/>)
      second_column = this.props.player_letters.slice(11).map(letter => <Tile onDragStart={this.props.onDragStart} key={letter.id} letter={letter}/>)
    }
    return(
      <div onDragOver={(e) => e.preventDefault()} onDrop={this.props.onDrop}> 
        {/*<button onClick={this.takeLetter}>Take Tile</button>*/}
        <h1 className="tile container header"> Your Tiles </h1>
        <div className="ui page grid" >
          <div className="eleven column row">
            {first_column}
          </div>
          <div className="eleven column row">
            {second_column}
          </div>
        </div>
      </div>
    )
  }
}

export default TileContainer
