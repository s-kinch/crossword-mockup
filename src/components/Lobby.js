import React from 'react'

class Lobby extends React.Component {

  render(){
    // console.log(this.props.games);
    const games = this.props.games.map(game => <li onClick={()=>{this.props.handleClick(game.id)}} key={game.id}>{game.id}</li>)

    return(
      <div>
        <button onClick={this.props.createGame}>Create Game</button>
        <ul>{games}</ul>
      </div>
    )
  }



}

export default Lobby
