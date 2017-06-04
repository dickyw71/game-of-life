import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap'
import * as Board from './board.js'; 

let style  = {
    controls: {
        margin: "20px"
    },
    board: {
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
    render() {
        return (
            <div style={style.controls}>
                <ButtonGroup>
                    <Button bsStyle="primary" onClick={this.props.start}>Start</Button>
                    <Button bsStyle="primary" onClick={this.props.stop}>Stop</Button>
                    <Button bsStyle="warning" onClick={this.props.clear}>Clear</Button>
                </ButtonGroup>
            </div>    
        )
    }
}

class GameBoard extends Component {

    constructor(props) {
        super(props);
        this.state = { board: Board.generateBoard() };      
    }

    render() {
        // generate board components
        let gridOfCells = this.state.board.map( (rowOfCells) => {
            return rowOfCells.map((cell) => {
                return <GameCell cell={cell} />
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

        this.toggleCell = this.toggleCell.bind(this);
    }

    toggleCell() {
        // do something
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
                onClick={this.toggleCell}
            >
            </div>    
        )
    }
}

export { GameControls, GameBoard };