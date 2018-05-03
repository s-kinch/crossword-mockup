import React from 'react'

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
    return(
      <form onSubmit={this.handleSubmit} >
        <input type="text" onChange={this.handleChange} />
        <input type="submit" />
      </form>
    )
  }
}

export default SignIn
