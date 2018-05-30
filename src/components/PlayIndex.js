import React from 'react'
import {NavLink} from 'react-router-dom';
const API = 'http://localhost:3000/api/v1/puzzles'

class PlayIndex extends React.Component {

  // fetch to puzzles, have it list all, make them links to each puzzle's play page
  constructor(){
    super()
    this.state = {
      puzzles: [],
      searchText: ""
    }
  }

  componentDidMount(){
    fetch(API + '/play').then(res => res.json()).then(json => {
      this.setState({
        puzzles: json.sort((a,b) => b.id - a.id)
      })
    })
  }

  handleChange = (e) =>{
    this.setState({
      searchText: e.target.value
    })
  }

  render(){
    const puzzleTitles = this.state.puzzles.filter(x => x.title.toLowerCase().includes(this.state.searchText.toLowerCase())).map(x => <li key={x.id}><NavLink to={`/play/${x.slug}`}>{x.title}</NavLink></li>) // navlink
    return(
      <div>
        <h1><input id="search" type="text" onChange={this.handleChange} placeholder="search puzzle titles" /></h1>
        <ul>
        {puzzleTitles}
        </ul>
      </div>
    )
  }



}

export default PlayIndex
