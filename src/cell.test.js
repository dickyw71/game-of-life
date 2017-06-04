import Cell from './cell.js';

it('should create a Cell object', () => {

    let aCell = new Cell(0,0,false);
    expect(aCell).toBeInstanceOf(Cell);
})