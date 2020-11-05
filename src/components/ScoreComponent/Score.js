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
      <div>
        <p>{this.props.player}</p>
      </div>
    );
  }
}

export default Score;


