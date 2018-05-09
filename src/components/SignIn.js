import React from 'react'
import Tile from './Tile'

class SignIn extends React.Component {
  constructor(){
    super()
    this.state ={
      username: ""
    }
  }

  handleChange = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.signIn(this.state.username)
  }


  render(){
    const title = [{value: "B"}, {value: "A"}, {value: "N"}, {value: "A"}, {value: "N"}, {value: "A"}, {value: "G"}, {value: "R"}, {value: "A"}, {value: "M"}, {value: "S"}]
    let tiletitle = title.map(letter => <td><Tile letter = {letter} /></td>)
    return(
      <div className="loginscreen">
        <table className="bananagrams">
          <tbody>
            <tr>
              {tiletitle}
            </tr>
          </tbody>
        </table>
        <form onSubmit={this.handleSubmit}>
          <div className="ui form">
            <input type="text" className="two wide field" placeholder="Enter Your Name" onChange={this.handleChange} />
            <input className="ui yellow submit button" type="submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default SignIn
