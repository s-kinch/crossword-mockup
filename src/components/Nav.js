import React from 'react'
import Layout from './Layout'

class Nav extends React.Component {

  render(){
    return(
      <div id="nav">
        <span id="layout" className="navlink" onClick={() => this.props.setMode('layout')}>Layout</span>
        <span id="text" className="navlink" onClick={() => this.props.setMode('text')}>Text</span>
        <span id="clear" className="navlink" onClick={this.props.clearBoard}>Clear</span>
        <span id="save" className="navlink">Save</span>
        <Layout toggleSymmetry={this.props.toggleSymmetry}/>
      </div>
    )
  }
}

export default Nav
