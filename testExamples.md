### Failure (illegal move) scenarios

* Trying to place in a occupied cell:
  Given[Placed(0,0,X), Placed(0,1,Y)]
  When[Place(0,0,X)]
  Then[Illegal Move]
* Trying to place 2 moves in a row:
  Given[Placed(0,0,X), (Y not placed any yet)]
  When[Place(0,1,X)]
  Then[Illegal Move]
* Trying to place outside of grid:
  Given[...]
  When[Place(-1,4,X)]
  Then[Illegal Move]

### Winning scenarios

* Horizontal Win:
  Given[Placed(0,0,X), Placed(1,0,X)]
  When[Place(2,0,X)]
  Then[X wins]
* Vertical Win:
  Given[Placed(0,0,X), Placed(0,1,X)]
  When[Place(0,2,X)]
  Then[X wins]
* Diagonal Win:
  Given[Placed(0,0,X), Placed(1,1,X)]
  When[Placed(2,2,X)]
  Then[X wins]

### Draw scenarios

If all 9 cells of the grid have been used but neither player
has a win of any form, that is a draw.
