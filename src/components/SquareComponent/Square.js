import React, { Component } from "react";
import GameEvent from "../../enums/GameEvent";
import GameState from "../../enums/GameState";
import SquareState from "../../enums/SquareState";
import "./Square.css";

class Square extends React.Component {
  constructor() {
    super();

  }

  render() {

    return (
      <td className="square" onClick={() => {

        var newSquareState = null;

        if (this.props.squareState == SquareState.BLANK) {
          if (this.props.gameState == GameState.NAUGHTS_TURN) { newSquareState = SquareState.NAUGHT; }
          else if (this.props.gameState == GameState.CROSSES_TURN) { newSquareState = SquareState.CROSS; }
        }

        console.log(this.props.x, this.props.y, newSquareState);
        console.log(this.props.squareState);

        this.props.changeState(GameEvent.TURN_COMPLETED, this.props.x, this.props.y, newSquareState);

        console.log(this.props.squareState);
      }}>
        <h3 className="square-value" key={this.props.squareState}>{this.props.squareState}</h3>
      </td>
    );
  }
}

export default Square;

//<p>{ this.props.x }</p>
//<p>{ this.props.y }</p>
