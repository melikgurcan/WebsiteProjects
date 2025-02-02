var board;
var playerO = "X";
var playerX = "O";
var currPlayer = playerO;
var gameOver = false;

window.onload = function(){
    setGame();
    
$("#leb").click(function(){
    var audio = document.getElementById('leblebi');
    audio.play();
});

}

function setGame() {
    board = [
        ['','',''],
        ['','',''],
        ['','','']
    ]
    for(let i=0; i<3; i++) {
        for(let j=0; j<3; j++) {
            let box = document.createElement("div");
            box.id = i.toString() + "-" + j.toString();
            box.classList.add("box");
            if(i == 0 || i == 1){
                box.classList.add("horizontal-line");
            }
            if(j == 0 || j == 1){
                box.classList.add("vertical-line");
            }
            box.addEventListener("click", setTile);
            document.getElementById("board").append(box);
        }
    }

}

function setTile(){
    if(gameOver) return;

    let coords = this.id.split("-"); //"1-1" -> ["1","1"]
    let row = parseInt(coords[0]);
    let col = parseInt(coords[1]);

    if(board[row][col] != ''){
        return;
    }

    board[row][col] = currPlayer;
        let img = document.createElement("img");
        img.classList.add("player-img");

        if (currPlayer == playerO) {
            img.src = "img/banuAlkan.webp";
            currPlayer = playerX;
        } else {
            img.src = "img/ibo.webp";
            currPlayer = playerO;
        }

        this.appendChild(img);

        checkWinner();
    }

function checkWinner(){
    //horizontally
    for(let i=0; i<3; i++){
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != ''){
            for(let j=0; j<3; j++){
                let tile = document.getElementById(i.toString() + "-" + j.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            playWinSound(board[i][0]);
            return;
        }
    }


    //vertically
    for(let i=0; i<3; i++){
        if(board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != ''){
            for(let j=0; j<3; j++){
                let tile = document.getElementById(j.toString() + "-" + i.toString());
                tile.classList.add("winner");
            }
            gameOver = true;
            playWinSound(board[0][i]);
            return;
        }
    }

    //diagonally
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != ''){
        for(let j=0; j<3; j++){
            let tile = document.getElementById(j.toString() + "-" + j.toString());
            tile.classList.add("winner");
        }
        gameOver = true;
        playWinSound(board[0][0]);
        return;
    }

    if(board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2]!= ''){
        for(let j=0; j<3; j++){
            let tile = document.getElementById(j.toString() + "-" + (2 - j).toString());
            tile.classList.add("winner");
    }
    gameOver = true;
    playWinSound(board[0][2]);
    return;
}
}

function playWinSound(winner) {
    if (winner == playerO) {
        $("#banu")[0].play();
    } else if (winner == playerX) {
        $("#ibo")[0].play();
    }
}

