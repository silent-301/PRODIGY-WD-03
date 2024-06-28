// script.js

let gameBoard = Array(9).fill('');
let currentPlayer = '';
let gameOver = false;

document.getElementById('player-1-btn').addEventListener('click', () => {
    currentPlayer = 'X';
    document.getElementById('game-status').textContent = 'Game in progress...';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
});

document.getElementById('player-2-btn').addEventListener('click', () => {
    currentPlayer = 'O';
    document.getElementById('game-status').textContent = 'Game in progress...';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
});

document.getElementById('reset-btn').addEventListener('click', resetGame);

function handleCellClick(event) {
    if (!gameOver && gameBoard[parseInt(event.target.id.split('-')[1])] === '') {
        gameBoard[parseInt(event.target.id.split('-')[1])] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[0]] !== '') {
            gameOver = true;
            document.getElementById('game-status').textContent = `Player ${gameBoard[condition[0]]} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameOver = true;
        document.getElementById('game-status').textContent = 'It\'s a draw!';
    }
}

function resetGame() {
    gameBoard = Array(9).fill('');
    currentPlayer = '';
    gameOver = false;
    document.getElementById('game-status').textContent = 'Choose a player:';
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    document.querySelectorAll('.cell').forEach(cell => {
        cell.removeEventListener('click', handleCellClick);
    });
}