//var lastClicked;

const hitBox = document.createElement('div');
hitBox.id = 'hit';
hitBox.style.visibility='hidden';
document.body.appendChild(hitBox); 

const instructions = document.createElement('div');
instructions.id = 'setupInstructions';
instructions.style.visibility='hidden';
instructions.innerHTML = '<h2>Set up your ships!</h2><br/><p>Press Shift to switch horizontal or vertical</p>';
document.body.appendChild(instructions);

const gameFlags = {
  turn: 0,
  playing: 0,
  setup: 0,
  end: 0
}

function removeHitBox() {
  hitBox.style.visibility='hidden';
}

const p1Attacks = [];

const p2Ships = {
  carrier: {
    name: 'carrier',
    sunk: false,
    hits: 0,
    coords: [[1, 1], [1, 2], [1, 3],[1, 4],[1, 5]]
  },
  battleShip: {
    sunk: false
  },
  cruiser: {
    sunk: false
  },
  submarine: {
    sunk: false
  },
  destroyer: {
    sunk: false
  }
}



const attackGrid = createGrid(11,11,function(el,row,col){
    const cellClicked = [row, col];
    let hit = false;
    let duplicate = false;
    for (let i = 0; i < p1Attacks.length; i++) {
      if (p1Attacks[i][0] === cellClicked[0] && p1Attacks[i][1] === cellClicked[1]) {
        duplicate = true;
        hitBox.id = 'attacked';
        hitBox.innerHTML = '<h2>NOPE!</h2>';
        hitBox.style.visibility = 'visible';
      }
    }
    
    if (duplicate === false) {
      p1Attacks.push([cellClicked[0], cellClicked[1]]);
      p2Ships.carrier.coords.forEach(function (coord) {
        if (cellClicked[0] === coord[0] && cellClicked[1] === coord[1]) {
          hit = true;
          p2Ships.carrier.hits++;
          if (p2Ships.carrier.hits === 5) {
            p2Ships.carrier.sunk = true;
            console.log(`Sank enemy ${p2Ships.carrier.name} (${p2Ships.carrier.hits})`)
          }
        }
      });
      if (hit === true) {
        console.log(`HIT on the enemy ${p2Ships.carrier.name}`);
        hitBox.id = 'hit';
        hitBox.innerHTML = '<h2>HIT!</h2>';
        hitBox.style.visibility='visible';
        
        el.className = 'hit'; 
      }
      
      if (hit === false) {
        hitBox.id = 'miss';
        hitBox.innerHTML = '<h2>MISS!</h2>';
        hitBox.style.visibility='visible'; 
        
        el.className = 'miss';
      }
    }
    setTimeout(removeHitBox, 1000);

    // el.className='clicked';
    // if (lastClicked) lastClicked.className='';
    // lastClicked = el;
});

const setup = function () {
  if (gameFlags.setup === 1) {
    document.getElementById('setupInstructions').style.visibility = 'visible';
    document.getElementById('defendBoard').style.visibility='visible';
    document.getElementById('defendBoard').id = 'defendBoardSetup';
    console.log(document.getElement)
  }    
  
    
}



const defendGrid = createGrid(11,11,function(el,row,col){
  const cellClicked = [row, col];
  if (event.shiftKey) {

  }
});

document.body.appendChild(attackGrid);
document.getElementById('grid').id = 'attackBoard';
document.getElementById('attackBoard').style.visibility = 'hidden';


const gridSeparator = document.createElement('div');
gridSeparator.id = 'gridSeparator';
document.body.appendChild(gridSeparator);
document.getElementById('gridSeparator').style.visibility = 'hidden';

document.body.appendChild(defendGrid);
document.getElementById('grid').id = 'defendBoard';
document.getElementById('defendBoard').style.visibility = 'hidden';

const startButtonDiv = document.createElement('div');
startButtonDiv.className = 'wrapper';

const startButton = document.createElement('button');
startButtonDiv.appendChild((startButton))
startButton.className = 'button';
startButton.innerHTML = '<h2>START</h2>'
startButton.addEventListener('click', (function() {
  gameFlags.playing = 1;
  gameFlags.setup = 1;
  gameFlags.turn = 'p1';
  startButton.style.display = 'none';
  document.getElementById('attackBoard').style.visibility = 'visible';
  document.getElementById('gridSeparator').style.visibility = 'visible';
  document.getElementById('defendBoard').style.visibility = 'visible';
  console.log(gameFlags);
  // setup();
}));
document.body.appendChild(startButtonDiv);
