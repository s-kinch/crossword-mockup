import React from 'react'
import Board from './Board'
const API = 'http://localhost:3000/api/v1/puzzles'

class Create extends React.Component {
  constructor(){
    super()
    this.state = {
      puzzle: null
    }
  }

  componentDidMount(){
    fetch(API + '/create').then(res=>res.json()).then(json => {
      this.setState({
        puzzle: json
      })
    })
  }

  render(){
    return(
      <div>
      { this.state.puzzle ? (<Board puzzle={this.state.puzzle}/>) : null }
      </div>
    )
  }


}

export default Create
