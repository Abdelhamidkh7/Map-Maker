const elements = [
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'town',
    shape: [[1, 1, 1],
    [0, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'farm',
    shape: [[1, 1, 1],
    [0, 0, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 1],
    [0, 0, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'town',
    shape: [[1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'farm',
    shape: [[1, 1, 1],
    [0, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'town',
    shape: [[1, 1, 0],
    [1, 0, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'town',
    shape: [[1, 1, 1],
    [1, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'farm',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 1,
    type: 'farm',
    shape: [[0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 1],
    [1, 0, 0],
    [1, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 0, 0],
    [1, 1, 1],
    [1, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 1]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'forest',
    shape: [[1, 1, 0],
    [0, 1, 1],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
  {
    time: 2,
    type: 'water',
    shape: [[1, 1, 0],
    [1, 1, 0],
    [0, 0, 0]],
    rotation: 0,
    mirrored: false
  },
]
const missions =
{
  "basic": [
    {
      "title": "Edge of the forest",
      "description": "You get one point for each forest field adjacent to the edge of your map."
    },
    {
      "title": "Sleepy valley",
      "description": "For every row with three forest fields, you get four points."
    },
    {
      "title": "Watering potatoes",
      "description": "You get two points for each water field adjacent to your farm fields."
    },
    {
      "title": "Borderlands",
      "description": "For each full row or column, you get six points."
    }
  ],
  "extra": [
    {
      "title": "Tree line",
      "description": "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts."
    },
    {
      "title": "Watering canal",
      "description": "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points."
    },
    {
      "title": "Wealthy town",
      "description": "You get three points for each of your village fields adjacent to at least three different terrain types."
    },
    {
      "title": "Magicians' valley",
      "description": "You get three points for your water fields adjacent to your mountain fields."
    },
    {
      "title": "Empty site",
      "description": "You get two points for empty fields adjacent to your village fields."
    },
    {
      "title": "Terraced house",
      "description": "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points."
    },
    {
      "title": "Odd numbered silos",
      "description": "For each of your odd numbered full columns you get 10 points."
    },
    {
      "title": "Rich countryside",
      "description": "For each row with at least five different terrain types, you will receive four points."
    }
  ],
}

const gridSize = 11;
let gameMatrix = [];
let isGameOver = false;
const mountainLocations = [
  { row: 1, column: 1 },
  { row: 3, column: 8 },
  { row: 5, column: 3 },
  { row: 8, column: 9 },
  { row: 9, column: 5 }
];

function initGameMatrix() {
  gameMatrix = Array.from({ length: gridSize }, () => new Array(gridSize).fill(null));

  mountainLocations.forEach(location => {
    gameMatrix[location.row][location.column] = 'mountain_tile.png';
  });
}

function createGrid() {
  const container = document.getElementById('game-container');
  container.innerHTML = '';

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement('div');
      cell.classList.add('grid-item');

      cell.dataset.row = row;
      cell.dataset.col = col;


      const tileType = gameMatrix[row][col];
      const tileImagePath = tileType ? `assets/tiles/${tileType}` : 'assets/tiles/base_tile.png';
      cell.style.backgroundImage = `url("${tileImagePath}")`;
      //addHoverEffect(cell, row, col);
      container.appendChild(cell);
    }
  }


  // function addHoverEffect(cell, row, col) {
  //   cell.addEventListener('mouseover', function () {
  //     if (canPlaceElement(currentElement, gameMatrix, row, col)) {
  //       cell.classList.add('can-place');
  //     } else {
  //       cell.classList.add('cannot-place');
  //     }
  //   });

  //     cell.addEventListener('mouseout', function () {
  //       cell.classList.remove('can-place', 'cannot-place');
  //     });
  //   }
  // }
  container.querySelectorAll('.grid-item').forEach(cell => {
    cell.addEventListener('mouseover', function () {
      const row = parseInt(cell.dataset.row, 10);
      const col = parseInt(cell.dataset.col, 10);
      applyHoverEffect(row, col, currentElement);
    });

    cell.addEventListener('mouseout', function () {
      clearHoverEffect();
    });
  });
}
function calculateSurroundedMountains(grid) {
  let surroundedMountainPoints = 0;
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === 'mountain_tile.png') {
        let isSurrounded = true;

        for (let [dRow, dCol] of directions) {
          const newRow = row + dRow;
          const newCol = col + dCol;

          if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
            isSurrounded = false;
            break;
          }

          if (grid[newRow][newCol] === 'mountain_tile.png' || grid[newRow][newCol] === null) {
            isSurrounded = false;
            break;
          }
        }

        if (isSurrounded) {
          surroundedMountainPoints++;
        }
      }
    }
  }

  return surroundedMountainPoints;
}


//function applyHoverEffect(row, col, element) {
//   for (let i = 0; i < element.shape.length; i++) {
//     for (let j = 0; j < element.shape[i].length; j++) {
//       // Calculate the relative position
//       const targetRow = row + i;
//       const targetCol = col + j;
//       if (targetRow < gridSize && targetCol < gridSize && element.shape[i][j] === 1) {
//         const targetCell = document.querySelector(`.grid-item[data-row="${targetRow}"][data-col="${targetCol}"]`);
//         if (targetCell && canPlaceElement(element, gameMatrix, row, col)) {
//           targetCell.classList.add('can-place');
//         } else {
//           targetCell.classList.add('cannot-place');
//         }
//       }
//     }
//   }
// }

// function clearHoverEffect() {
//   document.querySelectorAll('.grid-item.can-place').forEach(cell => cell.classList.remove('can-place'));
//   document.querySelectorAll('.grid-item.cannot-place').forEach(cell => cell.classList.remove('cannot-place'));
// }
function applyHoverEffect(row, col, element) {
  clearHoverEffect();
  const shape = element.shape;
  const shapeStart = findShapeStart(shape);

  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {

      if (shape[i][j] === 1) {

        const targetRow = row + i - shapeStart.startRow;
        const targetCol = col + j - shapeStart.startCol;


        if (targetRow >= 0 && targetRow < gridSize && targetCol >= 0 && targetCol < gridSize) {
          const targetCell = document.querySelector(`.grid-item[data-row="${targetRow}"][data-col="${targetCol}"]`);
          if (targetCell) {

            if (canPlaceElement(element, gameMatrix, row, col)) {
              targetCell.classList.add('can-place');
            } else {
              targetCell.classList.add('cannot-place');
            }
          }
        }
      }
    }
  }
}

function clearHoverEffect() {
  document.querySelectorAll('.grid-item').forEach(cell => {
    cell.classList.remove('can-place', 'cannot-place');
  });
}

// function handleCellClick(event) {
//     const row = parseInt(event.target.dataset.row, 10);
//     const col = parseInt(event.target.dataset.col, 10);


//     if (gameMatrix[row][col] !== null) {
//         return;
//     }

//     const tileName = 'base_tile.png';
//     gameMatrix[row][col] = tileName;
//     event.target.style.backgroundImage = `url("assets/tiles/${tileName}")`;
// }
let counter = 0
document.getElementById('game-container').addEventListener('click', function (event) {


  const row = parseInt(event.target.dataset.row, 10);
  const col = parseInt(event.target.dataset.col, 10);



  if (canPlaceElement(currentElement, gameMatrix, row, col) && temp < 7) {
    placeElementAndUpdateMission(currentElement, row, col)
    placeElementOnGrid(currentElement, gameMatrix, row, col);
    currentElement = mix(elements)
    displayCurrentElement(currentElement);



  }// else {
  //  console.log("Cannot place element at this position.");
  // }

});
// if (counter == 7) {
//   console.log(`score is  ${calculateEdgeOfTheForestScore(grid)}`);
// }


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function rotateElement(element) {
  const newShape = element.shape[0].map((col, i) => element.shape.map(row => row[i])).map(row => row.reverse());
  element.shape = newShape;
  element.rotation = (element.rotation + 90) % 360;
  return element;
}


function mirrorElement(element) {
  const mirrored = element.shape.map(row => row.slice().reverse());

  element.shape = mirrored;

  element.mirrored = !element.mirrored;
  return element
}

function canPlaceElement(element, grid, posY, posX) {
  //console.log(`Checking placement for posX: ${posX}, posY: ${posY}`);
  // const { firstRow, firstCol } = findShapeStart(element.shape);
  // console.log(`Checking placement for frstcol: ${firstCol}, posY: ${firstRow}`);
  //  // Adjust the starting position based on the first non-empty cell
  //  posX -= firstCol;
  //  posY -= firstRow;

  const { startRow, startCol, height, width } = findShapeStart(element.shape);


  posX -= startCol;
  posY -= startRow;
  // console.log(height);

  for (let i = 0; i < element.shape.length; i++) {
    for (let j = 0; j < element.shape[i].length; j++) {

      const x = posX + j;
      const y = posY + i;

      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {

        if (element.shape[i][j] === 1 && grid[y][x] !== null) {
          return false;
        }
      } else if (element.shape[i][j] === 1) {

        return false;
      }
    }
  }


  return true;
}

function placeElementOnGrid(element, grid, posY, posX) {

  const { startRow, startCol, height } = findShapeStart(element.shape);

  posX -= startCol;
  posY -= startRow;


  for (let i = 0; i < element.shape.length; i++) {
    for (let j = 0; j < element.shape[i].length; j++) {
      const x = posX + j;
      const y = posY + i;

      if (element.shape[i][j] === 1) {



        if (x < 0 || x >= gridSize || y < 0 || y >= gridSize) {
          grid[y][x] = element.type;
        }

        const cell = document.querySelector(`.grid-item[data-row="${y}"][data-col="${x}"]`);
        if (cell) {
          cell.style.backgroundImage = `url('assets/tiles/${element.type}_tile.png')`;
          grid[y][x] = element.type

        }
      }
    }
  }
}



document.querySelector('.rotate-button').addEventListener('click', () => {
  currentElement = rotateElement(currentElement);
  displayCurrentElement(currentElement);
});

document.querySelector('.flip-button').addEventListener('click', () => {
  currentElement = mirrorElement(currentElement);
  displayCurrentElement(currentElement);
});


function displayCurrentElement(element) {

  const displayContainer = document.querySelector('.current-element-display');
  const elemCount = document.querySelector('.element-count');
  displayContainer.innerHTML = '';
  elemCount.textContent = element.time;

  element.shape.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.style.display = 'flex';

    row.forEach(cell => {
      const cellDiv = document.createElement('div');
      cellDiv.style.width = '40px';
      cellDiv.style.height = '40px';
      cellDiv.style.border = '0.1px solid white';
      // cellDiv.style.backgroundImage = cell === 1 ?  `ur

      if (cell == 1) {
        cellDiv.style.backgroundImage = `url('assets/tiles/${element.type}_tile.png')`;
        cellDiv.style.backgroundSize = "40px";
        cellDiv.style.borderRadius = "5px";

      }

      //cellDiv.style.backgroundSize = cover;
      // cellDiv.style.backgroundPosition = center;
      rowDiv.appendChild(cellDiv);
    });

    displayContainer.appendChild(rowDiv);
  });


}
function findShapeStart(shape) {

  let startRow = shape.length;
  let startCol = shape[0].length;
  let endRow = 0;
  let endCol = 0;
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] === 1) {
        startRow = Math.min(startRow, i);
        startCol = Math.min(startCol, j);
        endRow = Math.max(endRow, i);
        endCol = Math.max(endCol, j);
      }
    }
  }
  return { startRow, startCol, height: endRow - startRow + 1, width: endCol - startCol + 1 }; // Default to (0,0) if no '1' is found
}



// function clearHoverEffect(element, row, col) {
//   for (let i = 0; i < element.shape.length; i++) {
//     for (let j = 0; j < element.shape[i].length; j++) {
//       const cell = document.querySelector(`.grid-cell[data-row="${row + i}"][data-col="${col + j}"]`);
//       if (cell) cell.classList.remove('highlight');

//     }
//   }
// }




//////Missions
function calculateEdgeOfTheForestScore(grid) {
  let score = 0;
  const gridSize = grid.length;


  for (let col = 0; col < gridSize; col++) {
    if (grid[0][col] === 'forest') score++;
    if (grid[gridSize - 1][col] === 'forest') score++;
  }


  for (let row = 1; row < gridSize - 1; row++) {
    if (grid[row][0] === 'forest') score++;
    if (grid[row][gridSize - 1] === 'forest') score++;
  }

  return score;
}

function calculateSleepyValleyScore(grid) {
  let score = 0;

  grid.forEach(row => {
    const forestCount = row.filter(cell => cell === 'forest').length;
    if (forestCount === 3) score += 4;
  });

  return score;
}

function calculateWateringPotatoesScore(grid) {
  let score = 0;
  const gridSize = grid.length;

  for (let row = 1; row < gridSize - 1; row++) {
    for (let col = 1; col < gridSize - 1; col++) {
      if (grid[row][col] === 'water') {

        if (grid[row - 1][col] === 'farm') score += 2;
        if (grid[row + 1][col] === 'farm') score += 2;
        if (grid[row][col - 1] === 'farm') score += 2;
        if (grid[row][col + 1] === 'farm') score += 2;
      }
    }
  }

  return score;
}

function calculateBorderlandsScore(grid) {
  let score = 0;
  const gridSize = grid.length;
  let fullRow, fullCol;


  for (let row = 0; row < gridSize; row++) {
    fullRow = true;
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === null) {
        fullRow = false;
        break;
      }
    }
    if (fullRow) score += 6;
  }

  for (let col = 0; col < gridSize; col++) {
    fullCol = true;
    for (let row = 0; row < gridSize; row++) {
      if (grid[row][col] === null) {
        fullCol = false;
        break;
      }
    }
    if (fullCol) score += 6;
  }

  return score;
}
////Extra Missions (Note: These are not yet implemented in the game because had trouble with the logic of randomizing the missions)
function scoreTreeLine(grid) {
  let maxLineLength = 0;
  for (let col = 0; col < grid[0].length; col++) {
    let lineLength = 0;
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col] === 'forest') {
        lineLength++;
      } else {
        maxLineLength = Math.max(maxLineLength, lineLength);
        lineLength = 0;
      }
    }
    maxLineLength = Math.max(maxLineLength, lineLength);
  }
  return maxLineLength * 2;
}

function scoreWateringCanal(grid) {

  let score = 0;
  for (let col = 0; col < grid[0].length; col++) {
    let farmCount = 0;
    let waterCount = 0;
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col] === 'farm') farmCount++;
      if (grid[row][col] === 'water') waterCount++;
    }
    if (farmCount === waterCount && farmCount > 0) {
      score += 4;
    }
  }
  return score;
}
///Wealthy Town
function scoreWealthyTown(grid) {
  let score = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 'town') {
        let adjacentTerrainTypes = new Set();

        [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([r, c]) => {
          if (grid[r] && grid[r][c]) {
            adjacentTerrainTypes.add(grid[r][c]);
          }
        });
        if (adjacentTerrainTypes.size >= 3) {
          score += 3;
        }
      }
    }
  }
  return score;
}
///Magician Valley
function scoreMagiciansValley(grid) {
  let score = 0;
  // Assuming mountains are represented by 'mountain_tile.png' or similar
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 'water') {

        [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([r, c]) => {
          if (grid[r] && grid[r][c] === 'mountain') {
            score += 3;
          }
        });
      }
    }
  }
  return score;
}

///Empty Site
function scoreEmptySite(grid) {
  let score = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === null) {

        [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]].forEach(([r, c]) => {
          if (grid[r] && grid[r][c] === 'village') {
            score += 2;
          }
        });
      }
    }
  }
  return score;
}
function scoreRowOfHouses(grid) {
  let score = 0;
  for (let row = 0; row < grid.length; row++) {
    let houseRowLength = 0;
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 'house') {
        houseRowLength++;
      } else {
        houseRowLength = 0;
      }
      score += houseRowLength * 2;
    }
  }
  return score;
}
function scoreOddNumbered(grid) {
  let score = 0;
  for (let col = 0; col < grid.length; col += 2) {

    let full = true;
    for (let row = 0; row < grid.length; row++) {
      if (grid[row][col] !== 'silo') {

        full = false;
        break;
      }

    }
    if (full) {
      score += 10
    }
  }
  return score
}


let seasonScores = {
  'Spring': 0,
  'Summer': 0,
  'Autumn': 0,
  'Winter': 0
};





const seasonElements = {
  'Spring': document.getElementById('spring-score'),
  'Summer': document.getElementById('summer-score'),
  'Autumn': document.getElementById('autumn-score'),
  'Winter': document.getElementById('winter-score')
};
const currenttt = document.getElementById('current-season');
let currentSeason = 'Spring';
currenttt.textContent = `Current Season: Spring:(AB)`;
let currentMissionIndex = 0;
let elementsPlaced = 0;
let temp = 0;
//const totalscore= document.getElementById('total-score');
// let total = 0



let totalScore = 0
const elapsed = document.getElementById('elapsed');



function updateTotalScoreDisplay() {
  totalScore = Object.values(seasonScores).reduce((acc, score) => acc + score, 0);

  const totalElement = document.getElementById('total-score');
  totalElement.textContent = `Total: ${totalScore} points`;
}
let trys = 0;
let forfirst = 0;
function placeElementAndUpdateMission(element, posX, posY) {
  if (canPlaceElement(element, gameMatrix, posX, posY)) {
    placeElementOnGrid(element, gameMatrix, posX, posY);
    elementsPlaced += element.time;
    temp += element.time;
    //document.getElementById('elpased').textContent  = `Elapsed Time in Current Season: ${temp}/7`;
    elapsed.textContent = `Elapsed Time in Current Season: ${temp}/7`;
    // console.log(elapsed);
    if (temp >= 7) {
      if (currentMissionIndex == 0) {
        forfirst = calculateScoreForMission(missions.basic[currentMissionIndex], gameMatrix, 0, false)
      }
      const score = calculateScoreForMission(missions.basic[currentMissionIndex], gameMatrix, trys, true) + calculateScoreForMission(missions.basic[(currentMissionIndex + 1) % missions.basic.length], gameMatrix, 0, true);

      //  missionScores[missionIndex] += score;
      seasonScores[currentSeason] += score;
      //missionElements[missionIndex].textContent = `Mission ${missionIndex + 1}: ${missionScores[missionIndex]} points`;
      trys = calculateScoreForMission(missions.basic[(currentMissionIndex + 1) % missions.basic.length], gameMatrix, 0, false);
      // console.log(trys)
      temp = temp - 7;
      seasonElements[currentSeason].textContent = `${currentSeason}: ${seasonScores[currentSeason]} points`;

      if (currentSeason === 'Winter') {
        calculateScoreForMission(missions.basic[(currentMissionIndex + 1) % missions.basic.length], gameMatrix, forfirst, true)
        //seasonElements['Winter'].innerHTML = `Winter: ${seasonScores['Winter']} points`;
        updateTotalScoreDisplay();

        endGame(totalScore)
        elementsPlaced = 0;
        return;
      }


      const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
      let seasonIndex = seasons.indexOf(currentSeason);
      currentSeason = seasons[(seasonIndex + 1) % seasons.length];
      currentMissionIndex = (currentMissionIndex + 1) % missions.basic.length;
      switch (currentSeason) {
        case 'Spring':
          currenttt.textContent = `Current Season: Spring:(AB)`;
          break;
        case 'Summer':
          currenttt.textContent = `Current Season: Summer:(BC)`;
          break;
        case 'Autumn':
          currenttt.textContent = `Current Season: Autumn:(CD)`;
          break;
        case 'Winter':
          currenttt.textContent = `Current Season: Winter:(DA)`;
          break;
        default:
          console.error(`Invalid season: ${currentSeason}`);
          break;
      }
    }
    elapsed.textContent = `Elapsed Time in Current Season: ${temp}/7`;
  }
  //updateElementsPlacedDisplay(elementsPlaced);
  // else {
  // console.log("Cannot place element at this position.");
  // }
}
let mi1 = 0;
let mi2 = 0;
let mi3 = 0;
let mi4 = 0;

function calculateScoreForMission(mission, grid, old, bool) {
  switch (mission.title) {
    case 'Edge of the forest':
      // mi1 = calculateEdgeOfTheForestScore(grid);
      if (bool) {
        document.getElementById('miss1').textContent = `(Score: ${calculateEdgeOfTheForestScore(grid) + old + calculateSurroundedMountains(grid)})`;
        // console.log(calculateSurroundedMountains(grid))
      }
      //  document.getElementById('miss1').textContent = `(Score: ${calculateEdgeOfTheForestScore(grid)})`;

      return calculateEdgeOfTheForestScore(grid) + calculateSurroundedMountains(grid);

    case 'Sleepy valley':

      if (bool) {
        document.getElementById('miss2').textContent = `(Score: ${calculateSleepyValleyScore(grid) + old + calculateSurroundedMountains(grid)})`;
      }
      return calculateSleepyValleyScore(grid) + calculateSurroundedMountains(grid);
    case 'Watering potatoes':

      if (bool) {
        document.getElementById('miss3').textContent = `(Score: ${calculateWateringPotatoesScore(grid) + old + calculateSurroundedMountains(grid)})`;
      }
      return calculateWateringPotatoesScore(grid) + calculateSurroundedMountains(grid);
    case 'Borderlands':

      if (bool) {
        document.getElementById('miss4').textContent = `(Score: ${calculateBorderlandsScore(grid) + old + calculateSurroundedMountains(grid)})`;
      }
      return calculateBorderlandsScore(grid) + calculateSurroundedMountains(grid);
    case 'Tree line':
      score = scoreTreeLine(grid);
      break;
    case 'Watering canal':
      score = scoreWateringCanal(grid);
      break;
    case 'Wealthy town':
      score = scoreWealthyTown(grid);
      break;
    case 'Magicians\' valley':
      score = scoreMagiciansValley(grid);
      break;
    case 'Empty site':
      score = scoreEmptySite(grid);
      break;
    case 'Row of houses':
      score = scoreRowOfHouses(grid);
      break;
    case 'Odd numbered silos':
      score = scoreOddNumberedSilos(grid);
      break;
    case 'Rich countryside':
      score = scoreRichCountryside(grid);
      break;
    default:
      return 0;
  }
  score += calculateSurroundedMountains(grid);

}
function resetGame() {

  // gameMatrix = createMatrix();
  totalScore = 0;
  const totalElement = document.getElementById('total-score');
  document.getElementById('miss1').textContent = `(Score: 0)`;
  document.getElementById('miss2').textContent = `(Score: 0)`;
  document.getElementById('miss3').textContent = `(Score: 0)`;
  document.getElementById('miss4').textContent = `(Score: 0)`;
  totalElement.textContent = `Total: ${totalScore} points`

  elapsed.textContent = `Elapsed Time in Current Season:: 0/7`;
  currenttt.textContent = `Current Season: Spring:(AB)`;

  total = 0;
  currentMissionIndex = 0;
  currentSeason = 'Spring';
  seasonScores = {
    Spring: 0,
    Summer: 0,
    Autumn: 0,
    Winter: 0
  };
  forfirst = 0;
  trys = 0;
  elementsPlaced = 0;

  for (let season in seasonElements) {
    seasonElements[season].textContent = `${season}: 0 points`;
  }
  //seasonElements[currentSeason].textContent = `${currentSeason}: ${seasonScores[currentSeason]} points`;

}


function endGame(totalScore) {
  const endGamePopup = document.getElementById('endGamePopup');
  const finalScore = document.getElementById('finalScore');
  // const elapsed = document.getElementById('elapsed').textContent.split('/')[0];

  // if (parseInt(elapsed) > 7) {

  // totalScore -= lastElementScore; 
  // Update the final score
  finalScore.textContent = `Total score: ${totalScore}`;
  endGamePopup.classList.add('show');

  endGamePopup.addEventListener('click', () => {
    endGamePopup.classList.remove('show');

    resetGame();
    initGameMatrix();
    createGrid();
  });
}
//
function mix(elements) {
  shuffleArray(elements);
  return elements[0];
}
let currentElement = mix(elements)
displayCurrentElement(currentElement);

// Initializing the game

//createGrid();
initGameMatrix();
createGrid();
