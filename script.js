
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
    // let _board = new Array(3).fill(new Array(3).fill(""));

    const getBoard = () => _board;

    const resetBoard = () => {
        _board = new Array(9).fill("");
    };

    // Marks the board with players move, and checks for win condition
    const setMove = (space) => {
        // Checks if space is occupied
        if (getBoard()[space]) return;

        getBoard()[space] = game.getTurn() ? "X" : "O";
        game.setTurn();
        displayController.render(space);
        let w = game.checkWin(getBoard());
        if (w) {
            displayController.showWinner(w)
        }
    };
    

    return {
        setMove,
        getBoard,
        resetBoard
    };
})();


// Module to control the display
const displayController = (() => {
    // Marks the square clicked on
    const render = (space) => {
        let boardSpace = document.getElementById(`id${space + 1}`);
        boardSpace.innerHTML = gameBoard.getBoard()[space];
    };

    // Displays the winner as text
    const showWinner = (winner) => {
        let winBanner = document.getElementById('win-banner');
        winBanner.innerText = `${winner} is the winner!`;
    };

    // Resets the board and hides winner text
    const resetDisplay = () => {
        for (let i = 0; i < 9; i++) {
            displayController.render(i);
        }
        let winBanner = document.getElementById('win-banner');
        winBanner.innerText = "";

    };

    return {
        render,
        showWinner,
        resetDisplay
    };
})();


const game = (() => {
    const p1 = () => {return player("X", "Player 1")};
    const p2 = () => {return player("O", "Player 2")};
    let _turn = true;
    
    // All array indice combos to win
    let winCombos = [
        ['0', '1', '2'], // top row
        ['0', '3', '6'], // left column
        ['0', '4', '8'], // right diagonal
        ['1', '4', '7'], // mid column
        ['2', '5', '8'], // right column
        ['2', '4', '6'], // left diagonal
        ['3', '4', '5'], // middle row
        ['6', '7', '8'] // bottom row
    ];
    
    // Initialization function
    const init = () => {             
        let b = Array.from(document.querySelectorAll('.space'));
        for (let i = 0; i < 9; i++) {
            b[i].addEventListener('click', function () {
                gameBoard.setMove(i)});
        }

        let r = document.getElementById('reset');
        r.addEventListener('click', function (){ reset();})
    }

    // Resets the game
    const reset = () => {
        gameBoard.resetBoard();
        displayController.resetDisplay();
    }

    // Changes the active marker
    const setTurn = () => {
        _turn = _turn ? false : true;
    }

    // Returns the active marker
    const getTurn = () => _turn;

    // checks board array for all 8 possible win combos, returns winner
    const checkWin = (b) => {
        for (let w = 0; w < 8; w++) {
            let pos1 = b[winCombos[w][0]];
            let pos2 = b[winCombos[w][1]];
            let pos3 = b[winCombos[w][2]];

            if (pos1 && pos1 === pos2 && pos1 === pos3) {
                return (pos1 === "X") ? "Player 1" : "Player 2";
            }
        }

    };

    return {
        p1,
        p2,
        init,
        getTurn,
        setTurn,
        checkWin
    };
})();

game.init();