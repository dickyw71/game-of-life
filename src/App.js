import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GameControls, GameGenerationCounter, GameBoard, BoardControls } from './game-of-life.js';
import * as Board from './board.js'; 

let style  = {
    controls: {
        margin: "20px"
    },
    board: {
        margin: "auto",
        width: "542px",
        height: "542px",
        border: "20px solid #AF876B",
        borderRadius: "20px",
        padding: "1px",
        lineHeight: "0px"
    }
};


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { generation: 1, board: Board.generateRandom(50, 50)}
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
        this.timerId = setInterval(this.newGeneration, 1000/30);    
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
          <h2>
            <a target="_blank" rel="noopener noreferrer" href="https://www.math.cornell.edu/~lipa/mec/lesson6.html">
            Conway's Game of Life
            </a>
          </h2>
        </div>
        <div className="container">
          <GameControls style={style.controls} startGame={this.startGame} stopGame={this.stopGame} clearGame={this.clearGame}/>
          <GameGenerationCounter genCount={this.state.generation}/>
          <GameBoard style={style.board} board={this.state.board} toggleCell={this.toggleCell}/>
          <BoardControls style={style.controls}/>
        </div>
      </div>
    );
  }
}

export default App;
