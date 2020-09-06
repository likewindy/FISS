export default class SheetBar {
  constructor(fissv, sheetid, sheetname) {
    this.fissv = fissv;
    this.sheetname = sheetname;
    this.sheetid = sheetid;
  }
  Draw(startx, endy, width, height) {
    this.fissv.ctx.font =
      this.fissv.defaultFontSz + " " + this.fissv.defaultFontFamily; //12号，等线字体

    if (this.fissv.sheetIndex + 1 == this.sheetid)
      this.fissv.ctx.fillStyle = "white";
    else this.fissv.ctx.fillStyle = "#e9e9e9";
    this.fissv.ctx.fillRect(startx, endy, width, height);
    this.fissv.ctx.strokeStyle = "lightblue";
    this.fissv.ctx.strokeRect(startx, endy, width - 1, height - 1);
    this.fissv.ctx.textAlign = "center";
    this.fissv.ctx.textBaseline = "middle";
    this.fissv.ctx.fillStyle = "black";
    this.fissv.ctx.fillText(
      this.sheetname,
      startx + width / 2,
      endy + height / 2
    );
  }
}
