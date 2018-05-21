import React from 'react'
import Layout from './Layout'
import Clues from './Clues'

class Nav extends React.Component {

  render(){
    return(
      <div id="nav">
        <div>
          <span id="layout" className="navlink" onClick={() => this.props.setMode('layout')}>Layout</span>
          <span id="text" className="navlink" onClick={() => this.props.setMode('text')}>Text</span>
          <span id="clear" className="navlink" onClick={this.props.clearBoard}>Clear</span>
          <span id="save" className="navlink">Save</span>
        </div>
        <div>
          {this.props.mode === 'layout' ?
            <Layout toggleSymmetry={this.props.toggleSymmetry}/> :
            <Clues
              acrossNums={this.props.acrossNums}
              downNums={this.props.downNums}
              acrossClues={this.props.acrossClues}
              downClues={this.props.downClues}
              changeClue={this.props.changeClue}
              selectClue={this.props.selectClue}
            />
          }
        </div>
      </div>
    )
  }
}

export default Nav
