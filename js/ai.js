const MAX_SCORE = 1e7;

const timeOver = (startTime, timeLimit) => Date.now() - startTime >= timeLimit;

const alphabeta = (board, depth, alpha, beta, maximizingPlayer, startTime, timeLimit, lastMove, initMoves) => {

    let moves = getMoves(board);
    let ai = human == BLACK ? WHITE : BLACK;

    if (lastMove != null && gameWon(board, lastMove)) return [null, maximizingPlayer ? -MAX_SCORE : MAX_SCORE];
    if (depth == 0 || moves.size == 0) return [null, evaluateBoard(board, maximizingPlayer)];
    if (timeOver(startTime, timeLimit)) return [null, null];
    if (lastMove == null) shuffle(moves); 
    if (initMoves != null) moves = [...new Set([...initMoves, ...moves])];

    if (maximizingPlayer) {
        
        let bestMove, bestScore = -Infinity;
        let [_, gainSquares5] = getCostSquares(board, ai);
        let [costSquares3, costSquares4] = getCostSquares(board, human);

        if (gainSquares5.length > 0) {
            moves = gainSquares5;
        } else if (costSquares4.length > 0) {
            moves = costSquares4;
        } else if (costSquares3.length > 0) {
            let [_, gainSquares4] = getGainSquares(board, ai, moves);
            moves = [...costSquares3, ...gainSquares4];
        }

        for (let move of moves) {

            let [r, c] = getCoords(move);

            board[r][c] = ai;

            let [_, score] = alphabeta(board, depth - 1, alpha, beta, false, startTime, timeLimit, move, null);

            board[r][c] = EMPTY;

            if (score > bestScore) [bestScore, bestMove] = [score, move];

            alpha = Math.max(alpha, score);

            if (alpha >= beta) break;
        }

        return [bestMove, bestScore];

    } else {

        let bestMove, bestScore = Infinity;
        let [_, gainSquares5] = getCostSquares(board, human);
        let [costSquares3, costSquares4] = getCostSquares(board, ai);

        if (gainSquares5.length > 0) {
            moves = gainSquares5;
        } else if (costSquares4.length > 0) {
            moves = costSquares4;
        } else if (costSquares3.length > 0) {
            let [_, gainSquares4] = getGainSquares(board, human, moves);
            moves = [...costSquares3, ...gainSquares4];
        }

        for (let move of moves) {

            let [r, c] = getCoords(move);

            board[r][c] = human;

            let [_, score] = alphabeta(board, depth - 1, alpha, beta, true, startTime, timeLimit, move, null);

            board[r][c] = EMPTY;
    
            if (score < bestScore) [bestScore, bestMove] = [score, move];

            beta = Math.min(beta, score);

            if (beta <= alpha) break;
        }

        return [bestMove, bestScore];
    }
}

const minimax = (board, startTime, timeLimit) => {

    let depth = 0;
    let initMoves = [];
    let bestMove, bestScore;

    do {

        depth++;

        let [move, score] = alphabeta(board, depth, -Infinity, Infinity, true, startTime, timeLimit, null, initMoves);

        if (timeOver(startTime, timeLimit)) break;

        bestMove = move;
        bestScore = score;

        initMoves = [...new Set([...[bestMove], ...initMoves])];

    } while (!timeOver(startTime, timeLimit) && Math.abs(bestScore) < MAX_SCORE);

    return [bestMove, bestScore];
}