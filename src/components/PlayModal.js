import React from 'react'
import Clues from './Clues'

class PlayModal extends React.Component {

  render(){
    return(
      <div id="modal">
        <div id="cheese">
          <span onClick={()=>this.props.checkSquare()}>Check Square</span>
          <span onClick={()=>this.props.revealSquare()}>Reveal Square</span>

        </div>
        <div id="hello">
            <Clues
              acrossNums={this.props.clues.filter(x => x.across).map(x => x.number)}
              downNums={this.props.clues.filter(x => !x.across).map(x => x.number)}
              acrossClues={this.props.clues.filter(x => x.across).map(x => x.text)}
              downClues={this.props.clues.filter(x => !x.across).map(x => x.text)}
              changeClue={() => {}}
              selectClue={this.props.selectClue}
            />
        </div>
      </div>
    )
  }
}

export default PlayModal
