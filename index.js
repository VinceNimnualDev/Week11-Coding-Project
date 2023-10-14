let board = Array(9).fill(null); // Decalre 'board' array with 9 elements to be filled by start as null
let currentPlayer = 'X'; // Set starting player to X

function makeMove(position, isComputer = false) { // Define function 'makeMove' with 'position' as argument
    if (board[position] === null) { // Checks if position on board is empty
        board[position] = currentPlayer; // Allows player to set X or O if cell is empty
        document.getElementsByClassName('board-cell')[position].textContent = currentPlayer; // Updates the cell in the DOM to display current players mark
        
            if(checkWinner()) { // Checks checkWinner function if players move has a winning combination
                showGameAlert(`${currentPlayer} wins!`, "success"); // Displays message if there is a winner
                resetGame(); // Resets game
                return;
            }

            // If every cell in the board array is full and there is no winner then it's a draw and reset
            if (board.every(cell => cell != null)) {  // Makes sure that all cells are not empty
                showGameAlert('It\'s a draw!', "warning") // Displays draw message
                resetGame(); // Resets game
                return;
            }

            togglePlayer(); // Switches Player

            if (currentPlayer === 'O' && !isComputer) { // Toggle back to X if the condition is true
                computerMove();
            }
        }
    }

            function togglePlayer() {
                console.log("Toggling player from", currentPlayer);
                currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                console.log("Currently player is now", currentPlayer);
                document.getElementById("turnDisplay").textContent = `${currentPlayer}'s turn`; // Updates the DOM to toggle the turn display for current player
    }
    
    // Function for computer's move
    function computerMove() {
        let availablePositions = []; // Array of available positions 

        // Loop through board to find empty cells
        for(let i =0; i < board.length; i++) {
            if(board[i] === null) {
            availablePositions.push(i);
        }
    }

    // Computer chooses random position based of empty cell availibility
    let randomPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];

    // Exectute move on available position
    makeMove(randomPosition, true);
}

// Function to check for winning move
function checkWinner() {
    // All possible winning combinations
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Loop through all winning combinations to check for winner
    return winningCombos.some(combo => // Returns true if there is any combo from winningCombos 
        board[combo[0]] !== null && 
        combo.every(index => board[index] === board[combo[0]]) // Make sure that the cell is not null and has the same value
        );
}

function resetGame() {
    board = Array(9).fill(null); // Reset game to initiall setting
    currentPlayer = 'X'; // Reset player to X

    // Loop to clear all cells in board and sets it to null
    for (let cell of document.getElementsByClassName('board-cell')) {
        cell.textContent = '';
    }

}


function showGameAlert(message, alertType) {  // funtion of 'showGameAlert' with parameters 'message' and 'alertType'
    let gameAlertMessage = document.getElementById("gameAlertMessage"); // Taking 'gameAlertMessage' from the DOM and will display as message parameter
    gameAlertMessage.textContent = message; // Displays the content of gameAlertMessage as a message
    let gameAlert  = document.getElementById("gameAlert"); // Retrieves ID with gameAlert from the DOM and sets it to gameAlert
    gameAlert.classList.add("alert", "alert-" + alertType, "text-center");
    gameAlert.style.display ="block"

setTimeout(function() {
    gameAlert.style.display = "none";
}, 2000); // Set timeout to 2 seconds
}









