class Cell {
    constructor(x, y, isAlive) {
        this.x = x;
        this.y = y;
        this.isAlive = isAlive;
    }  

    /**
     * Determine if a cell will live or die based on the sum of the live cells
     * in the neighourhood and whether it is currently alive or dead
     * @param {Number} sumLiveCells 
     * @param {Boolean} isAlive 
     */
    static prognosis(sumLiveCells, isAlive) {
        let life = isAlive;
        switch(sumLiveCells) {
            case 3: 
            life = true;       // Life!
            break;
            case 4:            // Cell condition remains the same as isAlive
            break;
            default:
            life = false;      // Death
            break;
        } 
        return life;
    }
}

export default Cell;