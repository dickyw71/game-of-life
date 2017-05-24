it('should initially fill the grid with 0s', () => {
    let arrayOf0 = [];
    arrayOf0.length = 10;
    arrayOf0.fill(0);
    expect(arrayOf0).toEqual([0,0,0,0,0,0,0,0,0,0]);
})

it('should produce a matrix of 50x50 elements, all elements have a value of there position in the matrix', () => {
    var a = new Array(50);
    for (let i = 0; i < 50; i++) {
        a[i] = new Array(50);
        for (let j = 0; j < 50; j++) {
            a[i][j] = { x: i, y: j };
        }
    }
   
   expect(a.length).toEqual(50);
   for(let ix =0; ix<a.length; ix++) {
    expect(a[ix][ix].x).toEqual(ix);
    expect(a[ix][ix].y).toEqual(ix);
   }

   expect(a[12][49].x).toEqual(12);
   expect(a[12][49].y).toEqual(49);
})

class Cell {
    constructor(x, y, isAlive) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
    }  
}

let blinkerGen1 = [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,true), new Cell(3,1,false), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,false), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];
let blinkerGen2 = [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,false), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,true), new Cell(2,2,true), new Cell(3,2,true), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,false), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];

it('should return the correct generation 2 blinker grid', () => {

    let bg2 = blinkerGen1.map(nextGeneration);
    expect(bg2).toEqual(blinkerGen2);
})

it('should return the correct generation 3 blinker grid', () => {

    let bg3 = blinkerGen2.map(nextGeneration);
    expect(bg3).toEqual(blinkerGen1);
})

var cellGrid = new Array(50);
for (let i = 0; i < 50; i++) {
    cellGrid[i] = new Array(50);
    for (let j = 0; j < 50; j++) {
        cellGrid[i][j] = new Cell(i, j, getRandomBoolean());
    }
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
 * Finds live cells in the grid and puts them and their neighbours into an array
 * Each live cell neighbourhood array is then put into an array of all neighbourhoods
 * Problems: if x or y indices are 0 the code throws an undefined error for x-1 or y-1
 * Fix to-do: if x or y are 0 change the value of x-1 or y-1 to grid.length
 * @param {*} grid 
 */
function findLiveNeighourhoods(grid) {

    let liveNeighbourhoods = [];

    for(let y=0; y<grid.length;y++) {
        for(let x=0; x<grid.length; x++) {
            if(grid[y][x].isAlive == true) {
                let xMinusOne = x > 0 ? x-1 : grid.length-1;
                let xPlusOne = x < grid.length-1 ? x+1 : 0;
                let yMinusOne = y > 0 ? y-1 : grid.length-1;
                let yPlusOne = y < grid.length-1 ? y+1 : 0;
                let neigbourhood = [];
                neigbourhood.push(grid[y][x]);
                neigbourhood.push(grid[y][xMinusOne]);
                neigbourhood.push(grid[yMinusOne][xMinusOne]);
                neigbourhood.push(grid[yMinusOne][x]);
                neigbourhood.push(grid[yMinusOne][xPlusOne]);
                neigbourhood.push(grid[y][xPlusOne]);
                neigbourhood.push(grid[yPlusOne][xPlusOne]);
                neigbourhood.push(grid[yPlusOne][x]);
                neigbourhood.push(grid[yPlusOne][xMinusOne]);
                
                liveNeighbourhoods.push(neigbourhood);
            }
        }
    } 
    return liveNeighbourhoods;
}


function findNeighbourhoodCells(cell, grid) {
 
    let neigbourhood = [];
    let xMinusOne = cell.x > 0 ? cell.x-1 : grid.length-1;
    let xPlusOne = cell.x < grid.length-1 ? cell.x+1 : 0;
    let yMinusOne = cell.y > 0 ? cell.y-1 : grid.length-1;
    let yPlusOne = cell.y < grid.length-1 ? cell.y+1 : 0;

    neigbourhood.push(grid[cell.y][cell.x]);
    neigbourhood.push(grid[cell.y][xMinusOne]);
    neigbourhood.push(grid[yMinusOne][xMinusOne]);
    neigbourhood.push(grid[yMinusOne][cell.x]);
    neigbourhood.push(grid[yMinusOne][xPlusOne]);
    neigbourhood.push(grid[cell.y][xPlusOne]);
    neigbourhood.push(grid[yPlusOne][xPlusOne]);
    neigbourhood.push(grid[yPlusOne][cell.x]);
    neigbourhood.push(grid[yPlusOne][xMinusOne]);

    return neigbourhood;
}


function sumLiveCells(grid) {
    let sum = 0;
    grid.forEach((cell) => {
        if(cell.isAlive) {
            sum++;
        }
    })
    return sum;
}

/**
 * Returns the value of the cell in the next generation of the game
 * @param {*} row 
 * @param {*} i - the index of the current row
 * @param {*} arr - a 2D array of cells
 */
function nextGeneration(row, i, arr) {

    
    return row.map((cell) => {
        let _cell = new Cell(cell.x, cell.y, cell.isAlive);
        // if cell is in a live neighbourhood calculate it's next state
        // else cell is dead
        let cellNeighbourhood;
        let liveNeighbourhoods = findLiveNeighourhoods(arr);

        /**
         * Is this cell in a neighbourhood with a live cell
         * if so copy the neighbourhood containing this cell and a live cell 
         * to cellNeighbourhood
         */
        for(let neigbourhood of liveNeighbourhoods) {
            if (neigbourhood.some( (el) => {
                return (el.x === cell.x) && (el.y === cell.y)
            })) {
                // cell found
                cellNeighbourhood = neigbourhood;
                break; // exit for...of
            }
        }

        if(cellNeighbourhood) {
            
            let neigbouringCells = findNeighbourhoodCells(cell, arr);
            let sum = sumLiveCells(neigbouringCells);

            switch(sum) {
                case 3: 
                // Life
                _cell.isAlive = true;
                break;
                case 4:
                // centre cell stays the same
                break;
                default:
                // Death
                _cell.isAlive = false;
                break;
            }
        }
        return _cell;
    });
}






