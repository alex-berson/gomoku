const maxScore = 1e3;

const timeOver = (startTime, timeLimit) => Date.now() - startTime >= timeLimit;

const evaluation = (board) => 0;

const alphabeta = (board, depth, alpha, beta, maximizingPlayer, lastMove, startTime, timeLimit, firstLevel) => {

    let ai = player == black ? white : black;

    let free = freeCells(board);

    if (!firstLevel && win(board, lastMove)) return [null, board[Math.floor(lastMove / size)][lastMove % size] == ai ? maxScore * free: -maxScore * free];
    if (depth == 0 || board.adjacentPlaces.size == 0) return [null, evaluation(board)];
    if (timeOver(startTime, timeLimit)) return [null, null];

    let moves = [...board.adjacentPlaces];

    if (firstLevel) shuffle(moves);

    if (maximizingPlayer) {
        
        let bestMove, bestScore = -Infinity;

        for (let move of moves) {

            let tempBoard = board.map(arr => arr.slice());
            tempBoard.adjacentPlaces = new Set(board.adjacentPlaces);
            
            tempBoard[Math.floor(move / size)][move % size] = ai;

            tempBoard.adjacentPlaces.delete(move);

            getAdjacentPlaces(tempBoard, move);

            [_, score] = alphabeta(tempBoard, depth - 1, alpha, beta, false, move, startTime, timeLimit, false);

            if (score > bestScore) [bestScore, bestMove] = [score, move];

            alpha = Math.max(alpha, score);

            if (alpha >= beta) break;
        }

        return [bestMove, bestScore];

    } else {

        let bestMove, bestScore = Infinity;
        
        for (let move of moves) {

            let tempBoard = board.map(arr => arr.slice());
            tempBoard.adjacentPlaces = new Set(board.adjacentPlaces);
            
            tempBoard[Math.floor(move / size)][move % size] = player;

            tempBoard.adjacentPlaces.delete(move);

            getAdjacentPlaces(tempBoard, move);
            
            [_, score] = alphabeta(tempBoard, depth - 1, alpha, beta, true, move, startTime, timeLimit, false);
    
            if (score < bestScore) [bestScore, bestMove] = [score, move];

            beta = Math.min(beta, score);

            if (beta <= alpha) break;
        }

        return [bestMove, bestScore];
    }
}

const minimax = (board, maxDepth, timeLimit) => {

    let startTime = Date.now();
    let bestMove, bestScore;
    let depth = 0;

    do {

        depth++;

        let [move, score] = alphabeta(board, depth, -Infinity, Infinity, true, null, startTime, timeLimit, true);

        // console.log(`Depth: ${depth}, Score: ${score}, Move: ${move}`);

        if (timeOver(startTime, timeLimit)) break;

        // console.log(`Depth: ${depth}, Score: ${score}, Move: ${move}`);

        bestMove = move;
        bestScore = score;

    } while (!timeOver(startTime, timeLimit) && depth < maxDepth && Math.abs(bestScore) < maxScore);

    console.log(`Depth: ${depth - 1}, Score: ${bestScore}, Move: ${bestMove}`);

    do {} while (!timeOver(startTime, timeLimit));

    return bestMove;
}