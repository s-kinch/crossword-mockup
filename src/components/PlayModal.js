import React from 'react'
import Clues from './Clues'
import { Button } from 'semantic-ui-react'

class PlayModal extends React.Component {

  render(){
    return(
      <div id="modal">
        <div id="cheese">
          <Button onClick={()=>this.props.checkSquare()}>Check Square</Button>
          <Button onClick={()=>this.props.revealSquare()}>Reveal Square</Button>

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

export default PlayModal
