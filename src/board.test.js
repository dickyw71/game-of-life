import Cell from './cell.js';
import * as Board from './board.js';
import * as MooreNeighbourhood from './moore-neighbourhood.js';

it('should randonly generate a game board', () => {

    let board = Board.generateRandom();
    expect(board.length).toEqual(5);
})


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

let diagonalGen1 = [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,true), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,false), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,true), new Cell(2,3,false), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];

let diagonalGen2 = [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,false), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,false), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,false), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];

let nothing =          [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,false), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,false), new Cell(3,2,false), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,false), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];

let triomino =         [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,true), new Cell(3,1,true), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,false), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,false), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];

let triomino2Gen1 =    [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,true), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,false), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];

let triomino2Gen2 =    [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,false), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,true), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,false), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];

let square4 =          [[new Cell(0,0,false), new Cell(1,0,false), new Cell(2,0,false), new Cell(3,0,false), new Cell(4,0,false)],
                        [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,true), new Cell(3,1,true), new Cell(4,1,false)],
                        [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,true), new Cell(3,2,true), new Cell(4,2,false)],
                        [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,false), new Cell(3,3,false), new Cell(4,3,false)],
                        [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,false)]];

let chequerBoard =     [[new Cell(0,0,false), new Cell(1,0,true), new Cell(2,0,false), new Cell(3,0,true), new Cell(4,0,false)],
                        [new Cell(0,1,true), new Cell(1,1,false), new Cell(2,1,true), new Cell(3,1,false), new Cell(4,1,true)],
                        [new Cell(0,2,false), new Cell(1,2,true), new Cell(2,2,false), new Cell(3,2,true), new Cell(4,2,false)],
                        [new Cell(0,3,true), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,true)],
                        [new Cell(0,4,false), new Cell(1,4,true), new Cell(2,4,false), new Cell(3,4,true), new Cell(4,4,false)]];

let chequerBoardGen2 =     [[new Cell(0,0,false), new Cell(1,0,true), new Cell(2,0,false), new Cell(3,0,true), new Cell(4,0,false)],
                            [new Cell(0,1,true), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,false), new Cell(4,1,true)],
                            [new Cell(0,2,false), new Cell(1,2,false), new Cell(2,2,false), new Cell(3,2,false), new Cell(4,2,false)],
                            [new Cell(0,3,true), new Cell(1,3,false), new Cell(2,3,false), new Cell(3,3,false), new Cell(4,3,true)],
                            [new Cell(0,4,false), new Cell(1,4,true), new Cell(2,4,false), new Cell(3,4,true), new Cell(4,4,false)]];

let randomGen1 =   [[new Cell(0,0,true), new Cell(1,0,false), new Cell(2,0,true), new Cell(3,0,true), new Cell(4,0,true)],
                     [new Cell(0,1,true), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,true), new Cell(4,1,true)],
                     [new Cell(0,2,false), new Cell(1,2,true), new Cell(2,2,false), new Cell(3,2,true), new Cell(4,2,true)],
                     [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,true)],
                     [new Cell(0,4,false), new Cell(1,4,false), new Cell(2,4,false), new Cell(3,4,false), new Cell(4,4,true)]];

let randomGen2 =    [[new Cell(0,0,false), new Cell(1,0,true), new Cell(2,0,true), new Cell(3,0,false), new Cell(4,0,false)],
                     [new Cell(0,1,false), new Cell(1,1,false), new Cell(2,1,false), new Cell(3,1,false), new Cell(4,1,false)],
                     [new Cell(0,2,false), new Cell(1,2,true), new Cell(2,2,false), new Cell(3,2,false), new Cell(4,2,false)],
                     [new Cell(0,3,false), new Cell(1,3,false), new Cell(2,3,true), new Cell(3,3,false), new Cell(4,3,true)],
                     [new Cell(0,4,false), new Cell(1,4,true), new Cell(2,4,true), new Cell(3,4,false), new Cell(4,4,false)]];

it('should return the correct generation 2 blinker grid', () => {

    let bg2 = blinkerGen1.map(Board.nextGeneration);
    expect(bg2).toEqual(blinkerGen2);
})

it('should return the correct generation 3 blinker grid', () => {

    let bg3 = blinkerGen2.map(Board.nextGeneration);
    expect(bg3).toEqual(blinkerGen1);
})

it('should return the correct 2nd generation of the diagonal line', () => {

    let dg2 = diagonalGen1.map(Board.nextGeneration);
    expect(dg2).toEqual(diagonalGen2);
})

it('should return the correct 3rd generation of the diagonal line', () => {

    let dg3 = diagonalGen2.map(Board.nextGeneration);
    expect(dg3).toEqual(nothing);
})

it('should return the correct 2nd generation of the triomino square', () => {

    let triSq = triomino.map(Board.nextGeneration);
    expect(triSq).toEqual(square4);

})

it('should return the correct 3nd generation of the triomino square', () => {

    let triSq = square4.map(Board.nextGeneration);
    expect(triSq).toEqual(square4);
    
})

it('should return the correct tetromino patterns for 2nd & 3rd generations', () => {

    let triGen2 = triomino2Gen1.map(Board.nextGeneration);
    expect(triGen2).toEqual(triomino2Gen2);

    let triGen3 = triomino2Gen2.map(Board.nextGeneration);
    expect(triGen3).toEqual(nothing);
})

it('should return the correct tetromino patterns', () => {
    // To-do
})

it('should return a different next gen for a random board', () => {
    let randyGen2 = randomGen1.map(Board.nextGeneration);
    expect(randyGen2).toEqual(randomGen2);

    let randomBoard = Board.generateRandom();
    let randomBoardGen2 = randomBoard.map(Board.nextGeneration);
    expect(randomBoardGen2).not.toEqual(randomBoard);
})

it('should return the correct pattern for gen2 of chequer board', () => {
    let chequer = Board.generateChequer();
    let chequerGen2 = chequer.map(Board.nextGeneration);
    expect(chequerGen2).toEqual(chequerBoardGen2);
})

xit('should add a blinker to the empty grid', () => {
    let emptyBoard = Board.generateEmpty();
    
    let left, top = 10;
    let blinkerAdded = Board.addBlinker(emptyBoard, top, left);

    console.log(blinkerAdded[top][left]);

    expect(blinkerAdded).not.toEqual(emptyBoard);

    expect(blinkerAdded[top][left+1].isAlive).toEqual(true);
    expect(blinkerAdded[top+1][left+1].isAlive).toEqual(true);
    expect(blinkerAdded[top+2][left+1].isAlive).toEqual(true);
   
})
