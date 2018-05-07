import React from 'react'

class Gameboard extends React.Component {

  render(){
    const grid = []
    for (let i = 0; i < 15; i++){
      for (let j = 0; j < 15; j++){
        grid[i]=<div className="square">{ i }</div>
    }
  }


    return(
      <div className="table">
        <img className="board" src="/board.png"/>
        {grid}
      </div>

    )
  }


}

export default Gameboard
