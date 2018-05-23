import React from 'react'
import {NavLink} from 'react-router-dom';
const API = 'http://localhost:3000/api/v1/puzzles'

class PlayIndex extends React.Component {

  // fetch to puzzles, have it list all, make them links to each puzzle's play page
  constructor(){
    super()
    this.state = {
      puzzles: []
    }
  }

  componentDidMount(){
    fetch(API + '/play').then(res => res.json()).then(json => {
      this.setState({
        puzzles: json.sort((a,b) => b.id - a.id)
      })
    })
  }

  render(){
    const puzzleTitles = this.state.puzzles.map(x => <li key={x.id}><NavLink to={`/play/${x.slug}`}>{x.title}</NavLink></li>) // navlink
    return(
      <div>
        <ul>
        {puzzleTitles}
        </ul>
      </div>
    )
  }



}

export default PlayIndex
