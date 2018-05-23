import React from 'react'
import {NavLink} from 'react-router-dom';


class Navbar extends React.Component {
  render(){
    return(
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/play">Play</NavLink>
      </div>
    )
  }

}

export default Navbar
