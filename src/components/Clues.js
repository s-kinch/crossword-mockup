import React from 'react'

class Clues extends React.Component {
  render(){
    const acrossClues = this.props.acrossClues.map(clue => <li>{clue}</li>)
    const downClues = this.props.downClues.map(clue => <li>{clue}</li>)

    return(
      <div>
        <div>
          ACROSS
          <ul>
            {acrossClues}
          </ul>
        </div>
        <div>
          DOWN
          <ul>
            {downClues}
          </ul>
        </div>
      </div>
    )
  }
}

export default Clues
