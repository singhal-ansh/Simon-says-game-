let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "purple", "green"]; // Matched the order in the HTML

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// CHANGED: Combined both flash functions into one that uses the new CSS class
function btnFlash(btn) {
    btn.classList.add("pressed");
    setTimeout(function () {
        btn.classList.remove("pressed");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // FIXED: Changed from 3 to 4 so all buttons are included
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log(`Game Sequence: ${gameSeq}`);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            // FIXED: Corrected the setTimeout syntax
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start again.`;
        
        // CHANGED: Using the new .game-over class for a better effect
        document.querySelector("body").classList.add("game-over");
        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);

        reset();
    }
}

function btnPress() {
    let btn = this;
    btnFlash(btn); // Use the same flash effect for user and game

    let userColor = btn.getAttribute("class").split(" ")[1]; // A more robust way to get the color
    userSeq.push(userColor);
    
    console.log(`User Sequence: ${userSeq}`);
    checkAns(userSeq.length - 1);
}

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}