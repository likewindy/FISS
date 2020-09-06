import LineOffset from "./LineOffset.js";
import DrawDoubleLine from "./DrawDoubleLine.js";
import DrawCellText from "./DrawCellText.js";

export default class DrawCell {
  constructor(fissv) {
    this.fissv = fissv;
    this.lineOffset = new LineOffset(fissv);
    this.drawDoubleLine = new DrawDoubleLine(this);
    this.drawText = new DrawCellText(this);
    this.bmergeCell = false;
    this.range = "";
  }
  DrawDataCell(startx, starty, height, width, row, col) {
    try {
      var range = this.fissv.GetColAlphabetByColNumber(col - 1) + "" + row;
      this.range = range;
      
      var cell = this.fissv.ActiveSheet.sheetData.GetCell(row, range);
      if (cell == null) return;
      var xf = this.fissv.fiss.fissM.styles.cellXfs.GetCellStyle(cell.s);
      this.DrawRealDataCell(startx, starty, height, width, xf, row, col);
    } catch (e) {
      console.log(" draw  row:" + row + "   col:" + col + "---" + e);
      //throw " draw  row:" + row + "   col:" + col + "---" + e;
    }
  }
  DrawRealDataCell(startx, starty, height, width, xf, row, col) {
    this.fissv.ctx.save();
    //背景颜色
    if (xf != null && xf.applyFill) {
      this.DrawDataCellFill(startx, starty, height, width, xf, row, col);
    }
    //边框
    if (xf != null && xf.applyBorder) {
      this.DrawDataCellBorder(startx, starty, height, width, xf, row, col);
    }

    var bmergcell = this.fissv.bmergerCell(row, col);
    if (!bmergcell) {
      //文本
      this.drawText.Draw(
        startx + 2,
        starty + 2,
        height - 5,
        width - 5,
        xf,
        row,
        col,
        xf
      );
    }

    this.fissv.ctx.restore();
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
  DrawDataCellFill(startx, starty, height, width, xf, row, col) {
    //背景颜色
    var fill = this.fissv.fiss.fissM.styles.fills.GetFill(xf.fillId);
    this.fissv.ctx.fillStyle = this.fissv.fiss.fissM.GetColorRgb(
      fill.patternFill.fgColor,
      "#ffffff"
    );
    this.fissv.ctx.fillRect(startx, starty, width, height);
    //this.fissv.ctx.fillRect(startx-1,starty-1,width+1,height+1); 为何？
    this.fissv.ctx.fillStyle = null;
  }

  DrawDataCellBorder(startx, starty, height, width, xf, row, col) {
    //边线的绘制
    var border = this.fissv.fiss.fissM.styles.borders.GetBorderByID(
      xf.borderId
    );
    if (border != null) {
      if (border.start != null) {
        this.fissv.ctx.save();
        this.DrawOneLine(
          startx,
          starty,
          height,
          width,
          border.start,
          "start",
          row,
          col
        );
        this.fissv.ctx.restore();
      }
      if (border.top != null) {
        this.fissv.ctx.save();
        this.DrawOneLine(
          startx,
          starty,
          height,
          width,
          border.top,
          "top",
          row,
          col
        );
        this.fissv.ctx.restore();
      }
      if (border.end != null) {
        this.fissv.ctx.save();
        this.DrawOneLine(
          startx,
          starty,
          height,
          width,
          border.end,
          "end",
          row,
          col
        );
        this.fissv.ctx.restore();
      }
      if (border.bottom != null) {
        this.fissv.ctx.save();
        this.DrawOneLine(
          startx,
          starty,
          height,
          width,
          border.bottom,
          "bottom",
          row,
          col
        );
        this.fissv.ctx.restore();
      }
      if (border.diagonalUp != null) {
        this.fissv.ctx.save();
        this.DrawOneLine(
          startx,
          starty,
          height,
          width,
          border.diagonalUp,
          "diagonalUp",
          row,
          col
        );
        this.fissv.ctx.restore();
      }
      if (border.diagonalDown != null) {
        this.fissv.ctx.save();
        this.DrawOneLine(
          startx,
          starty,
          height,
          width,
          border.diagonalDown,
          "diagonalDown",
          row,
          col
        );
        this.fissv.ctx.restore();
      }
    }
  }
  DrawOneLine(startx, starty, height, width, borderPr, type, row, col, xf) {
    /* if(type=='top'){
            //to do 什么时候不需要
            var borderp= this.GetCellBorderPr(row-1,col,'bottom');
            if(borderp!=null) return false;
        }*/
    if (borderPr.color.auto) {
      this.fissv.ctx.strokeStyle = "#000000";
    } else {
      this.fissv.ctx.strokeStyle = this.fissv.fiss.fissM.GetColorRgb(
        borderPr.color,
        "000000"
      );
    }
    var borderStyle = borderPr.borderStyle;
    this.SetLineWidth(borderStyle);
    if (borderStyle.indexOf("double") > -1) {
      this.drawDoubleLine.DrawLine(
        startx,
        starty,
        height,
        width,
        borderPr,
        type,
        row,
        col,
        xf
      );
    } else {
      this.lineDashAndOffset(borderStyle, borderPr, type, row, col, xf);
      var retrect = this.CaclCoordinate(
        borderStyle,
        startx,
        starty,
        height,
        width,
        borderPr,
        type,
        row,
        col,
        xf
      );
      /* this.fissv.ctx.save();
            this.fissv.ctx.setLineDash([0, 0]);
            this.fissv.ctx.lineDashOffset = 0;
            this.fissv.ctx.strokeStyle='#ffffff';
            this.fissv.ctx.beginPath();
            this.fissv.ctx.moveTo(retrect.x1,retrect.y1);
            this.fissv.ctx.lineTo(retrect.x2,retrect.y2);
            this.fissv.ctx.stroke();
            to do  什么时候需要擦出
            this.fissv.ctx.restore();*/
      this.fissv.ctx.beginPath();
      this.fissv.ctx.moveTo(retrect.x1, retrect.y1);
      this.fissv.ctx.lineTo(retrect.x2, retrect.y2);
      this.fissv.ctx.stroke();
    }
  }
  SetLineWidth(borderStyle) {
    this.fissv.ctx.lineWidth = 1;
    if (borderStyle.indexOf("thick") > -1) this.fissv.ctx.lineWidth = 3;
    else if (borderStyle.indexOf("medium") > -1) this.fissv.ctx.lineWidth = 2;
    else if (borderStyle.indexOf("slantDashDot") > -1) {
      this.fissv.ctx.lineWidth = 2;
    }
  }
  lineDashAndOffset(borderStyle, borderPr, type, row, col, xf) {
    this.fissv.ctx.setLineDash([0, 0]);
    this.fissv.ctx.lineDashOffset = 0;
    if (borderStyle.indexOf("hair") > -1) {
      this.fissv.ctx.lineDashOffset = this.lineOffset.CaclDashOffset(
        borderPr,
        type,
        row,
        col,
        "hair"
      );
      this.fissv.ctx.setLineDash([1, 1]);
    }
    if (
      borderStyle.indexOf("dashed") > -1 ||
      borderStyle.indexOf("Dashed") > -1
    ) {
      this.fissv.ctx.lineDashOffset = this.lineOffset.CaclDashOffset(
        borderPr,
        type,
        row,
        col,
        "dashed"
      );
      this.fissv.ctx.setLineDash([4, 2]);
    }
    if (
      borderStyle.indexOf("dotted") > -1 ||
      borderStyle.indexOf("Dotted") > -1
    ) {
      this.fissv.ctx.lineDashOffset = this.lineOffset.CaclDashOffset(
        borderPr,
        type,
        row,
        col,
        "dotted"
      );
      this.fissv.ctx.setLineDash([2, 2]);
    }
    if (
      borderStyle.indexOf("dashDot") > -1 ||
      borderStyle.indexOf("DashDot") > -1
    ) {
      this.fissv.ctx.lineDashOffset = this.lineOffset.CaclDashOffset(
        borderPr,
        type,
        row,
        col,
        "dashdot"
      );
      this.fissv.ctx.setLineDash([8, 2, 4, 2]);
    }
    if (
      borderStyle.indexOf("dashDotDot") > -1 ||
      borderStyle.indexOf("DashDotDot") > -1
    ) {
      this.fissv.ctx.lineDashOffset = this.lineOffset.CaclDashOffset(
        borderPr,
        type,
        row,
        col,
        "dashdotdot"
      );
      this.fissv.ctx.setLineDash([8, 2, 4, 2, 4, 2]);
    }
    if (borderStyle.indexOf("slantDashDot") > -1) {
      this.fissv.ctx.setLineDash([0, 0]);
      this.fissv.ctx.lineDashOffset = 0;
    }
  }
  //这里计算绘制的开始和结束坐标
  CaclCoordinate(
    borderStyle,
    startx,
    starty,
    height,
    width,
    borderPr,
    type,
    row,
    col,
    xf
  ) {
    var retcor = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0
    };
    var lineWidth = this.fissv.ctx.lineWidth;
    var subOrAdd = 0;
    var startTopsub = 0.0;
    var startBottomsub = 0.0;

    if (lineWidth == 1) {
      subOrAdd = -0.5;
      startTopsub = 1;
    } else if (lineWidth == 2) {
      subOrAdd = -1;
      startTopsub = 2;
      startBottomsub = 0;
    } else if (lineWidth == 3) {
      subOrAdd = -0.5;
      startTopsub = 2;
      startBottomsub = 1.0;
    }
    if (type == "start") {
      retcor.x1 = startx + subOrAdd;
      retcor.x2 = retcor.x1;
      retcor.y1 = starty - startTopsub;
      retcor.y2 = starty + height + startBottomsub;
    } else if (type == "top") {
      retcor.x1 = startx;
      retcor.x2 = startx + width;
      retcor.y1 = starty + subOrAdd;
      retcor.y2 = retcor.y1;
    } else if (type == "end") {
      retcor.x1 = startx + width + subOrAdd;
      retcor.x2 = retcor.x1;
      retcor.y1 = starty - startTopsub;
      retcor.y2 = starty + height + startBottomsub;
    } else if (type == "bottom") {
      retcor.x1 = startx;
      retcor.x2 = startx + width;
      retcor.y1 = starty + height + subOrAdd;
      retcor.y2 = retcor.y1;
    }
    return retcor;
  }
}
