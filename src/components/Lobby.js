import React from 'react'
import Tile from './Tile'

class Lobby extends React.Component {

  render(){
    // console.log(this.props.games);
    const games = this.props.games.map(game =>
      // <li onClick={()=>{this.props.handleClick(game.id)}} key={game.id}>{game.id}</li>)
      {return<div className="card">
          <div className="content">
            <div className="header">Game {game.id}</div>
            <div className="description">

            </div>
          </div>
          <div onClick={()=>{this.props.handleClick(game.id)}} className="ui bottom attached button">
            <i className="add icon"></i>
            Join Game
          </div>
      </div>

    })


    const title = [{value: "L"}, {value: "O"}, {value: "B"}, {value: "B"}, {value: "Y"}]
    let tiletitle = title.map(letter => <td><Tile letter = {letter} /></td>)


    return(
      <div className="lobby-container">
        <table className="centered">
          <tbody>
            <tr>
              {tiletitle}
            </tr>
          </tbody>
        </table>
        <div className="centered"><button onClick={this.props.createGame} className="ui yellow submit button">Create Game</button></div>
        <div className="ui four stackable cards">
          {games}
        </div>
      </div>
    )
  }



}

export default Lobby
