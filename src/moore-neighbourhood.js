

/**
 * Returns an array of cells from the grid starting with the cell passed to the function 
 * and then each cell in the moore-neighbourhood of that cell.
 * The neighbours are ordered by the compass bearing relative to the centre cell 
 * starting at West then proceeding in a clockwise direction 
 * @param {Object} cell - at the centre of the neighbourhood
 * @param {Array} grid - the Game of Life grid of cells
 */
export function find(cell, grid) {
 
    let neighbourhood = [];
    let xMinusOne = cell.x > 0 ? cell.x-1 : grid[0].length-1;
    let xPlusOne = cell.x < grid[0].length-1 ? cell.x+1 : 0;
    let yMinusOne = cell.y > 0 ? cell.y-1 : grid.length-1;
    let yPlusOne = cell.y < grid.length-1 ? cell.y+1 : 0;

    neighbourhood.push(grid[cell.y][cell.x]);        //  Centre cell
    neighbourhood.push(grid[cell.y][xMinusOne]);     //  West
    neighbourhood.push(grid[yMinusOne][xMinusOne]);  //  North-west
    neighbourhood.push(grid[yMinusOne][cell.x]);     //  North
    neighbourhood.push(grid[yMinusOne][xPlusOne]);   //  North-east
    neighbourhood.push(grid[cell.y][xPlusOne]);      //  East
    neighbourhood.push(grid[yPlusOne][xPlusOne]);    //  South-East
    neighbourhood.push(grid[yPlusOne][cell.x]);      //  South
    neighbourhood.push(grid[yPlusOne][xMinusOne]);   //  South-west

    return neighbourhood;
}