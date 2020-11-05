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
          { x: 0, y: 0, value: SquareState.BLANK },
          { x: 0, y: 1, value: SquareState.BLANK },
          { x: 0, y: 2, value: SquareState.BLANK },
          { x: 1, y: 0, value: SquareState.BLANK },
          { x: 1, y: 1, value: SquareState.BLANK },
          { x: 1, y: 2, value: SquareState.BLANK },
          { x: 2, y: 0, value: SquareState.BLANK },
          { x: 2, y: 1, value: SquareState.BLANK },
          { x: 2, y: 2, value: SquareState.BLANK }
      ],
      winner: false
    };

    this.changeState = this.changeState.bind(this)
    this.updateBoardState = this.updateBoardState.bind(this)
    this.checkForWinner = this.checkForWinner.bind(this)
  }

  updateBoardState(boardState, xCoord, yCoord, newSquareState) {

    var _ = require('underscore');

    var updatedBoardState = _.map(boardState, function(square) {
      if (square.x == xCoord && square.y == yCoord) {
        square.value = newSquareState;
      }

      return square;
    });

    console.log("Updated board state", updatedBoardState);

    this.setState({ boardState: updatedBoardState });
  }

  checkForWinner(boardState, newSquareState) {

    var _ = require('underscore');

    var waysToWin = [

      // vertical wins
      [boardState[0], boardState[1], boardState[2]],
      [boardState[3], boardState[4], boardState[5]],
      [boardState[6], boardState[7], boardState[8]],

      // horiztonal wins
      [boardState[0], boardState[3], boardState[6]],
      [boardState[1], boardState[4], boardState[7]],
      [boardState[2], boardState[5], boardState[8]],

      // diagona wins
      [boardState[2], boardState[4], boardState[6]],
      [boardState[0], boardState[4], boardState[8]]
    ];

    var winner = _.find(waysToWin, function(wayToWin) {
      
      if (wayToWin[0].value == newSquareState && 
          wayToWin[1].value == newSquareState && 
          wayToWin[2].value == newSquareState) {
            
          console.log(wayToWin[0].value, wayToWin[1].value, wayToWin[2].value);

          return true;
        }
    });

    if (winner == undefined) {
      return false;
    }

    return true;
  }

  changeState(event, xCoord, yCoord, newSquareState) {



    console.log("Square was clicked during game");

    if (this.state.gameState != GameState.NAUGHTS_WINS || this.state.gameState != GameState.CROSSES_WINS) {

      this.updateBoardState(this.state.boardState, xCoord, yCoord, newSquareState);

      var newGameState = null;
      var winner = this.checkForWinner(this.state.boardState, newSquareState);

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
    }

    console.log("Game state is now", newGameState)
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