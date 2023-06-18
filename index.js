var gameOver;
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
    't', 'u', 'v', 'w', 'x', 'y', 'z'];
var words = [
    "light", "might", "white", "flake",
    "poise", "noise", "voice", "vocal", "abode", "chase",
    "cabin", "right", "focal", "focus", "train", "waste", "eight",
    "yacht", "adopt", "crate", "sedan", "paste", "paint", "faint", "whale",
    "quail", "image", "zebra", "brave", "crave", "dream", "steam", "stare",
    "flare", "great", "shale", "frail", "grail", "night", "sight", "fight",
    "chain", "break", "brake", "trace", "satin", "haste", "urban", "eland",
    "extra", "hover", "cover", "lover", "adieu", "odium", "shade", "resin",
    "alert", "haunt", "orate", "media", "blind", "route", "audio", "pause",
    "alien", "canoe", "plane", "rouse", "fraud", "atone", "raise", "minor",
    "guard", "force", "wound", "cable", "panic", "study", "faith", "equal",
    "grade", "drive", "plate", "trade", "burst", "flash", "shame", "float",
    "sting", "blend", "party", "store", "shine", "match", "track", "crash",
    "clown", "shaky", "vegan", "power", "enjoy", "brain", "tower", "delay",
    "choke", "split", "rhyme", "plant", "empty", "blame", "shift", "abuse",
    "harsh", "quest", "unite", "final", "worth", "proud", "false", "crush",
    "relax", "drain", "thump", "quake", "argue", "sharp", "guide", "march",
    "curse", "grain", "spate", "vapid", "pique", "berth", "prate", "plumb",
    "taper", "blase", "fusty", "antic", "clout"
];
var output;
var inputText = "";
var outRows = 6;
var outCols = 5;
var alphaRowsCols = 26;
var currCol = 0;
var alpha;
var same = false;
var not = false;
var iN = false;
var word = words[Math.floor(Math.random() * (words.length))];
console.log(word);
var a;
var i;
var gameOver = false;
var pressed = false;
var ready = false;
let easy = true;
let hard = false;

window.onload = function () {
    setGame();
}

function keyPressed(i) {
    let obj = document.getElementById("input");
    window.addEventListener('keydown', (event) => {
        if (event.key == alphabet[i] && ready == false && inputText.length < 5 && !over(currCol, gameOver)) {
            inputText = inputText + alphabet[i];
            document.getElementById("input").innerText = inputText;
            pressed = false;
        } else if (event.key == "Enter" && !pressed && !over(currCol, gameOver) && inputText.length == 5) {
            ready = true;
            pressed = true;
            checkWord(inputText);
            currCol++;
            inputText = "";
            obj.innerText = inputText;
            ready = false;
            giveAlert(gameOver, currCol);


        } else if (event.keyCode == 8 && !over(currCol, gameOver)) {
            inputText = inputText.slice(0, -1);
            document.getElementById("input").innerText = inputText;
        }
    });
}

function setGame() {
    let mode = document.querySelector("#mode");
    let gameType = document.getElementById("gameType");
    let enter = document.getElementById("enter");
    output = [];
    input = [];
    alpha = [];
    a = 0;
    i = 0;
    for (let r = 0; r < outRows; r++) {
        let row = [];
        for (let c = 0; c < outCols; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = i;
            tile.classList.add("outputTile");
            document.getElementById("output").append(tile);
            i++;
        }
        output.push(row);
    }

    for (let c = 0; c < alphaRowsCols; c++) {
        let row = [];
        row.push(' ');
        let tile = document.createElement("div");
        tile.id = alphabet[a];
        tile.innerText = alphabet[a];
        tile.classList.add("alphaTile");
        tile.addEventListener("click", keyPressed(a));
        document.getElementById("alpha").append(tile);
        a++;
        alpha.push(row);
    }

    enter.addEventListener('click', function () {
        pressed = false;
        console.log("enter clicked");
        console.log("pressed", pressed);
        console.log("over", over(currCol, gameOver));
        console.log(currCol);
        let obj = document.getElementById("input");
        if (!pressed && !over(currCol, gameOver) && inputText.length == 5) {
            ready = true;
            pressed = true;
            checkWord(inputText);
            currCol++;
            inputText = "";
            obj.innerHTML = inputText;
            ready = false;
            giveAlert(gameOver, currCol);


        }
    });

    mode.addEventListener("click", function () {
        if (easy) {
            easy = false;
            hard = true;
            gameType.innerText = "DIFFICULTY: HARD";
            console.log(gameType.innerText);

        } else if (hard) {
            easy = true;
            hard = false;
            gameType.innerText = "DIFFICULTY: EASY";
            console.log(gameType.innerText);
        }
    });
}




function checkWord(input) {
    for (let i = 0; i < input.length; i++) {
        let obj = document.getElementById((currCol * 5) + i);
        obj.classList.add(checkLetter(input.charAt(i), i, input));
        obj.innerText = input.charAt(i).toUpperCase();
        updateLetters(input.charAt(i), checkLetter(input.charAt(i), i, input));
    }
}

function checkLetter(input, i, whole) {
    let done = false;
    if (input == word.charAt(i)) {
        return "green";
    } else {
        for (let a = 0; a < word.length; a++) {
            done = false;
            if (input == word.charAt(a) && a != i && easy) {
                done = true;
                return "yellow";
            }
        }
        if (!done) {
            return "red";
        }
    }

    if (whole.match(word)) {
        gameOver = true;
        over(currCol, gameOver);
    }
}

function updateLetters(num, color) {
    let alpha = document.getElementById(num);
    if (alpha.className != "green" || alpha.className != "red" || alpha.className != "yellow") {
        alpha.classList.add(color);
    }
}


function over(col, done) {
    if (done) {
        gameOver = true;
        return gameOver;
    } else if (col > 5) {
        gameOver = true;
        return gameOver;
    } else {
        gameOver = false;
        return gameOver;
    }
}

function giveAlert(done, col) {
    if (done) {
        window.alert("GOOD JOB YOU GUESSED THE WORD IN " + col + " TRIES")
    } else if (col > 5) {
        window.alert("OH NO YOU RAN OUT OF TRIES");
    }
}


