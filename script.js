const player = ((marker, name) => {
    let _marker = marker;
    let _name = name;
    const getMarker = () => {
        return _marker;
    } 
    const getName = () => {
        return _name;
    }
    return {
        getMarker,
        getName
    }
});

let board = (() => {
    let _board = new Array(9).fill("_");
    let _turn = "X";
    
    function move(space) {
        if (_board[space] !== " ") return;
        _board[space] = _turn;
        _turn = (_turn === "X") ? "O" : "X";
        displayController.render();
    }

    return {
        move: move,
        
    };
})();


let displayController = (() => {
    function init() {
        let _p1 = player("X");
        let _p2 = player("O");

        const spaces = document.querySelectorAll('.space');
        for(let i = 0; i < 9; i++) {
            console.log(spaces[i]);
        }
    }

    function render() {
        const spaces = document.querySelectorAll('.space');
        for(let i = 0; i < 9; i++) {
            spaces[i].innerHTML = board[i];
            // console.log(spaces[i]);
        }
    }

    init();
    return {
        render
    }

})();


// board.init();