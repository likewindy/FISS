export default class TextCursor {
  constructor(fissv) {
    this.fissv = fissv;
    this.enable = false;
    this.ranginfo = {};
  }

  DrawTextCursor(obj, event) {
    this.ranginfo = obj.ranginfo;
    setTimeout(this.Draw, 500);
  }

  Setenable(enable) {
    this.enable = enable;
  }

  Draw = () => {
    if (this.enable) {
      this.fissv.ctx.beginPath();
      this.fissv.ctx.moveTo(this.ranginfo.x + 3, this.ranginfo.y + 2);
      this.fissv.ctx.lineTo(
        this.ranginfo.x + 3,
        this.ranginfo.y + this.ranginfo.height - 4
      );
      this.fissv.ctx.stroke();
      setTimeout(this.EraseTextCursor, 500);
    } else {
      this.EraseTextCursor();
    }
  };
  EraseTextCursor = () => {
    this.fissv.ctx.clearRect(
      this.ranginfo.x + 2,
      this.ranginfo.y + 2,
      this.ranginfo.width - 6,
      this.ranginfo.height - 6
    );
    if (this.enable) setTimeout(this.Draw, 500);
  };
}
