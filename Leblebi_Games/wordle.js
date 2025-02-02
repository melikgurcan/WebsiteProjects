var height = 6; //number of guesses
var width = 5; //number of word

var row = 0; //attempt number
var col = 0; //letter index

var gameOver = false;

var words = ["HAYAT", "YILAN", "PARTI", "OZLEM", "KIRAZ", "KILER", "KULAK",
    "KELEK", "SIKKE", "KILIF", "KILIK", "KILIC", "CAKIL", "KILIM", "SAKAL",
    "SADIK", "SICAK", "SOGUK", "KASIT", "ARMUT", "KAPAK", "KAGIT", "SIYAH",
    "BEYAZ", "CICEK", "RESIM", "MUZIK", "KURAK", "SEKIZ", "DOKUZ", "BESIK",
    "PEMBE", "SOFRA", "TABAK", "LOTUS", "HAMSI", "HOSAF", "KREDI", "MELEZ",
    "SAKIZ", "ZEHIR", "UZGUN", "CESME", "SEHPA", "AKREP", "YATAK", "CANTA",
    "CORAP", "KAHVE", "DIYET", "REJIM", "SIVIL"
];
var word = words[Math.floor(Math.random() * words.length)];

window.onload = function() {
    initialize();
    
    $("#leb").click(function(){
        var audio = document.getElementById('leblebi');
        audio.play();
    });
}

function initialize(){

    //creating board
    for(let i = 0; i< height; i++){
        for(let j = 0; j< width; j++){
            //<span id="0-0" class="tile">p</span>
            let tile = document.createElement("span");
            tile.id = i.toString() + "-" + j.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    //Listen for key press
    document.addEventListener("keyup", (e) =>{
        if(gameOver) return;
        
        if("KeyA" <= e.code && e.code <= "KeyZ"){
            if(col<width){
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if(currTile.innerText == ""){
                    currTile.innerText = e.key.toUpperCase();
                    col++;
                }
            }
        }
        else if(e.code == "Backspace"){
            if(0 < col && col <= width){
                col--;
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";
        }
        else if(e.code == "Enter"){
            update();
            if(col == width){
                row++;
                col=0;
            }
        }

        if(!gameOver && row==height){
            gameOver = true;
            alert("Game Over Malsf Hocam, Kelime: "+ word);
            document.getElementById("answer").innerText = word;
        }
    })
}

function update(){
    let correct = 0;
    let letterCount ={}; //KENNY {K:1, E:1,.....}
    
    for(let i=0; i < word.length; i++){
        letter = word[i];
        if(letterCount[letter]){
            letterCount[letter]++;
        }
        else{
            letterCount[letter] = 1;
        }
    }


    //check all the correct ones

    for(let i = 0; i < width; i++){
        let currTile = document.getElementById(row.toString() + "-" + i.toString());
        letter = currTile.innerText;
    
    
       if(word[i] == letter){
            currTile.classList.add("correct");
            correct++;
            letterCount[letter]--;
        }
       
    }
    if(correct == width){
        gameOver = true;
        if(row == 1){
            alert("Tebrikler, doğru tahmin ettiniz! Hile mi yaptınız???!");
        }
        else if(row == 2){
            alert("Tebrikler, doğru tahmin ettiniz! Bu işte çok iyisiniz!");
        }
        else if(row == 3){
            alert("Tebrikler, doğru tahmin ettiniz! Profesyonel bulmaca oyuncusu musunuz?");
        }
        else if(row == 4){
            alert("Tebrikler, doğru tahmin ettiniz! Gayet iyi!!");
        }
        else if(row == 5){
            alert("Tebrikler, doğru tahmin ettiniz! Kılpayı paçayı kurtardınız :)");
        }
    }

    //check all the present ones but in the wrong position

    for(let i = 0; i < width; i++){
        let currTile = document.getElementById(row.toString() + "-" + i.toString());
        letter = currTile.innerText;
    
    if(!currTile.classList.contains("correct")){
        if(word.includes(letter) && letterCount[letter] > 0) {
            currTile.classList.add("present");
            letterCount[letter]--;
        }
        else{
            currTile.classList.add("absent");
        }
    }
}
    }

