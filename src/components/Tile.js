import React from 'react'

class Tile extends React.Component {

  render(){
    return(
      <div className="column">
        <div className="ui card" onClick={() => { if (this.props.pickTile){this.props.pickTile(this.props.letter)}}}>
          <div className="content">
            {this.props.letter.value}
          </div>
        </div>
      </div>

    )
  }
}

export default Tile
