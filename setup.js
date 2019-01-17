const instructions = document.createElement('div');
instructions.id = 'setupInstructions';
instructions.style.visibility='hidden';
instructions.innerHTML = '<h2>Set up your ships!</h2><br/><p>Press Shift to switch horizontal or vertical</p>';
document.body.appendChild(instructions);

const shiftFlag = {
  vertical: false
}

const setupGrid = createGrid(11,11,click, hover, out);

function click(el, row, col){
  const index = (row * 11) + col;
  const cell = document.getElementById('setupBoard').getElementsByTagName('td');
  const ship = document.createElement('div');
  ship.style.height = '30px';
  ship.style.width = '30px';
  ship.style.backgroundColor = 'black';
  
  cell[index].appendChild(ship);
  if (!shiftFlag.vertical) {
    const index = (row * 11) + col;
    
    for (let i = 0; i < 5; i++) {
      cell[index+i].appendChild(ship);
    }
  } else {
    const index = (row * 11) + col;
    
    for (let i = 0; i < 5; i++) {
      cell[index+(i*11)].className = 'ship';
    }
  }
}

function hover(el, row, col) {
  const cellHovered = [row, col];
  // console.log(cellHovered);
  if (event.ShiftKey) {
    shiftFlag.vertical = !shiftFlag.vertical;
  }
  el.className = 'ship';
  if (!shiftFlag.vertical) {
    const cell = document.getElementById('setupBoard').getElementsByTagName('td');
    const index = (row * 11) + col;
    
    for (let i = 0; i < 5; i++) {
      cell[index+i].className = 'ship';
    }
  } else {
    const cell = document.getElementById('setupBoard').getElementsByTagName('td');
    const index = (row * 11) + col;
    
    for (let i = 0; i < 5; i++) {
      cell[index+(i*11)].className = 'ship';
    }
  }
}

function out(el ,row, col) {
  if (!shiftFlag.vertical) {
    const cell = document.getElementById('setupBoard').getElementsByTagName('td');
    const index = (row * 11) + col;
    el.className = '';
    for (let i = 0; i < 5; i++) {
      cell[index+i].className = '';
    }
  } else {
      const cell = document.getElementById('setupBoard').getElementsByTagName('td');
      const index = (row * 11) + col;
      
      for (let i = 0; i < 5; i++) {
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
verticalButton.innerHTML = '<h2>H/V</h2>'
verticalButton.addEventListener('click', (function() {
  shiftFlag.vertical = !shiftFlag.vertical;
  console.log(shiftFlag.vertical);
}));

document.body.appendChild(setupGrid);
document.getElementById('grid').id = 'setupBoard';

document.body.appendChild(verticalButtonDiv);