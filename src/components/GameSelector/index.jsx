import React, { Component } from 'react'
import axios from 'axios'

import {FontAwesomeIcon as Icon} from '@fortawesome/react-fontawesome'
import {faGamepad, faTrophy, faSpinnerThird} from '@fortawesome/pro-solid-svg-icons'
import CreatableSelect from 'react-select/creatable'
import {
  Card,
  CardText,
  CardBody,
  Button,
  CardFooter
} from 'reactstrap'

import Socket from '../../utils/socket'
const socket = new Socket().init

export default class GameSelector extends Component {
  constructor () {
    super()
    this.state = {
      steam: {
        games: [],
        id: '76561197969499388'
      },
      selected: [],
      loading: false,
      spinning: false,
      winner: null
    }
  }

  componentDidMount () {
    socket.on('SpinStart', () => {
      this.setState({
        spinning: true,
        winner: null
      })
    })
    socket.on('SpinEnd', winner => {
      this.setState({
        spinning: false,
        winner
      })
    })
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
    this.setState({ loading: true })
    socket.emit('SetGames', this.state.selected, (res) => {
      const {success} = res
      if (!success) {
        alert("Something went wrong sending the Games list")
      }
      this.setState({ loading: false, spinning: true })
    })
  }

  handleWheelReset = () => {
    socket.emit('ResetWheel', () => {
      this.setState({ loading: false, spinning: false, winner: null })
    })
  }
  render() {
    return (
      <Card>
        <CardBody>
          <CardText>
            <div className="d-flex">
              <div className="flex-grow-1 pr-2">
              {this.state.steam.games.length > 0 ?
                <CreatableSelect
                  isMulti
                  placeholder="Select Games to Include..."
                  options={this.state.steam.games.map(game => ({
                    value: game.name,
                    label: game.name,
                    ...game
                  }))}
                  onChange={this.handleSelectChange}
                /> : <p className="pt-2 mb-0">Loading Steam Library...</p>}
              </div>
              {!this.state.winner ?
                <Button 
                  className="align-self-stretch" 
                  disabled={this.state.loading || this.state.spinning}
                  color="primary" 
                  onClick={this.handleGameEmit}
                  style={{minWidth: 120}}
                >Spin the Wheel!</Button>
                : <Button 
                  className="align-self-stretch" 
                  disabled={this.state.loading}
                  color="secondary" 
                  onClick={this.handleWheelReset}
                  style={{minWidth: 120}}
                >Reset Wheel</Button>}
            </div>
          </CardText>
        </CardBody>
        <CardFooter 
          className="text-muted text-center">
          {this.state.spinning ? 
            <>
              <Icon spin className="mr-1" icon={faSpinnerThird} />
              Spinning the Wheel of Games...
            </> :
            this.state.winner ? 
              <>
                <Icon className="mr-1 text-primary" icon={faTrophy} />
                <strong className="text-primary">{this.state.winner.label}</strong>
                <Icon className="ml-1 text-primary" icon={faTrophy} />
              </> :
              <>
                <Icon className="mr-1" icon={faGamepad} />
                Spin the wheel to pick your next game!
              </>}
        </CardFooter>
      </Card>
    )
  }
}
