const evaluateBoard = (board, maximizingPlayer) => {

    let scores = [0,0];
    let threats = [[0,0],[0,0],[0,0],[0,0]];
    let ai = human == BLACK ? WHITE : BLACK;

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c <= SIZE - 5; c++) {

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r][c + i]]++;
            }
 
            if ((count[BLACK] < 3 || count[WHITE] != 0) && (count[WHITE] < 3 || count[BLACK] != 0)) continue;

            let color = count[BLACK] ? BLACK : WHITE;

            if (c <= SIZE - 6 && board[r][c] == EMPTY && board[r][c + 5] == EMPTY) {
                
                count[color] == 4 ? threats[0][color - 1]++ : threats[2][color - 1]++;

                c += 5;

                continue;
            }

            if (count[color] == 4) {

                threats[1][color - 1]++;

                c += 4;

                continue;
            }

            threats[3][color - 1]++;
        }
    }

    for (let c = 0; c < SIZE; c++) {
        for (let r = 0; r <= SIZE - 5; r++) {

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c]]++;
            }
 
            if ((count[BLACK] < 3 || count[WHITE] != 0) && (count[WHITE] < 3 || count[BLACK] != 0)) continue;

            let color = count[BLACK] ? BLACK : WHITE;

            if (r <= SIZE - 6 && board[r][c] == EMPTY && board[r + 5][c] == EMPTY) {
                
                count[color] == 4 ? threats[0][color - 1]++ : threats[2][color - 1]++;

                r += 5;

                continue;
            }

            if (count[color] == 4) {

                threats[1][color - 1]++;

                r += 4;

                continue;
            }

            threats[3][color - 1]++;
        }
    }

    for (let startRow = 0; startRow <= SIZE - 5; startRow++) {
        for (let r = startRow, c = 0; r <= SIZE - 5 && c <= SIZE - 5; r++, c++) {
      
            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c + i]]++;
            }
    
            if ((count[BLACK] < 3 || count[WHITE] != 0) && (count[WHITE] < 3 || count[BLACK] != 0)) continue;

            let color = count[BLACK] ? BLACK : WHITE;

            if (r <= SIZE - 6 && c <= SIZE - 6 && board[r][c] == EMPTY && board[r + 5][c + 5] == EMPTY) {
                
                count[color] == 4 ? threats[0][color - 1]++ : threats[2][color - 1]++;

                r += 5;
                c += 5;

                continue;
            }

            if (count[color] == 4) {

                threats[1][color - 1]++;

                r += 4;
                c += 4;

                continue;
            }

            threats[3][color - 1]++;
        }
    }

    for (let startCol = 1; startCol <= SIZE - 5; startCol++) {
        for (let r = 0, c = startCol; r <= SIZE - 5 && c <= SIZE - 5; r++, c++) {

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c + i]]++;
            }

            if ((count[BLACK] < 3 || count[WHITE] != 0) && (count[WHITE] < 3 || count[BLACK] != 0)) continue;

            let color = count[BLACK] ? BLACK : WHITE;

            if (r <= SIZE - 6 && c <= SIZE - 6 && board[r][c] == EMPTY && board[r + 5][c + 5] == EMPTY) {
                
                count[color] == 4 ? threats[0][color - 1]++ : threats[2][color - 1]++;

                r += 5;
                c += 5;

                continue;
            }

            if (count[color] == 4) {

                threats[1][color - 1]++;

                r += 4;
                c += 4;

                continue;
            }

            threats[3][color - 1]++;
        }
    }

    for (let startRow = SIZE - 1; startRow >= 4; startRow--) {
        for (let r = startRow, c = 0; r >= 4 && c <= SIZE - 5; r--, c++) {

            let count = [0, 0, 0];

            for (let i = 0; i < 5; i++) {
                count[board[r - i][c + i]]++;
            }

            if ((count[BLACK] < 3 || count[WHITE] != 0) && (count[WHITE] < 3 || count[BLACK] != 0)) continue;

            let color = count[BLACK] ? BLACK : WHITE;

            if (r >= 5 && c <= SIZE - 6 && board[r][c] == EMPTY && board[r - 5][c + 5] == EMPTY) {

                count[color] == 4 ? threats[0][color - 1]++ : threats[2][color - 1]++;

                r -= 5;
                c += 5;

                continue;
            }

            if (count[color] == 4) {

                threats[1][color - 1]++;

                r -= 4;
                c += 4;

                continue;
            }

            threats[3][color - 1]++;
        }
    }

    for (let startCol = 1; startCol <= SIZE - 5; startCol++) {
        for (let r = SIZE - 1, c = startCol; r >= 4 && c <= SIZE - 5; r--, c++) {

            let count = [0, 0, 0];

            for (let i = 0; i < 5; i++) {
                count[board[r - i][c + i]]++;
            }

            if ((count[BLACK] < 3 || count[WHITE] != 0) && (count[WHITE] < 3 || count[BLACK] != 0)) continue;

            let color = count[BLACK] ? BLACK : WHITE;

            if (r >= 5 && c <= SIZE - 6 && board[r][c] == EMPTY && board[r - 5][c + 5] == EMPTY) {

                count[color] == 4 ? threats[0][color - 1]++ : threats[2][color - 1]++;

                r -= 5;
                c += 5;

                continue;
            }

            if (count[color] == 4) {

                threats[1][color - 1]++;

                r -= 4;
                c += 4;

                continue;
            }

            threats[3][color - 1]++;
        }
    }

    if (maximizingPlayer) {

        if (threats[0][ai - 1] > 0 || threats[1][ai - 1] > 0) {
            scores[ai - 1] += 10000;
        } else if (threats[0][human - 1] > 0 || threats[1][human - 1] > 1) {
            scores[human - 1] -= 8000;
        } else if (threats[2][ai - 1] > 1) {
            scores[ai - 1] += 5000;
        } else if (threats[1][human - 1] + threats[2][human - 1] > 1) {
            scores[human - 1] -= 3000
        } else {
            
            if (threats[2][ai - 1] == 1 || threats[1][ai - 1] == 1) scores[ai - 1] += 500;
            if (threats[2][human - 1] == 1 || threats[1][human - 1] == 1) scores[human - 1] -= 300;

            scores[ai - 1] += threats[3][ai - 1] * 50;
            scores[human - 1] += threats[3][human - 1] * -30; 
        }

    } else {

        if (threats[0][human - 1] > 0 || threats[1][human - 1] > 0) {
            scores[human - 1] -= 10000;
        } else if (threats[0][ai - 1] > 0 || threats[1][ai - 1] > 1) {
            scores[ai - 1] += 8000;
        } else if (threats[2][human - 1] > 1) {
            scores[human - 1] -= 5000;
        } else if (threats[1][ai - 1] + threats[2][ai - 1] > 1) {
            scores[ai - 1] += 3000;
        } else {

            if (threats[2][human - 1] == 1 || threats[1][human - 1] == 1) scores[human - 1] -= 500;
            if (threats[2][ai - 1] == 1 || threats[1][ai - 1] == 1) scores[ai - 1] += 300;

            scores[human - 1] += threats[3][human - 1] * -50;
            scores[ai - 1] += threats[3][ai - 1] * 30;
        }
    }

    return scores[ai - 1] + scores[human - 1];
}