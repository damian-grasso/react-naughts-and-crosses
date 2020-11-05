import React, { Component } from "react";
import ReactDOM from "react-dom";
import GameEvent from "../../enums/GameEvent";
import GameState from "../../enums/GameState";
import SquareState from "../../enums/SquareState";
import "./Square.css";

class Square extends React.Component {
  constructor() {
    super();

    this.state = {
      squareState: SquareState.BLANK
    };
  }

  render() {

    return (
      <div className="square" onClick={() => { 
        
        console.log(this.props.gameState);

        if (this.props.gameState == GameState.NAUGHTS_TURN) { this.setState({ squareState: SquareState.NAUGHT }); }
        else if (this.props.gameState == GameState.CROSSES_TURN) { this.setState({ squareState: SquareState.CROSS }); }

        this.props.changeState(GameEvent.TURN_COMPLETED, this.props.x, this.props.y) 
      }}>
        <h3 className="square-value">{this.state.squareState}</h3>
      </div>
    );
  }
}

export default Square;

//<p>{ this.props.x }</p>
//<p>{ this.props.y }</p>
