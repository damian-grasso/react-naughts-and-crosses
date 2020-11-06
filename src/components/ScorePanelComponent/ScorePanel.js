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
        <h4 class="gameSubText">{ this.props.gameState }</h4>
      </div>
    );
  }
}

export default ScorePanel;