const getCostSquares2 = (board, color) => {

    const analyze5 = (r, c, dr, dc, boundaryCheck) => {

        let count = [0,0,0];

        for (let i = 0; i < 5; i++) {
            count[board[r + i * dr][c + i * dc]]++;
        }

        if (count[color] < 3 || count[opponent] != 0) return [r, c];

        if (boundaryCheck(r, c, 7) && board[r][c] == 0 && board[r + 1 * dr][c + 1 * dc] == 0 && board[r + 5 * dr][c + 5 * dc] == 0 && board[r + 6 * dr][c + 6 * dc] == 0) {
            costSquares3.add((r + 1 * dr) * SIZE + c + 1 * dc);
            costSquares3.add((r + 5 * dr) * SIZE + c + 5 * dc);

            // r += 6 * dr;
            // c += 6 * dc;

            return [r + 6 * dr, c + 6 * dc];
        }

        if (boundaryCheck(r, c, 7) && board[r][c] == 0 && board[r + 1 * dr][c + 1 * dc] == 0 && board[r + 5 * dr][c + 5 * dc] == 0 && board[r + 6 * dr][c + 6 * dc] == color) {

            costSquares4.add((r + 5 * dr) * SIZE + c + 5 * dc);

            // r += 6 * dr;
            // c += 6 * dc;

            return [r + 6 * dr, c + 6 * dc];
        }

        if (boundaryCheck(r, c, 6) && board[r][c] == 0 && board[r + 5 * dr][c + 5 * dc] == 0) {

            if (count[color] == 3) {

                costSquares3.add(r * SIZE + c);
                costSquares3.add((r + 5 * dr) * SIZE + c + 5 * dc);

                for (let i = 1; i < 5; i++) {
                    if (board[r + i * dr][c + i * dc] == EMPTY) {
                        costSquares3.add((r + i * dr) * SIZE + c + i * dc);
                        break;
                    }
                }
            } else {
                costSquares4.add(r * SIZE + c);
                costSquares4.add((r + 5 * dr) * SIZE + c + 5 * dc);
            }

            // r += 5 * dr;
            // c += 5 * dc;

            return [r + 5 * dr, c + 5 * dc];
        }

        if (count[color] == 4) {

            for (let i = 0; i < 5; i++) {
                if (board[r + i * dr][c + i * dc] == EMPTY) {
                    costSquares4.add((r + i * dr) * SIZE + c + i * dc);
                    break;
                }
            }

            // r += 4 * dr;
            // c += 4 * dc;

            return [r + 4 * dr, c + 4 * dc];
        }

        return [r, c];
    }

    let costSquares3 = new Set();
    let costSquares4 = new Set();
    let opponent = color == BLACK ? WHITE : BLACK;

    for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c <= SIZE - 5; c++) {

            // [r, c] = analyze5(r, c, 0, 1, (r, c, length) => c <= SIZE - length);    

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r][c + i]]++;
            }
 
            if (count[color] < 3 || count[opponent] != 0) continue;

            if (c <= SIZE - 7 && board[r][c] == 0 && board[r][c + 1] == 0 && board[r][c + 5] == 0 && board[r][c + 6] == 0) {
                costSquares3.add(r * SIZE + c + 1);
                costSquares3.add(r * SIZE + c + 5);

                c += 6;
                continue;
            }

            if (c <= SIZE - 7 && board[r][c] == 0 && board[r][c + 1] == 0 && board[r][c + 5] == 0 && board[r][c + 6] == color) {

                costSquares4.add(r * SIZE + c + 5);

                c += 6;
                continue;
            }

            if (c <= SIZE - 6 && board[r][c] == 0 && board[r][c + 5] == 0) {

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

            // [r, c] = analyze5(r, c, 1, 0, (r, c, length) => r <= SIZE - length);  
            
            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c]]++;
            }
 
            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r <= SIZE - 7 && board[r][c] == 0 && board[r + 1][c] == 0 && board[r + 5][c] == 0 && board[r + 6][c] == 0) {

                costSquares3.add((r + 1) * SIZE + c);
                costSquares3.add((r + 5) * SIZE + c);

                r += 6;
                continue;
            }

            if (r <= SIZE - 7 && board[r][c] == 0 && board[r + 1][c] == 0 && board[r + 5][c] == 0 && board[r + 6][c] == color) {

                costSquares4.add((r + 5) * SIZE + c);

                r += 6;
                continue;
            }

            if (r <= SIZE - 6 && board[r][c] == 0 && board[r + 5][c] == 0) {

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

            // [r, c] = analyze5(r, c, 1, 1, (r, c, length) => r <= SIZE - length && c <= SIZE - length);

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c + i]]++;
            }

            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r <= SIZE - 7 && c <= SIZE - 7 && board[r][c] == 0 && board[r + 1][c + 1] == 0 && board[r + 5][c + 5] == 0 && board[r + 6][c + 6] == 0) {

                costSquares3.add((r + 1) * SIZE + c + 1);
                costSquares3.add((r + 5) * SIZE + c + 5);

                r += 6;
                c += 6;
                continue;
            }

            if (r <= SIZE - 7 && c <= SIZE - 7 && board[r][c] == 0 && board[r + 1][c + 1] == 0 && board[r + 5][c + 5] == 0 && board[r + 6][c + 6] == color) {

                costSquares4.add((r + 5) * SIZE + c + 5);

                r += 6;
                c += 6;
                continue;
            }

            if (r <= SIZE - 6 && c <= SIZE - 6 && board[r][c] == 0 && board[r + 5][c + 5] == 0) {

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

            // [r, c] = analyze5(r, c, 1, 1, (r, c, length) => r <= SIZE - length && c <= SIZE - length);

            let count = [0,0,0];

            for (let i = 0; i < 5; i++) {
                count[board[r + i][c + i]]++;
            }

            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r <= SIZE - 7 && c <= SIZE - 7 && board[r][c] == 0 && board[r + 1][c + 1] == 0 && board[r + 5][c + 5] == 0 && board[r + 6][c + 6] == 0) {

                costSquares3.add((r + 1) * SIZE + c + 1);
                costSquares3.add((r + 5) * SIZE + c + 5);

                r += 6;
                c += 6;
                continue;
            }

            if (r <= SIZE - 7 && c <= SIZE - 7 && board[r][c] == 0 && board[r + 1][c + 1] == 0 && board[r + 5][c + 5] == 0 && board[r + 6][c + 6] == color) {

                costSquares4.add((r + 5) * SIZE + c + 5);

                r += 6;
                c += 6;
                continue;
            }

            if (r <= SIZE - 6 && c <= SIZE - 6 && board[r][c] == 0 && board[r + 5][c + 5] == 0) {

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

            // [r, c] = analyze5(r, c, -1, 1, (r, c, length) => r >= length - 1 && c <= SIZE - length);

            let count = [0, 0, 0];

            for (let i = 0; i < 5; i++) {
                count[board[r - i][c + i]]++;
            }

            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r >= 6 && c <= SIZE - 7 && board[r][c] == 0 && board[r - 1][c + 1] == 0 && board[r - 5][c + 5] == 0 && board[r - 6][c + 6] == 0) {

                costSquares3.add((r - 1) * SIZE + c + 1);
                costSquares3.add((r - 5) * SIZE + c + 5);

                r -= 6;
                c += 6;
                continue;
            }

            if (r >= 6 && c <= SIZE - 7 && board[r][c] == 0 && board[r - 1][c + 1] == 0 && board[r - 5][c + 5] == 0 && board[r - 6][c + 6] == color) {

                costSquares4.add((r - 5) * SIZE + c + 5);

                r -= 6;
                c += 6;
                continue;
            }

            if (r >= 5 && c <= SIZE - 6 && board[r][c] == 0 && board[r - 5][c + 5] == 0) {

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

            // [r, c] = analyze5(r, c, -1, 1, (r, c, length) => r >= length - 1 && c <= SIZE - length);

            let count = [0, 0, 0];

            for (let i = 0; i < 5; i++) {
                count[board[r - i][c + i]]++;
            }

            if (count[color] < 3 || count[opponent] != 0) continue;

            if (r >= 6 && c <= SIZE - 7 && board[r][c] == 0 && board[r - 1][c + 1] == 0 && board[r - 5][c + 5] == 0 && board[r - 6][c + 6] == 0) {

                costSquares3.add((r - 1) * SIZE + c + 1);
                costSquares3.add((r - 5) * SIZE + c + 5);

                r -= 6;
                c += 6;
                continue;
            }

            if (r >= 6 && c <= SIZE - 7 && board[r][c] == 0 && board[r - 1][c + 1] == 0 && board[r - 5][c + 5] == 0 && board[r - 6][c + 6] == color) {

                costSquares4.add((r - 5) * SIZE + c + 5);

                r -= 6;
                c += 6;
                continue;
            }

            if (r >= 5 && c <= SIZE - 6 && board[r][c] == 0 && board[r - 5][c + 5] == 0) {

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

const getGainSquares2 = (board, color, moves) => {

    let gainSquares3 = [];
    let gainSquares4 = [];

    for (let move of moves) {

        let [r, c] = getCoords(move);

        board[r][c] = color;

        let [costSquares3, costSquares4] = getCostSquares2(board, color);

        if (costSquares4.length > 0) {
            gainSquares4.push(move);
        } else if (costSquares3.length > 0) {
            gainSquares3.push(move);
        }

        board[r][c] = EMPTY;
    }

    // console.log(gainSquares3, gainSquares4);

    return [gainSquares3, gainSquares4];
}