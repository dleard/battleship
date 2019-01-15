var lastClicked;
var attackGrid = clickableGrid(11,11,function(el,row,col,i){
    var cellClicked = [row, col];
    console.log(...enemyShips.carrier.coords);
    enemyShips.carrier.coords.forEach(function (coord) {
      if (cellClicked[0] === coord[0] && cellClicked[1] === coord[1]) {
        console.log(`HIT on the enemy ${enemyShips.carrier.name}`);
      }  
    });

    el.className='clicked';
    if (lastClicked) lastClicked.className='';
    lastClicked = el;
});

var defendGrid = createGrid(11,11,function(el,row,col,i){

	el.className='clicked';
	if (lastClicked) lastClicked.className='';
	lastClicked = el;
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


function clickableGrid( rows, cols, callback ){
	var grid = document.createElement('table');
	grid.className = 'grid';
	
	var tr = grid.appendChild(document.createElement('tr'));
	var letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
	
	for (var c = 0; c < cols; c++) {
		var cell = tr.appendChild(document.createElement('td'));     
		cell.innerText = letters[c];
		cell.style.backgroundColor = 'white';
	}

	for (var r = 1;r < rows; r++){
		var tr = grid.appendChild(document.createElement('tr'));
		for (var c = 0;c < cols; c++){
			var cell = tr.appendChild(document.createElement('td'));
			var num = 1;
			if (c === 0) {
				cell.innerText = r;
				cell.style.backgroundColor = 'white';
				num++;
			} else {
				cell.addEventListener('click',(function(el,r,c,i){
					return function(){
						callback(el,r,c);
					}
				})(cell,r,c),false);
			}
		}
	}
	grid.id = 'grid';
	return grid;
}

document.body.appendChild(attackGrid);
document.getElementById('grid').id = 'attackBoard';
document.getElementById('attackBoard').style.display = 'none';


var gridSeparator = document.createElement('div');
gridSeparator.id = 'gridSeparator';
document.body.appendChild(gridSeparator);
document.getElementById('gridSeparator').style.display = 'none';

document.body.appendChild(defendGrid);
document.getElementById('grid').id = 'defendBoard';
document.getElementById('defendBoard').style.display = 'none';

var startButtonDiv = document.createElement('div');
startButtonDiv.className = 'wrapper';

var startButton = document.createElement('button');
startButtonDiv.appendChild((startButton))
startButton.className = 'button';
startButton.innerHTML = '<h2>START</h2>'
startButton.addEventListener('click', (function() {
	startButton.style.display = 'none';
  document.getElementById('attackBoard').style.display = 'block';
  document.getElementById('attackBoard').style.width = '330px';
  document.getElementById('attackBoard').style.margin = 'auto';
  document.getElementById('gridSeparator').style.display = 'block';
  document.getElementById('gridSeparator').style.width = '330px';
  document.getElementById('gridSeparator').style.margin = 'auto';
  document.getElementById('defendBoard').style.display = 'block';
  document.getElementById('defendBoard').style.width = '330px';
  document.getElementById('defendBoard').style.margin = 'auto';
}))
document.body.appendChild(startButtonDiv);
