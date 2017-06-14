import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap'

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
    },
    cell: {
        width: "100px",
        height: "100px",
        background: "#000",
        border: "1px solid #555",
        display: "inline-block"
    },
    mature: {
        background: "#f00"
    },
    infant: {
        background: "#fe0"
    }
}
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
            <div style={style.controls}>
                <ButtonGroup>
                    <Button bsStyle="primary" onClick={this.start}>Run</Button>
                    <Button bsStyle="primary" onClick={this.stop}>Pause</Button>
                    <Button bsStyle="warning" onClick={this.clear}>Clear</Button>
                </ButtonGroup>
            </div>    
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
            <div style={style.board}>
                {gridOfCells}
            </div>    
        )
    }
}

class GameCell extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        // do something
        // toggle cell state
        this.props.toggleCell(this.props.cell);
    }

    render() {
        if(this.props.cell.isAlive) {
            style.cell.background = style.infant.background;
        }
        else {
            style.cell.background = "#000";
        }

        return (
            <div 
                style={style.cell} 
                onClick={this.toggle}
            >
            </div>    
        )
    }
}

class BoardControls extends Component {
    render() {
        return (
            <div style={style.controls}>
                <ButtonGroup>
                    <Button bsStyle="default" onClick={this.small}>Small</Button>
                    <Button bsStyle="default" onClick={this.medium}>Medium</Button>
                    <Button bsStyle="default" onClick={this.large}>Large</Button>
                </ButtonGroup>
            </div>    
        )
    }    
}

export { GameControls, GameGenerationCounter, GameBoard, BoardControls };