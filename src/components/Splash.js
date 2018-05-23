import React from 'react'
import {NavLink} from 'react-router-dom';

class Splash extends React.Component {

  render(){
    return(
      <div>
        <h1>CrossCompose</h1>
        <NavLink to="/create">Create</NavLink>
        <br/>
        <NavLink to="/play">Play</NavLink>
      </div>
    )
  }


}

export default Splash
