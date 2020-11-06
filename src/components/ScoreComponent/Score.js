import React, { Component } from "react";
import ReactDOM from "react-dom";
import GameOutcome from "../../enums/GameState";
import "./Score.css";

class Score extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <span>
        <h4 className="gameText">{this.props.player}</h4>
      </span>
    );
  }
}

export default Score;


