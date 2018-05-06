import React from 'react'

class Gameboard extends React.Component {

  render(){
    const grid = []
    for (let i = 0; i < 225; i++){
      grid.push(

      <div className="column square" >
        <div className="ui card" >
          <div className="content">
            { i }
          </div>
        </div>
      </div>
      )
    }


    return(
      <div className="ui page grid gameboard" >
        <div className="fifteen column row">
          <img className="board" src="/board.png"/>
          {grid}
        </div>
      </div>

    )
  }


}

export default Gameboard
