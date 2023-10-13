let board = Array(9).fill(null) // Decalre 'board' array with 9 elements to be filled by start as null
let currentPlayer = 'X'; // Set starting player to X

function makeMove(position) { // Define function 'makeMove' with 'position' as argument
    if (board[position] === null) { // Checks if position on board is empty
        board[position] = currentPlayer; // Allows player to set X or O if cell is empty
        document.getElementsByClassName('board-cell')[position].textContent = currentPlayer; // Updates the cell in the DOM to display current players mark
            if(checkWinner()) { // Checks checkWinner function if players move has a winning combination
                alert(`${currentPlayer} wins!`); // Displays message if there is a winner
                resetGame(); // Resets game
                return;
            }

            // If every cell in the board array is full and there is no winner then it's a draw and reset
            if (board.every(cell => cell != null)) {  // Makes sure that all cells are not empty
                alert('It\'s a draw!') // Displays draw message
                resetGame(); // Resets game
                return;
            }

            // Make sure there is a toggle for back and forth between human player and computer player
            if (currentPlayer === 'X') { // Condition to check if player mark is 'X'
                currentPlayer = 'O'; // If true then computer move is '0'
                computerMove(); // Computer will execute
            } else {
                currentPlayer = 'X'; // IF computer makes a move then goes back to human player 'X'
            }         
        }
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
    makeMove(randomPosition);
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





