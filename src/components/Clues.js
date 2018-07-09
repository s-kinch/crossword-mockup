import React from 'react'
import Clue from './Clue'
import Suggestions from './Suggestions'
import { Button, Segment } from 'semantic-ui-react'

class Clues extends React.Component {

  render(){
    const acrossClues = this.props.acrossClues.map((clue, index) => <Clue text={clue} num={this.props.acrossNums[index]} index={index} key={index} across={true} selectClue={this.props.selectClue} changeClue={this.props.changeClue} play={this.props.play}/>)
    const downClues = this.props.downClues.map((clue, index) => <Clue text={clue} num={this.props.downNums[index]} index={index} key={index} across={false} selectClue={this.props.selectClue} changeClue={this.props.changeClue} play={this.props.play}/>)

    return(
      <div>
      <Segment inverted>
        { this.props.play ? 'Click a square on the grid and typing.' : 'Click a clue or square on the grid and start typing.'}
      </Segment>

      { this.props.play ? '' :
        <Segment>
          <Button onClick={() => {
            if (!this.props.showSuggestions){
              this.props.suggest()
            }

            this.props.toggleSuggest()
          }}>{this.props.showSuggestions ? 'Close' : 'Get Suggestions'}</Button>
          {this.props.showSuggestions ? <div id="suggestions"><Suggestions suggestions={this.props.suggestions} implementSuggestion={this.props.implementSuggestion}/></div> : ''}
        </Segment>
      }


      <div className="clues-container">
        <div id="across-clues">
          <h3>ACROSS</h3>
          <div className="clues">
            <ul>
              {acrossClues}
            </ul>
          </div>
        </div>

        <div id="down-clues">
          <h3>DOWN</h3>
          <div className="clues">
            <ul>
              {downClues}
            </ul>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default Clues
