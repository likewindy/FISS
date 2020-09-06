import CellAlignment from "../model/style/CellAlignment";
import FormatString from "./FormatString.js";
import Font from "../model/style/Font.js";

export default class DrawCellText {
  constructor(drawCell) {
    this.drawCell = drawCell;
    this.fissv = drawCell.fissv;
    this.range;
    this.alignment;
    this.cell;
    this.cellfont;
    this.cellFontC = {
      fontstyle: "normal",
      fontvariant: "normal",
      fontFamily: "宋体",
      fontSize: 12,
      fontWeight: "normal"
    };
    this.startx = 0;
    this.starty = 0;
    this.height = 0;
    this.width = 0;
    this.fontstring = "";
    this.fromatString;
  }

  Draw(startx, starty, height, width, xf, row, col, xfo) {

    if(row==6 && col==2){
      var aaa='';
    }
    this.startx = startx;
    this.starty = starty;
    this.height = height;
    this.width = width;
    if (xfo != null) {
      this.alignment = xfo.alignment.returnNew();
      this.cellfont = this.fissv.fiss.fissM.styles.fonts.GetFontByID(
        xfo.fontId
      );
    }
    else {
      this.alignment = new CellAlignment();
      this.cellfont = new Font();
    }
    this.fromatString = new FormatString(this.drawCell.fissv, this);
    this.range = this.fissv.GetColAlphabetByColNumber(col - 1) + "" + row;
    this.cell = this.fissv.ActiveSheet.sheetData.GetCell(row, this.range);
    if (this.cell.v != -1) {
      this.fissv.ctx.save();
      var drawtext = "";

      if (this.cell.cellType == "s") {
        var rst = this.fissv.fiss.fissM.sharedStrings.GetSi(this.cell.v);
        if (rst != null) {
          if (rst.t != null) drawtext = rst.t;
          else drawtext = rst.getAllRText();
        }
      } else if (this.cell.cellType == "n") {
        drawtext = this.fromatString.fromat(this.cell.v, xfo);
        drawtext = drawtext.toString().replace("-0", "-");
      } else if (this.cell.cellType == "str") {
        drawtext = this.cell.v;
      }
      var underline = this.SetCellFont();
      if (this.alignment.wrapText) {
        this.prodMultLine(startx, starty, height, width, drawtext, underline);
      } else {
        this.prodOnleLine(startx, starty, height, width, drawtext, underline);
      }

      this.fissv.ctx.restore();
    }
  }
  prodMultLine(startx, starty, height, width, drawtext, underline) {
    var AlltextWitdh = this.fissv.ctx.measureText(drawtext).width;
    var tempTextArray = drawtext.toString().split("\n");
    if (tempTextArray.length == 1 && AlltextWitdh < width) {
      this.prodOnleLine(startx, starty, height, width, drawtext, underline);
    } else {
      var drawTextArray = [];
      var drawLineHeight = [];
      for (var n = 0; n < tempTextArray.length; n++) {
        var subtext = tempTextArray[n];
        var subtextWitdh = this.fissv.ctx.measureText(subtext).width;
        if (subtextWitdh > width) {
          for (var linen = 0; ; linen++) {
            if (linen > 10) break;
            if (subtext.length == 0) break;
            var oneLineText = this.getFitDrawText(subtext, width);
            drawLineHeight.push(this.CaclLineHeight());
            drawTextArray.push(oneLineText);
            var remainderText = subtext.replace(oneLineText.toString(), "");
            subtext = remainderText;
          }
        } else {
          drawLineHeight.push(this.CaclLineHeight());
          drawTextArray.push(subtext);
        }
      }
      var y = starty;
      var h = parseInt(height / drawTextArray.length);
      for (var n = 0; n < drawTextArray.length; n++) {
        var subtext = drawTextArray[n];
        // var h = this.fissv.CacalPxByBound(
        //   this.fissv.ActiveSheet.sheetFormatPr.defaultRowHeight
        // );
        this.prodOnleLine(startx, y, h, width, subtext, underline);
        y = y + h;
      }
    }
  }
  CaclLineHeight() {
    var fontMetrics = this.fissv.fiss.fissM.fontMetrics.getMetrics(
      this.cellFontC.fontFamily,
      this.cellFontC.fontSize,
      this.cellFontC.fontWeight
    );
    return parseInt(fontMetrics.descent + fontMetrics.ascent);
  }

  prodOnleLine(startx, starty, height, width, drawtext, underline) {
    var retdrawTextcor = this.SetCellAlignment(
      this.alignment,
      startx,
      starty,
      height,
      width
    );
    this.DrawUnderLine(
      underline,
      drawtext,
      retdrawTextcor.x,
      retdrawTextcor.y,
      this.alignment
    );
    this.fissv.ctx.fillText(
      this.getFitDrawText(drawtext, width),
      retdrawTextcor.x,
      retdrawTextcor.y
    );
  }
  getFitDrawText(drawtext, width) {
    drawtext = drawtext.toString();
    var retText = drawtext;
    var allTextWidth = this.fissv.ctx.measureText(drawtext).width;
    if (allTextWidth > width) {
      var subtext = "";
      let n = drawtext.length;
      for (; n > 0; n--) {
        subtext = drawtext[n - 1] + subtext;
        var subtextWitdh = this.fissv.ctx.measureText(subtext).width;
        if (allTextWidth - subtextWitdh < width) break;
      }
      retText = retText.substr(0, n - 1);
    }
    return retText;
  }

  DrawUnderLine(underline, drawtext, x, y, alignment) {
    var textwidth = this.fissv.ctx.measureText(drawtext).width;

    var fontMetrics = this.fissv.fiss.fissM.fontMetrics.getMetrics(
      this.cellFontC.fontFamily,
      this.cellFontC.fontSize,
      this.cellFontC.fontWeight
    );
    var drawLineCor = this.CaclUnderLineCor(
      alignment,
      x,
      y,
      textwidth,
      fontMetrics
    );

    if (this.cellfont.strike != null && this.cellfont.strike) {
      this.fissv.ctx.beginPath();
      this.fissv.ctx.moveTo(drawLineCor.x1, this.starty + this.height / 2);
      this.fissv.ctx.lineTo(drawLineCor.x2, this.starty + this.height / 2);
      this.fissv.ctx.stroke();
    }

    if (underline == null) return;
    var sununder = 1;
    if (drawLineCor.y1 + sununder > this.starty + this.height + 2)
      sununder = -(drawLineCor.y1 + sununder - (this.starty + this.height)) + 2;
    if (underline == "single" || underline == "double") {
      this.fissv.ctx.beginPath();
      this.fissv.ctx.moveTo(drawLineCor.x1, drawLineCor.y1 + sununder);
      this.fissv.ctx.lineTo(drawLineCor.x2, drawLineCor.y2 + sununder);
      this.fissv.ctx.stroke();
    }
    if (underline == "double") {
      this.fissv.ctx.beginPath();
      this.fissv.ctx.moveTo(drawLineCor.x1, drawLineCor.y1 + sununder - 2);
      this.fissv.ctx.lineTo(drawLineCor.x2, drawLineCor.y2 + sununder - 2);
      this.fissv.ctx.stroke();
    }
  }
  CaclUnderLineCor (alignment, x, y, textwidth, fontMetrics) {
    var retCor = { x1: 0, y1: 0, x2: 0, y2: 0 };
    var descent = fontMetrics.descent;
    var bottom = fontMetrics.bottom;

    if (alignment.horizontal == "left" && alignment.vertical == "top") {
      retCor.x1 = x;
      retCor.y1 = y + descent + 0.5;
      retCor.x2 = x + textwidth;
      retCor.y2 = retCor.y1;
    } else if (
      alignment.horizontal == "left" &&
      alignment.vertical == "center"
    ) {
      retCor.x1 = x;
      retCor.y1 = y + (descent - bottom / 2) + 2.5;
      retCor.x2 = x + textwidth;
      retCor.y2 = retCor.y1;
    } else if (
      alignment.horizontal == "left" &&
      alignment.vertical == "bottom"
    ) {
      retCor.x1 = x;
      retCor.y1 = y + 0.5;
      retCor.x2 = x + textwidth;
      retCor.y2 = retCor.y1;
    } else if (
      alignment.horizontal == "center" &&
      alignment.vertical == "top"
    ) {
      retCor.x1 = x - textwidth / 2;
      retCor.y1 = y + descent + 0.5;
      retCor.x2 = x + textwidth / 2;
      retCor.y2 = retCor.y1;
    } else if (
      alignment.horizontal == "center" &&
      alignment.vertical == "center"
    ) {
      retCor.x1 = x - textwidth / 2;
      retCor.y1 = y + (descent - bottom / 2) + 2.5;
      retCor.x2 = x + textwidth / 2;
      retCor.y2 = retCor.y1;
    } else if (
      alignment.horizontal == "center" &&
      alignment.vertical == "bottom"
    ) {
      retCor.x1 = x - textwidth / 2;
      retCor.y1 = y;
      retCor.x2 = x + textwidth / 2;
      retCor.y2 = retCor.y1;
    } else if (alignment.horizontal == "right" && alignment.vertical == "top") {
      retCor.x1 = x - textwidth;
      retCor.y1 = y + descent + 0.5;
      retCor.x2 = x;
      retCor.y2 = retCor.y1;
    } else if (
      alignment.horizontal == "right" &&
      alignment.vertical == "center"
    ) {
      retCor.x1 = x - textwidth;
      retCor.y1 = y + (descent - bottom / 2) + 2.5;
      retCor.x2 = x;
      retCor.y2 = retCor.y1;
    } else if (
      alignment.horizontal == "right" &&
      alignment.vertical == "bottom"
    ) {
      retCor.x1 = x - textwidth;
      retCor.y1 = y;
      retCor.x2 = x;
      retCor.y2 = retCor.y1;
    }
    return retCor;
  };

  SetCellAlignment (alignment, startx, starty, height, width) {
    var drawTextCor = {
      x: 0,
      y: 0
    };
    if (alignment.horizontal == "left") {
      drawTextCor.x = startx;
    } else if (alignment.horizontal == "center") {
      drawTextCor.x = Math.ceil(startx + width / 2);
    } else if (alignment.horizontal == "right") drawTextCor.x = startx + width;
    else {
      drawTextCor.x = startx;
      alignment.horizontal = "left";
    }

    // textAlign  http://www.w3school.com.cn/tags/canvas_textalign.asp

    //  textBaseline
    if (alignment.vertical == "top") {
      drawTextCor.y = starty;
    } else if (alignment.vertical == "center") {
      drawTextCor.y = Math.ceil(starty + height / 2);
    } else if (alignment.vertical == "bottom") drawTextCor.y = starty + height;
    else {
      drawTextCor.y = starty;
      alignment.vertical = "center";
    }

    this.fissv.ctx.textAlign = alignment.horizontal;
    this.fissv.ctx.textBaseline = alignment.vertical;

    return drawTextCor;
  };
  SetCellFont (fontId) {
    //context.font="italic      small-caps    bold          12px       arial";
    //              font-style  font-variant  font-weight   font-size  font-family
    // 一、 font style 规定字体样式
    //    （1）normal
    //    （2）italic 文本斜体显示
    //    （3）oblique 文本倾斜显示  斜体（italic）是一种简单的字体风格，对每个字母的结构有一些小改动，来反映变化的外观。与此不同，倾斜（oblique）文本则是正常竖直文本的一个倾斜版本。
    // 二、 font-variant 规定字体变体
    //    （1）normal
    //    （2）small-caps
    // 三、 font-weight 规定字体的粗细
    //    （1）normal
    //    （2）bold  定义粗体字符。
    //    （3）bolder 	定义更粗的字符。
    //    （4）lighter  定义更细的字符。
    //    （5）100----900 定义由粗到细的字符。400 等同于 normal，而 700 等同于 bold。
    // 四、 font-size / line-height 规定字号和行高，以像素计。
    // 五、 font-family  规定字体系列。
    //font-style  font-variant  font-weight   font-size  font-family

    var setFontString = "";
    var tfont = this.cellfont;
    if (tfont != null) {
      // font-family  规定字体系列。
      if (tfont.name != null && tfont.name != "") {
        this.cellFontC.fontFamily = tfont.name;
        setFontString = tfont.name;
      } else {
        setFontString = this.fissv.defaultFontFamily;
        this.cellFontC.fontFamily = this.fissv.defaultFontFamily;
      }
      // font-size / line-height 规定字号和行高，以像素计。
      if (tfont.sz != null && tfont.sz != 0) {
        setFontString =
          this.fissv.ConvertPxPtRem("pt", tfont.sz, "px") +
          "px" +
          " " +
          setFontString;
        this.cellFontC.fontSize = tfont.sz;
      } else {
        setFontString = this.fissv.defaultFontSz + " " + setFontString;
        this.cellFontC.fontSize = this.fissv.defaultFontSz;
      }
      //三、 font-weight 规定字体的粗细
      if (tfont.b != null && tfont.b) {
        this.cellFontC.fontWeight = "bold";
        setFontString = "bold " + setFontString;
      } else {
        this.cellFontC.fontWeight = "normal";
        //setFontString = "normal " + setFontString;
      }
      //二、 font-variant 规定字体变体
      /* if(tfont.i!=null&& tfont.i){
                this.cellFontC.fontvariant="small-caps";
                setFontString="small-caps "+setFontString;
            }else {*/
      // this.cellFontC.fontvariant = "normal";
      // setFontString = "normal " + setFontString;
      // }
      //一、 font style 规定字体样式
      if (tfont.i != null && tfont.i) {
        this.cellFontC.fontstyle = "bold";
        setFontString = "italic " + setFontString;
      } else {
        this.cellFontC.fontstyle = "normal";
        // setFontString = "normal " + setFontString;
      }
    } else {
      setFontString = this.fissv.defaultFont;
    }
    this.fontstring = setFontString;
    this.fissv.ctx.font = setFontString;
    //console.log("widsetFontStringth:" + setFontString);
    this.fissv.ctx.fillStyle = this.fissv.fiss.fissM.GetColorRgb(
      tfont.color,
      "#000000"
    );
    this.fissv.ctx.strokeStyle = this.fissv.fiss.fissM.GetColorRgb(
      tfont.color,
      "#000000"
    );
    return tfont.u;
  };
  SetNumFmt (text) {
    return text;
  };
}
