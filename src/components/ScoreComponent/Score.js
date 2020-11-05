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
        <p>{this.props.player}</p>
      </span>
    );
  }
}

export default Score;


