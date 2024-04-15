let gap = 1;
let size = 15;

const showBoard = () => document.body.style.opacity = 1;

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

const init = () => {

    createCells();
    createStones();
    placeStones();
    setBoardSize();
    showBoard();
}

window.onload = () => document.fonts.ready.then(init);