import React from 'react'

class Layout extends React.Component {
  render(){
    return (
      <div>
        <ul>
          <li><div id="toggle" /></li>
          <li><input type="checkbox" onChange={this.props.toggleSymmetry}/> symmetry</li>
          <li>a button to cycle through default layouts</li>
          <li>ratio</li>
        </ul>
      </div>
    )
  }
}

export default Layout
