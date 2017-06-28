import React, { Component } from 'react';
import { Grid, Row, Col, ButtonGroup, Button } from 'react-bootstrap';
import './game-of-life.css';

class GameGenerationControls extends Component {
    render() {
        return (
            <Grid style={this.props.style}>
                <Row className="show-grid">
                    <Col md={6} mdPush={1}>    
                        <GameControls  
                            startGame={this.props.startGame} 
                            stopGame={this.props.stopGame} 
                            clearGame={this.props.clearGame}
                        />
                    </Col>
                    <Col md={6}>
                        <GameGenerationCounter 
                            genCount={this.props.genCount}
                        />
                    </Col>    
                </Row>
            </Grid>
        )
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

class GameBoardControls extends Component {
    render() {
        return (
            <Grid style={this.props.style}>
                <Row className="show-grid">
                    <Col md={4} mdPush={1}>
                       <h4>Board size:</h4>
                    </Col>
                    <Col md={8}>
                        <BoardControls 
                            smallBoard={this.props.smallBoard} 
                            mediumBoard={this.props.mediumBoard} 
                            largeBoard={this.props.largeBoard}
                        />
                    </Col>    
                </Row>
            </Grid>
        )
    }
}

class BoardControls extends Component {
    constructor(props) {
        super(props);

        this.state = { smallActive: false, mediumActive: true, largeActive: false };

        this.small = this.small.bind(this);
        this.medium = this.medium.bind(this);
        this.large = this.large.bind(this);
    }
    small() {
        this.setState({smallActive: true, mediumActive: false, largeActive: false})
        this.props.smallBoard();
    }

    medium() {
        this.setState({smallActive: false, mediumActive: true, largeActive: false})
        this.props.mediumBoard();
    }

    large() {
        this.setState({smallActive: false, mediumActive: false, largeActive: true})
        this.props.largeBoard();
    }
    
    render() {
        return (
            <ButtonGroup style={this.props.style}>
                <Button bsStyle="default" onClick={this.small} active={this.state.smallActive}>30x20</Button>
                <Button bsStyle="default" onClick={this.medium} active={this.state.mediumActive}>50x30</Button>
                <Button bsStyle="default" onClick={this.large} active={this.state.largeActive}>80x50</Button>
            </ButtonGroup> 
        )
    }    
}

export { GameGenerationControls, GameBoard, GameBoardControls };