function createGrid( rows, cols, callback ){
	const grid = document.createElement('table');
	grid.className = 'grid';
	
	const tr = grid.appendChild(document.createElement('tr'));
	const letters = [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
	
	for (let c = 0; c < cols; c++) {
		const cell = tr.appendChild(document.createElement('td'));     
		cell.innerText = letters[c];
		cell.style.backgroundColor = 'white';
	}

	for (let r = 1;r < rows; r++){
		const tr = grid.appendChild(document.createElement('tr'));
		for (var c = 0;c < cols; c++){
			const cell = tr.appendChild(document.createElement('td'));
			if (c === 0) {
				cell.innerText = r;
				cell.style.backgroundColor = 'white';
			} else {
				// cell.addEventListener('click',(function(el,r,c){
				// 	return function(){
				// 		callback(el,r,c);
				// 	}
        // })(cell,r,c));
        cell.addEventListener('hover', (function(el,r,c){
					return function(){
						callback(el,r,c);
					}
        })(cell,r,c));
			}
		}
	}
	grid.id = 'grid';
	return grid;
}

