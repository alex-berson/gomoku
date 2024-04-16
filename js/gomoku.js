let board = [];
let size = 15;
let gap = 1;
let empty = 0;
let black = 1
let white = 2;
let player = black;

const showBoard = () => document.body.style.opacity = 1;

let initBoard = () => {

    board = Array.from({length: 15}, () => Array(15).fill(0));
    // board.ajacentPlaces = [new Set(), new Set()];
    board.ajacentPlaces = new Set();

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

                if (count == 5 && sequenceOf5(board, size, r, c, dr, dc, sequenceStart, j - 1)) return true;

                count = 0;
            }
        }

        if (count == 5 && sequenceOf5(board, size, r, c, dr, dc, sequenceStart, 4)) return true;
    }

    return false;
};

const sequenceOf5 = (board, r, c, dr, dc, startOffset, endOffset) => {

    let beforeRow = r + (startOffset - 1) * dr;
    let beforeCol = c + (startOffset - 1) * dc;

    if (beforeRow >= 0 && beforeRow < size && beforeCol >= 0 && beforeCol < size && board[beforeRow][beforeCol] == board[r][c]) return false;
    
    let afterRow = r + (endOffset + 1) * dr;
    let afterCol = c + (endOffset + 1) * dc;

    if (afterRow >= 0 && afterRow < size && afterCol >= 0 && afterCol < size && board[afterRow][afterCol] == board[r][c]) return false;
    
    return true;
}

const randomAI = (board) => {

    let ai = player == black ? white : black;
    // let moves = [...board.ajacentPlaces[ai - 1]];
    let moves = [...board.ajacentPlaces];

    return moves[Math.floor(Math.random() * moves.length)];
}

const aiMove = () => {

    let n = randomAI(board);
    let ai = player == black ? white : black;
    let stones = document.querySelectorAll('.stone');

    board[Math.floor(n / size)][n % size] = ai;

    board.ajacentPlaces.delete(n);
    // board.ajacentPlaces[0].delete(n);
    // board.ajacentPlaces[1].delete(n);


    ai == black ? stones[n].classList.add('black') : stones[n].classList.add('white');

    if (win(board, n)) {

        console.log('AI wins');
        return;
    };

    getAjacentPlaces(board, n);
    enableTouch();
}

const getAjacentPlaces = (board, n) => {

    let r = Math.floor(n / size);
    let c = n % size;

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {

            if (i == 0 && j == 0) continue;
            if ((Math.abs(i) == 1 && Math.abs(j) == 2) || (Math.abs(i) == 2 && Math.abs(j) == 1)) continue;
            if (r + i < 0 || r + i >= size || c + j < 0 || c + j >= size) continue;
            if (board[r + i][c + j] == 0) board.ajacentPlaces.add((r + i) * size + c + j);

            // if (board[r + i][c + j] != 0) continue;
            // if (Math.abs(i) == 2 || Math.abs(j) == 2) {
            //     board.ajacentPlaces[board[r][c] - 1].add((r + i) * size + c + j);
            //     continue;
            // }

            // board.ajacentPlaces[0].add((r + i) * size + c + j);
            // board.ajacentPlaces[1].add((r + i) * size + c + j);
        }
    }
}

const makeMove = (e) => {

    let stone = e.currentTarget;
    let stones = document.querySelectorAll('.stone');
    let n = [...stones].indexOf(stone);

    if (stone.classList.contains('black') || stone.classList.contains('black')) return;

    player == black ? stone.classList.add('black') : stone.classList.add('white');

    board[Math.floor(n / size)][n % size] = player;

    board.ajacentPlaces.delete(n);
    // board.ajacentPlaces[0].delete(n);
    // board.ajacentPlaces[1].delete(n);

    if (win(board, n)) {
            
        console.log('Player wins');
        return;
    }

    getAjacentPlaces(board, n);
    disableTouch();
    aiMove();
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