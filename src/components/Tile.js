import React from 'react'

class Tile extends React.Component {

  render(){
    return(
      <div className="column">
        <div className="ui card">
          <div className="content">
            {this.props.value}
          </div>
        </div>
      </div>
    )
  }
}

export default Tile
