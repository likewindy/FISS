export default class DrawDirection {
  constructor(fissv, direction, blast, index, enable) {
    this.fissv = fissv;
    this.index = index;
    this.enable = enable;
    this.direction = direction;
    this.bLast = blast;

     this.DrawDirection=this.DrawDirection.bind(this);
      
  }

  DrawDirection   (startx, endy, width, height)   {
    this.fissv.ctx.beginPath();
    var sx = 0,
      sy = 0;
    if (this.direction == "left") {
      sx = parseInt(startx + width * 0.75);
      sy = parseInt(endy + height * 0.25);
    } else {
      sx = parseInt(startx + width * 0.25);
      sy = parseInt(endy + height * 0.25);
    }
    this.fissv.ctx.moveTo(sx, sy);
    this.fissv.ctx.lineTo(sx, parseInt(endy + height * 0.75));
    if (this.direction == "left") {
      this.fissv.ctx.lineTo(
        parseInt(startx + width * 0.25),
        parseInt(endy + height * 0.5)
      );
    } else {
      this.fissv.ctx.lineTo(
        parseInt(startx + width * 0.75),
        parseInt(endy + height * 0.5)
      );
    }
    this.fissv.ctx.lineTo(sx, sy);
    this.fissv.ctx.closePath();
    //背景颜色
    if (!this.enable) this.fissv.ctx.fillStyle = "#bdbebd";
    else this.fissv.ctx.fillStyle = "#ffffff";
    this.fissv.ctx.fill();
    this.fissv.ctx.stroke();
    if (this.bLast) {
      this.fissv.ctx.beginPath();
      if (this.direction == "left") {
        this.fissv.ctx.moveTo(
          parseInt(startx + width * 0.25) - 0.5,
          parseInt(endy + height * 0.25)
        );
        this.fissv.ctx.lineTo(
          parseInt(startx + width * 0.25) - 0.5,
          parseInt(endy + height * 0.75)
        );
      } else {
        this.fissv.ctx.moveTo(
          parseInt(startx + width * 0.75) - 0.5,
          parseInt(endy + height * 0.25)
        );
        this.fissv.ctx.lineTo(
          parseInt(startx + width * 0.75) - 0.5,
          parseInt(endy + height * 0.75)
        );
      }
      this.fissv.ctx.stroke();
      this.fissv.ctx.closePath();
    }
  };
}
