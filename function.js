
function loadGame() {
    soundBegin = new Audio("sounds/begin.mp3");
    drawBackground();
}
function startGame() {
    if (isOver) return;
    if (isStart) return;
    isStart = true;
    soundBegin.play();
    window.addEventListener("keydown",moveMyBar);
    window.addEventListener("keyup",stopMyBar);
    creatBricks();
    timeID = setInterval(updateScreen,timeSpeed);
    soundHit = new Audio("sounds/ballhit.wav");
}
function endGame() {
    clearInterval(timeID);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (isWin)  backgroundImg.src = "images/win.png";
     else backgroundImg.src = "images/gameover.png";
    ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
    isOver = true;
}
function reset() {
    document.location.reload();
}
function updateScreen() {
    myScore.show();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i = 0; i <myTimer.length ; i++) {
        myTimer[i].update();
    }
    ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
    myBar.update();
    for (let i = 0; i <myBricks.length ; i++) {
        for (let j = 0; j <myBricks[i].length ; j++) {
            myBricks[i][j].show();
        }
    }
    for (let i = 0; i <myNotKnow.length ; i++) {
        myNotKnow[i].update();
    }
    for (let i = 0; i <myBall.length ; i++) {
        myBall[i].update();
    }
    blackOut.show();
}
function creatBricks() {
    for (let i = 0; i < 8 ; i++) {
        myBricks[i] = [];
        for (let j = 0; j <3 ; j++) {
            myBricks[i][j] = new Bricks(20+ i*140,30+j*50);
        }
    }
}
function moveMyBar(evt) {
    switch (evt.keyCode) {
        case 37:
            myBar.dx = -myBar.speed*myBar.directMove;
            break;
        case 39:
            myBar.dx = myBar.speed*myBar.directMove;
            break;
    }
}
function stopMyBar(evt) {
    myBar.dx = 0;
}
let blackOut = new BlackOut();
blackOut.isExist = false;
function BlackOut() {
    this.isExist = true;
    this.color = 1;
    this.startTime = Date.now();
    this.endTime = Date.now();
    this.show = function () {
        if (!this.isExist) return;
        ctx.beginPath();
        ctx.rect(0,0,canvas.width,canvas.height);
        if (this.color === colorLive.length){
            this.color = 1;
        } else this.color++;
        ctx.fillStyle = colorLive[this.color];
        ctx.fill();
        ctx.closePath();
        this.endTime = Date.now();
        if (this.endTime > this.startTime + 500) this.isExist = false;
    }
}
function drawBackground() {
    if (isOver) return;
    if (backgroundID <=4){
        backgroundID++;
    } else backgroundID =1;
    backgroundImg.src = "images/background"+backgroundID+".png";
    backgroundImg.onload = function(){
        ctx.drawImage(backgroundImg,0,0,canvas.width,canvas.height);
    }
}
function GetScore() {
    this.value = 0;
    this.resetValue =1;
    this.show = function () {
        // if (this.resetValue% 26 === 0){
        //     drawBackground();
        //     this.resetValue =1;
        // }
        document.getElementById("score-board").innerHTML = this.value;
    }
}
function Timer(time,effect) {
    this.startTime = Date.now();
    this.endTime = Date.now();
    this.time = time;
    this.effect = effect;
    this.update = function () {
        this.endTime = Date.now()
        if (this.endTime - this.startTime > time) {
            effect.reset();
            return;
        }
        effect.update();
    }
}
function EffectChangeColor(item,defaultColor){
    this.reset = function () {
        item.color = defaultColor
    }
    this.update = function () {
        let color = Math.floor(Math.random()*colorLive.length);
        item.color = colorLive[color];
    }
}