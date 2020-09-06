/*
	 参数：Rect[x,y,width,height]
  */
import DrawCell from "./DrawCell.js";
import DrawMergeCell from "./DrawMergeCell.js";
import viewcss from "./viewcss.js";
import Cell from "../model/workbook/Cell";
import ScrollBar from "./ScrollBar.js";
import ActiveCell from "./ActiveCell.js";

export default class FISSV {
  constructor(ctx, rect, fiss, ratio) {
    this.fiss = fiss;
    this.rect = rect;
    this.ctx = ctx;
    this.maxDigitWidth = 0.0;
    this.sheetIndex = 0;
    this.StartCol = 1;
    this.StartRow = 1;
    this.headRowHeight = 0;
    this.EndCol = 999;
    this.EndRow = 999;
    this.AllRowHeight = 0.0;
    this.showrows = 0;
    this.AllColWidth = 0.0;
    this.ActiveSheet = {};
    this.ActiveRange = "";
    this.drawCell = new DrawCell(this);
    this.drawMergeCell = new DrawMergeCell(this);
    this.scrollBar = new ScrollBar(this);
    this.defaultFontSz = (12 * 96) / 72 + "px";
    this.defaultFontFamily = "宋体";
    this.defaultFont = this.defaultFontSz + " " + this.defaultFontFamily;
    this.ctx.font = this.defaultFontSz + " " + this.defaultFontFamily; //12号，等线字体
    this.ComPonentsRegins = [];
    this.showColsArray = [];
    this.showRowsArray = [];
    this.showMergerArray = [];
    this.activecell = {};
    this.viewcss =new viewcss();

    this.SheetColleft=this.SheetColleft.bind(this);
    this.SheetColRight=this.SheetColRight.bind(this);
    this.SheetRowUp=this.SheetRowUp.bind(this);
    this.SheetRowDown=this.SheetRowDown.bind(this);
    this.inputValue=this.inputValue.bind(this);
    this.AddComRegins=this.AddComRegins.bind(this);
    this.CanvasClick=this.CanvasClick.bind(this);
    this.SheetRowColSelected=this.SheetRowColSelected.bind(this);
    this.ClickColRow=this.ClickColRow.bind(this);

  }
  SheetColleft (obj, event)  {
    if (this.StartCol > 1) {
      this.StartCol = this.StartCol - 1;
      this.ActiveSheet.StartCol = this.StartCol;
      this.DrawWorkSheet(this.sheetIndex);
    }
  };
  SheetColRight   (obj, event)   {
    this.StartCol = this.StartCol + 1;
    this.ActiveSheet.StartCol = this.StartCol;
    this.DrawWorkSheet(this.sheetIndex);
  };

  SheetRowUp  (obj, event)  {
    if (this.StartRow > 1) {
      this.StartRow = this.StartRow - 1;
      this.ActiveSheet.StartRow = this.StartRow;
      this.DrawWorkSheet(this.sheetIndex);
    }
  };
  SheetRowDown   (obj, event)  {
    this.StartRow = this.StartRow + 1;
    this.ActiveSheet.StartRow = this.StartRow;
    this.DrawWorkSheet(this.sheetIndex);
  };
  inputValue   (event, inputTextVale)  {
    // console.log("now active cell is :"+this.ActiveRange);
    this.ActiveSheet.SetCellValue(this.ActiveRange, inputTextVale);
    this.fiss.$emit('RowCellValueChage', this.ActiveSheet, this.ActiveRange, inputTextVale);
  };

  AddComRegins   (oneZoom)   {
    for (var n = 0; n < this.ComPonentsRegins.length; n++) {
      let component = this.ComPonentsRegins[n];
      let firename = component.name;
      if (oneZoom.name == firename) component.rect = oneZoom.rect;
    }
    this.ComPonentsRegins.push(oneZoom);
  };

  CanvasClick  (obj, event)  {
    let clientX = event.offsetX;
    let clientY = event.offsetY;
    var input = this.fiss.canvasInput;
    input.style.left = "-300px";
    input.style.top = "-300px";

    //console.log("   offsetX:" + clientX + "   offsetY:" + clientY);
    for (var n = 0; n < this.ComPonentsRegins.length; n++) {
      let component = this.ComPonentsRegins[n];
      let rect = component.rect;
      let firename = component.name;
      let bigx = rect.x + rect.width;
      if (clientX > rect.x && clientX < bigx)
        if (clientY > rect.y && clientY < rect.y + rect.height) {
          //console.log("fire event:" + firename);
          //this.fiss.style.cursor = "move";
          this.fiss.$emit(firename, this, event);
          break;
        }
    }
  };

  SheetRowColSelected   (obj, event)   {
    this.ActiveRange = this.GetColAlphabetByColNumber(obj.col - 1) + "" + obj.row;
    this.activecell.ActiveCell(obj, event);
  };
  ClickColRow   (obj, event)   {
    let clientX = event.offsetX;
    let clientY = event.offsetY;

    var selectcol = 0;
    var selectrow = 0;
    var ranginfo = {};
    ranginfo.gapX = 1;
    var bmf = false;
    var selectType = 1;
    //1 先处理合并的，合并确定是行+列模式 （3、行模式 4、列模式 2、行+列模式）
    for (var n = 0; n < this.showMergerArray.length; n++) {
      var showm = this.showMergerArray[n];
      var bmxf = false;
      var bmyf = false;
      if (clientX > showm.x && clientX < showm.x + showm.width) {
        selectcol = showm.col;
        ranginfo.x = showm.x;
        ranginfo.gapX = clientX - showm.x;
        ranginfo.width = showm.width;
        bmxf = true;
      }
      if (clientY > showm.y && clientY < showm.y + showm.height) {
        selectrow = showm.row;
        ranginfo.y = showm.y;
        ranginfo.height = showm.height;
        bmyf = true;
      }
      if (bmxf && bmyf) {
        bmf = true;
        selectcol = showm.range.fromcol;
        selectrow = showm.range.fromrow;
        this.ActiveRange = this.GetColAlphabetByColNumber(showm.range.fromcol - 1) + "" + showm.range.fromrow;
        break;
      }
    }
    //2.根据坐标知道点击到的行和列
    //this.showColsArray
    //确定列
    if (!bmf) {
      for (var n = 0; n < this.showColsArray.length; n++) {
        var colinfo = this.showColsArray[n];
        if (clientX > colinfo.x && clientX < colinfo.x + colinfo.width) {
          selectcol = colinfo.col;
          ranginfo.x = colinfo.x;
          ranginfo.gapX = clientX - ranginfo.x;
          ranginfo.width = colinfo.width;
        }
      }
      //确定行
      for (var n = 0; n < this.showRowsArray.length; n++) {
        var rowinfo = this.showRowsArray[n];
        if (clientY > rowinfo.y && clientY < rowinfo.y + rowinfo.height) {
          selectrow = rowinfo.row;
          ranginfo.y = rowinfo.y;
          ranginfo.height = rowinfo.height;
        }
      }
    }
    //console.log("selectrow :" + selectrow + "  selectcol:" + selectcol);
    if (selectrow == 0 || selectcol == 0) // 行或列模式
    {
      if (selectrow == 0) { //列模式
        selectType = 2;
        //补充行信息
        ranginfo.y = parseInt(this.CacalPxByBound(13.5) * 1.3);
        ranginfo.height = this.rect.height;
      }
      if (selectcol == 0) { //行模式
        selectType = 3;
        //补充列信息
        ranginfo.x = this.GetColWidth(0);
        ranginfo.width = this.rect.width;
      }
    }
    //3.设置目前激活的行和列
    var obj = {
      type: selectType,
      row: selectrow,
      col: selectcol,
      ranginfo: ranginfo,
      range: this.ActiveRange
    };
    this.fiss.$emit("SheetRowColSelected", obj, event);
  };
  setDefaultFont(font) {
    this.defaultFontFamily = font.name;
    this.defaultFontSz = (font.sz * 96) / 72 + "px";
    this.defaultFont = this.defaultFontSz + " " + this.defaultFontFamily;
    this.ctx.font = this.defaultFontSz + " " + this.defaultFontFamily; //12号，等线字体
    // this.maxDigitWidth = this.ctx.measureText("0").width;
  }
  /*
		  绘数据区域的总函数
		*/
  DrawWorkSheet(sheetIndex) {
    this.ComPonentsRegins = [];

    this.fiss.addEvent("SheetRowDown", this.SheetRowDown);
    this.fiss.addEvent("SheetRowUp", this.SheetRowUp);
    this.fiss.addEvent("SheetColleft", this.SheetColleft);
    this.fiss.addEvent("SheetColRight", this.SheetColRight);
    this.fiss.addEvent("CanvasClick", this.CanvasClick);
    this.fiss.addEvent("ClickColRow", this.ClickColRow);
    this.fiss.addEvent("SheetRowColSelected", this.SheetRowColSelected);
    this.fiss.addEvent("inputValue", this.inputValue);
    this.activecell = new ActiveCell(this);
    this.ctx.clearRect(
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height
    );
    //设置背景为白色#FFFFFF
    this.ctx.save();
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillRect(this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height);
    this.ctx.restore();
    this.sheetIndex = sheetIndex;
    this.ActiveSheet = this.fiss.fissM.workbook.sheets[this.sheetIndex];
    this.StartCol = this.ActiveSheet.StartCol;
    this.StartRow = this.ActiveSheet.StartRow;
    if (this.fiss.fissM.styles.fonts.count !== 0) {
      var font = this.fiss.fissM.styles.fonts.GetFontByID(0);
      this.setDefaultFont(font);
    }
    this.ctx.font = this.defaultFont;
    this.caclShowCols();
    this.DrawHead();
    this.DrawRows();
    this.procMergeCells();
    this.scrollBar.DrawScrollBar(
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height
    );
    this.ctx.strokeStyle = "gray";
    this.ctx.strokeRect(
      this.rect.x,
      this.rect.y,
      this.rect.width,
      this.rect.height
    );
    let rectcol = {
      x: this.rect.x,
      y: this.rect.y,
      height: this.rect.height,
      width: this.rect.width
    };
    this.AddComRegins({
      name: "ClickColRow",
      rect: rectcol
    });
  }
  caclShowCols() {
    this.showColsArray = [];
    var height = parseInt(this.CacalPxByBound(13.5) * 1.3);
    var allColWidth = 0.0;
    var ColWidth = this.GetColWidth(0);
    allColWidth = allColWidth + ColWidth;
    var rect = {
      x: this.rect.x,
      y: this.rect.y,
      height: height,
      width: ColWidth
    };
    this.AddComRegins({
      name: "ClickStartTriangle",
      rect: rect
    });

    let showcol = {
      col: 0,
      x: this.rect.x,
      y: this.rect.y,
      height: height,
      width: ColWidth,
      value: ""
    };
    this.showColsArray.push(showcol);

    for (var col = this.StartCol;; col++) {
      var ColWidth = this.GetColWidth(col);
      var cell = new Cell();
      cell.value = this.GetColAlphabetByColNumber(col - 1);
      let showcol = {
        col: col,
        x: this.rect.x + allColWidth,
        y: this.rect.y,
        height: height,
        width: ColWidth,
        value: cell
      };
      this.showColsArray.push(showcol);
      allColWidth = allColWidth + ColWidth;
      if (allColWidth > this.rect.x + this.rect.width) break;
    }
    this.EndCol = this.StartCol + this.showColsArray.length;
  }

  /* 头部区域 */
  DrawHead() {
    for (var col = 0; col < this.showColsArray.length; col++) {
      let showcol = this.showColsArray[col];
      if (showcol.col == 0) {
        this.drawStartTriangle(
          showcol.x,
          showcol.y,
          showcol.height,
          showcol.width
        );
      } else {
        this.DrawHeadCell(
          showcol.x,
          showcol.y,
          showcol.height,
          showcol.width,
          showcol.value
        );
      }
    }
  }
  /*
		  头部区域---绘制开始的三角形
		*/
  drawStartTriangle(startx, starty, height, width) {
    this.ctx.beginPath();
    this.ctx.moveTo(startx + width - 3, starty + 3);
    this.ctx.lineTo(startx + (width / 4) * 1, starty + height - 3);
    this.ctx.lineTo(startx + width - 3, starty + height - 3);
    //背景颜色
    this.ctx.fillStyle = this.viewcss.HeadStartTriangle;
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.strokeStyle = this.viewcss.HeadCellBoderColor;
    var x1 = startx + width - 0.5;
    var y1 = starty;
    var x2 = startx + width - 0.5;
    var y2 = starty + height;

    //this.ctx.strokeStyle=borderPr.color.rgb;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    x1 = startx;
    y1 = starty + height - 0.5;
    x2 = startx + width;
    y2 = y1;
    this.ctx.stroke();

    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
  /*
          头部区域--- A B C D ........
		*/
  DrawHeadCell(startx, starty, height, width, cell) {
    //边框
    this.ctx.strokeStyle = this.viewcss.HeadCellBoderColor;

    this.ctx.fillStyle = this.viewcss.HeadCellBgColorUnSelected;
    this.ctx.fillRect(startx, starty, width, height);
    var x1 = startx + width - 0.5;
    var y1 = starty;
    var x2 = startx + width - 0.5;
    var y2 = starty + height;

    var my_gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    my_gradient.addColorStop(0, this.viewcss.HeadCellBgColorUnSelected);
    my_gradient.addColorStop(1, this.viewcss.HeadCellBoderColor);
    this.ctx.strokeStyle = my_gradient;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();

    this.ctx.strokeStyle = null;

    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(cell.value, startx + width / 2, starty + height / 2);

    this.ctx.strokeStyle = this.viewcss.HeadCellBoderColor;
    this.ctx.beginPath();
    this.ctx.moveTo(x2, y2);
    this.ctx.lineTo(x2, this.rect.y + this.rect.height);
    this.ctx.stroke();
  }

  bmergerCell(row, col) {
    var ycol = this.GetColAlphabetByColNumber(col - 1);
    for (var n = 0; n < this.ActiveSheet.mergeCells.length; n++) {
      var mergeCell = this.ActiveSheet.mergeCells[n].ref;
      var fromtoarray = mergeCell.toString().split(":");
      if (fromtoarray.length == 2) {
        var frominfo = fromtoarray[0];
        var toinfo = fromtoarray[1];

        var fromrow = parseInt(frominfo.toString().replace(/[^0-9]+/gi, ""));
        var fromcol = frominfo.toString().replace(fromrow, "");

        var torow = parseInt(toinfo.toString().replace(/[^0-9]+/gi, ""));
        var tocol = toinfo.toString().replace(torow, "");

        if (fromrow > row) continue;
        if (row >= fromrow && row <= torow) {
          if (ycol >= fromcol && ycol <= tocol) {
            return true;
          }
        }
      } else {
        //to do
        break;
      }
    }

    return false;
  }

  procMergeCells() {
    this.showMergerArray = [];
    for (var n = 0; n < this.ActiveSheet.mergeCells.length; n++) {
      var mergeCell = this.ActiveSheet.mergeCells[n].ref;
      var fromtoarray = mergeCell.toString().split(":");
      if (fromtoarray.length == 2) {
        var frominfo = this.GetInfoFromRangeSingle(fromtoarray[0]);
        var toinfo = this.GetInfoFromRangeSingle(fromtoarray[1]);
        var crossCol = false;
        var crossRow = false;
        if (frominfo.col > this.StartCol || toinfo.col > this.EndCol)
          crossCol = true;
        if (frominfo.row > this.StartRow || toinfo.row > this.EndRow)
          crossRow = true;
        if (!toinfo.boutShow && !crossCol && !crossRow) continue;
        var height = toinfo.y + toinfo.height - frominfo.y;
        var width = toinfo.x + toinfo.width - frominfo.x;
        this.ctx.save();
        //剪切可以绘制的区域
        if (!frominfo.boutShow) {
          this.ctx.rect(frominfo.startx, frominfo.starty, width, height);
          // this.ctx.strokeStyle = "red";
          // this.ctx.stroke();
          this.ctx.clip();
        }
        this.drawMergeCell.DrawDataCell(
          frominfo.x,
          frominfo.y,
          height,
          width,
          frominfo.row,
          frominfo.col,
          toinfo.row,
          toinfo.col
        );
        let showm = {
          //col: col,
          x: frominfo.x,
          y: frominfo.y,
          height: height,
          width: width,
          range: {
            fromrow: frominfo.row,
            fromcol: frominfo.col,
            torow: toinfo.row,
            tocol: toinfo.col
          }
        };
        this.showMergerArray.push(showm);
        this.ctx.restore();
      }
    }
  }

  GetInfoFromRangeSingle(range) {
    var ret = {
      x: 0,
      y: 0,
      startx: 0,
      starty: 0,
      height: 0,
      width: 0,
      range: range,
      row: 0,
      col: 0,
      boutShow: false
    };
    var row = parseInt(range.toString().replace(/[^0-9]+/gi, ""));
    var col = range.toString().replace(row, "");
    var colinfo = this.GetAllColWidth(col, true);
    var rowinfo = this.GetRowsHeight(parseInt(row), true);
    ret.row = parseInt(row);
    ret.col = colinfo.col;
    if (
      ret.row >= this.StartRow &&
      ret.col >= this.StartCol &&
      ret.row <= this.EndRow &&
      ret.col <= this.EndCol
    ) {
      ret.boutShow = true;
    }
    ret.x = colinfo.x;
    ret.y = rowinfo.y;
    ret.startx = colinfo.startx;
    ret.starty = rowinfo.starty;
    ret.height = rowinfo.height;
    ret.width = colinfo.width;
    return ret;
  }

  GetRowsHeight(row, bm) {
    var ret = {
      y: 0,
      height: 0,
      row: row,
      starty: 0
    };
    var allRowHeight = this.rect.y;
    this.headRowHeight = parseInt(this.CacalPxByBound(13.5) * 1.3);
    allRowHeight = allRowHeight + this.headRowHeight;

    //合并单元隐藏扣减项目
    var allsubHeight = 0;
    var subRowHeight = 0;
    for (var r = row;; r++) {
      if (r >= this.StartRow) break;
      subRowHeight = parseInt(this.GetRowHeight(r));
      allsubHeight = allsubHeight - subRowHeight;
    }
    //正常的行
    var RowHeight = 0;
    var allShowHeight = 0;
    for (var r = this.StartRow;; r++) {
      RowHeight = parseInt(this.GetRowHeight(r));
      allShowHeight = allShowHeight + RowHeight;
      if (r >= row) break;
      if (!bm) {
        if (allShowHeight > this.rect.y + this.rect.height) break;
      }

    }

    ret.starty = allRowHeight + allShowHeight - RowHeight;
    ret.y = allRowHeight + allShowHeight - RowHeight + allsubHeight;
    ret.height = RowHeight;
    return ret;
  }

  GetAllColWidth(col, bm) {
    var ret = {
      x: 0,
      width: 0,
      col: this.GetColByAlphabet(col),
      startx: 0
    };
    var allColWidth = 0.0;
    var toCol = this.GetColByAlphabet(col);
    //行号列
    var ColWidth = parseInt(this.GetColWidth(0));
    allColWidth = allColWidth + ColWidth;
    var subColWidth = 0;
    //合并单元隐藏扣减项目
    var allsubWidth = 0;
    for (var c = this.GetColByAlphabet(col);; c++) {
      if (c >= this.StartCol) break;
      subColWidth = parseInt(this.GetColWidth(c));
      allsubWidth = allsubWidth - subColWidth;
    }
    var ColWidth = 0;
    var allShowWidth = 0;
    //正常的列
    for (var c = this.StartCol;; c++) {
      ColWidth = this.GetColWidth(c);
      allShowWidth = allShowWidth + ColWidth;
      if (c >= toCol) {
        // ret.col = c;
        break;
      }

      if (!bm) {
        if (allShowWidth > this.rect.x + this.rect.width) break;
      }

    }
    //后面隐藏列

    ret.startx = allColWidth + allShowWidth - ColWidth;
    ret.x = allColWidth + allShowWidth - ColWidth + allsubWidth;
    ret.width = ColWidth;
    return ret;
  }

  /*
          数据区域--- row1,row2,row3 ........
		*/
  DrawRows() {
    var allRowHeight = this.rect.y;
    this.showRowsArray = [];
    var headRowHeight = parseInt(this.CacalPxByBound(13.5) * 1.3);
    allRowHeight = allRowHeight + headRowHeight;
    this.showrows = 0;
    for (var row = this.StartRow;; row++) {
      var RowHeight = parseInt(this.GetRowHeight(row));
      this.DrowRow(row, allRowHeight, RowHeight);
      allRowHeight = allRowHeight + RowHeight;
      this.showrows = this.showrows + 1;
      if (allRowHeight > this.rect.y + this.rect.height) break;
    }

    this.EndRow = this.showrows + this.StartRow;
    this.AllRowHeight = allRowHeight;
  }
  DrowRow(row, starty, RowHeight) {
    for (var col = 0; col < this.showColsArray.length; col++) {
      let showcol = this.showColsArray[col];
      if (showcol.col == 0) {
        this.drawRoNumber(showcol.x, starty, RowHeight, showcol.width, row);
        let showRow = {
          row: row,
          x: showcol.x,
          y: starty,
          height: RowHeight,
          width: showcol.width
        };

        this.showRowsArray.push(showRow);
      } else {
        var aaa = showcol;
        //console.log("row:" + row + "   col:" + col);
        // var bmergcell = this.bmergerCell(row, showcol.col);
        // if (!bmergcell) {
        this.drawCell.DrawDataCell(
          showcol.x,
          starty,
          RowHeight,
          showcol.width,
          row,
          showcol.col
        );
        // }
      }
    }
  }

  drawRoNumber(startx, starty, height, width, row) {
    //边框
    this.ctx.strokeStyle = this.viewcss.HeadCellBoderColor;
    //this.ctx.strokeRect(startx,starty,width,height);
    //背景颜色
    this.ctx.fillStyle = this.viewcss.HeadCellBgColorUnSelected;
    this.ctx.fillRect(startx, starty, width, height);

    this.ctx.strokeStyle = viewcss.HeadCellBoderColor;
    var x1 = startx;
    var y1 = starty + height - 0.5;
    var x2 = startx + width;
    var y2 = starty + height - 0.5;

    var my_gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    my_gradient.addColorStop(0, this.viewcss.HeadCellBgColorUnSelected);
    my_gradient.addColorStop(1, this.viewcss.HeadCellBoderColor);
    this.ctx.strokeStyle = my_gradient;

    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.strokeStyle = null;
    //字体，默认大小
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(row + "", startx + width / 2, starty + height / 2);

    this.ctx.strokeStyle = this.viewcss.HeadCellBoderColor;
    this.ctx.beginPath();
    this.ctx.moveTo(x2, y2);
    this.ctx.lineTo(this.rect.x + this.rect.width, y2);
    this.ctx.stroke();
  }
  GetColAlphabetByColNumber(number) {
    var colName = "";
    if (number >= 26) {
      colName = this.GetColAlphabetByColNumber(number / 26 - 1);
      colName += String.fromCharCode(65 + (number % 26));
    } else {
      colName += String.fromCharCode(65 + number);
    }
    return colName;
  }
  GetColByAlphabet(val) {
    var base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      i,
      j,
      result = 0;

    for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
      result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
    }
    return result;
  }
  CacalPxByBound(bound) {
    return Math.ceil((bound / 72) * this.fiss.ppi);
  }

  CaclPxbyWidth(width) {
    var px = parseInt(width * 8);
    return px;
  }
  GetColWidth(col) {
    if (col == 0) return this.CaclPxbyWidth(5);
    var tcol = this.ActiveSheet.GetCol(col);
    if (tcol == null || tcol.width == null || tcol.width == 0.0) {
      return this.CaclPxbyWidth(this.ActiveSheet.sheetFormatPr.defaultColWidth);
    } else {
      return parseInt(this.CaclPxbyWidth(tcol.width));
    }
  }
  GetRowHeight(row) {
    //默认行高以磅为单位大小。
    var grow = this.ActiveSheet.sheetData.GetRow(row);
    if (grow == null || grow.ht == null || grow.ht == "") {
      return parseInt(
        this.CacalPxByBound(this.ActiveSheet.sheetFormatPr.defaultRowHeight)
      );
    } else {
      return parseInt(this.CacalPxByBound(grow.ht));
    }
  }
  ConvertPxPtRem(unitsFrom, fromValue, unitsTo) {
    var px = 0;
    var tdefaultFontSz = this.defaultFontSz.replace("px", ""); //default font-size 16px
    switch (unitsFrom) {
      case "px":
        px = fromValue;
        break;
      case "pt":
        px = (fromValue * 96) / 72;
        break;
      case "percent":
        px = (fromValue * tdefaultFontSz) / 100;
        break;
      case "rem":
        px = fromValue * tdefaultFontSz;
        break;
    }
    switch (unitsTo) {
      case "px":
        return this.sanitize(px);
        break;
      case "pt":
        return this.sanitize((px * 72) / 96);
        break;
      case "percent":
        return this.sanitize((px * 100) / tdefaultFontSz);
        break;
      case "rem":
        return this.sanitize(px / tdefaultFontSz);
        break;
    }
  }
  sanitize(value) {
    let valueStr = value + "";
    valueStr = valueStr.replace(/-/g, "");
    if (valueStr.substr(-1) === ".") {
      valueStr += "0";
    }
    valueStr = parseFloat(Math.abs(valueStr).toFixed(3));
    if (valueStr === "NaN") {
      valueStr = 1;
    }
    return Math.ceil(valueStr);
  }
}
