import React from 'react'
import Clues from './Clues'
import { Menu, Dropdown } from 'semantic-ui-react'

class PlayMenu extends React.Component {

  render(){
    return(
      <div id="modal">
        <div id="cheese">
          <Menu inverted>
            <Dropdown item text='Check'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>this.props.checkSquare()}>Square</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.props.checkWord()}>Word</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.props.checkGrid()}>Grid</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown item text='Reveal'>
              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>this.props.revealSquare()}>Square</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.props.revealWord()}>Word</Dropdown.Item>
                <Dropdown.Item onClick={()=>this.props.revealGrid()}>Grid</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu>

        </div>
        <div id="hello">
            <Clues
              acrossNums={this.props.clues.filter(x => x.across).map(x => x.number)}
              downNums={this.props.clues.filter(x => !x.across).map(x => x.number)}
              acrossClues={this.props.clues.filter(x => x.across).map(x => x.text)}
              downClues={this.props.clues.filter(x => !x.across).map(x => x.text)}
              changeClue={() => {}}
              selectClue={this.props.selectClue}
              play={this.props.play}
            />
        </div>
      </div>
    )
  }
}

export default PlayMenu
