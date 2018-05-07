import React from 'react'

class Gameboard extends React.Component {

  render(){
    const grid = []
    for (let i = 0; i < 15; i++){
      const row = []
      for (let i = 0; i < 15; i++){
        row.push(
          <td>
            <div className="ui card tablesquare" >
              <div className="content">
                { i }
              </div>
            </div>
          </td>
        )
      }
      grid.push(
        <tr>
          { row }
        </tr>
      )
    }
    //   <div className="column square" >
    //     <div className="ui card" >
    //       <div className="content">
    //         { i }
    //       </div>
    //     </div>
    //   </div>
    //   )
    // }




    return(
      // <div className="ui page grid gameboard" >
      //   <div className="fifteen column row">
      //     <img className="board" src="/board.png"/>
      //     {grid}
      //   </div>
      // </div>
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
