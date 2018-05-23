import './App.css'
import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Splash from './components/Splash'
import Create from './components/Create'
import PlayIndex from './components/PlayIndex'
import PlayPuzzle from './components/PlayPuzzle'
import Navbar from './components/Navbar'


class App extends Component {
  render() {
    return (
      <div className="noselect">
        <Navbar /> {/* only if not on splash page howwwww */}
        <Route path="/create" component={Create} />
        <Route path="/play/:slug" component={PlayPuzzle} />
        <Route path="/play" exact component={PlayIndex} />
        <Route path="/" exact component={Splash} />
      </div>
    )
  }
}

export default App;
