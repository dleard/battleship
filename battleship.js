//var lastClicked;

var hitBox = document.createElement('div');
hitBox.id = 'hit';
hitBox.style.visibility='hidden';
document.body.appendChild(hitBox);

function removeHitBox() {
  hitBox.style.visibility='hidden';
}

var attackGrid = createGrid(11,11,function(el,row,col){
    var cellClicked = [row, col];
    let hit = false;
    enemyShips.carrier.coords.forEach(function (coord) {
      if (cellClicked[0] === coord[0] && cellClicked[1] === coord[1]) {
        hit = true;
      }
    });
    if (hit === true) {
      console.log(`HIT on the enemy ${enemyShips.carrier.name}`);
      hitBox.id = 'hit';
      hitBox.innerHTML = '<h2>HIT!</h2>';
      hitBox.style.visibility='visible';
      
      el.className = 'hit'; 
    }else {
      hitBox.id = 'miss';
      hitBox.innerHTML = '<h2>MISS!</h2>';
      hitBox.style.visibility='visible'; 
      
      el.className = 'miss';
    }
    setTimeout(removeHitBox, 1000);

    // el.className='clicked';
    // if (lastClicked) lastClicked.className='';
    // lastClicked = el;
});

var defendGrid = createGrid(11,11,function(el,row,col){

	// el.className='clicked';
	// if (lastClicked) lastClicked.className='';
	// lastClicked = el;
});

var enemyShips = {
  carrier: {
    name: 'carrier',
    sunk: false,
    hits: [],
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

document.body.appendChild(attackGrid);
document.getElementById('grid').id = 'attackBoard';
document.getElementById('attackBoard').style.visibility = 'hidden';


var gridSeparator = document.createElement('div');
gridSeparator.id = 'gridSeparator';
document.body.appendChild(gridSeparator);
document.getElementById('gridSeparator').style.visibility = 'hidden';

document.body.appendChild(defendGrid);
document.getElementById('grid').id = 'defendBoard';
document.getElementById('defendBoard').style.visibility = 'hidden';

var startButtonDiv = document.createElement('div');
startButtonDiv.className = 'wrapper';

var startButton = document.createElement('button');
startButtonDiv.appendChild((startButton))
startButton.className = 'button';
startButton.innerHTML = '<h2>START</h2>'
startButton.addEventListener('click', (function() {
	startButton.style.display = 'none';
  document.getElementById('attackBoard').style.visibility = 'visible';
  document.getElementById('attackBoard').style.width = '330px';
  document.getElementById('attackBoard').style.margin = 'auto';
  document.getElementById('gridSeparator').style.visibility = 'visible';
  document.getElementById('gridSeparator').style.width = '330px';
  document.getElementById('gridSeparator').style.margin = 'auto';
  document.getElementById('defendBoard').style.visibility = 'visible';
  document.getElementById('defendBoard').style.width = '330px';
  document.getElementById('defendBoard').style.margin = 'auto';
}))
document.body.appendChild(startButtonDiv);
