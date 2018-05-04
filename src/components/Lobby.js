import React from 'react'

class Lobby extends React.Component {

  render(){
    const games = this.props.games.map(game => <li onClick={()=>{this.props.handleClick(game.id)}} key={game.id}>{game.id}</li>)

    return(
      <div><ul>{games}</ul></div>
    )
  }



}

export default Lobby