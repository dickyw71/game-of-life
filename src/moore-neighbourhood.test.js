import Cell from './cell.js';
import * as Neighbourhood from './moore-neighbourhood.js'

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

