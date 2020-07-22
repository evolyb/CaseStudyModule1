function startGame() {
    if (isOver) return;
    window.addEventListener("keydown",moveMyBar);
    window.addEventListener("keyup",stopMyBar);
    creatBricks();
    timeID = setInterval(updateScreen,timeSpeed);
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
            myBar.dx = -myBar.speed;
            break;
        case 39:
            myBar.dx = myBar.speed;
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
        if (this.resetValue% 26 === 0){
            drawBackground();
            this.resetValue =1;
        }
        document.getElementById("score-board").innerHTML = this.value;
    }
}
