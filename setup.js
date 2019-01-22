

const shiftFlag = {
  vertical: false
}

const ships = {
  shipsToPlace: 5,
  current: 'carrier',
  carrier: {
    size: 5
  },
  battleship: {
    size: 4
  },
  cruiser: {
    size: 3
  },
  submarine: {
    size: 3
  },
  destroyer: {
    size: 2
  }
}

const player1Ships = {
  carrier: {
    name: 'carrier',
    sunk: false,
    hits: 0,
    coords: []
  },
  battleship: {
    name: 'battleship',
    sunk: false,
    hits: 0,
    coords: []
  },
  cruiser : {
    name: 'cruiser',
    sunk: false,
    hits: 0,
    coords: []
  },
  submarine: {
    name: 'submarine',
    sunk: false,
    hits: 0,
    coords: []
  },
  destroyer: {
    name: 'destroyer',
    sunk: false,
    hits: 0,
    coords: []
  }
};

const player2Ships = {
  carrier: {
    name: 'carrier',
    sunk: false,
    hits: 0,
    coords: []
  },
  battleship: {
    name: 'battleship',
    sunk: false,
    hits: 0,
    coords: []
  },
  cruiser : {
    name: 'cruiser',
    sunk: false,
    hits: 0,
    coords: []
  },
  submarine: {
    name: 'submarine',
    sunk: false,
    hits: 0,
    coords: []
  },
  destroyer: {
    name: 'destroyer',
    sunk: false,
    hits: 0,
    coords: []
  }
};

// const startGame = () => {
//   const p1 = player1Ships;
//   const p2 = player2Ships;
//   console.log('here');
//   $.ajax({
//     type: "POST",
//     url: "game",
//       contentType: "application/json",
//     dataType: "json",
//     data: JSON.stringify({
//       test: 'hello',
//       test2: 'hi'
//     }),
//     success: function() {
//       alert('success');
//     }
//   });
// }

let setupTurn = 'p1';

const shipsKeys = Object.keys(ships).slice(2);
let shipsKeysIndex = 0;

const setupGrid = createGrid(11,11,click, hover, out);

function click(el, row, col){
  const cell = document.getElementById('setupBoard').getElementsByTagName('td');
  const size = ships[ships.current].size;
  if (!shiftFlag.vertical) {
    const index = (row * 11) + col;
    
    for (let i = 0; i < size; i++) {
      const ship = document.createElement('div');
      ship.className = 'ships';
      cell[index+i].appendChild(ship);
      if (setupTurn === 'p1') { player1Ships[ships.current].coords.push([row, col + i]); }
      else if  (setupTurn === 'p2') { player2Ships[ships.current].coords.push([row, col + i]); }
    }
  } else {
    const index = (row * 11) + col;
    
    for (let i = 0; i < size; i++) {
      const ship = document.createElement('div');
      ship.className = 'ships';
      cell[index+(i*11)].appendChild(ship);
      if (setupTurn === 'p1') { player1Ships[ships.current].coords.push([row + i * 11, col]); }
      else if (setupTurn === 'p2') { player2Ships[ships.current].coords.push([row + i * 11, col]); }
    }
  }

  ships.shipsToPlace--;
  console.log(ships.shipsToPlace);
  console.log(player1Ships);
  console.log(player2Ships);
  if (ships.shipsToPlace === 0 && setupTurn === 'p1') {
    doneButton.style.display = "block";
    doneButton.style.width = "100px";
    doneButton.style.margin = 'auto';
  } else if (ships.shipsToPlace === 0 && setupTurn === 'p2') {
    startGameButton.style.display = 'block';
    startGameButton.style.width = '100px';
    startGameButton.style.margin = 'auto';
    const p1Ships = document.createElement("input");
    p1Ships.setAttribute("type", "text");
    p1Ships.setAttribute("name", 'p1Ships');
    p1Ships.setAttribute("value", JSON.stringify(player1Ships));
    const p2Ships = document.createElement('input');
    p2Ships.setAttribute("type", "text");
    p2Ships.setAttribute("name", 'p2Ships');
    p2Ships.setAttribute("value", JSON.stringify(player2Ships));
    const startForm = document.getElementById('startGameForm');
    startForm.appendChild(p1Ships);
    startForm.appendChild(p2Ships)

  } else {
      shipsKeysIndex++;
      ships.current = shipsKeys[shipsKeysIndex];
  }
}

function hover(el, row, col) {
  console.log(ships.current);
  const size = ships[ships.current].size;
  if (event.ShiftKey) {
    shiftFlag.vertical = !shiftFlag.vertical;
  }
  el.className = 'ship';
  if (!shiftFlag.vertical) {
    const cell = document.getElementById('setupBoard').getElementsByTagName('td');
    const index = (row * 11) + col;
    
    for (let i = 0; i < size; i++) {
      cell[index+i].className = 'ship';
    }
  } else {
    const cell = document.getElementById('setupBoard').getElementsByTagName('td');
    const index = (row * 11) + col;
    
    for (let i = 0; i < size; i++) {
      cell[index+(i*11)].className = 'ship';
    }
  }
}

function out(el ,row, col) {
  const size = ships[ships.current].size;
  if (!shiftFlag.vertical) {
    const cell = document.getElementById('setupBoard').getElementsByTagName('td');
    const index = (row * 11) + col;
    el.className = '';
    for (let i = 0; i < size; i++) {
      cell[index+i].className = '';
    }
  } else {
      const cell = document.getElementById('setupBoard').getElementsByTagName('td');
      const index = (row * 11) + col;
      
      for (let i = 0; i < size; i++) {
        cell[index+(i*11)].className = '';
      }
  }
}

const verticalButtonDiv = document.createElement('div');
verticalButtonDiv.className = 'wrapper';

const verticalButton = document.createElement('button');
verticalButtonDiv.appendChild((verticalButton))
verticalButton.className = '';
verticalButton.position = 'relative;'
verticalButton.innerHTML = '<h2>Horizontal</h2>'
verticalButton.addEventListener('click', (function() {
  shiftFlag.vertical = !shiftFlag.vertical;
  if (shiftFlag.vertical) verticalButton.innerHTML = '<h2>Horizontal</h2>'
  else verticalButton.innerHTML = '<h2>Vertical</h2>'
}));

const doneButtonDiv = document.createElement('div');
doneButtonDiv.className = 'wrapper';


const doneButton = document.createElement('button');
doneButtonDiv.appendChild((doneButton))
doneButton.className = '';
doneButton.position = 'relative;';
doneButton.innerHTML = '<h2>Player 1 \n  Done</h2>';
doneButton.style.display = "none";
doneButton.addEventListener('click', (function() {
  setupTurn = 'p2';
  const newSetupGrid = createGrid(11,11,click, hover, out);
  document.body.replaceChild(newSetupGrid, setupBoard);
  document.getElementById('grid').id = 'setupBoard';
  ships.shipsToPlace = 5;
  ships.current = 'carrier';
  shipsKeysIndex = 0;
  doneButton.style.display = 'none';
}));

const startGameForm = document.createElement('form');
startGameForm.method = "POST";
startGameForm.action = "game"
startGameForm.id = 'startGameForm';

const startGameButton = document.createElement('input');
startGameButton.value = 'Start Game';
startGameButton.type = 'submit';
startGameButton.style.display = 'none';

startGameForm.appendChild(startGameButton);

document.body.appendChild(setupGrid);
document.getElementById('grid').id = 'setupBoard';

document.body.appendChild(verticalButtonDiv);
document.body.appendChild(doneButtonDiv);
document.body.appendChild(startGameForm);
