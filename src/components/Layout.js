import React from 'react'
import { Popup, Checkbox, Label, List, Segment } from 'semantic-ui-react'

class Layout extends React.Component{
  constructor(){
    super()
    this.state = {
      layout: 0
    }
  }

  changeLayout = () => {
    this.setState({
      layout: (this.state.layout + 1) % layouts.length
    }, () => {
      let data = this.props.clearBoardData()
      layouts[this.state.layout].forEach(coord => {
        data[coord.x][coord.y].black = true
      })
      this.props.clearBoard(data)
    })
  }


  render(){
    return (
      <div>
      <Segment inverted>
        Click a square on the grid to change its color.
      </Segment>
      <List divided>
        <List.Item>
          Symmetry   <Checkbox slider onChange={this.props.toggleSymmetry} checked={!!this.props.symmetry}/>
        </List.Item>
        <List.Item>
          Default Layouts
          <Popup
            trigger={<Label id="apply-layout" color='black' horizontal onClick={this.changeLayout}>Apply New</Label>}
            content='Careful! This will erase text currently on the grid.'
          />
        </List.Item>
        <List.Item>
          Stats<br/>
          <Label color='black' horizontal>Black</Label> {this.props.blackWhiteRatio} % <br/>
          <Label horizontal>White</Label> {100 - this.props.blackWhiteRatio} % <br/>
        </List.Item>
      </List>

      </div>
    )
  }
}

const layouts = [
  [{x: 5, y: 0}, {x: 10, y: 0}, {x: 5, y: 1}, {x: 10, y: 1}, {x: 5, y: 2}, {x: 6, y: 3}, {x: 12, y: 3},
    {x: 13, y: 3}, {x: 14, y: 3}, {x: 4, y: 4}, {x: 8, y: 4}, {x: 0, y: 5}, {x: 1, y: 5}, {x: 7, y: 5},
    {x: 3, y: 6}, {x: 10, y: 6}, {x: 3, y: 7}, {x: 11, y: 7}, {x: 4, y: 8}, {x: 11, y: 8}, {x: 7, y: 9},
    {x: 13, y: 9}, {x: 14, y: 9}, {x: 6, y: 10}, {x: 10, y: 10}, {x: 0, y: 11}, {x: 1, y: 11}, {x: 2, y: 11},
    {x: 8, y: 11}, {x: 9, y: 12}, {x: 4, y: 13}, {x: 9, y: 13}, {x: 4, y: 14}, {x: 9, y: 14}],

  [{x: 4, y: 0}, {x: 10, y: 0}, {x: 4, y: 1}, {x: 10, y: 1}, {x: 4, y: 2}, {x: 10, y: 2}, {x: 6, y: 3},
    {x: 10, y: 3}, {x: 0, y: 4}, {x: 1, y: 4}, {x: 2, y: 4}, {x: 6, y: 4}, {x: 12, y: 4}, {x: 13, y: 4},
    {x: 14, y: 4}, {x: 8, y: 5}, {x: 4, y: 6}, {x: 9, y: 6}, {x: 4, y: 7}, {x: 10, y: 7}, {x: 5, y: 8},
    {x: 10, y: 8}, {x: 6, y: 9}, {x: 0, y: 10}, {x: 1, y: 10}, {x: 2, y: 10}, {x: 8, y: 10}, {x: 12, y: 10},
    {x: 13, y: 10}, {x: 14, y: 10}, {x: 4, y: 11}, {x: 8, y: 11}, {x: 4, y: 12}, {x: 10, y: 12}, {x: 4, y: 13},
    {x: 10, y: 13}, {x: 4, y: 14}, {x: 10, y: 14}],

  [{x: 4, y: 0}, {x: 10, y: 0}, {x: 4, y: 1}, {x: 10, y: 1}, {x: 4, y: 2}, {x: 10, y: 2}, {x: 5, y: 3},
    {x: 0, y: 4}, {x: 1, y: 4}, {x: 7, y: 4}, {x: 12, y: 4}, {x: 13, y: 4}, {x: 14, y: 4}, {x: 7, y: 5},
    {x: 3, y: 6}, {x: 8, y: 6}, {x: 4, y: 7}, {x: 10, y: 7}, {x: 6, y: 8}, {x: 11, y: 8}, {x: 7, y: 9},
    {x: 0, y: 10}, {x: 1, y: 10}, {x: 2, y: 10}, {x: 7, y: 10}, {x: 13, y: 10}, {x: 14, y: 10}, {x: 9, y: 11},
    {x: 4, y: 12}, {x: 10, y: 12}, {x: 4, y: 13}, {x: 10, y: 13}, {x: 4, y: 14}, {x: 10, y: 14}],

  [{x: 4, y: 0}, {x: 8, y: 0}, {x: 9, y: 0}, {x: 4, y: 1}, {x: 9, y: 1}, {x: 4, y: 2}, {x: 9, y: 2},
    {x: 4, y: 3}, {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 7, y: 4}, {x: 11, y: 4}, {x: 0, y: 5},
    {x: 1, y: 5}, {x: 6, y: 5}, {x: 3, y: 6}, {x: 9, y: 6}, {x: 4, y: 7}, {x: 10, y: 7}, {x: 5, y: 8},
    {x: 11, y: 8}, {x: 8, y: 9}, {x: 13, y: 9}, {x: 14, y: 9}, {x: 3, y: 10}, {x: 7, y: 10}, {x: 0, y: 11},
    {x: 1, y: 11}, {x: 2, y: 11}, {x: 10, y: 11}, {x: 5, y: 12}, {x: 10, y: 12}, {x: 5, y: 13}, {x: 10, y: 13},
    {x: 5, y: 14}, {x: 6, y: 14}, {x: 10, y: 14}],

  [{x: 7, y: 0}, {x: 7, y: 1}, {x: 7, y: 2}, {x: 3, y: 3}, {x: 11, y: 3}, {x: 4, y: 4}, {x: 10, y: 4},
    {x: 5, y: 5}, {x: 9, y: 5}, {x: 0, y: 6}, {x: 14, y: 6}, {x: 0, y: 7}, {x: 1, y: 7}, {x: 2, y: 7},
    {x: 7, y: 7}, {x: 12, y: 7}, {x: 13, y: 7}, {x: 14, y: 7}, {x: 0, y: 8}, {x: 14, y: 8}, {x: 5, y: 9},
    {x: 9, y: 9}, {x: 4, y: 10}, {x: 10, y: 10}, {x: 3, y: 11}, {x: 11, y: 11}, {x: 7, y: 12}, {x: 7, y: 13},
    {x: 7, y: 14}],

  [{x: 4, y: 0}, {x: 9, y: 0}, {x: 4, y: 1}, {x: 9, y: 1}, {x: 9, y: 2}, {x: 3, y: 3}, {x: 8, y: 3},
    {x: 12, y: 3}, {x: 13, y: 3}, {x: 14, y: 3}, {x: 6, y: 4}, {x: 0, y: 5}, {x: 1, y: 5}, {x: 6, y: 5},
    {x: 11, y: 5}, {x: 5, y: 6}, {x: 11, y: 6}, {x: 5, y: 7}, {x: 9, y: 7}, {x: 3, y: 8}, {x: 9, y: 8},
    {x: 3, y: 9}, {x: 8, y: 9}, {x: 13, y: 9}, {x: 14, y: 9}, {x: 8, y: 10}, {x: 0, y: 11}, {x: 1, y: 11},
    {x: 2, y: 11}, {x: 6, y: 11}, {x: 11, y: 11}, {x: 5, y: 12}, {x: 5, y: 13}, {x: 10, y: 13}, {x: 5, y: 14},
    {x: 10, y: 14}],

    // poop
  [{x: 10, y: 0}, {x: 11, y: 0}, {x: 9, y: 1}, {x: 12, y: 1}, {x: 6, y: 2}, {x: 7, y: 2}, {x: 8, y: 2},
    {x: 13, y: 2}, {x: 5, y: 3}, {x: 8, y: 3}, {x: 9, y: 3}, {x: 13, y: 3}, {x: 4, y: 4}, {x: 5, y: 4},
    {x: 9, y: 4}, {x: 14, y: 4}, {x: 2, y: 5}, {x: 3, y: 5}, {x: 5, y: 5}, {x: 6, y: 5}, {x: 9, y: 5},
    {x: 10, y: 5}, {x: 14, y: 5}, {x: 0, y: 6}, {x: 1, y: 6}, {x: 6, y: 6}, {x: 10, y: 6}, {x: 14, y: 6},
    {x: 1, y: 7}, {x: 2, y: 7}, {x: 6, y: 7}, {x: 10, y: 7}, {x: 14, y: 7}, {x: 2, y: 8}, {x: 6, y: 8},
    {x: 10, y: 8}, {x: 14, y: 8}, {x: 2, y: 9}, {x: 3, y: 9}, {x: 5, y: 9}, {x: 10, y: 9}, {x: 14, y: 9},
    {x: 4, y: 10}, {x: 9, y: 10}, {x: 14, y: 10}, {x: 4, y: 11}, {x: 5, y: 11}, {x: 8, y: 11}, {x: 13, y: 11},
    {x: 5, y: 12}, {x: 6, y: 12}, {x: 7, y: 12}, {x: 13, y: 12}, {x: 7, y: 13}, {x: 8, y: 13}, {x: 12, y: 13},
    {x: 9, y: 14}, {x: 10, y: 14}, {x: 11, y: 14}],

    // also poop
  [{x: 11, y: 1}, {x: 12, y: 1}, {x: 9, y: 2}, {x: 10, y: 2}, {x: 11, y: 2}, {x: 12, y: 2}, {x: 13, y: 2},
    {x: 6, y: 3}, {x: 7, y: 3}, {x: 8, y: 3}, {x: 9, y: 3}, {x: 10, y: 3}, {x: 11, y: 3}, {x: 12, y: 3},
    {x: 13, y: 3}, {x: 5, y: 4}, {x: 6, y: 4}, {x: 9, y: 4}, {x: 10, y: 4}, {x: 11, y: 4}, {x: 12, y: 4},
    {x: 13, y: 4}, {x: 1, y: 5}, {x: 3, y: 5}, {x: 4, y: 5}, {x: 5, y: 5}, {x: 7, y: 5}, {x: 8, y: 5},
    {x: 10, y: 5}, {x: 12, y: 5}, {x: 13, y: 5}, {x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6}, {x: 4, y: 6},
    {x: 5, y: 6}, {x: 6, y: 6}, {x: 9, y: 6}, {x: 10, y: 6}, {x: 13, y: 6}, {x: 1, y: 7}, {x: 2, y: 7},
    {x: 3, y: 7}, {x: 4, y: 7}, {x: 5, y: 7}, {x: 6, y: 7}, {x: 7, y: 7}, {x: 8, y: 7}, {x: 9, y: 7},
    {x: 10, y: 7}, {x: 13, y: 7}, {x: 2, y: 8}, {x: 3, y: 8}, {x: 4, y: 8}, {x: 5, y: 8}, {x: 6, y: 8},
    {x: 9, y: 8}, {x: 10, y: 8}, {x: 13, y: 8}, {x: 3, y: 9}, {x: 4, y: 9}, {x: 5, y: 9}, {x: 7, y: 9},
    {x: 8, y: 9}, {x: 10, y: 9}, {x: 12, y: 9}, {x: 13, y: 9}, {x: 5, y: 10}, {x: 6, y: 10}, {x: 9, y: 10},
    {x: 10, y: 10}, {x: 11, y: 10}, {x: 12, y: 10}, {x: 13, y: 10}, {x: 6, y: 11}, {x: 7, y: 11}, {x: 8, y: 11},
    {x: 9, y: 11}, {x: 10, y: 11}, {x: 11, y: 11}, {x: 12, y: 11}, {x: 13, y: 11}, {x: 10, y: 12}, {x: 11, y: 12},
    {x: 12, y: 12}, {x: 13, y: 12}, {x: 11, y: 13}, {x: 12, y: 13}]
]


export default Layout
