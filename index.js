
//------------------------ Game Project---------------------------
//Do you remember the game Battleship we created before? well .... it is time to make it with the DOM!!
//We are providing you with the design of a board (in the DOM) for a player1, you have to create the board for the player2 using the id property 'board_player2' -> it is the second list (ul) in your index.html file
//First ask the players for their names (use propmt)
//Now each time the turn player clicks on any cell of the opponent's board (you have to verify if the player is clicking the right board) the program needs to verify if there is an opponent's ship in that cell. If it is then the opponent has one less ship
//We want you to store the data of each player in two Player objects. Each object has to store: name, remaining boats, and their respective board.
//Each board needs to be initialized randomly with '0' and four '1' wich means the state of the cell. Numbers 1 are representing the 4 positions of the player's ships
//Also we want you to display the name of the turn player in the tag that has the id 'turn_player'. And if there is a winner  a text with: 'Congratulationes {name_player}!! you win'
//in the index.html file you are going to find 4 more ids: 'name_player1' , 'name_player2' , 'ships_player1' , 'ships_player2'. We want to see the information of each player in the respective elements
//As our previous Battleship, the winner is the player that hits the 4 opponent's ships first
//one more Thing create a 'reset' and a 'new game' buttons as childs of the element with the id 'buttons'. the reset button has to start the game again and the new game create a new game with new players and a new random board.

const board_Player1 = document.getElementById('board_player1'); 
const board_Player2 = document.getElementById('board_player2'); 
var name_Player1 = 'player 1'; //prompt('Enter name of the Player1');
var name_Player2 = 'player 2'; //prompt('Enter name of the Player2');
const lives_player1 = document.getElementById('ships_player1');
const lives_player2 = document.getElementById('ships_player2');
//'reset' and a 'new game' buttons
const buttons = document.getElementById('buttons');
const resetButton = document.createElement('button');
const newGameButton = document.createElement('button');
resetButton.innerHTML = 'reset';
newGameButton.innerHTML = 'new game';
buttons.appendChild(resetButton);
buttons.appendChild(newGameButton);


let player1 = {
  name: name_Player1, 
  shipCount: 4,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
}

let player2 = {
  name: name_Player2, 
  shipCount: 4,
  gameBoard: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]
}

var turn = document.getElementById('turn_player');
turn.innerHTML = player1.name;//display player's turn

var gameResult;//declare variable

var gameBoard_player1 = [
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0]
                        ]; // = player1.gameBoard; //copy game board of player1 with 4 ships
var gameBoard_player2 = [
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0],
                          [0, 0, 0, 0]
                        ]; // = player2.gameBoard; //copy game board of player2 with 4 ships

function createCells (board_Player) {
  lives_player1.innerHTML = player1.shipCount;
  lives_player2.innerHTML = player2.shipCount;

  for (var x = 0; x < 4; x++) {
    const li = document.createElement('li'); // creating childs for the list (board), in this case represent a row number 'x' of the board

    for (var y = 0; y < 4; y++) {
      const cell = document.createElement('div');
      cell.className = "square"; // adding css properties to make it looks like a square
      cell.textContent = `${x},${y}`;  // saves the coordinates as a string value 'x,y'
      cell.value = 0;//state of the cell


      //this function adds the click event to each cell
      cell.addEventListener( 'click', (e) => {

        let cell = e.target; // get the element clicked
        console.log( cell.textContent) //display the coordinates in the console
        //cell.style.visibility = 'hidden';// this  means that the contents of the element will be invisible, but the element stays in its original position and size / try it clicking on any of the black cells (in your browser) and see whats happens
        cell.style.background ="purple"; //with this propertie you can change the background color of the clicked cell. try comment the line bellow and uncomment this line. Do not forget to save this file and refresh the borwser to see the changes
        
        suckCheck(cell);
      
        gameResult = battleship();
        if (gameResult != 0) {
          alert(gameResult);
        }
          
      });
      li.appendChild(cell); //adding each cell into the row number x
    }

    board_Player.appendChild(li); //adding each row into the board
  }
}

function suckCheck(cell) {
  let coordinates = cell.textContent.split(','); //get array of coordintes: x and y
  console.log(coordinates); //display array of coordinates
  let x = parseInt(coordinates[0]); console.log(x);
  let y = parseInt(coordinates[1]); console.log(y);

  if (turn.innerHTML === player1.name){
    console.log('Turn of player 1');
    if (player2.gameBoard[x][y] === 1) {
      player2.shipCount--;
      player2.gameBoard[x][y] = 0;
      lives_player2.innerHTML = player2.shipCount;
      console.log(player2.shipCount);
    } 
    turn.innerHTML = player2.name;
  }
  else if (turn.innerHTML === player2.name){
    console.log('Turn of player 2');
    if (player1.gameBoard[x][y] === 1) {
      player1.shipCount--;
      player1.gameBoard[x][y] = 0;
      lives_player1.innerHTML = player1.shipCount;
      console.log(player1.shipCount);
    }
    turn.innerHTML = player1.name;
  }
}
var battleship = () => {
  if (player1.shipCount === 0) {
    return `Congratulations ${player2.name.toLocaleUpperCase()}!! you win!`
  } else if (player2.shipCount === 0) {
    return `Congratulations ${player1.name.toLocaleUpperCase()}!! you win!`
  } return 0;
}

function addShips(player, gameBoard_player) {
  //gameBoard_player = player.gameBoard; //copy game board of player1 with 4 ships
  //gameBoard_player2 = player2.gameBoard; //copy game board of player2 with 4 ships
  var count = 0;
  while (count <4) {
    var randomX = Math.floor(Math.random()*3)+1;
    var randomY = Math.floor(Math.random()*3)+1;
    if (player.gameBoard[randomX][randomY] === 0) {
      player.gameBoard[randomX][randomY] = 1;

      gameBoard_player[randomX][randomY] = 1; //

      count++;
      console.log(`${player.name}: `, randomX, randomY);
    }
  }
  //console.log(gameBoard_player); //
}

resetButton.addEventListener('click', () => {
  console.log('reset button cklicked')
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (gameBoard_player1[i][j] === 1){
        //console.log(gameBoard_player1);
        player1.gameBoard[i][j] === gameBoard_player1[i][j]; // player1.gameBoard[i][j] = 1;
        console.log(`${player1.name}: `, i, j);
      }
      if (gameBoard_player2[i][j] === 1){
        player2.gameBoard[i][j] === gameBoard_player2[i][j]; // player2.gameBoard[i][j] = 1;
        console.log(`${player2.name}: `, i, j);
      }
    }
  }
  player1.shipCount ='4';
  player2.shipCount ='4';

  board_Player1.innerHTML='';
  board_Player2.innerHTML='';
  createCells(board_Player1, player2);
  createCells(board_Player2, player1);
  
})

newGameButton.addEventListener('click', () => {
  player1.name = 'new player 1'; //prompt('Enter name of the Player1');
  player2.name = 'new player 2'; //prompt('Enter name of the Player2');

  turn.innerHTML = player1.name;
  document.getElementById('name_player1').innerHTML = player1.name;
  document.getElementById('name_player2').innerHTML = player2.name;

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      //if (gameBoard_player1[i][j] === 1){
        //console.log(gameBoard_player1);
        player1.gameBoard[i][j] = 0;
        gameBoard_player1[i][j] = 0;
      //}
      //if (gameBoard_player2[i][j] === 1){
        player2.gameBoard[i][j] = 0;
        gameBoard_player2[i][j] = 0;
      //}
    }
  }
  console.log(player1.gameBoard)
  addShips(player1, gameBoard_player1);
  addShips(player2, gameBoard_player2);

  player1.shipCount ='4';
  player2.shipCount ='4';

  player1.gameBoard.forEach(element => {
    element = 0;
  });

  board_Player1.innerHTML='';
  board_Player2.innerHTML='';

  createCells(board_Player1, player2);
  createCells(board_Player2, player1);
})

/******PLAY*****/
document.getElementById('name_player1').innerHTML = player1.name;
document.getElementById('name_player2').innerHTML = player2.name;

addShips(player1, gameBoard_player1);
addShips(player2, gameBoard_player2);

createCells(board_Player1, player2);
createCells(board_Player2, player1);

// console.log(gameBoard_player1);
// console.log(gameBoard_player2);


