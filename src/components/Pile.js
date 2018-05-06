import React from 'react'
import Tile from './Tile'

class Pile extends React.Component {

  render(){
    let pile = this.props.shuffled_letters.map(letter => <Tile key={letter.id} letter={letter} pickTile={this.props.pickTile} openGameroom = {this.props.openGameroom}/>)
    return(
      <div className="ui page grid">
        <div className="twelve column row">
          {pile}
        </div>
      </div>
    )
  }

}

export default Pile
