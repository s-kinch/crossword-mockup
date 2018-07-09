import React from 'react'
import Layout from './Layout'
import Clues from './Clues'
import { Button, Modal } from 'semantic-ui-react'

class CreateMenu extends React.Component {

  render(){
    const layoutColor = this.props.mode === 'layout' ? "#BFD78D" : null
    const textColor = this.props.mode === 'text' ? "#BFD78D" : null
    return(
      <div id="modal">
        <div id="create">
          <Button style={{backgroundColor: layoutColor}} onClick={() => this.props.setMode('layout')}>Layout</Button>
          <Button style={{backgroundColor: textColor}} onClick={() => {
              this.props.setMode('text')
              document.getElementById('table').focus()
            }}>Text</Button>
          <Button onClick={() => this.props.clearBoard()}>Clear</Button>
          <Modal trigger={<Button onClick={this.props.save}>Save</Button>} basic size='small'>
            <Modal.Content>
              <p>Saving...</p>
            </Modal.Content>
          </Modal>
        </div>
        <div>
          {this.props.mode === 'layout' ?
            <Layout
              toggleSymmetry={this.props.toggleSymmetry}
              symmetry={this.props.symmetry}
              clearBoard={this.props.clearBoard}
              clearBoardData={this.props.clearBoardData}
              blackWhiteRatio={this.props.blackWhiteRatio}
            /> :
            <Clues
              acrossNums={this.props.acrossNums}
              downNums={this.props.downNums}
              acrossClues={this.props.acrossClues}
              downClues={this.props.downClues}
              changeClue={this.props.changeClue}
              selectClue={this.props.selectClue}
              play={this.props.play}
              suggest={this.props.suggest}
              toggleSuggest={this.props.toggleSuggest}
              suggestions={this.props.suggestions}
              showSuggestions={this.props.showSuggestions}
              implementSuggestion={this.props.implementSuggestion}
            />
          }
        </div>
      </div>
    )
  }
}

export default CreateMenu
