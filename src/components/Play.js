import React from 'react'
import Grid from './Grid'
const API = 'http://localhost:3000/api/v1/puzzles/play/'

class Play extends React.Component {
  constructor(){
    super()
    this.state = {
      puzzle: null
    }
  }

  componentDidMount(){
    fetch(API + this.props.match.params.slug).then(res => res.json()).then(json => this.setState({
      puzzle: json
    }))
  }

  render(){
    return(
      <div id="bye">
        {this.state.puzzle ? <Grid puzzle={this.state.puzzle} play={true}/> : null}
      </div>
    )
  }
}

export default Play
