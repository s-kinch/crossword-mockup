import React from 'react'

class TileContainer extends React.Component {

  render(){
    console.log(this.props.getRandomLetter());
    console.log(this.props.available_letters);
    return(
      <div></div>
    )
  }
}

export default TileContainer
