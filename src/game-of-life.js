import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap'

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
                <Button bsStyle="primary" onClick={this.start}>Run</Button>
                <Button bsStyle="primary" onClick={this.stop}>Pause</Button>
                <Button bsStyle="warning" onClick={this.clear}>Clear</Button>
            </ButtonGroup>   
        )
    }
}

class GameGenerationCounter extends Component {
    render() {
        return <h3>Generation: {this.props.genCount || 0}</h3>
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

        this.state = { isAlive: this.props.cell.isAlive };
        this.toggle = this.toggle.bind(this);
        this.style = {
            cell: {
                width: "10px",
                height: "10px",
                background: "#000",
                border: "1px solid #555",
                display: "inline-block"
            },
            infant: {
                background: "#fe0"
            }
        };
    }

    toggle() {
        // do something
        // toggle cell state
        this.props.toggleCell(this.props.cell);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.cell.isAlive !== this.state.isAlive) {
            this.setState({ isAlive: nextProps.cell.isAlive });
        }
    }

    render() {
        if(this.state.isAlive) {
            this.style.cell.background = this.style.infant.background;
        }
        else {
            this.style.cell.background = "#000";
        }

        return (
            <div 
                style={this.style.cell} 
                onClick={this.toggle}
            >
            </div>    
        )
    }
}

class BoardControls extends Component {
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