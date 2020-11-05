import React, { Component } from "react";
import ReactDOM from "react-dom";
import GameBoard from "./components/GameBoardComponent/GameBoard";
import ScorePanel from "./components/ScorePanelComponent/ScorePanel";
import GameEvent from "./enums/GameEvent";
import SquareState from "./enums/SquareState";
import GameState from "./enums/GameState";
import "./index.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      gameState: GameState.NAUGHTS_TURN,
      freeSquares: 9,
      boardState: [
        [0, 0, SquareState.BLANK],
        [0, 1, SquareState.BLANK],
        [0, 2, SquareState.BLANK],
        [1, 0, SquareState.BLANK],
        [1, 1, SquareState.BLANK],
        [1, 2, SquareState.BLANK],
        [2, 0, SquareState.BLANK],
        [2, 1, SquareState.BLANK],
        [2, 2, SquareState.BLANK]
      ],
      waysToWin: [
        [ [0, 0], [1, 0], [2, 0] ],
        [ [0, 1], [1, 1], [2, 1] ],
        [ [0, 2], [1, 2], [2, 2] ],
        [ [0, 0], [0, 1], [0, 2] ],
        [ [1, 0], [1, 1], [1, 2] ],
        [ [2, 0], [2, 1], [2, 2] ],
        [ [2, 0], [1, 1], [0, 2] ],
        [ [0, 0], [1, 1], [2, 2] ]
      ],
      winner: false
    };

    this.changeState = this.changeState.bind(this)

    //board history to be added later
  }

  changeState(event, x, y) {

    //process updates

    console.log("Square was clicked");

    var winner = false;
    var newGameState = null;

    console.log("Most recent game event is ", event);
    console.log("Most recent game state is ", this.state.gameState)
    console.log("Winner value is ", winner);

    if (event == GameEvent.TURN_COMPLETED && this.state.gameState == GameState.NAUGHTS_TURN) {
      if (!winner) { newGameState = GameState.CROSSES_TURN; }
      else { newGameState = GameState.NAUGHTS_WINS; }
    }

    else if (event == GameEvent.TURN_COMPLETED && this.state.gameState == GameState.CROSSES_TURN) {
      if (!winner) { newGameState = GameState.NAUGHTS_TURN; }
      else { newGameState = GameState.CROSSES_WINS; }
    }

    this.setState({ gameState: newGameState });

    console.log("Game state is now", newGameState)
  }

  winnerFound() {

    var winnerFound = false;
    // check if any winning moves exist

    return winnerFound;
  }

  render() {
    return (
      <div>
        <GameBoard outcome={this.state.outcome} changeState={this.changeState} gameState={this.state.gameState} boardState={this.state.boardState}/>
        <ScorePanel outcome={this.state.outcome} changeState={this.changeState} gameState={this.state.gameState}/>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));