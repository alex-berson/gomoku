let board = [];
let size = 15;
let gap = 1;
let empty = 0;
let black = 1
let white = 2;
let player = black;

const showBoard = () => document.body.style.opacity = 1;

const shuffle = (array) => {

    for (let i = array.length - 1; i > 0; i--) {

        let j = Math.trunc(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]]; 
    }

    return array;
}

let initBoard = () => {

    board = Array.from({length: size}, () => Array(size).fill(0));
    // board.adjacentPlaces = [new Set(), new Set()];
    board.adjacentPlaces = new Set();

}

const setBoardSize = () => {

    let minSide = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    let cssBoardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 100;
    let boardSize = Math.ceil(minSide * cssBoardSize / (size - 1)) * (size -1);

    document.documentElement.style.setProperty('--board-size', boardSize + 'px');
}

const createCells = () => {

    let board = document.querySelector('.board');
    let template = document.querySelector('.cell-template');

    for (let i = 0; i < (size - 1) ** 2; i++) {

        let cell = template.content.cloneNode(true);
    
        board.appendChild(cell);
    }
}

const createStones = () => {

    let board = document.querySelector('.board');
    let template = document.querySelector('.stone-template');

    for (let i = 0; i < size ** 2; i++) {

        let stone = template.content.cloneNode(true);
    
        board.appendChild(stone);
    }
}

const placeStones = () => {

    requestAnimationFrame(() => {

        cells = document.querySelectorAll('.cell');
        let stones = document.querySelectorAll('.stone');

        for (let i = 0; i < size ** 2; i++) {

            if (i == size ** 2 - 1) {

                let rectStone = stones[i].getBoundingClientRect();
                let rectCell = cells[(size - 1) ** 2 - 1].getBoundingClientRect();
                let offsetLeft = rectCell.left - rectStone.left + rectStone.width / 2 + (rectCell.width - rectStone.width) + gap / 2;
                let offsetTop = rectCell.top - rectStone.top + rectStone.height / 2 + (rectCell.height - rectStone.height) + gap / 2;

                stones[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;

                continue;
            }

            if (i >= size ** 2 - size && i < size ** 2 - 1) {

                let rectStone = stones[i].getBoundingClientRect();
                let rectCell = cells[(size - 1) ** 2 - (size - 1) + (i - (size ** 2 - size))].getBoundingClientRect();
                let offsetLeft = rectCell.left - rectStone.left - rectStone.width / 2  - gap / 2;
                let offsetTop = rectCell.top - rectStone.top + rectStone.height / 2 + (rectCell.height - rectStone.height) + gap / 2;

                stones[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;

                continue;
            }

            if ((i + 1) % size == 0 && i != 0 && i != size ** 2 - 1) {

                let rectStone = stones[i].getBoundingClientRect();
                let rectCell = cells[Math.floor((i / size) + 1) * (size - 1) - 1].getBoundingClientRect();
                let offsetLeft = rectCell.left - rectStone.left + rectStone.width / 2 + (rectCell.width - rectStone.width) + gap / 2;
                let offsetTop = rectCell.top - rectStone.top - rectStone.height / 2 - gap / 2;
                
                stones[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;

                continue;
            }

            let rectStone = stones[i].getBoundingClientRect();
            let rectCell = cells[i - Math.floor(i / size)].getBoundingClientRect();
            let offsetLeft = rectCell.left - rectStone.left - rectStone.width / 2 - gap / 2;
            let offsetTop = rectCell.top - rectStone.top - rectStone.height / 2 - gap / 2;    

            stones[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
        }
    });
}

// const win = (board, n) => {

//     let r = Math.floor(n / size);
//     let c = n % size;
//     let stone = board[r][c];

//     outerV: for (let i = Math.max(0, r - 4); i <= r; i++) {
        
//         if (i + 4 >= size) break; 

//         let count = 0;

//         for (let j = 0; j < 5; j++) {

//             if (i + j >= size) break outerV;

//             if (board[i + j][c] != stone) {
                
//                 i = i + j;

//                 continue outerV; 
//             }

//             count++;
//         }

//         if (count == 5) return true;
//     }

//     outerH: for (let i = Math.max(0, c - 4); i <= c; i++) {
        
//         if (i + 4 >= size) break; 

//         let count = 0;

//         for (let j = 0; j < 5; j++) {

//             if (i + j >= size) break outerH;

//             if (board[r][i + j] != stone) {
                
//                 i = i + j;

//                 continue outerH; 
//             }

//             count++;
//         }

//         if (count == 5) return true;
//     }

//     outerPD: for (let i = Math.max(0, r - 4), k = Math.max(0, c - 4); i <= r && k <= c; i++, k++) {

//         if (i + 4 >= size || k + 4 >= size) break;
        
//         let count = 0;

//         for (let j = 0; j < 5; j++) {

//             if (i + j >= size || k + j >= size) break outerPD;

//             if (board[i + j][k + j] != stone) {

//                 i = i + j;
//                 k = k + j;

//                 continue outerPD;
//             }

//             count++;
//         }

//         if (count == 5) return true;
//     }

//     outerND: for (let i = Math.max(0, r - 4), k = Math.min(size - 1, c + 4); i <= r && k >= c; i++, k--) {

//         if (i + 4 >= size || k - 4 < 0) break;
        
//         let countSecondary = 0;

//         for (let j = 0; j < 5; j++) {

//             if (i + j >= size || k - j < 0) break outerND;

//             if (board[i + j][k - j] != stone) {

//                 i = i + j;
//                 k = k - j;

//                 continue outerND;
//             }
//             countSecondary++;
//         }

//         if (countSecondary == 5) return true;
//     }

//     return false; 
// }

// const win2 = (board, n) => {

//     let r = Math.floor(n / size);
//     let c = n % size;
//     let stone = board[r][c];
//     let directions = [[1, 0],[0, 1],[1, 1],[1, -1]];

//     for (let [dr, dc] of directions) {

//         let count = 0;
        
//         for (let j = -4; j <= 4; j++) {

//             let nr = r + j * dr;
//             let nc = c + j * dc;

//             if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc] == stone) {

//                 count++;

//                 if (count == 5) return true;

//             } else {

//                 count = 0;
//             }
//         }
//     }

//     return false;
// }

const win = (board, n) => {

    let r = Math.floor(n / size);
    let c = n % size;
    let stone = board[r][c];
    let directions = [[1, 0],[0, 1],[1, 1],[1, -1]];

    for (let [dr, dc] of directions) {

        let count = 0;
        let sequenceStart = -5; 

        for (let j = -4; j <= 4; j++) {

            let nr = r + j * dr;
            let nc = c + j * dc;

            if (nr >= 0 && nr < size && nc >= 0 && nc < size && board[nr][nc] == stone) {

                if (count == 0) sequenceStart = j; 

                count++;

            } else {

                if (count == 5 && sequenceOf5(board, r, c, dr, dc, sequenceStart, j - 1)) return true;

                count = 0;
            }
        }

        if (count == 5 && sequenceOf5(board, r, c, dr, dc, sequenceStart, 4)) return true;
    }

    return false;
};

const sequenceOf5 = (board, r, c, dr, dc, startOffset, endOffset) => {

    let beforeRow = r + (startOffset - 1) * dr;
    let beforeCol = c + (startOffset - 1) * dc;

    // console.log(beforeRow, beforeCol, r , c);

    if (beforeRow >= 0 && beforeRow < size && beforeCol >= 0 && beforeCol < size && board[beforeRow][beforeCol] == board[r][c]) return false;
    
    let afterRow = r + (endOffset + 1) * dr;
    let afterCol = c + (endOffset + 1) * dc;

    // console.log(beforeRow, beforeCol, r , c);


    if (afterRow >= 0 && afterRow < size && afterCol >= 0 && afterCol < size && board[afterRow][afterCol] == board[r][c]) return false;
    
    return true;
}

const randomAI = (board) => {

    let ai = player == black ? white : black;
    // let moves = [...board.adjacentPlaces[ai - 1]];
    let moves = [...board.adjacentPlaces];

    return moves[Math.floor(Math.random() * moves.length)];
}

const freeCells = (board) => {

    let count = 0;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (board[i][j] == 0) count++;
        }
    }

    return count;
}

const monteCarloAI = (board) => {

    let startTime = Date.now();
    let timeLimit = 500;
    let stats = Array.from({length: size ** 2}, () => [0, 0]);
    let ai = player == black ? white : black;

    do {

        let tempBoard = board.map(arr => arr.slice());
        tempBoard.adjacentPlaces = new Set(board.adjacentPlaces);
        let color = ai;
        firstMove = null;
        let i = 0

        do {

            let moves = [...tempBoard.adjacentPlaces];
            let n = moves[Math.floor(Math.random() * moves.length)];

            if (n == undefined && firstMove == null) {
                n = Math.floor(size ** 2 / 2);
            } else if (n == undefined) {
                break;
            }
    
            if (firstMove == null) firstMove = n;
    
            tempBoard[Math.floor(n / size)][n % size] = color;
            tempBoard.adjacentPlaces.delete(n);

            if (win(tempBoard, n)) {

                let score = 100 * freeCells(tempBoard);

                tempBoard[Math.floor(n / size)][n % size] == player ? stats[firstMove][0] += 1 : stats[firstMove][0] -= 1;

                stats[firstMove][1]++;

                break;
            }

            getAdjacentPlaces(tempBoard, n);

            color = color == black ? white : black;

            i++
    
        } while(i < 10);

    } while (Date.now() - startTime <= timeLimit); 

    let bestMove, bestValue = Infinity; 

    for (let i = 0; i < stats.length; i++) {

        let [wins, visits] = stats[i];

        if (visits == 0) continue;

        console.log(i, wins, visits , wins / visits);

        if (wins / visits < bestValue) [bestValue, bestMove] = [wins / visits, i]
    }

    console.log(stats);

    console.log(bestMove, bestValue);

    return bestMove;
}

const aiMove = () => {

    let ai = player == black ? white : black;

    // let n = randomAI(board);
    // let n = monteCarloAI(board);

    // let n = mcts(board, ai, Date.now(), 500);

    let n = minimax(board, Infinity, 500)

    let stones = document.querySelectorAll('.stone');

    board[Math.floor(n / size)][n % size] = ai;

    board.adjacentPlaces.delete(n);
    // board.adjacentPlaces[0].delete(n);
    // board.adjacentPlaces[1].delete(n);

    stones[n].innerText = size ** 2 - freeCells(board);

    ai == black ? stones[n].classList.add('black') : stones[n].classList.add('white');

    if (win(board, n)) {

        console.log('AI wins');
        return;
    };

    getAdjacentPlaces(board, n);
    enableTouch();
}

const getAdjacentPlaces = (board, n) => {

    let r = Math.floor(n / size);
    let c = n % size;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {

            if (i == 0 && j == 0) continue;
            if ((Math.abs(i) == 1 && Math.abs(j) == 2) || (Math.abs(i) == 2 && Math.abs(j) == 1)) continue;
            if (r + i < 0 || r + i >= size || c + j < 0 || c + j >= size) continue;
            if (board[r + i][c + j] == 0) board.adjacentPlaces.add((r + i) * size + c + j);

            // if (board[r + i][c + j] != 0) continue;
            // if (Math.abs(i) == 2 || Math.abs(j) == 2) {
            //     board.adjacentPlaces[board[r][c] - 1].add((r + i) * size + c + j);
            //     continue;
            // }

            // board.adjacentPlaces[0].add((r + i) * size + c + j);
            // board.adjacentPlaces[1].add((r + i) * size + c + j);
        }
    }
}

const makeMove = (e) => {

    let stone = e.currentTarget;
    let stones = document.querySelectorAll('.stone');
    let n = [...stones].indexOf(stone);

    if (stone.classList.contains('white') || stone.classList.contains('black')) return;

    board[Math.floor(n / size)][n % size] = player;

    board.adjacentPlaces.delete(n);
    // board.adjacentPlaces[0].delete(n);
    // board.adjacentPlaces[1].delete(n);

    stone.innerText = size ** 2 - freeCells(board);

    player == black ? stone.classList.add('black') : stone.classList.add('white');

    if (win(board, n)) {
            
        console.log('Player wins');
        return;
    }

    getAdjacentPlaces(board, n);
    disableTouch();
    setTimeout(aiMove, 200);
}

const enableTouch = () => {

    let stones = document.querySelectorAll('.stone');

    stones.forEach(stone => {
        stone.addEventListener('touchstart', makeMove);
        stone.addEventListener('mousedown', makeMove);
    });
}

const disableTouch = () => {

    let stones = document.querySelectorAll('.stone');

    stones.forEach(stone => {
        stone.removeEventListener('touchstart', makeMove);
        stone.removeEventListener('mousedown', makeMove);
    });
}

const disableTapZoom = () => {

    const preventDefault = (e) => e.preventDefault();

    document.addEventListener('touchstart', preventDefault, {passive: false});
    document.addEventListener('mousedown', preventDefault, {passive: false});
}

const init = () => {

    initBoard();
    createCells();
    createStones();
    placeStones();
    setBoardSize();
    showBoard();
    enableTouch();
}

window.onload = () => document.fonts.ready.then(init);