pacman = {
	x: 6,
	y: 4,
}
ghost = {
   x: 1, 
   y: 1,
}
ghost2 ={
	x: 20,
	y: 1,
}
var audioWin = new Audio('sound/win.mp3');
var audioLosing = new Audio ('sound/losing.mp3');


    // 1 => <div class='wall'></div>
    // 2 => <div class='coin'></div>
    // 3 => <div class='ground'></div>
    // 4 => <div class='ghost'></div>
    // 5 => <div class='pacman'></div>
    // map = [ 1, 2, 3 ]
    // map = [ [1,2,3], [1,2,3], [1,2,3] ];
	map = [ [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], 
	[1,1,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1], 
	[1,2,1,2,1,2,1,2,1,1,1,2,1,2,1,1,2,1,2,1,2,1], 
	[1,2,2,2,1,2,1,2,1,2,2,2,2,2,2,2,2,1,2,1,2,1], 
	[1,2,2,2,1,2,1,2,1,2,2,2,2,2,1,2,2,2,2,2,2,1], 
	[1,2,2,2,2,2,2,2,2,2,1,2,1,2,1,2,1,2,2,1,2,1], 
	[1,2,1,1,2,2,1,2,2,1,1,2,1,2,1,2,1,1,2,1,2,1], 
	[1,2,2,2,2,2,1,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1], 
	[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ]
//on cherche dans html la div pour stocker notre world
let el = document.getElementById('world');
let score = 0;
const scoreDisplay = document.getElementById('score')
const livesDisplay = document.getElementById('lives')
let lives = 3;

function drawWorld(){
	el.innerHTML = '';
	for(var y = 0; y < map.length ; y = y + 1) {
		for(var x = 0; x < map[y].length ; x = x + 1) {
			if (x == pacman.x && y == pacman.y){
				el.innerHTML += "<div class='pacman'></div>";
			} 
			else if (x == ghost.x && y == ghost.y){
				el.innerHTML += "<div class='ghost'></div>";
			}
			else if (x == ghost2.x && y == ghost2.y){
				el.innerHTML += "<div class='ghost_two'></div>";
			}
			else if (map[y][x] === 1) {
				el.innerHTML += "<div class='wall'></div>";
			}
			else if (map[y][x] === 2) {
				el.innerHTML += "<div class='coin'></div>";
			}
			else if (map[y][x] === 3) {
				el.innerHTML += "<div class='ground'></div>";
			}
		}
		el.innerHTML += "<br>";
	}
}


drawWorld();
//bouger pacMan avec evenement onkeydown
document.onkeydown = function pacMove (event){
	// console.log(event);
	if (event.keyCode === 37){ // PACMAN MOVE LEFT
		//verifie si y'a pas un mur
		if ( map[pacman.y][pacman.x-1] !== 1){
			pacman.x = pacman.x - 1;
			pacmanEat();
			drawWorld();	
		}
	}
	else if (event.keyCode === 38){ // PACMAN MOVE UP
		if ( map[pacman.y-1][pacman.x] !== 1){
			pacman.y = pacman.y - 1;
			pacmanEat();
			drawWorld();
			}
	}
	else if (event.keyCode === 39){ // PACMAN MOVE RIGHT
		if ( map[pacman.y][pacman.x+1] !== 1){
			pacman.x = pacman.x + 1;
			pacmanEat();
			drawWorld();		
		}
	}
	else if (event.keyCode === 40){ // PACMAN MOVE DOWN
		if ( map[pacman.y+1][pacman.x] !== 1){
			pacman.y = pacman.y + 1;
			pacmanEat();
			drawWorld();
		}
	}
		
	//console.log(map)
}

//Move Ghost
let ghostEatsPacman = false;
//interval qui fait bouger le ghost en fonction de la position de pacman
let intervalId;
//La méthode setInterval () appelle une fonction 
//à des intervalles spécifiés (en millisecondes).

intervalId = setInterval(function ghostMove(){
if(pacman.x > ghost.x && pacman.x > ghost2.y){
if ( (map[ghost.y][ghost.x + 1] &&  map[ghost2.y][ghost2.x + 1]) !== 1){//check if there is a wall
	 ghost.x = ghost.x + 1;
	 ghost2.y = ghost2.y + 1; //move the ghost closer to pacman to the right
	 drawWorld();
}	
}
if (pacman.x < ghost.x && pacman.x < ghost2.x){
if ( (map[ghost.y][ghost.x - 1] && map[ghost2.y][ghost2.x - 1] ) !== 1){//check if there is a wall
	ghost.x = ghost.x - 1;
	ghost2.x = ghost2.x - 1; //move the ghost closer to pacman to the left
	drawWorld()  
	 }
  }
if (pacman.y > ghost.y && pacman.y > ghost2.y){
if ( (map[ghost.y + 1][ghost.x] && map[ghost2.y + 1][ghost2.x])!== 1){//check if there is a wall
	ghost.y = ghost.y + 1;
	ghost2.y = ghost2.y + 1; 
	 //move the ghost closer to pacman down
	drawWorld()  	   
} 
}
if (pacman.y < ghost.y && pacman.y < ghost2.y){
if ((map[ghost.y - 1][ghost.x] && map[ghost2.y - 1][ghost2.x]) !== 1){//check if there is a wall
	ghost.y = ghost.y - 1;
	ghost2.y = ghost2.y - 1; //move the ghost closer to pacman up
	drawWorld()  	
}
}











//here I want pacman to lose a life and reset the game with new life count.
if (pacman.x == ghost.x && pacman.y == ghost.y && ghostEatsPacman == false && lives == 3){
ghostEatsPacman = true;
audioLosing.play();
lives --;
document.getElementById('lives').innerHTML = "Lives: " + lives;
document.querySelector('.lives').innerHTML = "you lost one life!";
pacman.x = 6, pacman.y = 4
ghost.x = 1, ghost.y = 1	
drawWorld();
}
ghostEatsPacman = false;
	if (pacman.x == ghost.x && pacman.y == ghost.y && ghostEatsPacman == false && lives == 2){
	ghostEatsPacman = true;
	audioLosing.play();
	lives --;
	document.getElementById('lives').innerHTML = "Lives: " + lives;
	document.querySelector('.lives').innerHTML = "you lost yet another life!"
	
	pacman.x = 6, pacman.y = 4
	ghost.x = 1, ghost.y = 1	
	drawWorld();
	}
	
	ghostEatsPacman = false;

		if (pacman.x == ghost.x && pacman.y == ghost.y && ghostEatsPacman == false && lives == 1){
		ghostEatsPacman = true;
		audioLosing.play();
		document.getElementById('lives').innerHTML = "Lives: 0";
		let message =	document.querySelector('.lives').innerHTML = "Oh no! No more lives!!! Game Over!!!";
		message.style.textAlign = "center";//this is supposed to center my text but it doesn't!
		pacman.x = 6, pacman.y = 4
		ghost.x = 1, ghost.y = 1	
		drawWorld();
		clearInterval(intervalId);//this stops my setInterval 
		}
		ghostEatsPacman = false;//I don't know if I need this here?
		
}, 1000)


//this is linked to my play again button to reset the game
function restart(){
	document.location.reload();
}



//Dots eaten function

function pacmanEat(){
 if(map[pacman.y][pacman.x] == 2 ){
 score ++ 
 map[pacman.y][pacman.x] = 3;//empty space
 }
 scoreDisplay.innerHTML = score
 console.log(score)	 
 if (score == 54) {
	audioWin.play();
	alert('you win !!');
 }
 
}

//   function gameOver() {
// 	if (pacman.x == ghost.x && pacman.y == ghost.y && ghostEatsPacman == false){
// 		ghostEatsPacman = true;
// 		audioLosing.play();
// 		alert('you do not exist anymore');
// 	}
//     }

  //Ghost eats Pacman
//  function ghostEatsPacman() {
    
   // if(map[pacman.y][pacman.x] == map[ghost.y][ghost.x] ) {
    //    alert('You lose, game over!');
  //      }

//}



// if (score == 54) {
// 	audioWin.play();
// 	alert('you win !!');
//  }