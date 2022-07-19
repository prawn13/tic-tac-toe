
// Factory function to create new player object
const player = (marker, name) => {
    let _marker = marker;
    let _name = name;

    const getMarker = () => _marker;
    const getName = () => _name;
    return {
        getMarker,
        getName
    }
};


// Board module
const gameBoard = (() => {
    let _board = new Array(9).fill("");

    const getBoard = () => _board;

    const setMove = (space) => {
        // Checks if space is occupied
        if (getBoard()[space]) return;

        getBoard()[space] = game.getTurn() ? "X" : "O";
        game.setTurn();
        displayController.render(space);
    };

    return {
        setMove,
        getBoard
    };
})();


// Module to control the display
const displayController = (() => {
    // Marks the square clicked on
    const render = (space) => {
        let boardSpace = document.getElementById(`id${space + 1}`);
        boardSpace.innerHTML = gameBoard.getBoard()[space];
    };

    return {
        render
    };
})();


const game = (() => {
    const p1 = () => {return player("X", "Player 1")};
    const p2 = () => {return player("O", "Player 2")};
    let _turn = true;
    
    // Initialization function
    const init = () => {             
        let b = Array.from(document.querySelectorAll('.space'));
        for (let i = 0; i < 9; i++) {
            b[i].addEventListener('click', function () {
                gameBoard.setMove(i)});
        }
    }

    const setTurn = () => {
        _turn = _turn ? false : true;
    }

    const getTurn = () => _turn;

    return {
        p1,
        p2,
        init,
        getTurn,
        setTurn
    };
})();

game.init();