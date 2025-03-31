const getCostSquares = (board, color) => {

    let costSquares3 = new Set();
    let costSquares4 = new Set();
    let opponent = color == BLACK ? WHITE : BLACK;

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c <= SIZE - 5; c++) {

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r][c + i]]++;
            }
 
            if (count[color] < 3 || count[opponent] != 0) continue;

            if (c <= SIZE - 7 && board[r][c] == EMPTY && board[r][c + 1] == EMPTY && board[r][c + 5] == EMPTY && board[r][c + 6] == EMPTY) {

                costSquares3.add(r * SIZE + c + 1);
                costSquares3.add(r * SIZE + c + 5);

                c += 6;

                continue;
            }

            if (c <= SIZE - 7 && board[r][c] == EMPTY && board[r][c + 1] == EMPTY && board[r][c + 5] == EMPTY && board[r][c + 6] == color) {

                costSquares4.add(r * SIZE + c + 5);

                c += 6;

                continue;
            }

            if (c <= SIZE - 6 && board[r][c] == EMPTY && board[r][c + 5] == EMPTY) {

                if (count[color] == 3) {

                    costSquares3.add(r * SIZE + c);
                    costSquares3.add(r * SIZE + c + 5);

                    for (let i = 1; i < 5; i++) {
                        if (board[r][c + i] == EMPTY) {
                            costSquares3.add(r * SIZE + c + i);
                            break;
                        }
                    }

                } else {
                    costSquares4.add(r * SIZE + c);
                    costSquares4.add(r * SIZE + c + 5);
                }

                c += 5;

                continue;
            }

            if (count[color] == 4) {

                for (let i = 0; i < 5; i++) {
                    if (board[r][c + i] == EMPTY) {
                        costSquares4.add(r * SIZE + c + i);
                        break;
                    }
                }

                c += 4;

                continue;
            }
        }
    }

    for (let c = 0; c < SIZE; c++) {
        for (let r = 0; r <= SIZE - 5; r++) {
            
            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c]]++;
            }
 
            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r <= SIZE - 7 && board[r][c] == EMPTY && board[r + 1][c] == EMPTY && board[r + 5][c] == EMPTY && board[r + 6][c] == EMPTY) {

                costSquares3.add((r + 1) * SIZE + c);
                costSquares3.add((r + 5) * SIZE + c);

                r += 6;

                continue;
            }

            if (r <= SIZE - 7 && board[r][c] == EMPTY && board[r + 1][c] == EMPTY && board[r + 5][c] == EMPTY && board[r + 6][c] == color) {

                costSquares4.add((r + 5) * SIZE + c);

                r += 6;

                continue;
            }

            if (r <= SIZE - 6 && board[r][c] == EMPTY && board[r + 5][c] == EMPTY) {

                if (count[color] == 3) {

                    costSquares3.add(r * SIZE + c);
                    costSquares3.add((r + 5) * SIZE + c);

                    for (let i = 1; i < 5; i++) {
                        if (board[r + i][c] == EMPTY) {
                            costSquares3.add((r + i) * SIZE + c);
                            break;
                        }
                    }

                } else {
                    costSquares4.add(r * SIZE + c);
                    costSquares4.add((r + 5) * SIZE + c);
                }

                r += 5;

                continue;
            }

            if (count[color] == 4) {

                for (let i = 0; i < 5; i++) {
                    if (board[r + i][c] == EMPTY) {
                        costSquares4.add((r + i) * SIZE + c);
                        break;
                    }
                }

                r += 4;

                continue;
            }
        }
    }

    for (let startRow = 0; startRow <= SIZE - 5; startRow++) {
        for (let r = startRow, c = 0; r <= SIZE - 5 && c <= SIZE - 5; r++, c++) {

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c + i]]++;
            }

            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r <= SIZE - 7 && c <= SIZE - 7 && board[r][c] == EMPTY && board[r + 1][c + 1] == EMPTY && board[r + 5][c + 5] == EMPTY && board[r + 6][c + 6] == EMPTY) {

                costSquares3.add((r + 1) * SIZE + c + 1);
                costSquares3.add((r + 5) * SIZE + c + 5);

                r += 6;
                c += 6;

                continue;
            }

            if (r <= SIZE - 7 && c <= SIZE - 7 && board[r][c] == EMPTY && board[r + 1][c + 1] == EMPTY && board[r + 5][c + 5] == EMPTY && board[r + 6][c + 6] == color) {

                costSquares4.add((r + 5) * SIZE + c + 5);

                r += 6;
                c += 6;

                continue;
            }

            if (r <= SIZE - 6 && c <= SIZE - 6 && board[r][c] == EMPTY && board[r + 5][c + 5] == EMPTY) {

                if (count[color] == 3) {

                    costSquares3.add(r * SIZE + c);
                    costSquares3.add((r + 5) * SIZE + c + 5);

                    for (let i = 1; i < 5; i++) {
                        if (board[r + i][c + i] == EMPTY) {
                            costSquares3.add((r + i) * SIZE + c + i);
                            break;
                        }
                    }

                } else {
                    costSquares4.add(r * SIZE + c);
                    costSquares4.add((r + 5) * SIZE + c + 5);
                }

                r += 5;
                c += 5;

                continue;
            }

            if (count[color] == 4) {

                for (let i = 0; i < 5; i++) {
                    if (board[r + i][c + i] == EMPTY) {
                        costSquares4.add((r + i) * SIZE + c + i);
                        break;
                    }
                }

                r += 4;
                c += 4;

                continue;
            }
        }
    }

    for (let startCol = 1; startCol <= SIZE - 5; startCol++) { 
        for (let r = 0, c = startCol; r <= SIZE - 5 && c <= SIZE - 5; r++, c++) {

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c + i]]++;
            }

            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r <= SIZE - 7 && c <= SIZE - 7 && board[r][c] == EMPTY && board[r + 1][c + 1] == EMPTY && board[r + 5][c + 5] == EMPTY && board[r + 6][c + 6] == EMPTY) {

                costSquares3.add((r + 1) * SIZE + c + 1);
                costSquares3.add((r + 5) * SIZE + c + 5);

                r += 6;
                c += 6;

                continue;
            }

            if (r <= SIZE - 7 && c <= SIZE - 7 && board[r][c] == EMPTY && board[r + 1][c + 1] == EMPTY && board[r + 5][c + 5] == EMPTY && board[r + 6][c + 6] == color) {

                costSquares4.add((r + 5) * SIZE + c + 5);

                r += 6;
                c += 6;

                continue;
            }

            if (r <= SIZE - 6 && c <= SIZE - 6 && board[r][c] == EMPTY && board[r + 5][c + 5] == EMPTY) {

                if (count[color] == 3) {

                    costSquares3.add(r * SIZE + c);
                    costSquares3.add((r + 5) * SIZE + c + 5);

                    for (let i = 1; i < 5; i++) {
                        if (board[r + i][c + i] == EMPTY) {
                            costSquares3.add((r + i) * SIZE + c + i);
                            break;
                        }
                    }

                } else {
                    costSquares4.add(r * SIZE + c);
                    costSquares4.add((r + 5) * SIZE + c + 5);
                }

                r += 5;
                c += 5;

                continue;
            }

            if (count[color] == 4) {

                for (let i = 0; i < 5; i++) {
                    if (board[r + i][c + i] == EMPTY) {
                        costSquares4.add((r + i) * SIZE + c + i);
                        break;
                    }
                }

                r += 4;
                c += 4;

                continue;
            }
        }
    }

    for (let startRow = SIZE - 1; startRow >= 4; startRow--) {
        for (let r = startRow, c = 0; r >= 4 && c <= SIZE - 5; r--, c++) {

            let count = [0, 0, 0];

            for (let i = 0; i < 5; i++) {
                count[board[r - i][c + i]]++;
            }

            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r >= 6 && c <= SIZE - 7 && board[r][c] == EMPTY && board[r - 1][c + 1] == EMPTY && board[r - 5][c + 5] == EMPTY && board[r - 6][c + 6] == EMPTY) {

                costSquares3.add((r - 1) * SIZE + c + 1);
                costSquares3.add((r - 5) * SIZE + c + 5);

                r -= 6;
                c += 6;

                continue;
            }

            if (r >= 6 && c <= SIZE - 7 && board[r][c] == EMPTY && board[r - 1][c + 1] == EMPTY && board[r - 5][c + 5] == EMPTY && board[r - 6][c + 6] == color) {

                costSquares4.add((r - 5) * SIZE + c + 5);

                r -= 6;
                c += 6;

                continue;
            }

            if (r >= 5 && c <= SIZE - 6 && board[r][c] == EMPTY && board[r - 5][c + 5] == EMPTY) {

                if (count[color] == 3) {
                    
                    costSquares3.add(r * SIZE + c);
                    costSquares3.add((r - 5) * SIZE + c + 5);

                    for (let i = 1; i < 5; i++) {
                        if (board[r - i][c + i] == EMPTY) {
                            costSquares3.add((r - i) * SIZE + c + i);
                            break;
                        }
                    }

                } else {
                    costSquares4.add(r * SIZE + c);
                    costSquares4.add((r - 5) * SIZE + c + 5);
                }

                r -= 5;
                c += 5;

                continue;
            }

            if (count[color] == 4) {

                for (let i = 0; i < 5; i++) {
                    if (board[r - i][c + i] == EMPTY) {
                        costSquares4.add((r - i) * SIZE + c + i);
                        break;
                    }
                }

                r -= 4;
                c += 4;

                continue;
            }
        }
    }

    for (let startCol = 1; startCol <= SIZE - 5; startCol++) {
        for (let r = SIZE - 1, c = startCol; r >= 4 && c <= SIZE - 5; r--, c++) {

            let count = [0, 0, 0];

            for (let i = 0; i < 5; i++) {
                count[board[r - i][c + i]]++;
            }

            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r >= 6 && c <= SIZE - 7 && board[r][c] == EMPTY && board[r - 1][c + 1] == EMPTY && board[r - 5][c + 5] == EMPTY && board[r - 6][c + 6] == EMPTY) {

                costSquares3.add((r - 1) * SIZE + c + 1);
                costSquares3.add((r - 5) * SIZE + c + 5);

                r -= 6;
                c += 6;

                continue;
            }

            if (r >= 6 && c <= SIZE - 7 && board[r][c] == EMPTY && board[r - 1][c + 1] == EMPTY && board[r - 5][c + 5] == EMPTY && board[r - 6][c + 6] == color) {

                costSquares4.add((r - 5) * SIZE + c + 5);

                r -= 6;
                c += 6;

                continue;
            }

            if (r >= 5 && c <= SIZE - 6 && board[r][c] == EMPTY && board[r - 5][c + 5] == EMPTY) {

                if (count[color] == 3) {

                    costSquares3.add(r * SIZE + c);
                    costSquares3.add((r - 5) * SIZE + c + 5);

                    for (let i = 1; i < 5; i++) {
                        if (board[r - i][c + i] == EMPTY) {
                            costSquares3.add((r - i) * SIZE + c + i);
                            break;
                        }
                    }

                } else {
                    costSquares4.add(r * SIZE + c);
                    costSquares4.add((r - 5) * SIZE + c + 5);
                }

                r -= 5;
                c += 5;

                continue;
            }

            if (count[color] == 4) {

                for (let i = 0; i < 5; i++) {
                    if (board[r - i][c + i] == EMPTY) {
                        costSquares4.add((r - i) * SIZE + c + i);
                        break;
                    }
                }

                r -= 4;
                c += 4;

                continue;
            }
        }
    }

    return [[...costSquares3], [...costSquares4]];
}

const getGainSquares = (board, color, moves) => {

    let gainSquares3 = [];
    let gainSquares4 = [];

    for (let move of moves) {

        let [r, c] = getCoords(move);

        board[r][c] = color;

        let [costSquares3, costSquares4] = getCostSquares(board, color);

        if (costSquares4.length > 0) {
            gainSquares4.push(move);
        } else if (costSquares3.length > 0) {
            gainSquares3.push(move);
        }

        board[r][c] = EMPTY;
    }

    return [gainSquares3, gainSquares4];
}