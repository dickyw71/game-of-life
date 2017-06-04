import Cell from './cell.js';
import * as MooreNeighbourhood from './moore-neighbourhood.js';

export let generateBoard = function() {

    var cellGrid = new Array(5);
    for (let i = 0; i < 5; i++) {
        cellGrid[i] = new Array(5);
        for (let j = 0; j < 5; j++) {
            cellGrid[i][j] = new Cell(i, j, getRandomBoolean());
        }
    }
    return cellGrid;
}

function getRandomBoolean() {
    return getRandomIntInclusive(0, 1);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
