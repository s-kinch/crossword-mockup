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

  handleSelectClue = () => {
    this.props.selectClue(this.props.across, this.props.index)
  }

  render(){
    return (
      <li>
        {this.props.num}. <input type="text"  onChange={this.handleChange}
                                              onFocus={this.handleSelectClue}
                                              value={this.props.text} />
      </li>
    )
  }

}

export default Clue
