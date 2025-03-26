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

// let initBoard = () => {

    // board = Array.from({length: SIZE}, () => Array(SIZE).fill(0));
    // board.adjacentPlaces = [new Set(), new Set()];
    // board.adjacentPlaces = new Set();

    // board[0][2] = BLACK;
    // board[0][3] = BLACK;
    // board[0][4] = BLACK;
    // board[0][6] = BLACK;



    // board[0][2] = BLACK;
    // board[0][3] = BLACK;
    // board[0][4] = BLACK;
    // board[0][6] = BLACK;

    // board[0][10] = BLACK;
    // board[0][11] = BLACK;
    // board[0][12] = BLACK;


    // board[10][0] = BLACK;
    // board[11][0] = BLACK;
    // board[12][0] = BLACK;
    // board[13][0] = BLACK;

    // board[1][0] = BLACK;
    // board[4][0] = BLACK;
    // board[5][0] = BLACK;


    // board[10][10] = BLACK;
    // board[11][11] = BLACK;
    // board[12][12] = BLACK;
    // board[13][13] = BLACK;

    // board[10][10] = BLACK;
    // board[12][12] = BLACK;
    // board[13][13] = BLACK;


    // board[10][4] = BLACK;
    // board[13][1] = BLACK;
    // board[12][2] = BLACK;
    // board[11][3] = BLACK;

    // board[4][10] = BLACK;
    // board[1][13] = BLACK;
    // board[2][12] = BLACK;
// }

// const getAdjacentPlaces = (board, n) => {

//     let [r, c] = getCoords(n);

//     for (let i = -1; i <= 1; i++) {
//         for (let j = -1; j <= 1; j++) {

//             // if (i == 0 && j == 0) continue;
//             // if ((Math.abs(i) == 1 && Math.abs(j) == 2) || (Math.abs(i) == 2 && Math.abs(j) == 1)) continue;
//             if (r + i < 0 || r + i >= SIZE || c + j < 0 || c + j >= SIZE) continue;
//             if (board[r + i][c + j] == 0) board.adjacentPlaces.add((r + i) * SIZE + c + j);

//             // if (board[r + i][c + j] != 0) continue;
//             // if (Math.abs(i) == 2 || Math.abs(j) == 2) {
//             //     board.adjacentPlaces[board[r][c] - 1].add((r + i) * SIZE + c + j);
//             //     continue;
//             // }

//             // board.adjacentPlaces[0].add((r + i) * SIZE + c + j);
//             // board.adjacentPlaces[1].add((r + i) * SIZE + c + j);
//         }
//     }
// }

const getMoves = (board) => {

    let moves = new Set();

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {

            if (board[r][c] == 0) continue;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {

                    if (r + i < 0 || r + i >= SIZE || c + j < 0 || c + j >= SIZE) continue;
                    if (board[r + i][c + j] == 0) moves.add((r + i) * SIZE + c + j);
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
            if (board[i][j] == 0) n++;
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

                // if (n == 5 && sequenceOf5(board, r, c, dr, dc, sequenceStart, j - 1)) return [r, c, dr, dc, sequenceStart, j - 1];

                if (n == 5) return [r, c, dr, dc, sequenceStart, j - 1];
                // if (n == 5) return true;



                n = 0;
            }
        }

        // if (n == 5 && sequenceOf5(board, r, c, dr, dc, sequenceStart, 4)) return [r, c, dr, dc, sequenceStart, 4];

        if (n == 5) return [r, c, dr, dc, sequenceStart, 4];
        // if (n == 5) return true;

    }

    return false;
}

const humanTurn = async (e) => {

    // let stone = e.currentTarget;

    let stone = e.target;

    // if (!el.classList.contains('stone') && !el.parentElement.classList.contains('stone')) return;

    if (!stone.classList.contains('stone')) return;

    // let stone = el.classList.contains('stone') ? el : el.parentElement;
    // let stones = document.querySelectorAll('.stone');
    // let n = [...stones].indexOf(stone);
    // let [r, c] = getCoords(n);

    let n = Number(stone.dataset.n);
    let [r, c] = getCoords(n);

    if (board[r][c] != 0) return;

    // if (stone.classList.contains('white') || stone.classList.contains('black')) return;

    disableTouch();
    disableReset();

    board[r][c] = human;

    // board.adjacentPlaces.delete(n);
    // board.adjacentPlaces[0].delete(n);
    // board.adjacentPlaces[1].delete(n);

    // stone.innerText = SIZE ** 2 - numFreeCells(board); //

    // stone.classList.add(human == BLACK ? 'black' : 'white');

    // await sleep(200);

    if (gameOver(board, n)) {

        await placeStone(r, c, human);
        endGame(n);

        console.log('HUMAN WINS'); //
            
        return;
    }

    // getAdjacentPlaces(board, n);

    // let e1 = evaluateBoard(board, true); //
    // let e2 = evaluateBoard2(board, true); //

    // if (e1 != e2) console.error('E1', e1, 'E2', e2); //

    placeStone(r, c, human);
    requestAnimationFrame(() => requestAnimationFrame(aiTurn));

    // aiTurn();
}

// const randomAI = (board) => {

//     let moves = getMoves(board);

//     return moves[Math.floor(Math.random() * moves.length)];
// }

const aiTurn = async () => {

    let timeLimit = 500;
    let startTime = Date.now();
    let ai = human == BLACK ? WHITE : BLACK;

    let [costSquares3, costSquares4] = getCostSquares(board, human); //
    // let [gainSquares3, gainSquares4] = getGainSquares(board, ai, getMoves(board));

    console.log('costSquares AI', costSquares3, costSquares4); //
    // console.log('gainSquares AI', gainSquares4);

    [costSquares3, costSquares4] = getCostSquares2(board, human); //

    console.log('costSquares AI', costSquares3, costSquares4); //


    // let [gainSquares3, gainSquares4, gainSquares5] = getGainSquares(board, ai)

    // console.log('gainSquares', gainSquares3, gainSquares4, gainSquares5);

    // let n = randomAI(board);
    // let n = monteCarloAI(board);

    // let n = mcts(board, ai, Date.now(), 500);

    let [n, score] = minimax2(board, Date.now(), timeLimit);

    // minimax2(board, Date.now(), timeLimit);

    // minimax(board, Date.now(), timeLimit);

    // minimax2(board, Date.now(), timeLimit);

    let delay = timeLimit - (Date.now() - startTime);

    if (numFreeCells(board) == SIZE ** 2) {
        n = Math.floor(SIZE ** 2 / 2);
        delay = 200;
    }

    await sleep(delay);

    let [r, c] = getCoords(n);
    // let stone = document.querySelectorAll('.stone')[n];

    board[r][c] = ai;

    [costSquares3, costSquares4] = getCostSquares(board, ai); //

    console.log('costSquares Human', costSquares3, costSquares4); //

    [costSquares3, costSquares4] = getCostSquares2(board, ai); //

    // [gainSquares3, gainSquares4] = getGainSquares(board, human, getMoves(board));

    console.log('costSquares Human', costSquares3, costSquares4); //
    // console.log('gainSquares Human', gainSquares4);

    // board.adjacentPlaces.delete(n);

    // board.adjacentPlaces[0].delete(n);
    // board.adjacentPlaces[1].delete(n);

    // stone.innerText = SIZE ** 2 - numFreeCells(board); //

    // stone.classList.add(ai == BLACK ? 'black' : 'white');

    if (gameOver(board, n)) {

        console.log('AI WINS'); //

        // let [r, c, dr, dc, startOffset, endOffset] = win(board, n);

        await placeStone(r, c, ai);
        endGame(n);
        
        return;
    };

    // if (score < -1000 && n != 112) {
    
    //     let startTime = Date.now();

    //     human = human == black ? WHITE : black;

    //     let [n, score] = minimax(board, Infinity, startTime, timeLimit);

    //     alert(`WIN: ${n}`);

    //     human = human == black ? WHITE : black;    
    // }

    // getAdjacentPlaces(board, n);

    // stone.addEventListener('transitionend', () => {

    // let start = performance.now();

    // for (let i = 0; i < 100000; i++) evaluateBoard(board, false); //

    // let end = performance.now();

    // console.log(`Execution time: ${end - start} milliseconds`);

    // // alert(end - start);

    // start = performance.now();

    // for (let i = 0; i < 100000; i++) evaluateBoard2(board, false); //

    // end = performance.now();

    // console.log(`Execution time: ${end - start} milliseconds`);

    // alert(end - start);


    // if (e1 != e2) console.error('E1', e1, 'E2', e2); //

    evaluateBoard3(board, false); //

    await placeStone(r, c, ai);

    enableTouch();
    enableReset();

    // }, {once: true});
}

const newGame = async () => {

    // console.clear();

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

// const win = (board, n) => {

//     let r = Math.floor(n / SIZE);
//     let c = n % SIZE;
//     let stone = board[r][c];
//     let directions = [[1, 0],[0, 1],[1, 1],[1, -1]];

//     for (let [dr, dc] of directions) {

//         let count = 0;
        
//         for (let j = -4; j <= 4; j++) {

//             let nr = r + j * dr;
//             let nc = c + j * dc;

//             if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE && board[nr][nc] == stone) {

//                 count++;

//                 if (count == 5) return true;

//             } else {

//                 count = 0;
//             }
//         }
//     }

//     return false;
// }

// const sequenceOf5 = (board, r, c, dr, dc, startOffset, endOffset) => {

//     let beforeRow = r + (startOffset - 1) * dr;
//     let beforeCol = c + (startOffset - 1) * dc;

//     if (beforeRow >= 0 && beforeRow < SIZE && beforeCol >= 0 && beforeCol < SIZE && board[beforeRow][beforeCol] == board[r][c]) return false;
    
//     let afterRow = r + (endOffset + 1) * dr;
//     let afterCol = c + (endOffset + 1) * dc;

//     if (afterRow >= 0 && afterRow < SIZE && afterCol >= 0 && afterCol < SIZE && board[afterRow][afterCol] == board[r][c]) return false;
    
//     return true;
// }

// const randomAI = (board) => {

//     let ai = human == BLACK ? WHITE : BLACK;
//     // let moves = [...board.adjacentPlaces[ai - 1]];
//     let moves = [...board.adjacentPlaces];

//     return moves[Math.floor(Math.random() * moves.length)];
// }

// const fillBoard = () => {

//     // let whites = [54,68,82,96];
//     // let blacks = [40,83,97,110,112];
//     // let whites = [36,51,66,68,81,95];
//     // let blacks = [21,82,83,96,97,98,111,113];

//     let blacks = [127,143];
//     let whites = [112,128,142,159];

//     // let blacks = [127,128];
//     // let whites = [113,114,126,143];

//     // let blacks = [128,142];
//     // let whites = [127,143,156,113];

//     // let blacks = [ 139,155];
//     // let whites = [140,156,187,170];

//     let stones = document.querySelectorAll('.stone');

//     for (let n of whites) {

//         let [r, c] = getCoords(n);

//         board[r][c] = WHITE;
//         stones[n].classList.add('white');
//     }

//     for (let n of blacks) {

//         let [r, c] = getCoords(n);

//         board[r][c] = BLACK;
//         stones[n].classList.add('black');
//     }
// }

// const fillBoard = () => {

//     let stones = document.querySelectorAll('.stone');

//     for (let r = 0; r < SIZE; r++) {
//         for (let c = 0; c < SIZE; c++) {

//             if (board[r][c] == 0) continue;

//             stones[r * SIZE + c].classList.add(board[r][c] == black ? 'black' : 'white');
            
//         }
//     }
// }

const init = () => {

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

    // fillBoard();


    // console.table(board);


    evaluateBoard(board); //

    // console.log(getCostSquares(board, BLACK)); //

    // aiTurn();

    // play();
}
window.onload = () => document.fonts.ready.then(init);
