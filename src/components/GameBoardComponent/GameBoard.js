import React, { Component } from "react";
import Square from "../SquareComponent/Square";

class GameBoard extends React.Component {
  constructor() {
    super();

  }

  render() {
    return (
      <table className="container w-50">
        <tbody>
          <tr className="tableRow">
            <Square x={ this.props.boardState[0].x } y={ this.props.boardState[0].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[0].value} />
            <Square x={ this.props.boardState[1].x } y={ this.props.boardState[1].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[1].value} />
            <Square x={ this.props.boardState[2].x } y={ this.props.boardState[2].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[2].value} />
          </tr>
          <tr className="tableRow">
            <Square x={ this.props.boardState[3].x } y={ this.props.boardState[3].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[3].value} />
            <Square x={ this.props.boardState[4].x } y={ this.props.boardState[4].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[4].value} />
            <Square x={ this.props.boardState[5].x } y={ this.props.boardState[5].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[5].value} />
          </tr>
          <tr className="tableRow">
            <Square x={ this.props.boardState[6].x } y={ this.props.boardState[6].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[6].value} />
            <Square x={ this.props.boardState[7].x } y={ this.props.boardState[7].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[7].value} />
            <Square x={ this.props.boardState[8].x } y={ this.props.boardState[8].y } changeState={this.props.changeState} gameState={this.props.gameState} squareState={this.props.boardState[8].value} />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default GameBoard;