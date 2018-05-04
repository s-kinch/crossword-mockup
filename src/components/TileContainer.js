import React from 'react'

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
    const letters = this.state.yourLetters.map(letter => <li>{letter.value}</li>)
    return(
      <div>
      <button onClick={this.takeLetter}>Take Tile</button>
      <ul>{letters}</ul>
      </div>
    )
  }
}

export default TileContainer
