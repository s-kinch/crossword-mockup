import React from 'react'

class Square extends React.Component {

  handleClick = () => {
    const coords = this.props.id.split(',')
    this.props.handleClick(parseInt(coords[0]), parseInt(coords[1]))
  }

  getSquareColor = () => {
    const coords = this.props.id.split(',')
    const xCoord = parseInt(coords[0])
    const yCoord = parseInt(coords[1])

    if (this.props.value.black) {
      return "black"
    } else if (xCoord === this.props.selected.x && yCoord === this.props.selected.y) {
      return "#af5d89"
    } else if (this.props.across && xCoord === this.props.selected.x) {
      return "#d396b7"
    } else if (!this.props.across && yCoord === this.props.selected.y) {
      return "#d396b7"
    } else {
      return "white"
    }
  }

  render(){
    return(
      <td onClick={this.handleClick} onDragEnter={this.handleClick} style={{backgroundColor: this.getSquareColor()}} >
      <div>
        {this.props.value.number === 0 ? null : <div className="number">{this.props.value.number}</div>}
        <div className="letter">{this.props.value.value}</div>
      </div>
      </td>
    )
  }
}

export default Square
