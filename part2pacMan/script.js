document.addEventListener('DOMContentLoaded', () => {
    const grid =document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 28 ; //28 x28 =784 squares
    let score = 0
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
      ]
      const squares = []
      //create your board
      function createBoard() {
        for (let i = 0; i < layout.length; i++) {
          const square = document.createElement('div') //creat a div element.
          grid.appendChild(square) // insert it to the document (body).
          squares.push(square) // ajout des div crées de la constant square dans le tableau squares qu'on initié
    
          //add layout to the board
          if(layout[i] === 0) {
            squares[i].classList.add('pac-dot') // renvoie le nom de la class et ajoute un style css sur element
          } else if (layout[i] === 1) {
            squares[i].classList.add('wall') //
          } else if (layout[i] === 2) {
            squares[i].classList.add('ghost-lair')
          } else if (layout[i] === 3) {
            squares[i].classList.add('power-pellet')
          }
        }
      }
      createBoard()
      //starting position of pac-man
      let pacmanCurrentIndex = 492;
      squares[pacmanCurrentIndex].classList.add("pac-man")
      //move pac-man with key codes
      function movePacman(e) {
          squares[pacmanCurrentIndex].classList.remove("pac-man")
          switch(e.keyCode) {
            case 37: //arrow left
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall')) pacmanCurrentIndex -= 1 
            break
            case 38: // arrow up
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains('wall') ) pacmanCurrentIndex -= width 
                break
            case 39: // arrow right
                if(pacmanCurrentIndex% width < width-1 && !squares[pacmanCurrentIndex +1].classList.contains('wall')) pacmanCurrentIndex += 1
                break
            case 40: // arrow down
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains('wall')) pacmanCurrentIndex += width
                break
          }
          squares[pacmanCurrentIndex].classList.add("pac-man")
          pacDotEat()
          checkForGameOver()
        }
        //The addEventListener() method attaches an event handler to the specified element.
        document.addEventListener('keyup', movePacman)
        //what happens when Pac man eat a pac-dot
        function pacDotEat() {
          if (squares[pacmanCurrentIndex].classList.contains('pac-dot')){
            score++;
            scoreDisplay.innerHTML = score
            squares[pacmanCurrentIndex].classList.remove('pac-dot')
          }
          }
          let blinkyCurrentIndex = 348
          squares[blinkyCurrentIndex].classList.add('blinky')
          let pinkyCurrentIndex = 250
          squares[pinkyCurrentIndex].classList.add('pinky')
          let inkyCurrentIndex = 480
          squares[inkyCurrentIndex].classList.add('inky')

           //move blinky
          function moveBlinky() {
            const directions =  [-1, +1, +width, -width]
            let ghostimerId  = NaN
            let direction = directions[Math.floor(Math.random() * directions.length)]
            ghostimerId = setInterval(function() {
              console.log(blinkyCurrentIndex)
              if  (!squares[blinkyCurrentIndex + direction].classList.contains('wall')) {
                  //remove the ghosts classes
                  squares[blinkyCurrentIndex].classList.remove('blinky')
                  blinkyCurrentIndex += direction
                    squares[blinkyCurrentIndex].classList.add('blinky')

                  }else {
                    direction = directions[Math.floor(Math.random() * directions.length)]
                }
                checkForGameOver()
            }, 300)
          }
          moveBlinky()
          function movepinky() {
            const directions =  [-1, +1, +width, -width]
            let ghostimerId  = NaN
            let direction = directions[Math.floor(Math.random() * directions.length)]
            ghostimerId = setInterval(function() {
              console.log(pinkyCurrentIndex)
              if  (!squares[pinkyCurrentIndex + direction].classList.contains('wall')) {
                  //remove the ghosts classes
                  squares[pinkyCurrentIndex].classList.remove('pinky')
                  pinkyCurrentIndex += direction
                    squares[pinkyCurrentIndex].classList.add('pinky')

                  }else {
                    direction = directions[Math.floor(Math.random() * directions.length)]
                }
                checkForGameOver()
            }, 300)
          }
          movepinky()
          function moveinky() {
            const directions =  [-1, +1, +width, -width]
            let ghostimerId  = NaN
            let direction = directions[Math.floor(Math.random() * directions.length)]
            ghostimerId = setInterval(function() {
              console.log(pinkyCurrentIndex)
              if  (!squares[inkyCurrentIndex + direction].classList.contains('wall')) {
                  //remove the ghosts classes
                  squares[inkyCurrentIndex].classList.remove('inky')
                  inkyCurrentIndex += direction
                    squares[inkyCurrentIndex].classList.add('inky')

                  }else {
                    direction = directions[Math.floor(Math.random() * directions.length)]
                }
                checkForGameOver()
            }, 300)
          }
          moveinky()
          function checkForGameOver() {
            if (squares[pacmanCurrentIndex].classList.contains('blinky', 'pinky','inky')){
              // ghosts.forEach(ghost => clearInterval(ghost.timerId))
              document.removeEventListener('keyup', movePacman)
              setTimeout(function(){ alert("Game Over"); }, 500)
            }
          }
}
)
