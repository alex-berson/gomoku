// const evaluateBoard = (board) => 0;

const alphabeta2 = (board, depth, alpha, beta, maximizingPlayer, startTime, timeLimit, lastMove, initMoves, init) => {

    let moves = getMoves(board);
    let ai = human == BLACK ? WHITE : BLACK;

    leafs++; //

    if (lastMove != null && gameWon(board, lastMove)) return [null, maximizingPlayer ? -MAX_SCORE : MAX_SCORE];

    // if (lastMove != null && gameWon(board, lastMove)) {

    //     let [r, c] = getCoords(lastMove);

    //     return [null, board[r][c] == ai ? maxScore : -maxScore];
    // }


    // if (depth == 0 || board.adjacentPlaces.size == 0) return [null, evaluateBoard(board, maximizingPlayer)];
    if (depth == 0 || moves.size == 0) return [null, evaluateBoard2(board, maximizingPlayer)];

    // if (moves.size == 0) return [null, evaluateBoard(board, maximizingPlayer)];

    if (timeOver(startTime, timeLimit)) return [null, null];

    // let moves = [...board.adjacentPlaces];

    // console.log('moves ', moves);


    if (lastMove == null) shuffle(moves); 

    // console.log(initMoves);

    if (initMoves != null) moves = [...new Set([...initMoves, ...moves])];

    if (maximizingPlayer) {
        
        let bestMove, bestScore = -Infinity;
        let [_, gainSquares5] = getCostSquares2(board, ai);
        let [costSquares3, costSquares4] = getCostSquares2(board, human);
        
        // let [gainSquares3, gainSquares4] = getGainSquares(board, ai, moves);

        // let threatMoves = [...costSquares5, ...costSquares4, ...costSquares3, ...gainSquares4, ...gainSquares3]

        // if (threatMoves.length > 0) moves = threatMoves;

        // if (gainSquares5.length > 0) {
        //     moves = gainSquares5;
        // } else if (costSquares4.length > 0) {
        //     moves = costSquares4;
        // }

        if (gainSquares5.length > 0) {
            moves = gainSquares5;
        } else if (costSquares4.length > 0) {
            moves = costSquares4;
        } else if (costSquares3.length > 0) {
            let [gainSquares3, gainSquares4] = getGainSquares2(board, ai, moves);
            moves = [...costSquares3, ...gainSquares4];  
        } else {
            // if (!init) return [null, evaluateBoard(board, maximizingPlayer)];
        }

        // if (gainSquares5.length > 0) {
        //     moves = gainSquares5;
        // } else if (costSquares4.length > 0) {
        //     moves = costSquares4;
        // } else if (gainSquares4.length > 0) {
        //     moves = gainSquares4;
        // } else if (costSquares3.length > 0) {
        //     moves = costSquares3;
        // } else if (gainSquares3.length > 0) {
        //     moves = gainSquares3;
        // } else {
        //     // if (!init) return [null, evaluateBoard(board, maximizingPlayer)];
        // }

        // if (gainSquares5.length > 0) {
        //     moves = gainSquares5;
        // } else if (costSquares4.length > 0) {
        //     moves = costSquares4;
        // } else if (costSquares3.length > 0) {
        //     moves = costSquares3;
        // } else if (gainSquares3.length > 0 || gainSquares4.length > 0) {
        //     moves = [...gainSquares3, ...gainSquares4];
        // } else {
        //     // if (!init) return [null, evaluateBoard(board, maximizingPlayer)];
        // }

        // if (init) {

        //     console.log('gain 5 ', [...costSquares5]);
        //     console.log('cost 4 ',[...costSquares4]);
        //     console.log('gain 4 ',[...gainSquares4]);
        //     console.log('cost 3 ',[...costSquares3]);
        //     console.log('gain 3 ',[...gainSquares3]);
        //     console.log('moves ',[...moves]);

        // }

        for (let move of moves) {

            // let tempBoard = board.map(arr => arr.slice());
            let [r, c] = getCoords(move);
            // tempBoard.adjacentPlaces = new Set(board.adjacentPlaces);
            
            // tempBoard[r][c] = ai;
            board[r][c] = ai;


            // tempBoard.adjacentPlaces.delete(move);

            // getAdjacentPlaces(tempBoard, move);

            let [_, score] = alphabeta2(board, depth - 1, alpha, beta, false, startTime, timeLimit, move, null, false);

            board[r][c] = EMPTY;

            if (score > bestScore) [bestScore, bestMove] = [score, move];

            alpha = Math.max(alpha, score);

            if (alpha >= beta) break;
        }

        return [bestMove, bestScore];

    } else {

        let bestMove, bestScore = Infinity;
        let [_, gainSquares5] = getCostSquares2(board, human);
        let [costSquares3, costSquares4] = getCostSquares2(board, ai);

        // let [gainSquares3, gainSquares4] = getGainSquares(board, human, moves);

        // let threatMoves = [...costSquares5, ...costSquares4, ...costSquares3, ...gainSquares4, ...gainSquares3]

        // if (threatMoves.length > 0) moves = threatMoves;

        // if (gainSquares5.length > 0) {
        //     moves = gainSquares5;
        // } else if (costSquares4.length > 0) {
        //     moves = costSquares4;
        // }

        if (gainSquares5.length > 0) {
            moves = gainSquares5;
        } else if (costSquares4.length > 0) {
            moves = costSquares4;
        } else if (costSquares3.length > 0) {
            let [gainSquares3, gainSquares4] = getGainSquares2(board, human, moves);

            moves = [...costSquares3, ...gainSquares4];
        } else {
            // if (!init) return [null, evaluateBoard(board, maximizingPlayer)];
        }

        // if (gainSquares5.length > 0) {
        //     moves = gainSquares5;
        // } else if (costSquares4.length > 0) {
        //     moves = costSquares4;
        // } else if (gainSquares4.length > 0) {
        //     moves = gainSquares4;
        // } else if (costSquares3.length > 0) {
        //     moves = costSquares3;
        // } else if (gainSquares3.length > 0) {
        //     moves = gainSquares3;
        // } else {
        //     // if (!init) return [null, evaluateBoard(board, maximizingPlayer)];
        // }

        // if (gainSquares5.length > 0) {
        //     moves = gainSquares5;
        // } else if (costSquares4.length > 0) {
        //     moves = costSquares4;
        // } else if (costSquares3.length > 0) {
        //     moves = costSquares3;
        // } else if (gainSquares3.length > 0 || gainSquares4.length > 0) {
        //     moves = [...gainSquares3, ...gainSquares4];
        // } else {
        //     // if (!init) return [null, evaluateBoard(board, maximizingPlayer)];
        // }
        
        for (let move of moves) {

            // let tempBoard = board.map(arr => arr.slice());
            let [r, c] = getCoords(move);
            // tempBoard.adjacentPlaces = new Set(board.adjacentPlaces);
            
            // tempBoard[r][c] = human;
            board[r][c] = human;


            // tempBoard.adjacentPlaces.delete(move);

            // getAdjacentPlaces(tempBoard, move);
            
            let [_, score] = alphabeta2(board, depth - 1, alpha, beta, true, startTime, timeLimit, move, null, false);

            board[r][c] = EMPTY;
    
            if (score < bestScore) [bestScore, bestMove] = [score, move];

            beta = Math.min(beta, score);

            if (beta <= alpha) break;
        }

        return [bestMove, bestScore];
    }
}

const minimax2 = (board, startTime, timeLimit) => {

    let depth = 0;
    let initMoves = [];
    let bestMove, bestScore;

    do {

        depth++;

        leafs = 0; //

        let [move, score] = alphabeta2(board, depth, -Infinity, Infinity, true, startTime, timeLimit, null, initMoves, true);

        // console.log(`Depth: ${depth}, Score: ${score}, Move: ${move}`);

        if (timeOver(startTime, timeLimit)) break;

        // console.log(`Depth: ${depth}, Score: ${score}, Move: ${move}`);

        bestMove = move;
        bestScore = score;

        initMoves = [...new Set([...[bestMove], ...initMoves])];

        // console.log(initMoves);

        // console.log(leafs);

        // console.log('bestMove ', bestMove);


    } while (!timeOver(startTime, timeLimit) && Math.abs(bestScore) < MAX_SCORE);


    console.log(leafs); //

    // alert(`Depth: ${depth - 1}, Leaf nodes: ${leafs}, Score: ${bestScore}, Move: ${bestMove}`);

    console.log(`Depth: ${depth - 1}, Score: ${bestScore}, Move: ${bestMove}`); //

    // if (bestScore < -1000) {

    //     let moves = getMoves(board);

    //     let ai = human == BLACK ? WHITE : BLACK;

    //     let [costSquares3, costSquares4] = getCostSquares(board, human);

    //     // let [gainSquares3, gainSquares4] = getGainSquares(board, ai, moves);

    //     // moves = costSquares4.length > 0 ? costSquares4 : [...costSquares3, ...gainSquares4];

    //     moves = costSquares4.length > 0 ? costSquares4 : costSquares3;


    //     if (moves.length > 0) bestMove = moves[Math.floor(Math.random() * moves.length)];
    // }

    return [bestMove, bestScore];
}