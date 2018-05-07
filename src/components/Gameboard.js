import React from 'react'

class Gameboard extends React.Component {

  render(){
    const grid = []
    for (let i = 0; i < 15; i++){
      const row = []
      for (let j = 0; j < 15; j++){
        row.push(
          <td key=onDragOver={(e) => e.preventDefault()} onDrop={this.props.onBoardDrop}>
          </td>
        )
      }
      grid.push(
        <tr>
          { row }
        </tr>
      )
    }



    return(
      <div className="tableboard">
        <img className="board" src="/board.png"/>
        <div className="table">
          <table>
            { grid }
          </table>
        </div>
      </div>
    )
  }


}

export default Gameboard
