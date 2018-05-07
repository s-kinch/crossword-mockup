import React from 'react'
import Tile from './Tile'

class Gameboard extends React.Component {

  render(){
    const grid = []
    for (let i = 0; i < 15; i++){
      const row = []
      for (let j = 0; j < 15; j++){
        let letter = this.props.board_letters[i][j]
        row.push(
          <td key={`${i},${j}`} id={`${i},${j}`} onDragOver={(e) => e.preventDefault()} onDrop={this.props.onBoardDrop}>
          {letter ? <Tile position={`${i},${j}`} onDragStart={this.props.onDragStart} key={letter.id} letter={letter}/> : null}
          </td>
        )
      }
      grid.push(
        <tr key={`${i}`}>
          { row }
        </tr>
      )
    }



    return(
      <div className="tableboard">
        <img className="board" src="/board.png"/>
        <div className="table">
          <table>
            <tbody>
              { grid }
            </tbody>
          </table>
        </div>
      </div>
    )
  }


}

export default Gameboard
