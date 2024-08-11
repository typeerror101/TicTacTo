const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetButton');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

resetBtn.addEventListener('click', resetGame);

function handleClick(e) {
    const index = e.target.dataset.index;

    if( board[index] === ''){
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        if(checkWin(currentPlayer)){
            setTimeout(() => alert(`${currentPlayer} wins!`), 10);
            disableBoard();
        } else if (board.every(cell => cell !== '')){
            setTimeout(() => alert('It\'s a draw!'),10);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(Player) {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === Player);
    })
}

function disableBoard() {
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick);
    })
}