import React, { Component } from 'react'
import { Wheel } from 'react-custom-roulette'

import Socket from '../../utils/socket'
const socket = new Socket().init

export default class Spinner extends Component {
  constructor () {
    super()
    this.state = {
      games: [],
      winner: 0
    }
  }

  componentDidMount () {
    socket.on('SetGames', games => {
      console.log(games)
      const winner = this.getRandomInt(this.state.games.length)
      this.setState({ games, winner })
    })
  }

  getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  render () {
    return (
      <>
        {this.state.games.length > 0 &&
          <Wheel
            mustStartSpinning
            prizeNumber={this.state.winner} // zero-based
            data={this.state.games.map(game => ({ option: game.label }))}
            backgroundColors={['#7a80ff', '#511c92']}
          />}
      </>
    )
  }
}
