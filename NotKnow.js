
function NotKnow(x,y) {
    this.x = x;
    this.y = y;
    this.dy = 3;
    this.isExist = true;
    this.radius = 20;
    this.show = function () {
        if (!this.isExist) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius,0,2*Math.PI);
        ctx.fillStyle = "orange";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.font = "30px Arial";
        ctx.fillStyle = "black"
        ctx.fillText("?",this.x-8,this.y+10);
        ctx.closePath();
    }
    this.beEaten = function (item) {
        if (!this.isExist) return;
        if (this.x + this.radius > item.x && this.x - this.radius < item.x +item.length
            && this.y + this.radius > item.y && this.y - this.radius <item.y + item.height){
            this.isExist = false;
            let selectCase = Math.floor(Math.random()*5);
            let count = 0;
            let randX, randY;
            switch (selectCase) {
                case 0:
                    for (let i = 0; i < 3; i++) {
                        let newBall = new Balls();
                        newBall.x = Math.random()*(canvas.width-100)+50;
                        newBall.y = canvas.height- myBar.height-this.radius-5;
                        newBall.dy = -Math.abs(myBall[i].dy);
                        newBall.dx = -myBall[i].dx
                        myBall.push(newBall);
                    }
                    break;
                case 1:
                    myBar.length = Math.max(100, myBar.length - 50);
                    myTimer.push(new Timer(1000,new EffectChangeColor(myBar)));
                    break;
                case 2:
                    do{
                        count++;
                        randX = Math.floor(Math.random()*myBricks.length);
                        randY = Math.floor(Math.random()*myBricks[randX].length);
                    } while (myBricks[randX][randY].isExist && count < 100)
                    myBricks[randX][randY].isExist = true;
                    myBricks[randX][randY].live = 4;
                    myTimer.push(new Timer(1000,new EffectChangeColor(myBricks[randX][randY])));
                    break;
                case 3:
                    blackOut = new BlackOut();
                    break
                case 4:
                    myBar.directMove *= -1;
                    if (myBar.directMove === 1){
                        myBar.defautColor = "yellow";
                        myBar.color = "yellow"
                    } else {
                        myBar.defautColor = "red";
                        myBar.color = "red"
                    }
                    break;
                // case 6:
                //     do{
                //
                //         count++;
                //         randX = Math.floor(Math.random()*myBricks.length);
                //         randY = Math.floor(Math.random()*myBricks[randX].length);
                //     } while (myBricks[randX][randY].isExist && count < 100)
                //     myBricks[randX][randY].isExist = true;
                //     myBricks[randX][randY].live = 4;
                //     myBricks[randX][randY].y = Math.max(myBall[0].y - myBall[0].radius - 70,0);
                //     myBricks[randX][randY].x = Math.max(myBall[0].x - 50,0);
                //     myTimer.push(new Timer(1500,new EffectChangeColor(myBricks[randX][randY],"")));
                //     console.log(myBall[0],myBricks[randX][randY]);
                //     break;
            }
            }
        }
    this.update = function () {
        this.beEaten(myBar);
        if (!this.isExist) return;
        if (this.y >= canvas.height) this.dy = 0;
        this.y += this.dy;
        this.show();
    }
}