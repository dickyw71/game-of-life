import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import './game-of-life.css';

class GameControls extends Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.clear = this.clear.bind(this);
    }

    start() {
        this.props.startGame();
    }

    stop() {
        this.props.stopGame();
    }

    clear() {
        this.props.clearGame();
    }

    render() {
        return (
            <ButtonGroup style={this.props.style}>
                <Button bsStyle="primary" onClick={this.start}><i className="fa fa-play" aria-hidden="true"></i></Button>
                <Button bsStyle="primary" onClick={this.stop}><i className="fa fa-pause" aria-hidden="true"></i></Button>
                <Button bsStyle="warning" onClick={this.clear}>Clear</Button>
            </ButtonGroup>   
        )
    }
}

class GameGenerationCounter extends Component {
    render() {
        return <h4>Generation: {this.props.genCount || 0}</h4>
    }
}

class GameBoard extends Component {

    render() {
        // generate board components
        let gridOfCells = this.props.board.map( (rowOfCells) => {
            return rowOfCells.map((cell) => {
                return <GameCell cell={cell} toggleCell={this.props.toggleCell}/>
            })
        })

        return (
            <div style={this.props.style}>
                {gridOfCells}   
            </div>
        )
    }
}

class GameCell extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isAlive: this.props.cell.isAlive, 
            class: this.props.cell.isAlive ? "cell infant" : "cell" };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
         // toggle cell state
        this.props.toggleCell(this.props.cell);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.cell.isAlive !== this.state.isAlive) {
            this.setState({   
                    isAlive: nextProps.cell.isAlive, 
                    class: nextProps.cell.isAlive ? "cell infant" : "cell" 
                });
        }
        else {
            if(this.state.class === "cell infant") {
                this.setState({
                    isAlive: nextProps.cell.isAlive, 
                    class: "cell mature"                
                })
            }
        }
    }

    render() {
        return (
            <div 
                className={this.state.class} 
                onClick={this.toggle}
            >
            </div>    
        )
    }
}

class BoardControls extends Component {
    constructor(props) {
        super(props);

        this.small = this.small.bind(this);
        this.medium = this.medium.bind(this);
        this.large = this.large.bind(this);
    }
    small() {
        this.props.smallBoard();
    }

    medium() {
        this.props.mediumBoard();
    }

    large() {
        this.props.largeBoard();
    }
    
    render() {
        return (
            <ButtonGroup style={this.props.style}>
                <Button bsStyle="default" onClick={this.small}>Small</Button>
                <Button bsStyle="default" onClick={this.medium}>Medium</Button>
                <Button bsStyle="default" onClick={this.large}>Large</Button>
            </ButtonGroup> 
        )
    }    
}

export { GameControls, GameGenerationCounter, GameBoard, BoardControls };