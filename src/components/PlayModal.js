import React from 'react'
import Layout from './Layout'
import Clues from './Clues'

class PlayModal extends React.Component {

  render(){
    return(
      <div id="modal">
        <div id="hello">
          {this.props.mode === 'layout' ?
            <Layout toggleSymmetry={this.props.toggleSymmetry}/> :
            <Clues
              acrossNums={this.props.clues.filter(x => x.across).map(x => x.number)}
              downNums={this.props.clues.filter(x => !x.across).map(x => x.number)}
              acrossClues={this.props.clues.filter(x => x.across).map(x => x.text)}
              downClues={this.props.clues.filter(x => !x.across).map(x => x.text)}
              changeClue={() => {}}
              selectClue={this.props.selectClue}
            />
          }
        </div>
      </div>
    )
  }
}

export default PlayModal
