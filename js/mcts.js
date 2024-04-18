const createRoot = (board, color) => {

    let reversedColor = color == black ? white : black;
    let tempBoard = board.map(arr => arr.slice());
    tempBoard.adjacentPlaces = new Set(board.adjacentPlaces);

    let root = {
        board: tempBoard,  
        parent: null, 
        color: reversedColor, 
        plays: Number.MIN_VALUE,
        wins: 0,  
        children: [] 
    };

    let moves = shuffle([...board.adjacentPlaces]);

    for (let move of moves) {
        createNode(root, color, move);
    }

    return root;
} 

const createNode = (node, color, move) => {

    let tempBoard = node.board.map(arr => arr.slice());
    tempBoard.adjacentPlaces = new Set(node.board.adjacentPlaces);
    
    tempBoard[Math.floor(move / size)][move % size] = color;

    tempBoard.adjacentPlaces.delete(move);

    getAdjacentPlaces(tempBoard, move);

    let newNode = {
        board: tempBoard,
        move: move,
        parent: node,
        color: color,
        plays: Number.MIN_VALUE, 
        wins: 0,
        children: []
    };

    node.children.push(newNode);
}

const selection = (tree) => {

    let node = tree;

    while (node.children.length) {

            let maxChild;
            let maxUCB1 = -Infinity;
    
            for (let child of node.children) {
    
                let ucb1 = child.wins / child.plays + 1.5 * Math.sqrt(Math.abs(Math.log(child.parent.plays)) / child.plays);
    
                if (ucb1 > maxUCB1) [maxChild, maxUCB1] = [child, ucb1];
            } 

            node = maxChild;
    }

    return node;
}

const expansion = (node) => {

    let color = node.color == black ? white : black;
    let moves = shuffle([...node.board.adjacentPlaces]);

    if (moves.length == 0) return node;

    for (let move of moves) {
        createNode(node, color, move);
    }

    return node.children[0];
}

const simulation = (node) => {

    let color = node.color == black ? white : black;
    let tempBoard = node.board.map(arr => arr.slice());

    tempBoard.adjacentPlaces = new Set(node.board.adjacentPlaces);

    do {

        let moves = [...tempBoard.adjacentPlaces];
        let move = moves[Math.floor(Math.random() * moves.length)];

        if (move == undefined) return 0;

        tempBoard[Math.floor(move / size)][move % size] = color;

        tempBoard.adjacentPlaces.delete(move);
    
        getAdjacentPlaces(tempBoard, move);
        
        if (win(tempBoard, move)) return color;

        color = color == black ? white : black;
                
    } while (true);
}

const backprapogation = (node, color) => {

    do {
        node.plays++;

        if (node.color == color) node.wins++;

        node = node.parent;

    } while (node != null)
} 

const mcts = (board, color, startTime, timeLimit) => {

    if (board.adjacentPlaces.size == 0) return null;

    let tree = createRoot(board, color);

    for (child of tree.children) {

        if (win(child.board, child.move)) return child.move;
    }

    do {

        let node = selection(tree);

        if (node.plays != Number.MIN_VALUE) node = expansion(node);

        let winner = simulation(node);

        backprapogation(node, winner);

    } while (Date.now() - startTime < timeLimit);

    let bestMove;
    let bestValue = -Infinity;

    for (let child of tree.children) {

        // console.log(child.move, child.wins, child.plays, child.wins / child.plays);

        let value = child.wins / child.plays;

        if (value > bestValue) [bestValue, bestMove] = [value, child.move];
    }

    console.log(bestMove, bestValue);

    return bestMove;
}