import React from 'react'

class Clue extends React.Component {
  constructor(){
    super()
    this.state = {
      // text: this.props.text
    }
  }

  handleChange = (e) => {
    this.props.changeClue(this.props.across, this.props.index, e.target.value)
  }

  render(){
    // this.props.across
    // this.props.index
    return (
      <li onClick={this.props.selectClue}>
        {this.props.num}. <input type="text" onChange={this.handleChange} value={this.props.text}/>

      </li>
    )
  }

}

export default Clue
