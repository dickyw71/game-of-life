import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GameGenerationControls, GameBoard, GameBoardControls } from './game-of-life.js';
import * as Board from './board.js'; 

let style  = {
    controls: {
        margin: "0px auto 0px auto",
        width: "500px",
        background: "#AF876B",
        padding: "4px"
    },
    board: {
        margin: "auto",
        width: "542px",
        height: "342px",
        border: "20px solid #AF876B",
        borderRadius: "20px",
        padding: "1px",
        lineHeight: "0px"
    }
};


class App extends Component {
  constructor(props) {
    super(props)
    this.state = { generation: 1, board: Board.generateRandom(50, 30)}
    this.timerId = 0;

    this.newGeneration = this.newGeneration.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.clearGame = this.clearGame.bind(this);
    this.toggleCell = this.toggleCell.bind(this);
    this.smallBoard = this.smallBoard.bind(this);
    this.mediumBoard = this.mediumBoard.bind(this);
    this.largeBoard = this.largeBoard.bind(this);
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

  smallBoard() {
    //  clear game
    this.clearGame();
    // clone board style
    let boardStyle = Object.assign({}, style.board);
    style.board = boardStyle;
    style.board.height = "242px";
    style.board.width = "342px";
    this.state = { generation: 1, board: Board.generateRandom(30, 20)}    
  }

  mediumBoard() {
    //  clear game
    this.clearGame();
    // clone board style
    let boardStyle = Object.assign({}, style.board);
    style.board = boardStyle;
    style.board.height = "342px";
    style.board.width = "542px";
    this.state = { generation: 1, board: Board.generateRandom(50, 30)}    
  }

  largeBoard() {
    //  clear game
    this.clearGame();
    // clone board style
    let boardStyle = Object.assign({}, style.board);
    style.board = boardStyle;
    style.board.height = "542px";
    style.board.width = "842px";
    this.state = { generation: 1, board: Board.generateRandom(80, 50)}        
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
        <div className="game container">
          <GameGenerationControls 
            className="game-generation-controls"
            style={style.controls}
            genCount={this.state.generation}
            startGame={this.startGame} 
            stopGame={this.stopGame} 
            clearGame={this.clearGame}
          />
          <GameBoard 
            className="game-board"
            style={style.board} 
            board={this.state.board} 
            toggleCell={this.toggleCell}
          />
          <GameBoardControls
            className="game-board-controls"
            style={style.controls} 
            smallBoard={this.smallBoard} 
            mediumBoard={this.mediumBoard} 
            largeBoard={this.largeBoard}
          />
        </div>
      </div>
    );
  }
}

export default App;
