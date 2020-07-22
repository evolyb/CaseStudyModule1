
function Bricks(x,y) {
    this.name = "Brick"
    this.length = 100;
    this.height = 30;
    this.isExist = true;
    this.live = Math.floor(Math.random()*4)+1;
    this.x = x;
    this.y = y;
    this.show = function () {
        if (!this.isExist) return;
        ctx.beginPath();
        ctx.rect(this.x,this.y,this.length, this.height);
        ctx.fillStyle = colorLive[this.live];
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
    this.update = function () {
        this.show();
    }
}