import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'


export default class Navbar extends React.Component {

  render() {
    let activeItem = 'home'
    if (this.props.location.pathname.includes('/play')){
      activeItem = 'play'
    } else if (this.props.location.pathname.includes('/create')){
      activeItem = 'create'
    } else {
      activeItem = 'home'
    }

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
}
