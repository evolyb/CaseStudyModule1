
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
            let selectCase = Math.floor(Math.random()*3);
            switch (selectCase) {
                case 0:
                    for (let i = 0; i < 3; i++) {
                        let newBall = new Balls();
                        newBall.x = Math.random()*(canvas.width-100)+50;
                        newBall.y = canvas.height- myBar.height-this.radius-5;
                        newBall.dy = -Math.abs(myBall[i].dy);
                        newBall.dx = -myBall[i].dx + Math.random()*3;
                        myBall.push(newBall);
                    }

                    break;
                case 1:
                    myBar.length = Math.max(100, myBar.length - 50);
                    break;
                case 2:
                blackOut = new BlackOut();
            }
            }
        }
    this.update = function () {
        this.beEaten(myBar);
        this.y += this.dy;
        this.show();
    }
}