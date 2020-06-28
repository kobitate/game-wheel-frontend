import React, { Component } from 'react'
import CreatableSelect from 'react-select/creatable'
import axios from 'axios'

import Socket from '../../utils/socket'
const socket = new Socket().init

export default class Admin extends Component {
  constructor () {
    super()
    this.state = {
      steam: {
        games: [],
        id: '76561198074090130'
      },
      selected: []
    }
  }

  componentDidMount () {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/games/${this.state.steam.id}`).then(data => {
      this.setState({
        steam: {
          ...this.state.steam,
          games: data.data
        }
      })
    })
  }

  handleSelectChange = (selected) => {
    this.setState({ selected })
  }

  handleGameEmit = () => {
    socket.emit('SetGames', this.state.selected)
  }

  render () {
    return (
      <p>
        {this.state.steam.games.length > 0 &&
          <CreatableSelect
            isMulti
            options={this.state.steam.games.map(game => ({
              value: game.name,
              label: game.name,
              ...game
            }))}
            onChange={this.handleSelectChange}
          />}
        <button onClick={this.handleGameEmit}>Spin the Wheel!</button>
      </p>
    )
  }
}
