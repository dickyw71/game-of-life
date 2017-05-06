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

var a = new Array(50);
for (let i = 0; i < 50; i++) {
    a[i] = new Array(50);
    for (let j = 0; j < 50; j++) {
        a[i][j] = new Cell(i, j, getRandomBoolean());
    }
}

function findLiveCells(cellGrid) {

    let flattenedGrid = steamroller(cellGrid);
    return flattenedGrid.filter(function(cell) {
        return cell.isAlive;
    }) 
   // return cellGrid; 
}

console.log(findLiveCells(a))

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean() {
    return getRandomIntInclusive(0, 1);
}

console.log(new Cell(4, 4, getRandomBoolean()));

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

console.log(steamroller([1, [2], [3, [[4]]]]));
console.log(steamroller([[["a"]], [["b"]]]));
console.log(steamroller([[["a"]], [["b"]]]));