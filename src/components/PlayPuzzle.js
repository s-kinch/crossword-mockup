import React from 'react'
import Board from './Board'
const API = 'http://localhost:3000/api/v1/puzzles/play/'

class PlayPuzzle extends React.Component {
  constructor(){
    super()
    this.state = {
      puzzle: null
    }
  }

  componentDidMount(){
    console.log(this.props.match.params.slug)
    fetch(API + this.props.match.params.slug).then(res => res.json()).then(json => this.setState({
      puzzle: json
    }))
  }

  render(){
    console.log(this.props)
    return(
      <div id="bye">
        {this.state.puzzle ? <Board puzzle={this.state.puzzle}/> : null}
      </div>
    )
  }
}

export default PlayPuzzle
