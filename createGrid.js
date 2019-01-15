function createGrid( rows, cols, callback ){
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

