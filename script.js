let gameSeq=[];
let userSeq=[];
let btns = ["yellow","red","green","purple"];
let started = false;
let level = 0;
let highestScore = 0;
let h2 = document.querySelector("h2");
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);

}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);

}
function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let btn = document.querySelector(`.${randColor}`);
    btnFlash(btn);
    gameSeq.push(randColor);
    console.log(gameSeq);

}
function checkAns(idx){
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp(),1000);
        }

    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${level - 1} </b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        },150);
        reset();
    }
}

function btnPress(){
    console.log("Button was pressed");
    let btn = this;
    userFlash(btn);
    userSeq.push(btn.classList[1]);
    console.log(userSeq);
    checkAns(userSeq.length -1);
}
document.addEventListener("keypress",function(){
    if (started == false) {
        started = true; 
        console.log("Game Started");
        levelUp();
    }

})

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}