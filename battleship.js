var lastClicked;
var attackGrid = clickableGrid(11,11,function(el,row,col,i){
    console.log("You clicked on element:",el);
    console.log("You clicked on row:",row);
    console.log("You clicked on col:",col);

    el.className='clicked';
    if (lastClicked) lastClicked.className='';
    lastClicked = el;
});

var defendGrid = clickableGrid(11,11,function(el,row,col,i){
	console.log("You clicked on element:",el);
	console.log("You clicked on row:",row);
	console.log("You clicked on col:",col);
	console.log("You clicked on item #:",i);

	el.className='clicked';
	if (lastClicked) lastClicked.className='';
	lastClicked = el;
});
     
function clickableGrid( rows, cols, callback ){
	var i = 0;
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
	alert('clicked start button');
}))
document.body.appendChild(startButtonDiv);
