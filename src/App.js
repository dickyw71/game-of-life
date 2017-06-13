import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GameControls, GameGenerationCounter, GameBoard, BoardControls } from './game-of-life.js';
import * as Board from './board.js'; 

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { generation: 1, board: Board.generateRandom()}
    this.timerId = 0;

    this.newGeneration = this.newGeneration.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.toggleCell = this.toggleCell.bind(this);

  }

  newGeneration() {
    this.setState((prevState) => {
      return {
        generation: prevState.generation + 1, 
        board: prevState.board.map(Board.nextGeneration) 
      };
    })
  }


  startGame() {
      if(!this.timerId) {
        this.timerId = setInterval(this.newGeneration, 200);    
      }
  }

  stopGame() {
    clearInterval(this.timerId);
    this.timerId = 0;
  }

  clearGame() {
    this.stopGame();
    this.setState((prevState) => {
      return {generation: 0, board: prevState.board.map(Board.clear) }
    });    
  }

  toggleCell(cell) {
   // find cell in board and update
   let delta = this.state.board;
   delta[cell.y][cell.x].isAlive ? delta[cell.y][cell.x].isAlive = false : delta[cell.y][cell.x].isAlive = true;
   this.setState({ board: delta});
  }

 componentDidMount() {
    this.startGame();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Conway's Game of Life</h2>
        </div>
        <GameControls startGame={this.startGame} stopGame={this.stopGame} clearGame={this.clearGame}/>
        <GameGenerationCounter genCount={this.state.generation}/>
        <GameBoard genCount={this.state.generation} board={this.state.board} toggleCell={this.toggleCell}/>
        <BoardControls />
      </div>
    );
  }
}

export default App;
