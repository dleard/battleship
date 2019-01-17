const instructions = document.createElement('div');
instructions.id = 'setupInstructions';
instructions.style.visibility='hidden';
instructions.innerHTML = '<h2>Set up your ships!</h2><br/><p>Press Shift to switch horizontal or vertical</p>';
document.body.appendChild(instructions);

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
    }
  } else {
    const index = (row * 11) + col;
    
    for (let i = 0; i < size; i++) {
      const ship = document.createElement('div');
      ship.className = 'ships';
      cell[index+(i*11)].appendChild(ship);
    }
  }

  ships.shipsToPlace--;
  console.log(ships.shipsToPlace);
  if (ships.shipsToPlace === 0) {
    doneButton.style.visibility = 'visible';
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
doneButton.innerHTML = '<h2>Done</h2>';
doneButton.style.visibility = 'hidden';
doneButton.addEventListener('click', (function() {
}));

document.body.appendChild(setupGrid);
document.getElementById('grid').id = 'setupBoard';

document.body.appendChild(verticalButtonDiv);
document.body.appendChild(doneButtonDiv);