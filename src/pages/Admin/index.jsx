import React, { Component } from 'react'
import {
  Container,
  Row,
  Col
} from 'reactstrap'

import GameSelector from '../../components/GameSelector'

export default class Admin extends Component {
  render () {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Hamstream Overlay Admin</h1>
            <GameSelector />
          </Col>
        </Row>
      </Container>
    )
  }
}
