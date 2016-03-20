/**
 * We need to use an outside library to easily
 * get input from the user. I've already put it
 * in your package.json, and startfrom installed it,
 * but to actually use it, we need to import it.
 *
 * I've given this to you below. We're importing the
 * npm package 'readline-sync' and capturing it by the
 * name readlineSync so that we can use it later.
 */

import readlineSync from 'readline-sync';

/**
 * We're going to be storing multiple Players
 * with some specific information about them. This
 * is a great time to use a constructor.
 *
 * Fill out the constructor function below. It should
 * take the player's name and their tictactoe letter
 * as parameters.
 */

export function Player(name, letter) {
  this.name = name;
  this.letter = letter;
}

// Make a quick function to verify if a spot is blank.  Tired of typing it.
 function notBlank(state) {
   return state !== " ";
 }

/**
 * We need to be able to display the board after
 * each move. To do this, we just need to log
 * out one line for each of our nested arrays
 * we're using for our game state.
 *
 * I've provided this function below as drawBoard.
 * It takes the game state as its only parameter.
 */

function drawBoard(state) {
  console.log("    1   2   3");

  state.forEach(function(row, index) {
    console.log("  ~~~~~~~~~~~~~");
    console.log((index + 1) + " | " + row.join(" | "));
  });
}


/**
 * Before a player can make a move, we need to know
 * if there are moves available to them.
 *
 * Define the emptySpotsLeft function below. It
 * should take a single argument that is the current
 * state of the game as a nested array.
 *
 * Example array:
 * [
 *  ['X', 'X', 'O'],
 *  ['O', 'X', 'X'],
 *  ['X', 'O', 'O']
 * ]
 *
 * If any of the items in the array are a blank space,
 * there are moves left, so it should return true. If
 * all 3 arrays contain Xs or Os, it should return
 * false.
 */

export function emptySpotsLeft(state) {

  var spots = false;
  var flat = state.join(",").split(",");

  flat.forEach(function(letter) {
    if (letter === " ") {
      spots = true;
    }
  });

  return spots;

}

/**
 * We need a function to validate player moves.
 *
 * The obvious thing to validate is input. If they
 * put in anything but 1, 2 or 3 for row or column,
 * we need to reject it.
 *
 * We also need to validate that the space is
 * available. We can do that by converting their
 * input into positions in our array. Since arrays
 * are zero indexed, we know that we actually need
 * state[row - 1][column - 1], so if they want
 * to put something in 1 2 we check state[0][1]
 *
 * Define a function below that can take the current
 * board state and an object representing the
 * player's move and validate it by returning
 * either true or false.
 */

export function validateMove(state, move, player) {

  if ((move.row) > 3 || (move.row) < 1 || (move.column) > 3  || (move.column) < 1) {
    console.log ("Please enter a number between 1 and 3.");
    return false;
  }

  if (state[move.row - 1][move.column - 1] !== " ") {
    if(player.name !== "Tic-Tac-Toe AI"){
      console.log("That is not a valid move.");
    }
    return false;
  }

  return true;

}
/**
 * We need a function to ask a user for their move.
 * This is more complicated than the Guess a Number
 * version because we need to know *which* player
 * we're asking, and we need to ask for multiple
 * pieces of information.
 *
 * Define the function getPlayerMove. It should
 * take the current Player as its only argument.
 * It should display the current user's name and
 * letter, then ask them to choose a row and a
 * column by entering a number from 1 to 3.
 *
 * For example, to choose the top left spot,
 * I would answer 1 to the first question and 1
 * to the second question. To choose the bottom
 * right spot, I would answer 3 to the first
 * question and 3 to the second question.
 *
 * Then, we need to call our validateMove method
 * on our move to make sure it's something we can
 * actually do.
 *
 * Then, we should return an object with the
 * keys row and column set to their answers.
 *
 * NOTE! Their answers will be strings, but
 * we want to convert them to Integer before
 * we return or validate them.
 */

function getPlayerMove(state, player) {

  console.log("Where would you like to place your " + player.letter + ", " + player.name);

  var userRow = Number(readlineSync.question("Row: ", {limit: Number, limitMessage: "That is not a correct row."}));
  var userColumn = Number(readlineSync.question("Column: ", {limit: Number, limitMessage: "That is not a correct column."}));
  var move = {
    row: userRow,
    column: userColumn
  };

  return move;
}



/**
 * One of the hardest things we have to determine
 * is whether or not someone has won the game.
 *
 * Tic-Tac-Toe has 8 possible win conditions:
 * 3 horizontal win conditions, 3 vertical win
 * conditions and 2 diagonal win conditions.
 *
 * While there may be a smart way to solve them,
 * we're just going to brute force it. Write a
 * function that will look at the current state
 * and check for each individual win condition.
 *
 * Horizontal is easy because we can examine
 * each nested array individually. Vertical wins
 * mean comparing positions across all 3 nested
 * arrays. Diagonal wins mean comparing different
 * places across all 3 nested arrays.
 *
 * If any of them are met, it should return the
 * letter that won. Otherwise, it should return
 * false
 */

function horizontalWinTop(state) {
 return state[0][0] === state[0][1] && state[0][1] === state[0][2];
}

function horizontalWinMid(state) {
  return state[1][0] === state[1][1] && state[1][1] === state[1][2];
}

function horizontalWinBot(state) {
  return state[2][0] === state[2][1] && state[2][1] === state[2][2];
}

function verticalWinLeft(state) {
  return state[0][0] === state[1][0] && state[1][0] === state[2][0];
}

function verticalWinMid(state) {
  return state[0][1] === state[1][1] && state[1][1] === state[2][1];
}

function verticalWinRight(state) {
  return state[0][2] === state[1][2] && state[1][2] === state[2][2];
}

function diagonalWin(state) {
  return ((state[0][0] === state[1][1] && state[1][1] === state[2][2]) || (state[0][2] === state[1][1] && state[1][1] === state[2][0]));
}

export function isGameWon(state) {
  // CHECK FOR HORIZONTAL WINS ON EACH ROW
  if (notBlank(state[0][0]) && horizontalWinTop(state)) {
    console.log("1");
    return state[0][0];
  }

  if (notBlank(state[1][0]) && horizontalWinMid(state)) {
    console.log("2");
    return state[1][0];
  }

  if (notBlank(state[2][0]) && horizontalWinBot(state)) {
    console.log("3");
    return state[2][0];
  }

  // CHECK FOR VERTICAL WINS ON EACH COLUMN

  if (notBlank(state[0][0]) && verticalWinLeft(state)) {
    console.log("4");
    return state[0][0];
  }

  if (notBlank(state[0][1]) && verticalWinMid(state)) {
    console.log("5");
    return state[0][1];
  }

  if (notBlank(state[0][2]) && verticalWinRight(state)) {
    console.log("6");
    return state[0][2];
  }

  // CHECK FOR DIAGONAL WINS
  if(notBlank(state[1][1]) && diagonalWin(state)) {
    console.log("7");
    return state[1][1];
  }

  return false;

}

/**
 * Now that we've got our bases covered, we
 * need to piece them together into an actual
 * game.
 *
 * In here, you'll need to define several things.
 *
 * 1: Log out some kind of welcome message when they
 * first run the game.
 *
 * 2: Ask for each player's name and create them by
 * using our Player constructor. Save these in an
 * array of players.
 *
 * 3: Create the initial state of the game. You need
 * to track who's turn it is, whether or not the game
 * has been won, et cetera. I've provided the initial
 * board state.
 *
 * 4: Use a while loop to determine if the game is still
 * going on. If it is, first display the board by
 * calling drawBoard. Then use getPlayerMove to ask the
 * current player for their move. Use validateMove to
 * verify that the move is valid. If it isn't, ask
 * the same player again until they pick a valid move.
 *
 * 5: Once you receive a valid move, change the state
 * of the game to reflect that move by setting their
 * letter to the appropriate place. Then, call isGameWon
 * to see if someone has won. If they have, congratulate
 * them and hop out of the while loop. Otherwise,
 * keep going.
 *
 * 6: Call emptySpotsLeft to see if the board is full.
 * If it is, end the game as a tie and come out of the
 * while loop. If it isn't, let the loop keep going.
 */

 function displayBoard(state) {
  console.log(state[0]);
  console.log(state[1]);
  console.log(state[2]);
 }

function run2pGame() {
  // DISPLAY WELCOME BANNER
  console.log("Welcome to Two-Player Tic-Tac-Toe!");
  console.log("Good luck to both of you!");
  // ASK FOR PLAYER NAMES AND CREATE PLAYERS
  var player1 = new Player(readlineSync.question("Please enter your name: "), "X");
  var player2 = new Player(readlineSync.question("Please enter your name: "), "O");
  var gameNotOver = true;
  var winner;
  var move;
  var firstPlayer = Math.floor(Math.random() * 2) + 1;
  var currentPlayer;

  if (firstPlayer === 1) {
    currentPlayer = player1;
  }
  else {
    currentPlayer = player2;
  }

  // CREATE INITIAL GAME STATE
  var gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  // WHILE LOOP FOR WHEN GAME IS NOT WON
  while(gameNotOver) {
    // DISPLAY BOARD
    displayBoard(gameBoard);

    // GET MOVE FOR CURRENT PLAYER
    move = getPlayerMove(gameBoard, currentPlayer);

    while(!validateMove(gameBoard, move, currentPlayer)){
      move = getPlayerMove(gameBoard, currentPlayer);
    }
    // UPDATE gameBoard with new move
    gameBoard[move.row - 1][move.column - 1] = currentPlayer.letter;
    // CHECK FOR WIN CONDITION
    if (isGameWon(gameBoard)) {
      gameNotOver = false;
      winner = currentPlayer;
      displayBoard(gameBoard);
      console.log(winner.name + " Wins!");
      return;
    }
    // CHECK FOR MOVES LEFT

    if (!emptySpotsLeft(gameBoard)) {
      gameNotOver = false;
      displayBoard(gameBoard);
      console.log("No spots left.  Game over!");
    }

    // UPDATE CURRENT PLAYER
    if (currentPlayer === player1) {
      currentPlayer = player2;
    }
    else {
      currentPlayer = player1;
    }
  }
}

function generateAIMove() {
  var move = {
    row: Math.floor(Math.random() * 3) + 1,
    column: Math.floor(Math.random() * 3) + 1
  };

  return move;
}

function rotateBoard (board) {

  var splitBoard = board.join().split(",");
  var newBoard = [];
  var completeBoard = [[], [], []];

  newBoard[0] = splitBoard[6];
  newBoard[1] = splitBoard[3];
  newBoard[2] = splitBoard[0];
  newBoard[3] = splitBoard[7];
  newBoard[4] = splitBoard[4];
  newBoard[5] = splitBoard[1];
  newBoard[6] = splitBoard[8];
  newBoard[7] = splitBoard[5];
  newBoard[8] = splitBoard[2];

  var j = 0;

  for(var i = 0; i < 3; i++) {
    for(var k = 0; k < 3; k++) {
      completeBoard[i][k] = newBoard[j];
      j++;
    }
  }

  return completeBoard;
}

function topRightAIWin(state) {
  if (state[0][0] === "O" && state[0][1] === "O") {
    return true;
  }
  return false;
}

function topMidAIWin(state) {
  if (state[0][0] === "O" && state[0][2] === "O") {
    return true;
  }
  return false;
}

function topLeftAIWin(state) {
  if (state[0][1] === "O" && state[0][2] === "O") {
    return true;
  }
  return false;
}

function diagonalAIWin(state) {
  if (state[0][0] === "O" && state[1][1] === "O") {
    return true;
  }
  return false;
}

function straightAIWin(state) {
  if (state[0][1] === "O" && state[1][1] === "O") {
    return true;
  }
  return false;
}

function topRightAILoss(state) {
  if (state[0][0] === "X" && state[0][1] === "X") {
    return true;
  }
  return false;
}

function topMidAILoss(state) {
  if (state[0][0] === "X" && state[0][2] === "X") {
    return true;
  }
  return false;
}

function topLeftAILoss(state) {
  if (state[0][1] === "X" && state[0][2] === "X") {
    return true;
  }
  return false;
}

function diagonalAILoss(state) {
  if (state[0][0] === "X" && state[1][1] === "X") {
    return true;
  }
  return false;
}

function straightAILoss(state) {
  if (state[0][2] === "X" && state[2][1] === "X") {
    return true;
  }
  return false;
}

function generateAIMoveHard(state, firstPlayer) {

  var tempState = state;
  var move = {
    row: 2,
    column: 2
  };

  //INITIAL MOVES
  if(state[1][1] === " ") {
    move = {
      row: 2,
      column: 2
    }
  }
  else if(state[0][0] === " ") {
    move = {
      row: 1,
      column: 1
    }
  }
  else if(state[0][2] === " ") {
    move = {
      row: 1,
      column: 3
    }
  }
  else {
    move = {
      row: 3,
      column: 1
    }
  }
  //END INITIAL MOVES

  //Checking the top-right win on all rotated boards.
  if(topRightAIWin(tempState) && state[0][2] === " ") {
    move = {
      row: 1,
      column: 3
    }
    console.log("tr1");
  }

  tempState = rotateBoard(tempState);

  if(topRightAIWin(tempState) && state[2][2] === " ") {
    move = {
      row: 3,
      column: 3
    }
    console.log("tr2");
  }

  tempState = rotateBoard(tempState);

  if(topRightAIWin(tempState) && state[2][0] === " ") {
    move = {
      row: 3,
      column: 1
    }
    console.log("tr3");
  }

  tempState = rotateBoard(tempState);

  if(topRightAIWin(tempState) && state[0][0] === " ") {
    move = {
      row: 1,
      column: 1
    }
    console.log("tr4");
  }
  //END TOP RIGHT

  //Checking all top-mid wins for all rotated boards
  tempState = state;

  if(topMidAIWin(tempState) && state[0][1] === " ") {
    move = {
      row: 1,
      column: 2
    }
    console.log("tm1");
  }

  tempState = rotateBoard(tempState);

  if(topMidAIWin(tempState) && state[1][2] === " ") {
    move = {
      row: 2,
      column: 3
    }
    console.log("tm2");
  }

  tempState = rotateBoard(tempState);

  if(topMidAIWin(tempState) && state[2][1] === " ") {
    move = {
      row: 3,
      column: 2
    }
    console.log("tm3");
  }

  tempState = rotateBoard(tempState);

  if(topMidAIWin(tempState) && state[1][0] === " ") {
    move = {
      row: 2,
      column: 1
    }
    console.log("tm4");
  }
  //END TOP MID WINS

  //Checking all top left wins for all rotated boards.
  tempState = state;

  if(topLeftAIWin(tempState) && state[0][0] === " ") {
    move = {
      row: 1,
      column: 1
    }
    console.log("tl1");
  }

  tempState = rotateBoard(tempState);

  if(topLeftAIWin(tempState) && state[0][2] === " ") {
    move = {
      row: 1,
      column: 3
    }
    console.log("tl2");
  }

  tempState = rotateBoard(tempState);

  if(topLeftAIWin(tempState) && state[2][2] === " ") {
    move = {
      row: 3,
      column: 3
    }
    console.log("tl3");
  }

  tempState = rotateBoard(tempState);

  if(topLeftAIWin(tempState) && state[2][0] === " ") {
    move = {
      row: 3,
      column: 1
    }
    console.log("tl4");
  }
  //END TOP LEFT WINS

  //Checking all diagonal wins for all rotated boards.
  tempState = state;

  if(diagonalAIWin(tempState) && state[2][2] === " ") {
    move = {
      row: 3,
      column: 3
    }
    console.log("d1");
  }

  tempState = rotateBoard(tempState);

  if(diagonalAIWin(tempState) && state[2][0] === " ") {
    move = {
      row: 3,
      column: 1
    }
    console.log("d2");
  }

  tempState = rotateBoard(tempState);

  if(diagonalAIWin(tempState) && state[0][0] === " ") {
    move = {
      row: 1,
      column: 1
    }
    console.log("d3");
  }

  tempState = rotateBoard(tempState);

  if(diagonalAIWin(tempState) && state[0][2] === " ") {
    move = {
      row: 1,
      column: 3
    }
    console.log("d4");
  }
  //END DIAGONAL WINS

  //Checking all straight wins on all rotated boards.
  tempState = state;

  if(straightAIWin(tempState) && state[2][1] === " ") {
    move = {
      row: 3,
      column: 2
    }
    console.log("s1");
  }

  tempState = rotateBoard(tempState);

  if(straightAIWin(tempState) && state[1][0] === " ") {
    move = {
      row: 2,
      column: 1
    }
    console.log("s2");
  }

  tempState = rotateBoard(tempState);

  if(straightAIWin(tempState) && state[0][1] === " ") {
    move = {
      row: 1,
      column: 2
    }
    console.log("s3");
  }

  tempState = rotateBoard(tempState);

  if(straightAIWin(tempState) && state[1][2] === " ") {
    move = {
      row: 2,
      column: 3
    }
    console.log("s4");
  }
  //END STRAIGHT WINS

  //LOSSES **************************

  //Checking the top-right win on all rotated boards.
  if(topRightAILoss(tempState) && state[0][2] === " ") {
    move = {
      row: 1,
      column: 3
    }
    console.log("tr1l");
  }

  tempState = rotateBoard(tempState);

  if(topRightAILoss(tempState) && state[2][2] === " ") {
    move = {
      row: 3,
      column: 3
    }
    console.log("tr2");
  }

  tempState = rotateBoard(tempState);

  if(topRightAIWin(tempState) && state[2][0] === " ") {
    move = {
      row: 3,
      column: 1
    }
    console.log("tr3");
  }

  tempState = rotateBoard(tempState);

  if(topRightAIWin(tempState) && state[0][0] === " ") {
    move = {
      row: 1,
      column: 1
    }
    console.log("tr4");
  }
  //END TOP RIGHT

  //Checking all top-mid wins for all rotated boards
  tempState = state;

  if(topMidAIWin(tempState) && state[0][1] === " ") {
    move = {
      row: 1,
      column: 2
    }
    console.log("tm1");
  }

  tempState = rotateBoard(tempState);

  if(topMidAIWin(tempState) && state[1][2] === " ") {
    move = {
      row: 2,
      column: 3
    }
    console.log("tm2");
  }

  tempState = rotateBoard(tempState);

  if(topMidAIWin(tempState) && state[2][1] === " ") {
    move = {
      row: 3,
      column: 2
    }
    console.log("tm3");
  }

  tempState = rotateBoard(tempState);

  if(topMidAIWin(tempState) && state[1][0] === " ") {
    move = {
      row: 2,
      column: 1
    }
    console.log("tm4");
  }
  //END TOP MID WINS

  //Checking all top left wins for all rotated boards.
  tempState = state;

  if(topLeftAIWin(tempState) && state[0][0] === " ") {
    move = {
      row: 1,
      column: 1
    }
    console.log("tl1");
  }

  tempState = rotateBoard(tempState);

  if(topLeftAIWin(tempState) && state[0][2] === " ") {
    move = {
      row: 1,
      column: 3
    }
    console.log("tl2");
  }

  tempState = rotateBoard(tempState);

  if(topLeftAIWin(tempState) && state[2][2] === " ") {
    move = {
      row: 3,
      column: 3
    }
    console.log("tl3");
  }

  tempState = rotateBoard(tempState);

  if(topLeftAIWin(tempState) && state[2][0] === " ") {
    move = {
      row: 3,
      column: 1
    }
    console.log("tl4");
  }
  //END TOP LEFT WINS

  //Checking all diagonal wins for all rotated boards.
  tempState = state;

  if(diagonalAIWin(tempState) && state[2][2] === " ") {
    move = {
      row: 3,
      column: 3
    }
    console.log("d1");
  }

  tempState = rotateBoard(tempState);

  if(diagonalAIWin(tempState) && state[2][0] === " ") {
    move = {
      row: 3,
      column: 1
    }
    console.log("d2");
  }

  tempState = rotateBoard(tempState);

  if(diagonalAIWin(tempState) && state[0][0] === " ") {
    move = {
      row: 1,
      column: 1
    }
    console.log("d3");
  }

  tempState = rotateBoard(tempState);

  if(diagonalAIWin(tempState) && state[0][2] === " ") {
    move = {
      row: 1,
      column: 3
    }
    console.log("d4");
  }
  //END DIAGONAL WINS

  //Checking all straight wins on all rotated boards.
  tempState = state;

  if(straightAIWin(tempState) && state[2][1] === " ") {
    move = {
      row: 3,
      column: 2
    }
    console.log("s1");
  }

  tempState = rotateBoard(tempState);

  if(straightAIWin(tempState) && state[1][0] === " ") {
    move = {
      row: 2,
      column: 1
    }
    console.log("s2");
  }

  tempState = rotateBoard(tempState);

  if(straightAIWin(tempState) && state[0][1] === " ") {
    move = {
      row: 1,
      column: 2
    }
    console.log("s3");
  }

  tempState = rotateBoard(tempState);

  if(straightAIWin(tempState) && state[1][2] === " ") {
    move = {
      row: 2,
      column: 3
    }
    console.log("s4");
  }
  //END STRAIGHT WINS

  tempState = state;

  return move;
}

function run1pGame(mode) {
  // DISPLAY WELCOME BANNER
  console.log("Welcome to One-Player Tic-Tac-Toe!");
  console.log("Good luck!");
  // ASK FOR PLAYER NAMES AND CREATE PLAYERS
  var player1 = new Player(readlineSync.question("Please enter your name: "), "X");
  var computer = new Player("Tic-Tac-Toe AI", "O");
  var gameNotOver = true;
  var winner;
  var move;
  var firstPlayer = Math.floor(Math.random() * 2) + 1;
  var currentPlayer;

  if (firstPlayer === 1) {
    currentPlayer = player1;
  }
  else {
    currentPlayer = computer;
  }

  var gameBoard = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' '],
  ];

  while(gameNotOver) {

    displayBoard(gameBoard);

    if (currentPlayer === computer) {
      if(mode === 2) {
        move = generateAIMoveHard(gameBoard, firstPlayer);

        // while(!validateMove(gameBoard, move, currentPlayer)){
        //   move = generateAIMoveHard(gameBoard, firstPlayer);
        // }
      }
      else {
        move = generateAIMove();

        while(!validateMove(gameBoard, move, currentPlayer)){
          move = generateAIMove();
        }
      }

      console.log("My turn!  Check out this move!")
    }
    else {
      move = getPlayerMove(gameBoard, currentPlayer);

      while(!validateMove(gameBoard, move, currentPlayer)){
        move = getPlayerMove(gameBoard, currentPlayer);
      }
    }

    // UPDATE gameBoard with new move
    gameBoard[move.row - 1][move.column - 1] = currentPlayer.letter;
    // CHECK FOR WIN CONDITION
    if (isGameWon(gameBoard)) {
      gameNotOver = false;
      winner = currentPlayer;
      displayBoard(gameBoard);
      console.log(winner.name + " Wins!");
      return;
    }
    // CHECK FOR MOVES LEFT

    if (!emptySpotsLeft(gameBoard)) {
      gameNotOver = false;
      displayBoard(gameBoard);
      console.log("No spots left.  Game over!");
    }

    // UPDATE CURRENT PLAYER
    if (currentPlayer === player1) {
      currentPlayer = computer;
    }
    else {
      currentPlayer = player1;
    }
  }
}

function runGame() {
  var game = 0;

  console.log("It's time for some Tic-Tac-Toe!")
  console.log("Enter 1 for 1 player game against AI.");
  console.log("Enter 2 for 2 player game against a friend.");

  while(game !== 1 && game !==2) {
    game = Number(readlineSync.question("Please enter 1 or 2: "));

    if(game === 1) {
      console.log("Would you like to player against normal or hard AI?");
      console.log("Type 1 for normal or 2 for hard.");
      var type = Number(readlineSync.question("Please enter 1 or 2: "));
      run1pGame(type);
    }
    else if (game === 2) {
      run2pGame();
    }
    else {
      console.log("That is not a valid input.  Please try again.")
    }
  }
}

runGame();
