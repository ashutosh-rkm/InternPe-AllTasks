const board = document.getElementById('board');
const winnerMessage = document.getElementById('winner-message');

let currentPlayer = 1;
let isGameOver = false;

// Create board
for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell empty';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }
}
function handleCellClick(event) {
    if (isGameOver) return;

    const clickedCell = event.target;
    const row = Number(clickedCell.dataset.row);
    const col = Number(clickedCell.dataset.col);

    // Check if the column is full
    for (let i = 5; i >= 0; i--) {
        const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${col}"]`);
        if (cell.classList.contains('empty')) {
            cell.classList.remove('empty');
            cell.classList.add(`player${currentPlayer}`);

            if (checkForWinner(row, col)) {
                displayWinner();
                isGameOver = true;
            } else {
                currentPlayer = currentPlayer === 1 ? 2 : 1;
            }
            break;
        }
    }
}
function checkForWinner(row, col) {
    return (
        checkDirection(row, col, 1, 0) ||  // Horizontal
        checkDirection(row, col, 0, 1) ||  // Vertical
        checkDirection(row, col, 1, 1) ||  // Diagonal /
        checkDirection(row, col, 1, -1)   
    );
}
function checkDirection(row, col, rowDirection, colDirection) {
    const player = currentPlayer === 1 ? 'player1' : 'player2';

    for (let i = 0; i < 4; i++) {
        const r = row + i * rowDirection;
        const c = col + i * colDirection;

        const cell = document.querySelector(`.cell[data-row="${r}"][data-col="${c}"]`);

        if (!cell || !cell.classList.contains(player)) {
            return false;
        }
    }
    return true;
}
function displayWinner() {
    winnerMessage.textContent = `Player ${currentPlayer} wins!`;
}