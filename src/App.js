import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import { Redirect } from 'react-router'
import Board from './components/Board'

class App extends Component {

  constructor(){
    super()
    this.state = {

    }

  }

  componentDidMount = () => {

  }




  render() {
    return (
        <div className="noselect">
          <Board />
        </div>
    )
  }
}

export default App;
