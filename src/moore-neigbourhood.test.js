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
    console.log(a[2][2]);
    expect(a[0][0].x).toEqual(0);
    expect(a[0][0].y).toEqual(0);
})