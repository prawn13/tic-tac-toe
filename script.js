let board = (() => {
    let board = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    function move(player, space) {
        let x = space % 3;
        let y = Math.floor((space - 1) / 3);
        board[y][x] = player;
    }

    function render() {
        const boardDiv = document.getElementById('board');
        
    }

    return {
        move: move
    };
})();