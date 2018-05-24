import React from 'react'
import Clue from './Clue'

class Clues extends React.Component {

  render(){
    // const acrossClues = this.props.acrossClues.map((clue, index) => <li>{this.props.acrossNums[index]}. {clue} <input onChange={this.handleChange}></li>)
    const acrossClues = this.props.acrossClues.map((clue, index) => <Clue text={clue} num={this.props.acrossNums[index]} index={index} key={index} across={true} selectClue={this.props.selectClue} changeClue={this.props.changeClue}/>)
    const downClues = this.props.downClues.map((clue, index) => <Clue text={clue} num={this.props.downNums[index]} index={index} key={index} across={false} selectClue={this.props.selectClue} changeClue={this.props.changeClue}/>)

    // const downClues = this.props.downClues.map((clue, index) => <li>{this.props.downNums[index]}. {clue}</li>)

    // const acrossNums = this.props.acrossNums.map((clueNum) => <li>{clueNum}</li>)
    // const downNums = this.props.downNums.map((clueNum) => <li>{clueNum}</li>)


    // this.props.acrossNums
    // this.props.downNums

    return(
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
    )
  }
}

export default Clues
