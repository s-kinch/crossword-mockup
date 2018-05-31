import React from 'react'

class Clue extends React.Component {
  constructor(props){
    super(props)
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
      <li className='test' id={`${this.props.across ? 'across' : 'down'}-${this.props.index}`}>
        <a className="ui black circular label">{this.props.num}</a>
        {!!this.props.play ?
          <div className="clue-div" onClick={this.handleSelectClue}>
            {this.props.text}
          </div>
          :
          <textarea className="clue" rows="1"
                              onChange={this.handleChange}
                              onFocus={this.handleSelectClue}
                              value={this.props.text}
          />
        }
      </li>
    )
  }

}

export default Clue
