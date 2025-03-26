const showBoard = () => document.body.classList.add('visible');

const setBoardSize = () => {

    let minSide = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    let cssBoardSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--board-size')) / 100;
    let boardSize = Math.ceil(minSide * cssBoardSize / (SIZE - 1)) * (SIZE - 1);

    document.documentElement.style.setProperty('--board-size', `${boardSize}px`);

    // console.log(boardSize);
    // console.log((406 / 14 - 1) * 0.9);
    // console.log((406 / 14 - 1) * 0.2);
}

const resizeWhitespace = () => {

    let event = new Event('resize');

    window.addEventListener('resize', async () => {

            await sleep(20);

            let ua = navigator.userAgent;
            let edge = window.innerHeight;
            let inner = document.querySelector('#inner');
            let bottom = inner.getBoundingClientRect().bottom;
            let cssWhitespace = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--whitespace'));
            let whitespace = Math.min(0, Math.max(edge + cssWhitespace - bottom, -20));
            // let shortScreen = screen.width / screen.height > 0.5;

            if (!ua.includes('iPhone')) return;

            // if (!ua.includes('iPhone') || window.innerHeight < window.innerWidth || edge == bottom) return;
            
            document.documentElement.style.setProperty('--whitespace', `${whitespace}px`);

            // console.log('bottom', bottom); //
            // console.log('edge', edge); //
            // console.log('whitespace', whitespace); //  
            
            // alert('bottom: ' + bottom + ', edge: ' + edge + ', whitespace: ' + whitespace);
    });

    window.dispatchEvent(event);
}

const createCells = () => {

    let board = document.querySelector('.board');
    let template = document.querySelector('.cell-template');

    for (let i = 0; i < (SIZE - 1) ** 2; i++) {

        let cell = template.content.cloneNode(true);

        // let cellEl = cell.querySelector('.cell'); //

        // cellEl.textContent = i + Math.floor(i / (SIZE - 1)); //

        board.appendChild(cell);
    }
}

const createStones = () => {

    let board = document.querySelector('.board');
    let template = document.querySelector('.stone-template');

    for (let i = 0; i < SIZE ** 2; i++) {

        let stone = template.content.cloneNode(true);
        let stoneElement = stone.querySelector('.stone'); 

        stoneElement.dataset.n = i;
    
        board.appendChild(stone);
    }
}

const arrangeStones = () => {

    let cells = document.querySelectorAll('.cell');
    let stones = document.querySelectorAll('.stone');
    let lineWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--line-width'));

    requestAnimationFrame(() => {

        for (let i = 0; i < SIZE ** 2; i++) {

            if (i == SIZE ** 2 - 1) {

                let rectStone = stones[i].getBoundingClientRect();
                let rectCell = cells[(SIZE - 1) ** 2 - 1].getBoundingClientRect();
                let offsetLeft = rectCell.left - rectStone.left + rectStone.width / 2 + (rectCell.width - rectStone.width) + lineWidth / 2;
                let offsetTop = rectCell.top - rectStone.top + rectStone.height / 2 + (rectCell.height - rectStone.height) + lineWidth / 2;

                stones[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;

                continue;
            }

            if (i >= SIZE ** 2 - SIZE && i < SIZE ** 2 - 1) {

                let rectStone = stones[i].getBoundingClientRect();
                let rectCell = cells[(SIZE - 1) ** 2 - (SIZE - 1) + (i - (SIZE ** 2 - SIZE))].getBoundingClientRect();
                let offsetLeft = rectCell.left - rectStone.left - rectStone.width / 2  - lineWidth / 2;
                let offsetTop = rectCell.top - rectStone.top + rectStone.height / 2 + (rectCell.height - rectStone.height) + lineWidth / 2;

                stones[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;

                continue;
            }

            if ((i + 1) % SIZE == 0 && i != 0 && i != SIZE ** 2 - 1) {

                let rectStone = stones[i].getBoundingClientRect();
                let rectCell = cells[Math.floor((i / SIZE) + 1) * (SIZE - 1) - 1].getBoundingClientRect();
                let offsetLeft = rectCell.left - rectStone.left + rectStone.width / 2 + (rectCell.width - rectStone.width) + lineWidth / 2;
                let offsetTop = rectCell.top - rectStone.top - rectStone.height / 2 - lineWidth / 2;
                
                stones[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;

                continue;
            }

            let rectStone = stones[i].getBoundingClientRect();
            let rectCell = cells[i - Math.floor(i / SIZE)].getBoundingClientRect();
            let offsetLeft = rectCell.left - rectStone.left - rectStone.width / 2 - lineWidth / 2;
            let offsetTop = rectCell.top - rectStone.top - rectStone.height / 2 - lineWidth / 2;    

            stones[i].style.transform = `translate(${offsetLeft}px, ${offsetTop}px)`;
        }
    });
}

const placeStone = (r, c, color) => {

    return new Promise(resolve => {

        let n = r * SIZE + c;
        let stone = document.querySelectorAll('.stone')[n];

        // stone.innerText = SIZE ** 2 - numFreeCells(board); //

        stone.classList.add(color == BLACK ? 'black' : 'white');

        stone.addEventListener('transitionend', resolve, {once: true});
    });
}

const resetGame = (e) => {

    let button = e.currentTarget;

    // if (button.classList.contains('blink')) return;

    // button.classList.add('blink');
    // button.addEventListener('animationend', () => button.classList.remove('blink'), {once: true});

    human = button.classList.contains('black') ? WHITE : BLACK;

    disableReset();
    disableTouch();
    newGame();
}

const endGame = async (n) => {

    let winResult = gameWon(board, n);
    let boardEl = document.querySelector('.board');

    if (winResult) {

        let [r, c, dr, dc, startOffset, endOffset] = winResult;

        await showWinner(r, c, dr, dc, startOffset, endOffset);
    }

    enableReset();

    boardEl.classList.add('gameover');
    boardEl.addEventListener('touchstart', newGame);
    boardEl.addEventListener('mousedown', newGame);
}

const showWinner = async (r, c, dr, dc, startOffset, endOffset) => {

    let stones = [];

    for (let i = startOffset; i <= endOffset; i++) {

        let nr = r + i * dr;
        let nc = c + i * dc;

        stones.push([nr, nc]);
    }

    await Promise.all(stones.map(([r, c]) => new Promise(resolve => {

        let n = r * SIZE + c;
        let stone = document.querySelectorAll('.stone')[n];

        stone.classList.add('win');

        stone.addEventListener('transitionend', resolve, {once: true});

    })));
}

const clearBoard = async () => {

    let board = document.querySelector('.board');
    let stones = [...document.querySelectorAll('.stone.black, .stone.white')];

    board.classList.remove('gameover');
    board.removeEventListener('touchstart', newGame);
    board.removeEventListener('mousedown', newGame);

    if (stones.length == 0) return;
    
    await Promise.all(stones.map(stone => new Promise(resolve => {

        stone.classList.add('disappear');

        stone.addEventListener('transitionend', () => {

            stone.innerText = ''; //

            stone.classList.remove('black', 'white', 'win', 'disappear');

            resolve();

        }, { once: true });
    })));
}

const enableTouch = () => {

    let board = document.querySelector('.board');

    board.addEventListener('touchstart', humanTurn);
    board.addEventListener('mousedown', humanTurn);
}

const disableTouch = () => {

    let board = document.querySelector('.board');

    board.removeEventListener('touchstart', humanTurn);
    board.removeEventListener('mousedown', humanTurn);
}

const enableReset = () => {

    let buttons = document.querySelectorAll('.o');

    buttons.forEach(button => {
        button.addEventListener('touchstart', resetGame);
        button.addEventListener('mousedown', resetGame);
    });
}

const disableReset = () => {

    let buttons = document.querySelectorAll('.o');

    buttons.forEach(button => {
        button.removeEventListener('touchstart', resetGame);
        button.removeEventListener('mousedown', resetGame);
    });
}

const disableScreen = () => {

    const preventDefault = (e) => e.preventDefault();

    document.addEventListener('touchstart', preventDefault, {passive: false});
    document.addEventListener('mousedown', preventDefault, {passive: false});
}