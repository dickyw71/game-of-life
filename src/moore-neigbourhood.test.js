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

var cellGrid = new Array(50);
for (let i = 0; i < 50; i++) {
    cellGrid[i] = new Array(50);
    for (let j = 0; j < 50; j++) {
        cellGrid[i][j] = new Cell(i, j, getRandomBoolean());
    }
}

function findLiveCells(cellGrid) {

    let flattenedGrid = steamroller(cellGrid);
    return flattenedGrid.filter(function(cell) {
        return cell.isAlive;
    }) 
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean() {
    return getRandomIntInclusive(0, 1);
}

// flatten is called recursively
// for each element that is an array 
function flatten(a, b) {
  var c;
  if(Array.isArray(b)) {
     c = b.reduce(flatten, []);
  } 
  else {
    c = b;
  }
  return a.concat(c);
}

function steamroller(arr) {
  // I'm a steamroller, baby
  // flatten arrays into one
  return arr.reduce(flatten, []);     
}

let blinkerGrid = [ new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false),
                    new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,true), new Cell(3,1,false), new Cell(4,1,false), 
                    new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,false), new Cell(4,2,false), 
                    new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,false), 
                    new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)];

let blinkerGrid2D = [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                    [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,true), new Cell(3,1,false), new Cell(4,1,false)],
                    [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,false), new Cell(4,2,false)],
                    [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,false)],
                    [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];


let liveNeighbourhoods = [];

for(let y=0; y<blinkerGrid2D.length;y++) {
    for(let x=0; x<blinkerGrid2D.length; x++) {
        if(blinkerGrid2D[y][x].isAlive == true) {
            let neigbourhood = [];
            neigbourhood.push(blinkerGrid2D[y][x]);
            neigbourhood.push(blinkerGrid2D[y][x-1]);
            neigbourhood.push(blinkerGrid2D[y-1][x-1]);
            neigbourhood.push(blinkerGrid2D[y-1][x]);
            neigbourhood.push(blinkerGrid2D[y-1][x+1]);
            neigbourhood.push(blinkerGrid2D[y][x+1]);
            neigbourhood.push(blinkerGrid2D[y+1][x+1]);
            neigbourhood.push(blinkerGrid2D[y+1][x]);
            neigbourhood.push(blinkerGrid2D[y+1][x-1]);
            
            liveNeighbourhoods.push(neigbourhood);
        }
    }
} 

console.log(liveNeighbourhoods);

function sumLiveCellsInNeigbourhood(grid) {
    let sum = 0;
    grid.forEach((cell) => {
        if(cell.isAlive) {
            sum++;
        }
    })
    return sum;
}

function nextGeneration(cell, index, arr) {
 
    
    // if cell is in a live neighbourhood calculate it's next state
    // else cell is dead
    let cellInLiveNeigbourhood = false;
    for(let neigbourhood of liveNeighbourhoods) {
        if (neigbourhood.some( el => el.x === cell.x && el.y === cell.y)) {
            // cell found
            cellInLiveNeigbourhood = true;
            console.log(cell);
            break; // exit for...of
        }
    }
    
    let sum = sumLiveCellsInNeigbourhood(arr);
    let _cell = new Cell(cell.x, cell.y, cell.isAlive);
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
    return _cell;
}

console.log(blinkerGrid);

let blinkerGrid2 = blinkerGrid.map(nextGeneration);
console.log(blinkerGrid);
console.log(blinkerGrid2);

let blinkerGrid3 = blinkerGrid2.map(nextGeneration);
console.log(blinkerGrid3);




