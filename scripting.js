const prompt = require('prompt-sync')() 


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

  markBoard = function(BoardParam){ 

    pos = Number(prompt("Where will you place your mark? (0-8): "))

    let posValid = false 

    while (!posValid) {
      if (isNaN(pos) === true || pos < 0 || pos > 8) {
        console.log("The position you're trying to mark is invalid!")
        pos = Number(prompt("Where will you place your mark? (0-8): "))
      } if (BoardParam[pos] !== null) {
        console.log("The position you're trying to mark is already taken!")
        pos = Number(prompt("Where will you place your mark? (0-8): "))
      } else { posValid = true}
    }
    
    return pos 
  }

  checkWin = function(BoardParam,xPlayerParam,oPlayerParam,win_flag) {

    xMark = xPlayerParam.mark 
    oMark = oPlayerParam.mark

    const winConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6]             // diagonals
       ];

      function isFull (value) {
        return value != null 
      }

    for (const [a, b, c] of winConditions) {

     if (BoardParam[a] === xMark && BoardParam[a] === BoardParam[b] && BoardParam[b] === BoardParam[c]) {
      win_flag = true 
      xPlayerParam.score ++
      console.log("Player X won!")
      break 
    } else if (BoardParam[a] === oMark && BoardParam[a] === BoardParam[b] && BoardParam[b] === BoardParam[c]) {
      win_flag = true
      oPlayerParam.score ++ 
      console.log("Player O won!")
      break 
    }
    else if ( BoardParam.every(isFull) === true) {
      console.log("It's a draw!")
      win_flag = true 
      break }

  }

  return [BoardParam,xPlayerParam,oPlayerParam,win_flag] 

 }

 return {markBoard,checkWin}

}())

const PlayGame = function() {

  let rounds = prompt("How many rounds do you want to play?: ")
  rounds = Number(rounds)

  for ( let i = 0; i < rounds; i++){

  console.log("Now starting Round: ", i+1)

  let win_flag = false 

  const xPlayer = createPlayer.playerX 
  const oPlayer = createPlayer.playerO

  const Board = Gameboard.board

  const Events = GameFunctions

  while (!win_flag) {

    if (xPlayer.turn) { 

      pos = Events.markBoard(Board)
      Board[pos] = xPlayer.mark

      console.log(Board)
      xPlayer.turn = false, oPlayer.turn = true 

    } else if (oPlayer.turn) {

      pos = Events.markBoard(Board)
      Board[pos] = oPlayer.mark

      console.log(Board)
      oPlayer.turn = false, xPlayer.turn = true

    }

   const Values = Events.checkWin(Board, xPlayer, oPlayer,win_flag)
   win_flag = Values[3]

   } if (win_flag === true) { 

    // Reset all values

    Board.fill(null, 0);
    xPlayer.turn = true, oPlayer.turn = false 

   }
  }
 }

 PlayGame()



// Gameboard: Use a factory function (createGameboard) to allow multiple independent boards if needed.
// Player: Use a factory function (createPlayer) since you need multiple players with names and symbols.
// Game: Use an IIFE (Game) since typically only one game instance runs at a time, encapsulating all logic