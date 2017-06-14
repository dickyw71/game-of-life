import Cell from './cell.js';
import * as MooreNeighbourhood from './moore-neighbourhood.js';

export function generateEmpty() {
   var cellGrid = new Array(50);
    for (let i = 0; i < 50; i++) {
        cellGrid[i] = new Array(50);
        for (let j = 0; j < 50; j++) {
            cellGrid[i][j] = new Cell(j, i, false);
        }
    }
    return cellGrid;
}

export function generateRandom(width, height) {

    let cellGrid = new Array(height || 5);
    for (let i = 0; i < (height || 5); i++) {
        cellGrid[i] = new Array(width || 5);
        for (let j = 0; j < (width || 5); j++) {
            cellGrid[i][j] = new Cell(j, i, getRandomBoolean());
        }
    }
    return cellGrid;
}

function getRandomBoolean() {
    return Boolean(getRandomIntInclusive(0, 1));
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function addBlinker(board, top, left) {

    // copy board
    let cellGrid = new Array(50);
    for (let i = 0; i < 50; i++) {
        cellGrid[i] = new Array(50);
        for (let j = 0; j < 50; j++) {
            cellGrid[i][j] = board[i][j];
        }
    }
    // add a blinker
    cellGrid[top][left+1].isAlive = true;
    cellGrid[top+1][left+1].isAlive = true;
    cellGrid[top+2][left+1].isAlive = true;
    
    return cellGrid;
}
export function generateBlinker() {
    return [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
            [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,true), new Cell(3,1,false), new Cell(4,1,false)],
            [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,false), new Cell(4,2,false)],
            [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,false)],
            [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];
}

export function generateChequer() {
    return [[new Cell(0,0,false), new Cell(1,0,true), new Cell(2,0,false), new Cell(3,0,true), new Cell(4,0,false)],
            [new Cell(0,1,true), new Cell(1,1,false), new Cell(2,1,true), new Cell(3,1,false), new Cell(4,1,true)],
            [new Cell(0,2,false), new Cell(1,2,true), new Cell(2,2,false), new Cell(3,2,true), new Cell(4,2,false)],
            [new Cell(0,3,true), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,true)],
            [new Cell(0,4,false), new Cell(1,4,true), new Cell(2,4,false), new Cell(3,4,true), new Cell(4,4,false)]];
}

export function clear(row) {
    return row.map((cell) => {
        cell.isAlive = false;
        return cell;
    })
}

/**
 * Counts the live cells in the array passed and returns the sum
 * @param {Cell[]} cells 
 */
export function sumLive(cells) {
    let sum = 0;
    cells.forEach((cell) => {
        if(cell.isAlive) {
            sum++;
        }
    })
    return sum;
}

/**
 * Called when the current board grid is array.map'ed into the next generation board grid 
 * Returns the value of the cells in the row in the next generation of the game
 * @param {Array} row - A row (array) of Cell objects 
 * @param {Number} i - the column index of the row within the 2d grid
 * @param {Array} arr - a 2D grid of Cell objects
 * @returns {Array}
 */
export function nextGeneration(row, i, arr) {
 
    return row.map((cell) => {
        let _cell = new Cell(cell.x, cell.y, cell.isAlive);
        // if cell is in a live neighbourhood calculate it's next state
        // else the cell is dead and the state remains unchanged

        /**
         * Is this cell in a neighbourhood with a current live cell
         * if so copy the neighbourhood containing this cell and a live cell 
         * to cellNeighbourhood
         */
        let cellNeighbourhood;
        for(let neighbourhood of MooreNeighbourhood.findLiveOnes(arr)) {
            if (neighbourhood.some( (el) => {
                return (el.x === cell.x) && (el.y === cell.y)
            })) {
                // cell found
                cellNeighbourhood = neighbourhood;
                break; // exit for...of
            }
        }

        if(cellNeighbourhood) {          
            let neighbours = MooreNeighbourhood.find(cell, arr);
            _cell.isAlive = Cell.prognosis(sumLive(neighbours), _cell.isAlive);
        }

        return _cell;
    });
}
