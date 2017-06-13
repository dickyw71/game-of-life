## Tests
- ~~The moore neigbourhood module should calculate which cells are alive in the next generation based on the current generation.~~
- ~~When I first arrive at the game, it will randomly generate a board (and start playing).~~
- ~~Make prognosis a static method of the Cell class.~~
- ~~Move Moore-neighourhood functions to external file and import them into the test module.~~
- ~~Refactor Moore-Neighbourhood to move the non-neighbourhood board stuff out to the board module.~~
- ~~When I clear the board the generation is reset to zero and the game stops.~~
- I can setup the board by changing the size (width and height).
- ~~I can setup the board state by selecting each cell.~~
- I can change the rate that new generations are created.
- Only update a grid cell if its state (alive/dead) has changed since the last generation.

Algorithm 

for each live cell
    sum the number of adjacent live cells within the moore-neighbourhood
    if sum is 2 or 3  
        cell remains alive
    else
        cell dies

http://rosettacode.org/wiki/Conway%27s_Game_of_Life

A cell   C   is represented by a   1   when alive,   or   0   when dead,   in an   m-by-m   (or m×m)   square array of cells.

We calculate   N   - the sum of live cells in C's   eight-location neighbourhood,   then cell   C   is alive or dead in the next generation based on the following table:

   C   N                 new C
   1   0,1             ->  0  # Lonely
   1   4,5,6,7,8       ->  0  # Overcrowded
   1   2,3             ->  1  # Lives
   0   3               ->  1  # It takes three to give birth!
   0   0,1,2,4,5,6,7,8 ->  0  # Barren

   C is initial condition - > Pass Cell to Reducer as initial value, then reducer calculates the value of N

To avoid decisions and branches in the counting loop, the rules can be rearranged from an egocentric approach of the inner field regarding its neighbours to a scientific observer's viewpoint: if the sum of all nine fields is 3, the inner field state for the next generation will be life (no matter of its previous contents); if the all-field sum is 4, the inner field retains its current state and every other sum sets the inner field to death.


Algorithm
Input: A square tessellation, T, containing a connected component P of black cells.
Output: A sequence B (b1, b2, ..., bk) of boundary pixels i.e. the contour.
Define M(a) to be the Moore neighborhood of pixel a.
Let p denote the current boundary pixel.
Let c denote the current pixel under consideration i.e. c is in M(p).
Let b denote the backtrack of c (i.e. neighbor pixel of p that was previously tested)
 
Begin
  Set B to be empty.
  From bottom to top and left to right scan the cells of T until a black pixel, s, of P is found.
  Insert s in B.
  Set the current boundary point p to s i.e. p=s
  Let b = the pixel from which s was entered during the image scan.
  Set c to be the next clockwise pixel (from b) in M(p).
  While c not equal to s do
    If c is black
      insert c in B
      Let b = p
      Let p = c
      (backtrack: move the current pixel c to the pixel from which p was entered)
      Let c = next clockwise pixel (from b) in M(p).
    else
      (advance the current pixel c to the next clockwise pixel in M(p) and update backtrack)
      Let b = c
      Let c = next clockwise pixel (from b) in M(p).
    end If
  end While
End