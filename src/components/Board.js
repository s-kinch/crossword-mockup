import React from 'react'
import Nav from './Nav'
import Square from './Square'

class Board extends React.Component {
  constructor(){
    super()

    this.state = {
      squares: this.clearBoardData(),
      mode: 'layout',
      toggle: true,
      radialSymmetry: false,
      across: true,
      selected: {x: null, y: null}
    }

  }

  componentDidMount(){
    this.updateNumbers()
  }

  setMode = (mode) => {
    this.setState({
      mode: mode,
      selected: {x: mode === 'text' ? 0 : null, y: mode === 'text' ? 0 : null}
    })
  }

  clearBoardData = () => {
    const defaultSquare = {value: "", black: false, number: 0, selected: false, semiSelected: false}
    const defaultSquares = []
    for (let i = 0; i < 15; i++){
      const row = []
      for (let j = 0; j < 15; j++){
        row.push(JSON.parse(JSON.stringify(defaultSquare)))
      }
      defaultSquares.push(row)
    }
    return defaultSquares
  }

  clearBoard = () => {
    this.setState({
      squares: this.clearBoardData(),
      selected: {x: null, y: null}
    })
  }

  // put numbers back to default after clear
  // maybe just do that in the initial djksdfjsklfjdlks

  updateNumbers = (x, y) => {
    let squaresCopy = [...this.state.squares]
    let index = 0
    for (let i = 0; i < 15; i++){
      for (let j = 0; j < 15; j++){
        const currentSquare = squaresCopy[i][j]
        if (!currentSquare.black && (i === 0 || j === 0 || squaresCopy[i][j-1].black || squaresCopy[i-1][j].black)){
          index++
          squaresCopy[i][j] = {...squaresCopy[i][j], number: index}
        } else {
          squaresCopy[i][j] = {...currentSquare, number: 0}
        }
      }
    }

    this.setState({
      squares: squaresCopy
    })
  }

  toggleSymmetry = () => {
    this.setState({
      radialSymmetry: !this.state.radialSymmetry
    })
  }

  toggleDirection = () => {
    this.setState({
      across: !this.state.across
    })
  }

  selectSquare = (x, y) => {
    if (this.state.selected.x === x && this.state.selected.y === y){
      this.toggleDirection()
    } else {
      let newSelected = {x: x, y: y}
      if (this.state.squares[x][y].black){
        newSelected = {x: null, y: null}
      }
      this.setState({
        selected: newSelected
      })
    }
  }

  toggleBlack = (x, y) => {
    let squaresCopy = [...this.state.squares]
    const orig = squaresCopy[x][y].black
    squaresCopy[x][y] = {...squaresCopy[x][y], black: !orig}

    if (this.state.radialSymmetry){
      const mirroredSquareToToggle = {...squaresCopy[14 - x][14 - y]}
      squaresCopy[14 - x][14 - y] = {...mirroredSquareToToggle, black: !orig}
    }

    this.setState({
      squares: squaresCopy
    }, this.updateNumbers(x, y))
  }

  addLetter = (e) => {
    const key = e.which
    if (key === 8){
      let squaresCopy = [...this.state.squares]
      const selectedX = this.state.selected.x
      const selectedY = this.state.selected.y
      let xCoord = selectedX
      let yCoord = selectedY
      if (this.state.squares[selectedX][selectedY].value === ""){
        xCoord = this.state.across ? selectedX : (selectedX === 0 ? 14 : selectedX - 1)
        yCoord = this.state.across ? (selectedY === 0 ? 14 : selectedY - 1) : selectedY
      }
      squaresCopy[xCoord][yCoord] = {...squaresCopy[xCoord][yCoord], value: ""}

      this.setState({
        squares: squaresCopy,
        selected: {x: xCoord, y: yCoord}
      })
    } else if (key === 37){
      this.setState({
        selected: {...this.state.selected, y: this.state.selected.y === 0 ? 14 : this.state.selected.y - 1}
      })
    } else if (key === 38){
      this.setState({
        selected: {...this.state.selected, x: this.state.selected.x === 0 ? 14: this.state.selected.x - 1}
      })
    } else if (key === 39){
      this.setState({
        selected: {...this.state.selected, y: (this.state.selected.y + 1) % 15}
      })
    } else if (key === 40){
      this.setState({
        selected: {...this.state.selected, x: (this.state.selected.x + 1) % 15}
      })
    } else if (key === 32){
      this.toggleDirection()
    } else if (key > 48 && key < 91 && this.state.selected.x !== null){
      let squaresCopy = [...this.state.squares]
      let squareToUpdate = squaresCopy[this.state.selected.x][this.state.selected.y]
      squaresCopy[this.state.selected.x][this.state.selected.y] = {...squareToUpdate, value: String.fromCharCode((96 <= key && key <= 105)? key-48 : key)}
      const nextSelected = this.state.across ? {...this.state.selected, y: (this.state.selected.y + 1) % 15} : {...this.state.selected, x: (this.state.selected.x + 1) % 15}
      // actually want it to go to the next line or back to beginning of word? or next line if word is full?
      // beginning of next word
      this.setState({
        squares: squaresCopy,
        selected: nextSelected
      })
    }
  }

  // tab, shift + tab, space, backspace, enter, arrow keys
  // tab ought to move to next word
  // numbers!!!!
  // later: extend so you can put any character and not just the keys. maybe like a hidden input field that's always focused?
  // space bar to change toggleDirection

  render(){
    const grid = this.state.squares.map((row, i) => (
      <tr key={`${i}`}>
        {
          row.map((squareValue, j) => (
              <Square key={`${i},${j}`} id={`${i},${j}`} value={squareValue} handleClick={this.state.mode === 'layout' ? this.toggleBlack : this.selectSquare} selected={this.state.selected} across={this.state.across}/>
          ))
        }
      </tr>
    ))
    return(
      <div className="flex-container" tabIndex="0" onKeyDown={this.addLetter}>
        <div className="tableboard">
          <div className="table">
            <table>
              <tbody>
                { grid }
              </tbody>
            </table>
          </div>
        </div>
        <Nav setMode={this.setMode} toggleSymmetry={this.toggleSymmetry} clearBoard={this.clearBoard}/>
      </div>
    )
  }


}

export default Board
