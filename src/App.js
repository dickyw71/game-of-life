import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GameControls, GameGenerationCounter, GameBoard } from './game-of-life.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { generation: 1 }
    let timerId = 0;

    this.newGeneration = this.newGeneration.bind(this);
    this.startGame = this.startGame.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.clearGame = this.clearGame.bind(this);

  }

  newGeneration() {
    this.setState((prevState) => {
      return {generation: prevState.generation + 1 };
    })
  }


  startGame() {
      if(!this.timerId) {
        this.timerId = setInterval(this.newGeneration, 1000);    
      }
  }

  stopGame() {
    clearInterval(this.timerId);
    this.timerId = 0;
  }

  clearGame() {
    // to-do
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
        <GameBoard genCount={this.state.generation}/>
      </div>
    );
  }
}

export default App;
