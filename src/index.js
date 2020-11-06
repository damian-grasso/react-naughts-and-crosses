import React, { Component } from "react";
import ReactDOM from "react-dom";
import GameBoard from "./components/GameBoardComponent/GameBoard";
import ScorePanel from "./components/ScorePanelComponent/ScorePanel";
import GameEvent from "./enums/GameEvent";
import SquareState from "./enums/SquareState";
import GameState from "./enums/GameState";
import "./index.css";
import PlayerState from "./enums/PlayerState";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      gameState: GameState.NAUGHTS_TURN,
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
      ]
    };

    this.changeState = this.changeState.bind(this)
    this.updateBoardState = this.updateBoardState.bind(this)
    this.resetBoardState = this.resetBoardState.bind(this)
    this.checkForWinner = this.checkForWinner.bind(this)
  }

  updateBoardState(boardState, xCoord, yCoord, newSquareState) {

    var _ = require('underscore');

    console.log("The Square clicked: ", xCoord, ", ", yCoord);

    var updatedBoardState = _.map(boardState, function(square) {

      console.log("Square to evaluate: ", square.x, ", ", square.y);
    
      if (square.x == xCoord && square.y == yCoord) {
        console.log("Square adjusted before ", square);
        square.value = newSquareState;
        console.log("Square adjusted after ", square);
      }

      return square;
    });

    this.setState({ 
      boardState: updatedBoardState 
    });

    console.log("Updated board state ", updatedBoardState);

    return updatedBoardState;
  }

  resetBoardState(boardState) {

    var _ = require('underscore');

    var updatedBoardState = _.map(boardState, function(square) {
      square.value = SquareState.BLANK;
      return square;
    });
    
    this.setState({
      boardState: updatedBoardState
    });

    return updatedBoardState;
  }

  updateGameState(gameState, boardState, event) {

    var newGameState = null;   
    
    switch (event) {
      case GameEvent.TURN_COMPLETED: 
        var winner = this.checkForWinner(boardState);

        if (gameState == GameState.NAUGHTS_TURN) {
          if (!winner) { 
            newGameState = GameState.CROSSES_TURN; 
          }
    
          else { 
            newGameState = GameState.NAUGHTS_WINS; 
          }
        }
    
        else if (gameState == GameState.CROSSES_TURN) {
          if (!winner) { 
            newGameState = GameState.NAUGHTS_TURN; 
          }
    
          else { 
            newGameState = GameState.CROSSES_WINS; 
          }
        }

        break;
      
      case GameEvent.RESET:
        newGameState = GameState.NAUGHTS_TURN;
    }

    this.setState({ gameState: newGameState });

    return newGameState;
  }

  checkForWinner(boardState) {

    var _ = require('underscore');

    console.log("Board state ", boardState, " ", boardState[0]);

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

    console.log("Ways to win ", waysToWin);

    var winner = _.find(waysToWin, function(wayToWin) {
      
      console.log(wayToWin[0].value == SquareState.NAUGHT && wayToWin[1].value == SquareState.NAUGHT && 
        wayToWin[2].value == SquareState.NAUGHT);

      if (wayToWin[0].value == SquareState.NAUGHT && wayToWin[1].value == SquareState.NAUGHT && 
          wayToWin[2].value == SquareState.NAUGHT) {

          return true;
      }

      if (wayToWin[0].value == SquareState.CROSS && wayToWin[1].value == SquareState.CROSS && 
          wayToWin[2].value == SquareState.CROSS) {

            return true;
          }
    });

    console.log(winner);

    if (winner == undefined) {
      winner = false;
    }

    return winner;
  }

  changeState(event, xCoord, yCoord, newSquareState) {

    console.log("State change invoked");

    console.log("Most recent game event is ", event);
    console.log("Most recent game state is ", this.state.gameState)

    if ((this.state.gameState != GameState.NAUGHTS_WINS || this.state.gameState != GameState.CROSSES_WINS) &&
        newSquareState != null) {

      switch(event) {
        case GameEvent.TURN_COMPLETED: 

          console.log("A square was clicked");

          var newBoardState = this.updateBoardState(this.state.boardState, xCoord, yCoord, newSquareState);  
          this.updateGameState(this.state.gameState, newBoardState, GameEvent.TURN_COMPLETED);
          
          break;
        
        case GameEvent.RESET: 

          console.log("The reset button was clicked");

          var newBoardState = this.resetBoardState(this.state.boardState);
          this.updateGameState(this.state.gameState, newBoardState, GameEvent.RESET);

          break;

        }
      }
  }

  render() {
    return (
      <div>
        <GameBoard outcome={this.state.outcome} changeState={this.changeState} gameState={this.state.gameState} boardState={this.state.boardState}/>
        <ScorePanel outcome={this.state.outcome} changeState={this.changeState} gameState={this.state.gameState}/>
        <button type="button" onClick={() => {
          this.changeState(GameEvent.RESET, -1, -1, SquareState.BLANK);
        }}>Reset</button>
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));