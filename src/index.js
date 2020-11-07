import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import GameBoard from "./components/GameBoardComponent/GameBoard";
import ScorePanel from "./components/ScorePanelComponent/ScorePanel";
import GameEvent from "./enums/GameEvent";
import SquareState from "./enums/SquareState";
import TurnResult from "./enums/TurnResult";
import GameState from "./enums/GameState";
import "./index.css";

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

    this.changeState = this.changeState.bind(this);
    this.updateBoardState = this.updateBoardState.bind(this);
    this.resetBoardState = this.resetBoardState.bind(this);
    this.checkForWinner = this.checkForWinner.bind(this);
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

    this.setState({ boardState: updatedBoardState });

    console.log("Updated board state ", updatedBoardState);

    return updatedBoardState;
  }

  resetBoardState(boardState) {

    var _ = require('underscore');

    var updatedBoardState = _.map(boardState, function(square) {
      square.value = SquareState.BLANK;
      return square;
    });

    return updatedBoardState;
  }

  updateGameState(gameState, boardState, event) {

    var newGameState = 0;   
    
    switch (event) {
      case GameEvent.TURN_COMPLETED: 
        var result = this.checkForWinner(boardState);

        console.log("Result: ", result);

        if (result == TurnResult.PLAY_ON) {
            if (gameState == GameState.NAUGHTS_TURN) {
              newGameState = GameState.CROSSES_TURN;
            }

            else if (gameState == GameState.CROSSES_TURN) {
              newGameState = GameState.NAUGHTS_TURN;
            }
        }

        else if (result == TurnResult.DRAW) {
            newGameState = GameState.DRAW;
        }

        else if (TurnResult.WIN) {
          if (gameState == GameState.NAUGHTS_TURN) {
            newGameState = GameState.NAUGHTS_WINS;
          }
  
          else if (gameState == GameState.CROSSES_TURN) {
            newGameState = GameState.CROSSES_WINS;
          }
        }

        break;
      
      case GameEvent.RESET:
        newGameState = GameState.NAUGHTS_TURN;
        break;
    }

    this.setState({ gameState: newGameState });

    return newGameState;
  }

  checkForWinner(boardState) {

    var _ = require('underscore');

    console.log("Board state ", boardState, " ", boardState[0]);

    var waysToWin = [

      // vertical ways to win
      [boardState[0], boardState[1], boardState[2]],
      [boardState[3], boardState[4], boardState[5]],
      [boardState[6], boardState[7], boardState[8]],

      // horizotnal ways to win
      [boardState[0], boardState[3], boardState[6]],
      [boardState[1], boardState[4], boardState[7]],
      [boardState[2], boardState[5], boardState[8]],

      // diagonal ways to win
      [boardState[2], boardState[4], boardState[6]],
      [boardState[0], boardState[4], boardState[8]]
    ];

    console.log("Ways to win ", waysToWin);

    var winnerFound = _.some(waysToWin, function(wayToWin) {

      if (wayToWin[0].value == SquareState.NAUGHT && 
          wayToWin[1].value == SquareState.NAUGHT && 
          wayToWin[2].value == SquareState.NAUGHT) {

          return true;
      }

      if (wayToWin[0].value == SquareState.CROSS && 
          wayToWin[1].value == SquareState.CROSS && 
          wayToWin[2].value == SquareState.CROSS) {

          return true;
      }
    });

    console.log("Winner Found: ", winnerFound);

    if (winnerFound == true) return TurnResult.WIN;

    var drawFound = boardState.every(function(currentValue) {
        return currentValue.value != SquareState.BLANK;
    });

    console.log("Draw Found: ", drawFound)

    if (drawFound) return TurnResult.DRAW;

    console.log("Play On");

    return TurnResult.PLAY_ON;
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
      <Container className="container" fluid>
        <Row>
          <Col>
            <h2 className="title center">Naughts And Crosses</h2>
            <GameBoard changeState={this.changeState} gameState={this.state.gameState} boardState={this.state.boardState}/>
          </Col>
        </Row>
        <ScorePanel changeState={this.changeState} gameState={this.state.gameState}/>
        <Row>
          <Col>
              <h4 className="turnAnnouncer">{ this.state.gameState }</h4>
              <Button className="resetButton" variant="danger" size="md" type="button" onClick={() => {
                this.changeState(GameEvent.RESET, -1, -1, SquareState.BLANK);
                }}>
                Reset
              </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("container"));