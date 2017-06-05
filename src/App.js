import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { GameControls, GameGenerationCounter, GameBoard } from './game-of-life.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Conway's Game of Life</h2>
        </div>
        <GameControls />
        <GameGenerationCounter />
        <GameBoard />
      </div>
    );
  }
}

export default App;
