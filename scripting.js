// on click:
  // check if valid
  // update board
  // render
  // check win
  // switch turn

let StartButton = document.querySelector("#Start")
let BoardDisplay = document.querySelector("#TTT-Grid-Parent")

let ScoreDisplayX = document.querySelector("#X-Score")
let ScoreDisplayO = document.querySelector("#O-Score")

ScoreDisplayO.style.color = "blue"
ScoreDisplayO.style.fontSize = "1.5rem"

ScoreDisplayX.style.color = "red"
ScoreDisplayX.style.fontSize = "1.5rem"



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
      return true 
    } else if (BoardParam[a] === oMark && BoardParam[a] === BoardParam[b] && BoardParam[b] === BoardParam[c]) {
      return true 
    }
    else if ( BoardParam.every(isFull) === true) { return "Draw"}
  }

 }

 const resetGame = function(BoardDisplay,GameboardArr,xPlayer,oPlayer,) { 

  BoardDisplay.innerHTML = ""

  Gameboard.board = [null,null,null,null,null,null,null,null,null]

  xPlayer = createPlayer.playerX
  oPlayer = createPlayer.playerO

  return {BoardDisplay,GameboardArr,xPlayer,oPlayer}

 }

 return {checkWin,posValid,resetGame}

}())


StartButton.addEventListener("click", () => { 

BoardDisplay.innerHTML = ""

const Board = Gameboard.board

Gameboard.board = [null,null,null,null,null,null,null,null,null]

const xPlayer = createPlayer.playerX
const oPlayer = createPlayer.playerO

for ( let i = 0; i < 9 ; i++) { 

  const Cell = document.createElement("div")

  Cell.style.backgroundColor = "lightgray"
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

    Cell.style.color = "red"

    Mark = xPlayer.mark
    Board[Pos] = Mark
    this.textContent = Mark

    if (GameFunctions.checkWin(Board,xPlayer,oPlayer) === "Draw") {

    GameFunctions.resetGame(BoardDisplay,Gameboard.board,xPlayer,oPlayer)      

    } else if (!GameFunctions.checkWin(Board,xPlayer,oPlayer)) {

     xPlayer.turn = false
     oPlayer.turn = true 

      return 

    } else {

      xPlayer.score += 1 
      ScoreDisplayX.innerHTML = xPlayer.score 
      GameFunctions.resetGame(BoardDisplay,Gameboard.board,xPlayer,oPlayer)      

     } 
    }

    if (oPlayer.turn) {

      Cell.style.color = "blue"

      Mark = oPlayer.mark 
      Board[Pos] = Mark 
      this.textContent = Mark

    if (GameFunctions.checkWin(Board,xPlayer,oPlayer) === "Draw") {

    GameFunctions.resetGame(BoardDisplay,Gameboard.board,xPlayer,oPlayer)      

    } else if (!GameFunctions.checkWin(Board,xPlayer,oPlayer)) {

     oPlayer.turn = false
     xPlayer.turn = true 

      return 
      
    } else { 

      oPlayer.score += 1
      ScoreDisplayO.innerHTML = oPlayer.score 
      GameFunctions.resetGame(BoardDisplay,Board,xPlayer,oPlayer)

     }
    }
  })
 }
})
 

 