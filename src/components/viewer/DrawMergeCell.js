import DrawCellText from "./DrawCellText.js";
import DrawCell from "./DrawCell.js";

export default class DrawMergeCell {
  constructor(fissv) {
    this.fissv = fissv;
    this.drawText = new DrawCellText(this);
  }

  DrawDataCell(
    startx,
    starty,
    height,
    width,
    startrow,
    startcol,
    endrow,
    endcol
  ) {
    // ctx.rect(50,20,200,120);
    // ctx.stroke();
    // ctx.clip();
    // //剪切之后画一个矩形
    // ctx.fillStyle="red";
    // ctx.fillRect(0,0,180,100);
    var range =
      this.fissv.GetColAlphabetByColNumber(startcol - 1) + "" + startrow;
    var cell = this.fissv.ActiveSheet.sheetData.GetCell(startrow, range);
    if (cell == null) return;
    var xf = this.fissv.fiss.fissM.styles.cellXfs.GetCellStyle(cell.s);
    this.DrawRealDataCell(
      startx,
      starty,
      height,
      width,
      xf,
      startrow,
      startcol,
      endrow,
      endcol
    );
  }
  DrawRealDataCell(
    startx,
    starty,
    height,
    width,
    xf,
    row,
    col,
    endrow,
    endcol
  ) {
    this.fissv.ctx.save();
    var cell = new DrawCell(this.fissv);
    //背景颜色
    if (xf != null && xf.applyFill) {
      cell.DrawDataCellFill(
        startx + 2,
        starty + 2,
        height - 4,
        width - 4,
        xf,
        row,
        col
      );
    } else {
      this.fissv.ctx.clearRect(startx, starty, width - 1, height - 1);
    }
    //文本;
    this.drawText.Draw(
      startx + 2,
      starty + 2,
      height - 4,
      width - 4,
      xf,
      row,
      col,
      xf
    );

    this.fissv.ctx.restore();
  }
  GetSubpx(row, col, type) {
    var lineWidth = 1;
    var borderPr = this.GetCellBorderPr(row, col, type);
    if (borderPr == null) {
      if (type == "start") borderPr = this.GetCellBorderPr(row, col - 1, "end");
      else if (type == "bottom")
        borderPr = this.GetCellBorderPr(row + 1, col, "top");
      else if (type == "top")
        borderPr = this.GetCellBorderPr(row - 1, col, "bottom");
      else if (type == "end")
        borderPr = this.GetCellBorderPr(row, col + 1, "start");
    }
    if (borderPr == null) return lineWidth;
    var borderStyle = borderPr.borderStyle;
    if (borderStyle.indexOf("thick") > -1) lineWidth = 3;
    if (borderStyle.indexOf("medium") > -1) lineWidth = 2;
    if (borderStyle.indexOf("slantDashDot") > -1) lineWidth = 2;
    if (borderStyle.indexOf("double") > -1) lineWidth = 3;
    return lineWidth;
  }
  GetCellBorderPr(row, col, type) {
    if (row < 0) return null;
    if (col < 0) return null;
    var range = this.fissv.GetColAlphabetByColNumber(col - 1) + "" + row;
    var cell = this.fissv.ActiveSheet.sheetData.GetCell(row, range);
    if (cell == null) return null;
    var xf = this.fissv.fiss.fissM.styles.cellXfs.GetCellStyle(cell.s);
    if (xf == null) return null;
    if (xf.applyBorder) {
      var border = this.fissv.fiss.fissM.styles.borders.GetBorderByID(
        xf.borderId
      );
      if (type == "start" && border.start != null) return border.start;
      else if (type == "bottom" && border.bottom != null) return border.bottom;
      else if (type == "end" && border.end != null) return border.end;
      else if (type == "top" && border.top != null) return border.top;
      else return null;
    } else return null;
  }
}
