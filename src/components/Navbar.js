import React from 'react'
import { NavLink } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'


export default class Navbar extends React.Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Segment inverted id="navbar">
        <Menu inverted pointing secondary>
          <Menu.Item name='home' as={NavLink} exact to="/" active={activeItem === 'home'} onClick={this.handleItemClick} />
          <Menu.Item name='create' as={NavLink} to="/create" active={activeItem === 'create'} onClick={this.handleItemClick} />
          <Menu.Item name='play' as={NavLink} to="/play" active={activeItem === 'play'} onClick={this.handleItemClick} />
        </Menu>
      </Segment>
    )
  }

  // render(){
  //   return(
  //     <div>
  //       <NavLink to="/">Home</NavLink>
  //       <NavLink to="/create">Create</NavLink>
  //       <NavLink to="/play">Play</NavLink>
  //     </div>
  //   )
  // }

}
