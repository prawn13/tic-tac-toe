// Factory function to create new player object
const player = (marker, name) => {
    const _marker = marker;
    const _name = name;
    let _score = 0;

    const getMarker = () => _marker;
    const getName = () => _name;
    const score = () => {
        _score++;
        return _score;
    }
    return {
        getMarker,
        getName,
        score
    }
};


// Board module
const gameBoard = (() => {
    let _board = new Array(9).fill("");

    const getBoard = () => _board;

    const resetBoard = () => {
        _board = new Array(9).fill("");
    };

    // Marks the board with players move, and checks for win condition
    const setMove = (space) => {
        // Checks if space is occupied
        if (getBoard()[space] || game.isOver()) return;

        getBoard()[space] = game.getTurn() ? game.p1.getMarker() : game.p2.getMarker();
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

    // Displays the winner/tie as text and increment score
    const showWinner = (winner) => {
        let winBanner = document.getElementById('win-banner');
        
        if (winner === "Tie") {
            winBanner.innerText = "It's a tie!";
        }
        else {
            winBanner.innerHTML = `<span style="color: yellow">~${winner.getName()}~</span> wins!!!`;
            let winScore = document.getElementById(`${winner.getMarker()}-score`);
            winScore.innerText = winner.score();  
        }
    };

    // Resets the board and hides winner text
    const resetDisplay = () => {
        for (let i = 0; i < 9; i++) {
            displayController.render(i);
        }
        let winBanner = document.getElementById('win-banner');
        winBanner.innerText = "Welcome! Tic tac toe;";

    };

    return {
        render,
        showWinner,
        resetDisplay
    };
})();


const game = (() => {
    let p1 = player("X", "PLAYER 1");
    let p2 = player("O", "PLAYER 2");
    let _turn = true;
    let _over = false;

    // All array indice combos to win
    let _winCombos = [
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

    // Checks if game is over to accept input
    const isOver = () => _over;

    // Resets the game
    const reset = () => {
        _turn = true;
        _over = false;
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
        // Check for tie
        if (b.filter(s => s === "").length === 0){
            return "Tie";
        }

        // Check board against the 8 win combos
        for (let w = 0; w < 8; w++) {
            let pos1 = b[_winCombos[w][0]];
            let pos2 = b[_winCombos[w][1]];
            let pos3 = b[_winCombos[w][2]];

            if (pos1 && pos1 === pos2 && pos1 === pos3) {
                _over = true;
                return (pos1 === p1.getMarker()) ? p1 : p2;
            }
        }

    };

    return {
        p1,
        p2,
        init,
        getTurn,
        setTurn,
        checkWin,
        isOver
    };
})();

game.init();