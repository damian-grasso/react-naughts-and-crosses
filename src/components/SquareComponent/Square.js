import React, { Component } from "react";
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
      <td className="square" onClick={() => { 

        console.log("Complete ", this.props.gameState);

        var newSquareState = null;

        if (this.state.squareState == SquareState.BLANK) {

          if (this.props.gameState == GameState.NAUGHTS_TURN) {
            newSquareState = SquareState.NAUGHT;
          }

          else if (this.props.gameState == GameState.CROSSES_TURN) { 
            newSquareState = SquareState.CROSS;
          }

          this.setState({ squareState: newSquareState }); 

          this.props.changeState(GameEvent.TURN_COMPLETED, this.props.x, this.props.y, newSquareState);
        }
      }}>
        <h3 className="square-value">{this.state.squareState}</h3>
      </td>
    );
  }
}

export default Square;

//<p>{ this.props.x }</p>
//<p>{ this.props.y }</p>
