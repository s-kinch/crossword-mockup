import React from 'react'

class Tile extends React.Component {

  render(){
    // console.log(this.props.openGameroom)
    return(
      <div className="column">
        <div className="ui card" onClick={() => { if (this.props.pickTile){this.props.pickTile(this.props.letter, this.props.openGameroom)}}}>
          <div className="content">
            { (this.props.pickTile) ?  " " : this.props.letter.value }
          </div>
        </div>
      </div>

    )
  }
}

export default Tile
