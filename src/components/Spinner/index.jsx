import React, { Component } from 'react'
import { Wheel } from 'react-custom-roulette'

import Socket from '../../utils/socket'
const socket = new Socket().init

const blankWheel = [{option: "ham"}, {option: "ham"}, {option: "ham"}, {option: "ham"}, {option: "ham"}, {option: "ham"}]
const prideColors = [
'#e40303', 
'#ff8c00', 
'#ffed00', 
'#008026', 
'#004dff', 
'#750787',
'#004dff', 
'#008026', 
'#ffed00', 
'#ff8c00', 
]

export default class Spinner extends Component {
  constructor () {
    super()
    this.state = {
      games: [],
      winner: null
    }
  }

  componentDidMount () {
    socket.on('SetGames', games => {
      this.setState({games: []})
      const winner = Math.floor(Math.random() * Math.floor(games.length))
      this.setState({ games, winner })
      socket.emit('SpinStart')
    })
    socket.on('ResetWheel', () => {
      this.setState({games: [], winner: null}, this.forceUpdate())
    })
  }

  getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  handleStopSpinning = () => {
    socket.emit('SpinEnd', this.state.games[this.state.winner])
  }

  wheelKey = 0

  render () {
    ++this.wheelKey
    return (
      <div className="spinner">
        {this.state.games.length > 0 ?
          <Wheel
            key={this.wheelKey}
            mustStartSpinning
            prizeNumber={this.state.winner} // zero-based
            data={this.state.games.map(game => ({ option: game.label }))}
            backgroundColors={prideColors}
            onStopSpinning={this.handleStopSpinning}
          /> : 
          <Wheel
            prizeNumber={0} // zero-based
            data={blankWheel}
            backgroundColors={prideColors}
            onStopSpinning={this.handleStopSpinning}
          />
          }
      </div>
    )
  }
}
