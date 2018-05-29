import React from 'react'

class Square extends React.Component {

  handleClick = () => {
    const coords = this.props.id.split(',')
    this.props.handleClick(parseInt(coords[0], 10), parseInt(coords[1], 10))
  }

  getSquareColor = () => {
    const coords = this.props.id.split(',')
    const xCoord = parseInt(coords[0], 10)
    const yCoord = parseInt(coords[1], 10)
    const selectedWord = this.getSelectedWord()

    if (this.props.value.black) {
      return "black"
    } else if (xCoord === this.props.selected.x && yCoord === this.props.selected.y) {
      // return "#af5d89"
      // return "#9ABAB9"
      // return "#B6C966"
      return "#BFD78D"
    } else if (selectedWord && this.props.across && xCoord === this.props.selected.x && selectedWord[0].y <= yCoord && selectedWord[selectedWord.length - 1].y >= yCoord) {
      // return "#d396b7"
      // return "#4F8987"

      // return "#DDED9A"
      return "#ebf7d2"
    } else if (selectedWord && !this.props.across && yCoord === this.props.selected.y && selectedWord[0].x <= xCoord && selectedWord[selectedWord.length - 1].x >= xCoord) {
      // return "#d396b7"
      // return "#DDED9A"

      return "#ebf7d2"
    } else {
      return "white"
    }
  }

  getLetterColor = () => {
    if (!!this.props.value.correct){
      // return "#1c5982"
      // return "#4F7255"
      return "#4f7131"
    } else if (this.props.value.correct === false){
      return "#D9420C"
    } else {
      return "black"
    }
  }

  getSelectedWord = () => {
    if (this.props.across){
      return this.props.acrossWords.find(word => word.filter(letter => letter.x === this.props.selected.x && letter.y === this.props.selected.y).length === 1)
    } else {
      return this.props.downWords.find(word => word.filter(letter => letter.x === this.props.selected.x && letter.y === this.props.selected.y).length === 1)
    }
  }

  render(){
    return(
      <td onClick={this.handleClick} onDragEnter={this.handleClick} style={{backgroundColor: this.getSquareColor()}} >
      <div>
        {this.props.value.number === 0 ? null : <div className="number">{this.props.value.number}</div>}
        <div className="letter" style={{color: this.getLetterColor()}}>{this.props.value.value}</div>
      </div>
      </td>
    )
  }
}

export default Square
