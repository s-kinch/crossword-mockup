import React from 'react'
const API = 'http://localhost:3000/api/v1/puzzles/play/'

class PlayPuzzle extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }

  componentDidMount(){
    fetch(API + this.props.match.params.slug).then(res => res.json()).then(console.log)
  }

  render(){
    console.log(this.props)
    return(
      <div>
        Puzz
      </div>
    )
  }
}

export default PlayPuzzle
