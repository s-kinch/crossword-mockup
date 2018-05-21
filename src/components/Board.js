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
      selected: {x: null, y: null},
      acrossWords: [],
      downWords: [],
      acrossClues: [],
      downClues: []
    }

  }


  // ---------------------Initialize, Update, Clear-----------------------------

  componentDidMount(){
    this.updateNumbers()
    this.updateWords(this.initializeClues)
  }

  updateNumbers = (x, y, callback) => {
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
    }, callback)
  }

  updateWords = (callback) => {
    const newAcrossWords = []
    for (let i = 0; i < 15; i++){
      let acrossWord = []
      for (let j = 0; j < 15; j++){
        if (!this.state.squares[i][j].black){
          acrossWord.push(this.state.squares[i][j])
          if (j === 14){
            newAcrossWords.push(acrossWord)
            acrossWord = []
          }
        } else {
          if (acrossWord.length > 0){
            newAcrossWords.push(acrossWord)
            acrossWord = []
          }
        }
      }
    }

    const newDownWords = []
    for (let j = 0; j < 15; j++){
      let downWord = []
      for (let i = 0; i < 15; i++){
        if (!this.state.squares[i][j].black){
          downWord.push(this.state.squares[i][j])
          if (i === 14){
            newDownWords.push(downWord)
            downWord = []
          }
        } else {
          if (downWord.length > 0){
            newDownWords.push(downWord)
            downWord = []
          }
        }
      }
    }

    this.setState({
      acrossWords: newAcrossWords.sort((a,b) => {return a[0].number - b[0].number}),
      downWords: newDownWords.sort((a,b) => {return a[0].number - b[0].number})
    }, callback)
  }

  initializeClues = () => {
    this.setState({
      acrossClues: Array(this.state.acrossWords.length).fill(""),
      downClues: Array(this.state.downWords.length).fill("")
    })
  }

  updateClues = (acrossWordIndexToUpdate, prevDownWordIndex, downWordIndexToUpdate) => {
    let acrossClues = this.state.acrossClues
    let downClues = this.state.downClues

    if (this.state.acrossWords.length > acrossClues.length){
      console.log('add across clue at index', acrossWordIndexToUpdate + 1)
      acrossClues.splice(acrossWordIndexToUpdate + 1, 0, "")
    } else if (this.state.acrossWords.length < acrossClues.length){
      console.log('remove across clue at index', acrossWordIndexToUpdate)
      acrossClues.splice(acrossWordIndexToUpdate, 1)
    }

    if (this.state.downWords.length > downClues.length){
      console.log('add down clue at index', downWordIndexToUpdate)
      downClues.splice(downWordIndexToUpdate + 1, 0, "")
    } else if (this.state.downWords.length < downClues.length){
      console.log('remove down clue at index', prevDownWordIndex)
      downClues.splice(downWordIndexToUpdate, 1)
    } else {
      console.log('move clue from index', prevDownWordIndex, 'to', downWordIndexToUpdate)
    }

    this.setState({
      acrossClues: acrossClues,
      downClues: downClues
    })
  }

  clearBoardData = () => {
    const defaultSquare = {value: "", black: false, number: 0, selected: false, semiSelected: false}
    const defaultSquares = []
    for (let i = 0; i < 15; i++){
      const row = []
      for (let j = 0; j < 15; j++){
        row.push(JSON.parse(JSON.stringify(defaultSquare)))
        row[j].x = i
        row[j].y = j
      }
      defaultSquares.push(row)
    }
    return defaultSquares
  }

  clearBoard = () => {
    this.setState({
      squares: this.clearBoardData(),
      selected: {x: null, y: null}
    }, () => {
      this.updateNumbers()
      this.updateWords(this.initializeClues)
    })
  }


  // ---------------------------Togglin'----------------------------------------

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

  toggleBlack = (x, y) => {
    let squaresCopy = [...this.state.squares]
    const orig = squaresCopy[x][y].black
    const indexOfPrevDown = this.getIndexOfDownWordThatLetterBelongsTo(x + 1, y)
    const indexOfPrevAcross = this.getIndexOfAcrossWordThatLetterBelongsTo(x, y + 1)

    squaresCopy[x][y] = {...squaresCopy[x][y], black: !orig}

    if (this.state.radialSymmetry){
      const mirroredSquareToToggle = {...squaresCopy[14 - x][14 - y]}
      squaresCopy[14 - x][14 - y] = {...mirroredSquareToToggle, black: !orig}
    }

    this.setState({
      squares: squaresCopy
    }, ()=> {
      this.updateNumbers(x, y, () => this.updateWords(() => this.updateClues(indexOfPrevAcross, indexOfPrevDown, this.getIndexOfDownWordThatLetterBelongsTo(x+1, y))))
    })
  }

  setMode = (mode) => {
    this.setState({
      mode: mode,
      selected: {x: mode === 'text' ? 0 : null, y: mode === 'text' ? 0 : null}
    })
  }


  // -----------------------Text Mode------Refactor that big event listener-----

  selectSquare = (x, y) => {
    if (!this.state.squares[x][y].black){
      if (this.state.selected.x === x && this.state.selected.y === y){
        this.toggleDirection()
      } else {
        this.setState({
          selected: {x: x, y: y}
        })
      }
    }
  }

  addLetter = (e) => {
    e.preventDefault()
    const key = e.which

    if (key === 8){
      let squaresCopy = [...this.state.squares]
      const selectedX = this.state.selected.x
      const selectedY = this.state.selected.y
      let newX = selectedX
      let newY = selectedY

      if (this.state.squares[selectedX][selectedY].value === ""){
        if (this.isLetterFirstInWord(selectedX, selectedY)){
          const newPosition = this.getPositionOfLastLetterInPrevWord(this.getIndexOfWordThatLetterBelongsTo(selectedX, selectedY))
          newX = newPosition.x
          newY = newPosition.y
        }
        else {
          newX = this.state.across ? selectedX : selectedX - 1
          newY = this.state.across ? selectedY - 1 : selectedY
          this.setState({
            selected: {x: newX, y: newY}
          })
        }
      }

      squaresCopy[newX][newY] = {...squaresCopy[newX][newY], value: ""}
      this.setState({
        squares: squaresCopy,
        selected: {x: newX, y: newY}
      })

    } else if (e.shiftKey && key === 9){
      this.moveToPrevWord(this.getIndexOfWordThatLetterBelongsTo(this.state.selected.x, this.state.selected.y))
    } else if (key === 9){
      this.moveToNextWord(this.getIndexOfWordThatLetterBelongsTo(this.state.selected.x, this.state.selected.y))
    } else if (key === 37){
      let newSelected = {...this.state.selected, y: this.state.selected.y === 0 ? 14 : this.state.selected.y - 1}
      while (this.state.squares[newSelected.x][newSelected.y].black){
        newSelected = {...newSelected, y: newSelected.y === 0 ? 14 : newSelected.y - 1}
      }
      this.setState({
        selected: newSelected
      })
    } else if (key === 38){
      let newSelected = {...this.state.selected, x: this.state.selected.x === 0 ? 14: this.state.selected.x - 1}
      while (this.state.squares[newSelected.x][newSelected.y].black){
        newSelected = {...newSelected, x: newSelected.x === 0 ? 14 : newSelected.x - 1}
      }
      this.setState({
        selected: newSelected
      })
    } else if (key === 39){
      let newSelected = {...this.state.selected, y: (this.state.selected.y + 1) % 15}
      while (this.state.squares[newSelected.x][newSelected.y].black){
        newSelected = {...newSelected, y: (newSelected.y + 1) % 15}
      }
      this.setState({
        selected: newSelected
      })
    } else if (key === 40){
      let newSelected = {...this.state.selected, x: (this.state.selected.x + 1) % 15}
      while (this.state.squares[newSelected.x][newSelected.y].black){
        newSelected = {...newSelected, x: (newSelected.x + 1) % 15}
      }
      this.setState({
        selected: newSelected
      })
    } else if (key === 32){
      this.toggleDirection()
    } else if (key > 48 && key < 91 && this.state.selected.x !== null){
      let squaresCopy = [...this.state.squares]
      let squareToUpdate = squaresCopy[this.state.selected.x][this.state.selected.y]
      squaresCopy[this.state.selected.x][this.state.selected.y] = {...squareToUpdate, value: String.fromCharCode((96 <= key && key <= 105)? key-48 : key)}

      if (this.isLetterLastInWord(this.state.selected.x, this.state.selected.y)){
        if (this.positionOfNextMissingLetterInWord(this.state.selected.x, this.state.selected.y)){
          this.setState({
            selected: this.positionOfNextMissingLetterInWord(this.state.selected.x, this.state.selected.y)
          })
        } else {
          this.moveToNextWord(this.getIndexOfWordThatLetterBelongsTo(this.state.selected.x, this.state.selected.y))
        }
      } else {
        const nextSelected = this.state.across ? {...this.state.selected, y: (this.state.selected.y + 1) % 15} : {...this.state.selected, x: (this.state.selected.x + 1) % 15}
        this.setState({
          selected: nextSelected
        })
      }

      this.setState({
        squares: squaresCopy
      }, this.updateWords)
    }
  }


  // ------Utility word/letter methods that need refactored like craaaaaazy-----

  positionOfNextMissingLetterInWord = (x, y) => {
    const word = this.getWordThatLetterBelongsTo(x, y)
    const selectedLetterIndex = this.getIndexOfLetterInItsWord(x, y)
    const lettersBefore = word.slice(0, selectedLetterIndex)
    const lettersAfter = word.slice(selectedLetterIndex + 1) // is it fine that this index might be too high? --> just empty array?

    let emptyLetter = lettersAfter.find(letter => letter.value === "")
    if (!emptyLetter){
      emptyLetter = lettersBefore.find(letter => letter.value === "")
    }

    if (emptyLetter){
      return {x: emptyLetter.x, y: emptyLetter.y}
    } else {
      return false
    }
  }

  getPositionOfLastLetterInPrevWord = (wordIndex) => {
    let newSelected
    let changeDirection = false

    if (this.state.across){

      if (wordIndex === 0){
        changeDirection = true
        newSelected = this.state.downWords[this.state.downWords.length - 1][this.state.downWords[this.state.downWords.length -1].length - 1]
      } else {
        newSelected = this.state.acrossWords[wordIndex - 1][this.state.acrossWords[wordIndex-1].length - 1]
      }

    } else {

      if (wordIndex === 0){
        changeDirection = true
        newSelected = this.state.acrossWords[this.state.acrossWords.length - 1][0]
      } else {
        newSelected = this.state.downWords[wordIndex - 1][this.state.downWords[wordIndex-1].length - 1]
      }

    }

    if (changeDirection){
      this.setState({
        across: !this.state.across
      })
    }

    return {x: newSelected.x, y: newSelected.y}
  }

  getIndexOfAcrossWordThatLetterBelongsTo = (x, y) => {
    return this.state.acrossWords.findIndex(word => word.filter(letter => letter.x === x && letter.y === y).length === 1)
  }

  getIndexOfDownWordThatLetterBelongsTo = (x, y) => {
    return this.state.downWords.findIndex(word => word.filter(letter => letter.x === x && letter.y === y).length === 1)
  }

  getIndexOfWordThatLetterBelongsTo = (x, y) => {
    if (this.state.across){
      return this.getIndexOfAcrossWordThatLetterBelongsTo(x, y)
    } else {
      return this.getIndexOfDownWordThatLetterBelongsTo(x, y)
    }
  }

  getWordThatLetterBelongsTo = (x, y) => {
    if (this.state.across){
      return this.state.acrossWords.find(word => word.filter(letter => letter.x === x && letter.y === y).length === 1)
    } else {
      return this.state.downWords.find(word => word.filter(letter => letter.x === x && letter.y === y).length === 1)
    }
  }

  getIndexOfLetterInItsWord = (x, y) => {

    let word
    if (this.state.across){
      word = this.state.acrossWords[this.getIndexOfWordThatLetterBelongsTo(x, y)]
    } else {
      word = this.state.downWords[this.getIndexOfWordThatLetterBelongsTo(x, y)]
    }
    if (word){
      return word.findIndex(letter => letter.x === x && letter.y === y)
    }

  }

  isLetterLastInWord = (x, y) => {
    if (this.state.across){
      return this.getIndexOfLetterInItsWord(x, y) === (this.state.acrossWords[this.getIndexOfWordThatLetterBelongsTo(x, y)].length - 1)
    } else {
      return this.getIndexOfLetterInItsWord(x, y) === (this.state.downWords[this.getIndexOfWordThatLetterBelongsTo(x, y)].length - 1)
    }
  }

  isLetterFirstInWord = (x, y) => {
    return this.getIndexOfLetterInItsWord(x, y) === 0
  }

  moveToNextWord = (wordIndex) => {
    let newSelected
    let changeDirection = false

    if (this.state.across){

      if (this.state.acrossWords.length - 1 === wordIndex){
        changeDirection = true
        newSelected = this.state.downWords[0][0]
      } else {
        newSelected = this.state.acrossWords[wordIndex + 1][0]
      }

    } else {

      if (this.state.downWords.length - 1 === wordIndex){
        changeDirection = true
        newSelected = this.state.acrossWords[0][0]
      } else {
        newSelected = this.state.downWords[wordIndex + 1][0]
      }

    }

    this.setState({
      selected: newSelected
    }, () => {changeDirection? this.toggleDirection() : null })

  }

  moveToPrevWord = (wordIndex) => {
    let newSelected
    let changeDirection = false

    if (this.state.across){

      if (wordIndex === 0){
        changeDirection = true
        newSelected = this.state.downWords[this.state.downWords.length - 1][0]
      } else {

        newSelected = this.state.acrossWords[wordIndex - 1][0]
      }

    } else {

      if (wordIndex === 0){
        changeDirection = true
        newSelected = this.state.acrossWords[this.state.acrossWords.length - 1][0]
      } else {
        newSelected = this.state.downWords[wordIndex - 1][0]
      }

    }

    this.setState({
      selected: newSelected
    }, () => {changeDirection? this.toggleDirection() : null })

  }



  // ----------------------------Render-----------------------------------------

  render(){

    const grid = this.state.squares.map((row, i) => (
      <tr key={`${i}`}>
        {
          row.map((squareValue, j) => (
              <Square key={`${i},${j}`} id={`${i},${j}`} value={squareValue} handleClick={this.state.mode === 'layout' ? this.toggleBlack : this.selectSquare} selected={this.state.selected} across={this.state.across} acrossWords={this.state.acrossWords} downWords={this.state.downWords}/>
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
        <Nav mode={this.state.mode} setMode={this.setMode} toggleSymmetry={this.toggleSymmetry} clearBoard={this.clearBoard} acrossClues={this.state.acrossClues} downClues={this.state.downClues }/>
      </div>
    )
  }


}

export default Board
