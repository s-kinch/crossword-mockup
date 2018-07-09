import React from 'react'
import CreateMenu from './CreateMenu'
import PlayMenu from './PlayMenu'
import Square from './Square'
import { Redirect } from 'react-router'
const API = 'http://localhost:3000/api/v1/puzzles'

class Grid extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      squares: this.clearBoardData(),
      mode: 'type',
      toggle: true,
      radialSymmetry: false,
      across: true,
      selected: {x: null, y: null},
      acrossWords: [],
      downWords: [],
      acrossClues: [],
      downClues: [],
      title: props.puzzle.title,
      redirect: false,
      numBlackSquares: 0,
      suggestions: [],
      showSuggestions: false
    }

  }


  // ---------------------Initialize, Update, Clear-----------------------------

  componentDidMount(){
    if (this.props.puzzle.black_squares) {
      this.props.puzzle.black_squares.map(coords => this.toggleBlack(coords.x, coords.y))
    }
    else {
      this.updateNumbers()
      this.updateWords(this.initializeClues)
    }
  }

  updateNumbers = (callback) => {
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
      acrossClues.splice(acrossWordIndexToUpdate + 1, 0, "")
    } else if (this.state.acrossWords.length < acrossClues.length){
      acrossClues.splice(acrossWordIndexToUpdate, 1)
    }

    if (this.state.downWords.length > downClues.length){
      downClues.splice(downWordIndexToUpdate, 0, "")
    } else if (this.state.downWords.length < downClues.length){
      downClues.splice(prevDownWordIndex, 1)
    } else {
      if (prevDownWordIndex !== downWordIndexToUpdate){ // handles the -1's
        const clue = downClues.splice(prevDownWordIndex, 1)
        downClues.splice(downWordIndexToUpdate, 0, clue[0])
      }
    }

    this.setState({
      acrossClues: acrossClues,
      downClues: downClues
    })
  }

  clearBoardData = () => {
    const defaultSquare = {value: "", black: false, number: 0, correct: null}
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

  clearBoard = (layout) => {
    this.setState({
      squares: layout ? layout : this.clearBoardData(), // ???????????????????????????????????????????
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

  toggleDirection = (callback) => {
    this.setState({
      across: !this.state.across
    }, callback)
  }

  toggleBlack = (x, y) => {
    let squaresCopy = [...this.state.squares]
    const orig = squaresCopy[x][y].black
    const indexOfPrevAcross = this.getIndexOfAcrossWordThatLetterBelongsTo(x, y + 1)
    const indexOfPrevDown = this.getIndexOfDownWordThatLetterBelongsTo(x + 1, y)
    let indexOfPrevAcrossMirrored
    let indexOfPrevDownMirrored
    let blackSquareDelta = orig ? -1 : 1

    squaresCopy[x][y] = {...squaresCopy[x][y], black: !orig}

    if (this.state.radialSymmetry){
      const mirroredSquareToToggle = {...squaresCopy[14 - x][14 - y]}
      if (mirroredSquareToToggle.black === orig){
        orig ? blackSquareDelta-- : blackSquareDelta++
      }
      squaresCopy[14 - x][14 - y] = {...mirroredSquareToToggle, black: !orig}
      indexOfPrevAcrossMirrored = this.getIndexOfAcrossWordThatLetterBelongsTo(14 - x, 14 - y + 1)
      indexOfPrevDownMirrored = this.getIndexOfDownWordThatLetterBelongsTo(14 - x + 1, 14 - y)
    }

    this.setState({
      squares: squaresCopy,
      numBlackSquares: this.state.numBlackSquares + blackSquareDelta
    }, ()=> {
      this.updateNumbers(() => this.updateWords(() => {
        this.updateClues(indexOfPrevAcross, indexOfPrevDown, this.getIndexOfDownWordThatLetterBelongsTo(x+1, y))
        if (this.state.radialSymmetry){
          this.updateClues(indexOfPrevAcrossMirrored, indexOfPrevDownMirrored, this.getIndexOfDownWordThatLetterBelongsTo(14 - x + 1, 14 - y))
        }
      }))
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
    const callback = () => {
      if (this.state.across){
        document.getElementById('across-clues').scrollTo(document.getElementById(`across-${this.getIndexOfAcrossWordThatLetterBelongsTo(x, y)}`), 1000, {axis: y})
      } else {
        document.getElementById('down-clues').scrollTo(document.getElementById(`down-${this.getIndexOfDownWordThatLetterBelongsTo(x, y)}`), 1000, {axis: y})
      }
    }
    if (!this.state.squares[x][y].black){
      if (this.state.selected.x === x && this.state.selected.y === y){
        this.toggleDirection(callback)
      } else {
        this.setState({
          selected: {x: x, y: y}
        }, callback)
      }
    }
  }

  selectClue = (across, index) => {
    if (across){
      this.setState({
        across: true,
        selected: {x: this.state.acrossWords[index][0].x, y: this.state.acrossWords[index][0].y}
      })
    } else {
      this.setState({
        across: false,
        selected: {x: this.state.downWords[index][0].x, y: this.state.downWords[index][0].y}
      })
    }
  }

  changeClue = (across, index, text) => {
    if (across){
      let acrossClues = this.state.acrossClues
      acrossClues[index] = text
      this.setState({
        acrossClues: acrossClues
      })
    } else {
      let downClues = this.state.downClues
      downClues[index] = text
      this.setState({
        downClues: downClues
      })
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

      squaresCopy[newX][newY] = {...squaresCopy[newX][newY], value: "", correct: null}
      this.setState({
        squares: squaresCopy,
        selected: {x: newX, y: newY}
      }, this.updateWords)

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
      return this.getAcrossWordThatLetterBelongsTo(x, y)
    } else {
      return this.getDownWordThatLetterBelongsTo(x, y)
    }
  }

  getAcrossWordThatLetterBelongsTo = (x, y) => {
    return this.state.acrossWords.find(word => word.filter(letter => letter.x === x && letter.y === y).length === 1)
  }

  getDownWordThatLetterBelongsTo = (x, y) => {
    return this.state.downWords.find(word => word.filter(letter => letter.x === x && letter.y === y).length === 1)
  }

  getNumberOfAcrossWordThatLetterBelongsTo = (x, y) => {
    if (this.state.squares[x][y].black){
      return -1
    } else {
      return this.getAcrossWordThatLetterBelongsTo(x, y)[0].number
    }
  }

  getNumberOfDownWordThatLetterBelongsTo = (x, y) => {
    if (this.state.squares[x][y].black){
      return -1
    } else {
      return this.getDownWordThatLetterBelongsTo(x, y)[0].number
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
    }, () => {if (changeDirection){this.toggleDirection()}})

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
    }, () => {if (changeDirection){this.toggleDirection()}})

  }

  // ---------------------------Save--------------------------------------------

  save = () => {
    const acrossClues = this.state.acrossClues.map((x, index) => {return {text: x, across: true, word: this.state.acrossWords[index]}})
    const downClues = this.state.downClues.map((x, index) => {return {text: x, across: false, word: this.state.downWords[index]}})
    const letters = this.state.squares.map(row => row.map(letter =>
      {return {...letter, across_clue_number: this.getNumberOfAcrossWordThatLetterBelongsTo(letter.x, letter.y), down_clue_number: this.getNumberOfDownWordThatLetterBelongsTo(letter.x, letter.y)}}
    ))

    fetch(API + `/create/${this.props.puzzle.slug}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        across_clues: acrossClues,
        down_clues: downClues,
        letters: letters
      })
    }).then(res => res.json()).then(json => this.setState({
      redirect: `/play/${json.slug}`
    }))
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  //  ------------------------Check and Reveal----------------------------------

  checkSquareFetch = (x, y) => {
    return fetch(API + `/play/${this.props.puzzle.slug}/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        square: this.state.squares[x][y]
      })
    }).then(res => res.json())
  }

  checkSquare = (x, y) => {
    let xToCheck = x
    let yToCheck = y
    const xOrYUndefined = x === undefined || y === undefined

    if ((!xOrYUndefined) || (this.state.selected.x !== null && this.state.selected.y !== null)){
      if (xOrYUndefined){
        xToCheck = this.state.selected.x
        yToCheck = this.state.selected.y
      }

      if (this.state.squares[x][y].value !== ""){
        this.checkSquareFetch(xToCheck, yToCheck).then(json => {
          const letter = json
          let squaresCopy = [...this.state.squares]
          squaresCopy[xToCheck][yToCheck] = {...squaresCopy[xToCheck][yToCheck], correct: letter.value === squaresCopy[xToCheck][yToCheck].value}

          this.setState({
            squares: squaresCopy
          })
        })
      }
    }
  }

  checkWord = () => {
    this.getWordThatLetterBelongsTo(this.state.selected.x, this.state.selected.y).forEach(letter => this.checkSquare(letter.x, letter.y))
  }

  checkGrid = () => {
    this.state.squares.forEach(row => row.forEach(square => this.checkSquare(square.x, square.y)))
  }

  revealSquare = (x, y) => {
    let xToCheck = x
    let yToCheck = y
    const xOrYUndefined = x === undefined || y === undefined

    if ((!xOrYUndefined) || (this.state.selected.x !== null && this.state.selected.y !== null)){
      if (xOrYUndefined){
        xToCheck = this.state.selected.x
        yToCheck = this.state.selected.y
      }

      this.checkSquareFetch(xToCheck, yToCheck).then(json => {
        const letter = json
        let squaresCopy = [...this.state.squares]
        squaresCopy[xToCheck][yToCheck] = {...squaresCopy[xToCheck][yToCheck], value: letter.value, correct: true}

        this.setState({
          squares: squaresCopy
        })
      })
    }
  }

  revealWord = () => {
    this.getWordThatLetterBelongsTo(this.state.selected.x, this.state.selected.y).forEach(letter => this.revealSquare(letter.x, letter.y))
  }

  revealGrid = () => {
    this.state.squares.forEach(row => row.forEach(square => this.revealSquare(square.x, square.y)))
  }



  //  ---------------------------Suggestions------------------------------------

  suggest = () => {
    if (this.state.selected.x !== null){
      const word = this.getWordThatLetterBelongsTo(this.state.selected.x, this.state.selected.y)
      const pattern = word.map(letter => {
        return letter.value === "" ? '-' : letter.value
      }).join('')
      fetch(API + '/create/suggest/' + pattern).then(res => res.json()).then(json => {
        this.setState({
          suggestions: json.words
        })
      })
    } else {
      alert('Please select a word on the grid.')
    }
  }

  toggleSuggest = () => {
    this.setState({
      showSuggestions: !this.state.showSuggestions
    })
  }

  implementSuggestion = (word) => {
    if (this.state.selected.x !== null){
      let squaresCopy = [...this.state.squares]
      const currentWord = this.getWordThatLetterBelongsTo(this.state.selected.x, this.state.selected.y)
      const start = {x: currentWord[0].x, y: currentWord[0].y}
      if (this.state.across){
        for (let i = 0; i < word.length; i++){
          squaresCopy[start.x][start.y + i] = {...squaresCopy[start.x][start.y + i], value: word[i]}
        }
      } else {
        for (let i = 0; i < word.length; i++){
          squaresCopy[start.x + i][start.y] = {...squaresCopy[start.x + i][start.y], value: word[i]}
        }
      }
      this.setState({
        squares: squaresCopy
      }, this.updateWords)
    } else {
      alert('Please select a word on the grid.')
    }
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

    if (!!this.state.redirect){
      return (<Redirect push to={this.state.redirect} />)
    }

    return(
      <div className="flex-container" >
        <div className="tableboard">

          {!this.props.puzzle.clues ?
            <h1><textarea id="title-input" onChange={this.handleTitleChange} value={this.state.title} rows="1"/> </h1>
          : <h1>{this.props.puzzle.title}</h1>
          }

          <div id="table" className="table" tabIndex="0" onKeyDown={this.addLetter}>
            <table>
              <tbody>
                { grid }
              </tbody>
            </table>
          </div>
        </div>

        {!this.props.puzzle.clues ?
          <CreateMenu
            mode={this.state.mode}
            setMode={this.setMode}
            toggleSymmetry={this.toggleSymmetry}
            symmetry={this.state.radialSymmetry}
            clearBoard={this.clearBoard}
            clearBoardData={this.clearBoardData}
            acrossNums={this.state.acrossWords.map(x=>x[0].number)}
            downNums={this.state.downWords.map(x=>x[0].number)}
            acrossClues={this.state.acrossClues}
            downClues={this.state.downClues}
            changeClue={this.changeClue}
            selectClue={this.selectClue}
            save={this.save}
            play={this.props.play}
            suggest={this.suggest}
            toggleSuggest={this.toggleSuggest}
            suggestions={this.state.suggestions}
            showSuggestions={this.state.showSuggestions}
            implementSuggestion={this.implementSuggestion}
            blackWhiteRatio={((this.state.squares.reduce((acc, current) => { return acc + current.filter(x => x.black).length }, 0) / 225) * 100).toFixed(2)}
          />
        :
          <PlayMenu
            clues={this.props.puzzle.clues}
            selectClue={this.selectClue}
            checkSquare={this.checkSquare}
            checkWord={this.checkWord}
            checkGrid={this.checkGrid}
            revealSquare={this.revealSquare}
            revealWord={this.revealWord}
            revealGrid={this.revealGrid}
            play={this.props.play}
          />
        }
      </div>
    )
  }


}

export default Grid
