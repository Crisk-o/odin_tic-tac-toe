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
};


// grabbing all cells for later.
const gameboard = document.getElementById('gameboard');
const gamearea = document.getElementById('game-area');
const cell0 = document.getElementById('cell-0');
const cell1 = document.getElementById('cell-1');
const cell2 = document.getElementById('cell-2');
const cell3 = document.getElementById('cell-3');
const cell4 = document.getElementById('cell-4');
const cell5 = document.getElementById('cell-5');
const cell6 = document.getElementById('cell-6');
const cell7 = document.getElementById('cell-7');
const cell8 = document.getElementById('cell-8');

const createGameboard = (() => {
    let gameboard = document.querySelectorAll('.cell');
    gameboardArray = Array.from(gameboard);
    return gameboardArray;
});

const Game = (() => {
    let player1 = createPlayer("Player 1", "X" );
    let player2 = createPlayer("Player 2", "O" );
    let currentPlayer = player1;
    let waitingPlayer = player2;
    let gameboardArray = createGameboard();

    const getBoard = () => gameboardArray.forEach((cell) => console.log(cell.textContent));
    const getCurrentPlayer = () => currentPlayer.getName();
    const getWaitingPlayer = () => waitingPlayer.getName();

    function switchPlayer(){
        if(currentPlayer === player1){
            currentPlayer = player2;
            waitingPlayer = player1;
            playerTwoNamePlate.classList.toggle('currentPlayer');
            
            playerOneNamePlate.classList.toggle('currentPlayer');
            
        }
        else{
            currentPlayer = player1;
            playerOneNamePlate.classList.toggle('currentPlayer');
            waitingPlayer = player2;
            playerTwoNamePlate.classList.toggle('currentPlayer');
        }
    };

    // for use in makeMove function
    function checkGameOver(){
        let result;
        const endGameScreen = document.createElement('div');
        endGameScreen.classList.add('endGameScreen');
        const restartBtn = document.createElement('button');
        restartBtn.textContent = "Restart Game";
        restartBtn.addEventListener('click', () => {window.location.reload()});

        // Check for tie condition before checking for win condition
        if(gameboardArray.every(cell => cell.textContent !== "")){
            result = "It's a tie!";
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);
        }
        // checks for 3 matches in same row
        if(gameboardArray[0].textContent === gameboardArray[1].textContent && gameboardArray[1].textContent === gameboardArray[2].textContent && gameboardArray[0].textContent !== ""){
            result = (`${waitingPlayer.getName()} wins!`);
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);
        }
        else if(gameboardArray[3].textContent === gameboardArray[4].textContent && gameboardArray[4].textContent === gameboardArray[5].textContent && gameboardArray[3].textContent !== ""){
            result = (`${waitingPlayer.getName()} wins!`);
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);
        }
        else if(gameboardArray[6].textContent === gameboardArray[7].textContent && gameboardArray[7].textContent === gameboardArray[8].textContent && gameboardArray[6].textContent !== ""){
            result = (`${waitingPlayer.getName()} wins!`);
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);

        }
        //checks for 3 matches in same column
        if(gameboardArray[0].textContent === gameboardArray[3].textContent && gameboardArray[3].textContent === gameboardArray[6].textContent && gameboardArray[0].textContent !== ""){
            result = (`${waitingPlayer.getName()} wins!`);
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);
        }
        else if(gameboardArray[1].textContent === gameboardArray[4].textContent && gameboardArray[4].textContent === gameboardArray[7].textContent && gameboardArray[1].textContent !== ""){
            result = (`${waitingPlayer.getName()} wins!`);
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);

        }
        else if(gameboardArray[2].textContent === gameboardArray[5].textContent && gameboardArray[5].textContent === gameboardArray[8].textContent && gameboardArray[2].textContent !== ""){
            result = (`${waitingPlayer.getName()} wins!`);
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);
        }

        // checks for 3 matches diagonally
        if(gameboardArray[0].textContent === gameboardArray[4].textContent && gameboardArray[4].textContent === gameboardArray[8].textContent && gameboardArray[0].textContent !== ""){
            result = (`${waitingPlayer.getName()} wins!`);
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);

        }
        else if(gameboardArray[2].textContent === gameboardArray[4].textContent && gameboardArray[4].textContent === gameboardArray[6].textContent && gameboardArray[2].textContent !== ""){
            result = (`${waitingPlayer.getName()} wins!`);
            endGameScreen.textContent = result;
            gamearea.classList.toggle('hidden');
            gameboard.appendChild(endGameScreen);
        }
        endGameScreen.appendChild(restartBtn);

    }

    function makeMove(index){
        // console.log("Current game board: " + getBoard());
        if(gameboardArray[index].textContent === "X" || gameboardArray[index].textContent === "O"){
            return console.log("Cell already occupied. Try again.");
        }
        else if (gameboardArray[index].textContent === ""){
            gameboardArray[index].textContent = currentPlayer.marker;
            switchPlayer();
        }
        // console.log("Board after " +  getWaitingPlayer() + "'s move: " + getBoard());
        checkGameOver();
    };

    return { player1, player2, getBoard, getCurrentPlayer, getWaitingPlayer, makeMove };
})();

// adding listeners for each cell
cell0.addEventListener('click', () => {
    let index = 0;
    Game.makeMove(index);
});
cell1.addEventListener('click', () => {
    let index = 1;
    Game.makeMove(index);
});
cell2.addEventListener('click', () => {
    let index = 2;
    Game.makeMove(index);
});
cell3.addEventListener('click', () => {
    let index = 3;
    Game.makeMove(index);
});
cell4.addEventListener('click', () => {
    let index = 4;
    Game.makeMove(index);
});
cell5.addEventListener('click', () => {
    let index = 5;
    Game.makeMove(index);
});
cell6.addEventListener('click', () => {
    let index = 6;
    Game.makeMove(index);
});
cell7.addEventListener('click', () => {
    let index = 7;
    Game.makeMove(index);
});
cell8.addEventListener('click', () => {
    let index = 8;
    Game.makeMove(index);
});
/////
/* grabs playerdivs, nameplates, adds styles, */
const playerOneDiv = document.getElementById("playerOneDiv");
const playerOneNamePlate = document.createElement('p');
playerOneNamePlate.classList.add('playerNamePlates');
const playerTwoDiv = document.getElementById("playerTwoDiv");
const playerTwoNamePlate = document.createElement('p');
playerTwoNamePlate.classList.add('playerNamePlates');
playerOneNamePlate.textContent = Game.player1.getName();
playerOneDiv.append(playerOneNamePlate);
playerTwoNamePlate.textContent = Game.player2.getName();
playerTwoDiv.append(playerTwoNamePlate);

/* Grab form dialog, setNameBtns for p1 & p2, adds eventListeners */
const formDialog = document.getElementById('nameSelectForm');
const formDialog2 = document.getElementById('nameSelectForm2');
const setNameP1Btn = document.getElementById('set-p1');
const setNameP2Btn = document.getElementById('set-p2');

setNameP1Btn.addEventListener('click', () => {
    formDialog.showModal();
});

setNameP2Btn.addEventListener('click', () => {
    formDialog2.showModal();
});
const form = document.getElementById('nameForm');
const form2 = document.getElementById('nameForm2');
form.addEventListener('submit', (event) => {
    const nameInput = document.getElementById('playerName');
    playerOneNamePlate.textContent = nameInput.value;   
    formDialog.close();
    event.preventDefault()
    form.reset(); 
});
form2.addEventListener('submit', (event) => {
    const nameInput = document.getElementById('playerName2');
    playerTwoNamePlate.textContent = nameInput.value;   
    formDialog2.close();
    event.preventDefault()
    form2.reset(); 
});


// grabs start game Btn and reveals gameboard
const startGameBtn = document.getElementById('startGameBtn');
startGameBtn.addEventListener('click', () => {
    playerOneNamePlate.classList.add('currentPlayer');
    gamearea.classList.toggle("hidden");
    
});





