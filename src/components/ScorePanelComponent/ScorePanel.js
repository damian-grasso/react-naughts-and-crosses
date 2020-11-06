import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlayerState from "../../enums/PlayerState";
import "./ScorePanel.css";
import Score from "../ScoreComponent/Score";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ScorePanel extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <Row>
        <Col>
          <Score player={ PlayerState.NAUGHTS_PLAYER } />
        </Col>
        <Col>
          <Score player={ PlayerState.CROSSES_PLAYER } />
        </Col>
      </Row>
    );
  }
}

export default ScorePanel;