
const hitBox = document.createElement('div');
hitBox.id = 'hit';
hitBox.style.visibility='hidden';
document.body.appendChild(hitBox); 

function removeHitBox() {
  hitBox.style.visibility='hidden';
}

const p1Attacks = [];

const shipsKeys = Object.keys(p1Ships);

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
      for (let i = 0; i < shipsKeys.length; i++) {
        p2Ships[shipsKeys[i]].coords.forEach(function (coord) {
          if (cellClicked[0] === coord[0] && cellClicked[1] === coord[1]) {
            hit = true;
            p2Ships[shipsKeys[i]].hits++;
            if (p2Ships[shipsKeys[i]].hits === p2Ships[shipsKeys[i]].coords.length) {
              p2Ships[shipsKeys[i]].sunk = true;
              console.log(`Sank enemy ${p2Ships[shipsKeys[i]].name} (${p2Ships[shipsKeys[i]].hits})`)
            }
          }
        });
        if (hit === true) {
          console.log(`HIT on the enemy ${p2Ships[shipsKeys[i]].name}`);
          hitBox.id = 'hit';
          hitBox.innerHTML = '<h2>HIT!</h2>';
          hitBox.style.visibility='visible';
          
          el.className = 'hit';
          break;
           
        }
      }
      if (hit === false) {
        hitBox.id = 'miss';
        hitBox.innerHTML = '<h2>MISS!</h2>';
        hitBox.style.visibility='visible'; 
        
        el.className = 'miss';
      }
    }
    setTimeout(removeHitBox, 1000);

});

const defendGrid = createGrid(11,11,function(el,row,col){
  
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

const cell = document.getElementById('defendBoard').getElementsByTagName('td');

for (ship in p1Ships) {
  p1Ships[ship].coords.forEach(function(coordinate) {
      const index = (coordinate[0] * 11) + coordinate[1];
      const shipBlock = document.createElement('div');
      shipBlock.className = 'ships';
      cell[index].appendChild(shipBlock);
  });
}

const startButtonDiv = document.createElement('div');
startButtonDiv.className = 'wrapper';

const startButton = document.createElement('button');
startButtonDiv.appendChild((startButton))
startButton.className = 'button';
startButton.innerHTML = '<h2>START</h2>'
startButton.addEventListener('click', (function() {
  startButton.style.display = 'none';
  document.getElementById('attackBoard').style.visibility = 'visible';
  document.getElementById('gridSeparator').style.visibility = 'visible';
  document.getElementById('defendBoard').style.visibility = 'visible';
}));
document.body.appendChild(startButtonDiv);
