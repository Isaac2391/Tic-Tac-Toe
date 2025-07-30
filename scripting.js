// on click:
  // check if valid
  // update board
  // render
  // check win
  // switch turn

let StartButton = document.querySelector("#Start")
let BoardDisplay = document.querySelector("#TTT-Grid-Parent")

let ScoreDisplayX = document.querySelector("#Player-X")
let ScoreDisplayO = document.querySelector("#Player-O")

const Gameboard = (function(){

  const board = [null,null,null,null,null,null,null,null,null]

  return {board}

 })()

 const createPlayer = (function() { 

  const playerX = { 
    score : 0, 
    mark : "X",
    turn : true,
  }

  const playerO = { 
    score : 0,
    mark : "O",
    turn : false, 
  }

  return {playerX,playerO}
 })() 

 const GameFunctions = (function() {

 const posValid = function(pos,BoardParam) { 

    return (pos >= 0 && pos < 9 && BoardParam[pos] === null)

  }

  const checkWin = function(BoardParam,xPlayerParam,oPlayerParam) {

    const xMark = xPlayerParam.mark 
    const oMark = oPlayerParam.mark

    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]             
       ];

      function isFull (value) {
        return value != null 
      }

    for (const [a, b, c] of winConditions) {

     if (BoardParam[a] === xMark && BoardParam[a] === BoardParam[b] && BoardParam[b] === BoardParam[c]) {
      xPlayerParam.score ++
      return true 
    } else if (BoardParam[a] === oMark && BoardParam[a] === BoardParam[b] && BoardParam[b] === BoardParam[c]) {
      oPlayerParam.score ++ 
      return true 
    }
    else if ( BoardParam.every(isFull) === true) { return true}
  }

 }

 return {checkWin,posValid}

}())


StartButton.addEventListener("click", () => { 

BoardDisplay.innerHTML = ""

const Board = Gameboard.board

Gameboard.board = [null,null,null,null,null,null,null,null,null]

const xPlayer = createPlayer.playerX
const oPlayer = createPlayer.playerO

for ( let i = 0; i < 9 ; i++) { 

  const Cell = document.createElement("div")

  Cell.style.backgroundColor = "gray"
  Cell.style.color = "black"
  Cell.style.fontSize = "5rem"
  Cell.style.alignItems = "center"
  Cell.style.border = "3px solid black"
  Cell.dataset.index = i 

  BoardDisplay.appendChild(Cell)

  Cell.addEventListener("click", function() { 

  const Pos = parseInt(this.dataset.index)

  if (!GameFunctions.posValid(Pos,Board)) return 

   let Mark = ""

    if (xPlayer.turn) { 

    Mark = xPlayer.mark
    Board[Pos] = Mark
    this.textContent = Mark

    if (!GameFunctions.checkWin(Board,xPlayer,oPlayer)) {

     xPlayer.turn = false
     oPlayer.turn = true 

      return 

    } else {

      ScoreDisplayO.innerHTML += xPlayer.score

     } 
    }

    if (oPlayer.turn) {

      Mark = oPlayer.mark 
      Board[Pos] = Mark
      this.textContent = Mark

      oPlayer.turn = false
      xPlayer.turn = true 

      if (!GameFunctions.checkWin(Board,xPlayer,oPlayer)) {

     oPlayer.turn = false
     xPlayer.turn = true 

      return 
      
    } else { 

      ScoreDisplayX.innerHTML += oPlayer.score

     }
    }
  })
 }
})
 

 