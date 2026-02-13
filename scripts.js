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
    return ["", "", "", "", "", "", "", "", ""] 
});

const Game = (() => {
    const player1 = createPlayer("Player 1", "X" );
    const player2 = createPlayer("Player 2", "O" );
    let currentPlayer = player1;
    let winner = null;
    let tie = false;
    if(player1.getName() === player2.getName()){
        console.log("Players cannot have the same name. Please choose different names.");
    }
    let gameboard = createGameboard();  

    const getBoard = () =>  gameboard.join(","); // returns the gameboard as a string for easier display
    const getCurrentPlayer = () => currentPlayer.getName();

    function switchPlayer(){
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    function makeMove(index){
        if(index < 0 || index > 9 || isNaN(index))
        {
            return "Index out of bounds";
        }
        else if(gameboard[index] !== ""){
            return "Cell already occupied";
        }
        else if (gameboard[index] === ""){
            gameboard[index] = currentPlayer.marker;
            switchPlayer();
        }
        return;
    };

    // Check for tie condition before checking for win condition
    if(gameboard.every(cell => cell !== "")){
        console.log("It's a tie!");
    }
    if(gameboard[0] === gameboard[1] && gameboard[1] === gameboard[2] && gameboard[0] !== ""){
        console.log(`${currentPlayer.getName()} wins!`);
    }
    // still need to add winning & tie conditions 

    return { player1, player2, getCurrentPlayer, getBoard, makeMove };
})();


console.log("Current player: " + Game.getCurrentPlayer()); // Output: Player 1
console.log("Outside game function -- current player "  + Game.getCurrentPlayer());
console.log("Starting gameboard " + Game.getBoard());
console.log("Current Player (p1): " + Game.getCurrentPlayer());
Game.makeMove(0);
console.log("Board after player made move: " + Game.getBoard());
console.log("Current Player (p2): " + Game.getCurrentPlayer());
Game.makeMove(4);
console.log("Board after player made move: " + Game.getBoard());
console.log("Current Player (p1): " + Game.getCurrentPlayer());
Game.makeMove(1);
console.log("Board after player made move: " + Game.getBoard());
console.log("Current Player (p2): " + Game.getCurrentPlayer());
Game.makeMove(5);
console.log("Board after player made move: " + Game.getBoard());
console.log("Current Player (p1): " + Game.getCurrentPlayer());
Game.makeMove(2);
console.log("Board after player made move: " + Game.getBoard());
console.log(Game.getCurrentPlayer() + " should have won the game!");



