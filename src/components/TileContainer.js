import React from 'react'

class TileContainer extends React.Component {

  state = {

  }

  render(){
    return(
      <div>
      <button onClick={this.props.getRandomLetter}>Take Tile</button>
      </div>
    )
  }
}

export default TileContainer
