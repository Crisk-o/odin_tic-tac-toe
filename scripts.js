
function createPlayer(name, marker){
    return { 
        name: name, 
        marker: marker,
        setName(newName) {
            this.name = newName;
        },
        getName() {
            return `${this.name}`;
        },
        getMarker() {
            return this.marker;
        },
        getPlayer() {
            return `${this.name  + " " +  this.marker }`;
        }
    };
}

// only 1 instane of gameboard, so we can use it to store the state of the game.
const createGameboard = (() => {
    const cell0 = document.getElementById('cell-0');
    const cell1 = document.getElementById('cell-1');
    const cell2 = document.getElementById('cell-2');
    const cell3 = document.getElementById('cell-3');
    const cell4 = document.getElementById('cell-4');
    const cell5 = document.getElementById('cell-5');
    const cell6 = document.getElementById('cell-6');
    const cell7 = document.getElementById('cell-7');
    const cell8 = document.getElementById('cell-8');
    return [cell0.textContent, cell1.textContent, cell2.textContent, cell3.textContent, cell4.textContent, cell5.textContent, cell6.textContent, cell7.textContent, cell8.textContent] 
    
});

const Game = (() => {
    const player1 = createPlayer("Player 1", "X" );
    const player2 = createPlayer("Player 2", "O" );
    let currentPlayer = player1;
    let waitingPlayer = player2;
    if(player1.getName() === player2.getName()){
        console.log("Players cannot have the same name. Please choose different names.");
    }
    let gameboard = createGameboard();  

    const getBoard = () =>  gameboard.join(", "); // returns the gameboard as a string for easier display
    const getCurrentPlayer = () => currentPlayer.getName();
    const getWaitingPlayer = () => waitingPlayer.getName();

    function switchPlayer(){
        if(currentPlayer === player1){
            currentPlayer = player2;
            waitingPlayer = player1;
            playerTwoDiv.classList.toggle('currentPlayer');
            playerOneDiv.classList.toggle('waitingPlayer');
            
        }
        else{
            currentPlayer = player1;
            playerOneDiv.toggle('currentPlayer');
            waitingPlayer = player2;
            playerTwoDiv.toggle('waitingPlayer');
        }
    };

    // for use in makeMove function
    function checkGameOver(){
        // Check for tie condition before checking for win condition
        if(gameboard.every(cell => cell !== "")){
            console.log("It's a tie!");
        }
        // checks for 3 matches in same row
        if(gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[0] !== ""){
            console.log(`${waitingPlayer.getName()} wins!`);
        }
        else if(gameboard[3] === gameboard[4] && gameboard[4] === gameboard[5] && gameboard[3] !== ""){
            console.log(`${waitingPlayer.getName()} wins!`);
        }
        else if(gameboard[6] === gameboard[7] && gameboard[7] === gameboard[8] && gameboard[6] !== ""){
            console.log(`${waitingPlayer.getName()} wins!`);
        }

        //checks for 3 matches in same column
        if(gameboard[0] === gameboard[3] && gameboard[3] === gameboard[6] && gameboard[0] !== ""){
            console.log(`${waitingPlayer.getName()} wins!`);
        }
        else if(gameboard[1] === gameboard[4] && gameboard[4] === gameboard[7] && gameboard[1] !== ""){
            console.log(`${waitingPlayer.getName()} wins!`);
        }
        else if(gameboard[2] === gameboard[5] && gameboard[5] === gameboard[8] && gameboard[2] !== ""){
            console.log(`${waitingPlayer.getName()} wins!`);
        }

        // checks for 3 matches diagonally
        if(gameboard[0] === gameboard[4] && gameboard[4] === gameboard[8] && gameboard[0] !== ""){
            console.log(`${waitingPlayer.getName()} wins!`);
        }
        else if(gameboard[2] === gameboard[4] && gameboard[4] === gameboard[6] && gameboard[2] !== ""){
            console.log(`${waitingPlayer.getName()} wins!`);
        }
    }

    
    function makeMove(index){
        console.log("Current game board: " + getBoard());
        if(index < 0 || index > 9 || isNaN(index))
        {
            return "Index out of bounds";
        }
        else if(gameboard[index] !== ""){
            return "Cell already occupied";
        }
        else if (gameboard[index] === ""){
            gameboard[index].textContent = currentPlayer.marker;
            switchPlayer();
        }
        console.log("Board after " +  getWaitingPlayer() + "'s move: " + getBoard());
        checkGameOver();
    };

    return { player1, player2, getCurrentPlayer, getWaitingPlayer, makeMove };
})();

const allCells = document.querySelectorAll('.cell');
    allCells.forEach((cell) => {
        cell.addEventListener('click', Game.makeMove);
    });
const playerOneDiv = document.getElementById("playerOneDiv");
const playerOneNamePlate = document.createElement('p');
playerOneNamePlate.classList.add('playerNamePlates');
playerOneNamePlate.textContent = Game.getCurrentPlayer();
playerOneDiv.append(playerOneNamePlate);

const playerTwoDiv = document.getElementById("playerTwoDiv");
const playerTwoNamePlate = document.createElement('p');
playerTwoNamePlate.classList.add('playerNamePlates');
playerTwoNamePlate.textContent = Game.getWaitingPlayer();
playerTwoDiv.append(playerTwoNamePlate);










