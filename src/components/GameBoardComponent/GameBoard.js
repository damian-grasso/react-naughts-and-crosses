import React, { Component } from "react";
import ReactDOM from "react-dom";
import GameState from "../../enums/GameState";
import SquareState from "../../enums/SquareState";
import Square from "../SquareComponent/Square";

class GameBoard extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="grid-container">
          <Square x={ this.props.boardState[0][0] } y={ this.props.boardState[0][1] } changeState={this.props.changeState} gameState={this.props.gameState} />
          <Square x={ this.props.boardState[1][0] } y={ this.props.boardState[1][1] } changeState={this.props.changeState} gameState={this.props.gameState}/>
          <Square x={ this.props.boardState[2][0] } y={ this.props.boardState[2][1] } changeState={this.props.changeState} gameState={this.props.gameState}/>
          <Square x={ this.props.boardState[3][0] } y={ this.props.boardState[3][1] } changeState={this.props.changeState} gameState={this.props.gameState}/>
          <Square x={ this.props.boardState[4][0] } y={ this.props.boardState[4][1] } changeState={this.props.changeState} gameState={this.props.gameState}/>
          <Square x={ this.props.boardState[5][0] } y={ this.props.boardState[5][1] } changeState={this.props.changeState} gameState={this.props.gameState}/>
          <Square x={ this.props.boardState[6][0] } y={ this.props.boardState[6][1] } changeState={this.props.changeState} gameState={this.props.gameState}/>
          <Square x={ this.props.boardState[7][0] } y={ this.props.boardState[7][1] } changeState={this.props.changeState} gameState={this.props.gameState}/>
          <Square x={ this.props.boardState[8][0] } y={ this.props.boardState[8][1] } changeState={this.props.changeState} gameState={this.props.gameState}/>
      </div>
    );
  }
}

export default GameBoard;