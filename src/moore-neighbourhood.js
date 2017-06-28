/**
 * Returns the count of live cells in the Moore Neighbourhood for the cell passed to the function
 * @param {Object} cell - at the centre of the neighbourhood
 * @param {Array} grid - the Game of Life grid of cells 
 */
export function countLiveCells(cell, grid) {

    let xMinusOne = cell.x > 0 ? cell.x-1 : grid[0].length-1;
    let xPlusOne = cell.x < grid[0].length-1 ? cell.x+1 : 0;
    let yMinusOne = cell.y > 0 ? cell.y-1 : grid.length-1;
    let yPlusOne = cell.y < grid.length-1 ? cell.y+1 : 0;

    let sum = grid[cell.y][cell.x].isAlive +            //  Centre cell
            grid[cell.y][xMinusOne].isAlive +           //  West
            grid[yMinusOne][xMinusOne].isAlive +        //  North-west
            grid[yMinusOne][cell.x].isAlive +           //  North
            grid[yMinusOne][xPlusOne].isAlive +         //  North-east
            grid[cell.y][xPlusOne].isAlive +            //  East
            grid[yPlusOne][xPlusOne].isAlive +          //  South-east
            grid[yPlusOne][cell.x].isAlive +            //  South
            grid[yPlusOne][xMinusOne].isAlive;          //  South-west
    
    return sum;
}