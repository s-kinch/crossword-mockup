import './App.css'
import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Splash from './components/Splash'
import Create from './components/Create'
import PlayIndex from './components/PlayIndex'
import Play from './components/Play'
import Navbar from './components/Navbar'
import {withRouter} from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="noselect">
        <Navbar location={this.props.location}/>
        <Route path="/create" component={Create} />
        <Route path="/play/:slug" component={Play} />
        <Route path="/play" exact component={PlayIndex} />
        <Route path="/" exact component={Splash} />
      </div>
    )
  }
}

export default withRouter(App);
