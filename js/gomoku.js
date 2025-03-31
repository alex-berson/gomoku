const EMPTY = 0;
const BLACK = 1
const WHITE = 2;
const SIZE = 15;

let board = [];
let human = BLACK;

const getCoords = (n) => [Math.floor(n / SIZE), n % SIZE];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const gameOver = (board, n) => gameWon(board, n) || numFreeCells(board) == 0;

let initBoard = () => board = Array.from({length: SIZE}, () => Array(SIZE).fill(0));

const shuffle = (array) => {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

const getMoves = (board) => {

    let moves = new Set();

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {

            if (board[r][c] == EMPTY) continue;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (r + i < 0 || r + i >= SIZE || c + j < 0 || c + j >= SIZE) continue;
                    if (board[r + i][c + j] == EMPTY) moves.add((r + i) * SIZE + c + j);
                }
            }
        }
    }

    return [...moves];
}

const numFreeCells = (board) => {

    let n = 0;

    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE; j++) {
            if (board[i][j] == EMPTY) n++;
        }
    }

    return n;
}

const gameWon = (board, n) => {

    let [r, c] = getCoords(n);
    let stone = board[r][c];
    let directions = [[1, 0],[0, 1],[1, 1],[1, -1]];

    for (let [dr, dc] of directions) {

        let n = 0;
        let sequenceStart = -5; 

        for (let j = -4; j <= 4; j++) {

            let nr = r + j * dr;
            let nc = c + j * dc;

            if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && board[nr][nc] == stone) {

                if (n == 0) sequenceStart = j; 

                n++;

            } else {

                if (n == 5) return [r, c, dr, dc, sequenceStart, j - 1];

                n = 0;
            }
        }

        if (n == 5) return [r, c, dr, dc, sequenceStart, 4];
    }

    return false;
}

const humanTurn = async (e) => {

    let stone = e.target;

    if (!stone.classList.contains('stone')) return;

    let n = Number(stone.dataset.n);
    let [r, c] = getCoords(n);

    if (board[r][c] != EMPTY) return;

    disableTouch();
    disableReset();

    board[r][c] = human;

    if (gameOver(board, n)) {

        await placeStone(r, c, human);
        endGame(n);

        return;
    }

    placeStone(r, c, human);
    requestAnimationFrame(() => requestAnimationFrame(aiTurn));
}

const aiTurn = async () => {

    let timeLimit = 500;
    let startTime = Date.now();
    let ai = human == BLACK ? WHITE : BLACK;
    let [n, _] = minimax(board, startTime, timeLimit);
    let delay = timeLimit - (Date.now() - startTime);

    if (numFreeCells(board) == SIZE ** 2) {
        n = Math.floor(SIZE ** 2 / 2);
        delay = 200;
    }

    await sleep(delay);

    let [r, c] = getCoords(n);

    board[r][c] = ai;

    if (gameOver(board, n)) {

        await placeStone(r, c, ai);
        endGame(n);
        
        return;
    }

    await placeStone(r, c, ai);

    enableTouch();
    enableReset();
}

const newGame = async () => {

    await clearBoard();
    initBoard();

    human = human == BLACK ? WHITE : BLACK;

    if (human == WHITE) {
        aiTurn();
        return;
    }

    enableTouch();
    enableReset();
}

const registerServiceWorker = () => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js');
}

const init = () => {
    
    registerServiceWorker();
    resizeWhitespace();
    disableScreen();
    setBoardSize();
    initBoard();
    createCells();
    createStones();
    arrangeStones();
    showBoard();
    enableTouch();
    enableReset();
}

window.onload = () => document.fonts.ready.then(init);