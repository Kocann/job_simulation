export class Component {
  constructor(x, y, width, height, type = "block", color = "#dd0000") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.movingX = 0;
    this.movingY = 0;
    this.type = type;
    this.healthPoints;
    this.kind;
    this.moveTo = (cnv) => {
      if ((this.x + cnv.dx > cnv.width - this.width) ||
          (this.x + cnv.dx < cnv.dx)) {
        this.movingX = (this.kind === "enemyComponent") ? this.movingX *= -1 : this.movingX;

      } else if ((this.y + cnv.dy > cnv.height - this.height) ||
                 (this.y + cnv.dy < cnv.dy)){
        this.movingY = (this.kind === "enemyComponent") ? this.movingY *= -1 : this.movingY;

      } 
      this.x += this.movingX;
      this.y += this.movingY;
    }
    this.update = (cntx) => {
      if (this.type == "img") {
          this.img = new Image();
          this.img.src = this.imgSrc;
          cntx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } else {
        cntx.fillStyle = color;
        cntx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    
    this.crashed = (obstacle) => {
      // component actual size and position
      let borderLeft = this.x;
      let borderRight = this.x + this.width;
      let borderTop = this.y;
      let borderBottom = this.y + this.height;
      
      // obstacle actual size and position
      let obstacleLeft = obstacle.x;
      let obstacleRight = obstacle.x + obstacle.width;
      let obstacleTop = obstacle.y;
      let obstacleBottom = obstacle.y + obstacle.height;
      
      // checking if components coords collide
      if((borderLeft > (obstacleRight)) ||
         (borderRight < (obstacleLeft)) ||
         (borderTop > (obstacleBottom)) ||
         (borderBottom < (obstacleTop))) {
         return false;  
      }
      
      return true;
    }
  }
}