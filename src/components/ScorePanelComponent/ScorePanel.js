import React, { Component } from "react";
import ReactDOM from "react-dom";
import PlayerState from "../../enums/PlayerState";
import "./ScorePanel.css";
import Score from "../ScoreComponent/Score";

class ScorePanel extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <Score player={ PlayerState.NAUGHTS_PLAYER } />
        <Score player={ PlayerState.CROSSES_PLAYER } />
        <p>{ this.props.gameState }</p>
      </div>
    );
  }
}

export default ScorePanel;