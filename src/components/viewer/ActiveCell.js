//import TextCursor from "./TextCursor.js";

export default class ActiveCell {
  constructor(fissv) {
    this.fissv = fissv;
    this.oldActiveCell = null;
    this.preCellData = [];
    this.fissv.fiss.addEvent("SheetRowDown", this.clearePrecell,true);
    this.fissv.fiss.addEvent("SheetRowUp", this.clearePrecell,true);
    this.fissv.fiss.addEvent("SheetColRight", this.clearePrecell,true);
    this.fissv.fiss.addEvent("SheetColleft", this.clearePrecell,true);
    this.fissv.fiss.addEvent("inputValue", this.clearePrecell,true);
    this.activeObj={};
    //this.textCursor = new TextCursor(fissv);
  }
  clearePrecell(obj, event) {
    this.preCellData = [];
  }
  ActiveCell(obj, event) {
    //console.log(event.type + "---col:" + obj.col + "   row:" + obj.row);
    this.activeObj=obj;
    if (this.preCellData.length == 1) {
      this.RestorePre(this.preCellData[0]);
      this.preCellData.pop();
    }
    var ranginfo = obj.ranginfo;
    // console.log(
    //   "click ranginfo.x--" +
    //     ranginfo.x +
    //     "---ranginfo.y--" +
    //     ranginfo.y +
    //     "---ranginfo.width--" +
    //     ranginfo.width +
    //     "---ranginfo.height--" +
    //     ranginfo.height
    // );
    var data = this.fissv.ctx.getImageData(
      parseInt(ranginfo.x - 2) * 2,
      parseInt(ranginfo.y - 2) * 2,
      parseInt(ranginfo.width + 4) * 2,
      parseInt(ranginfo.height + 4) * 2
    );

    var perCellData = {
      sheetnum: this.fissv.fiss.activeSheetIndex,
      ranginfo: ranginfo,
      data: data
    };
    this.preCellData.push(perCellData);
    this.fissv.ctx.save();
    //背景颜色
    this.fissv.ctx.strokeStyle = "#00bfff";
    this.fissv.ctx.lineWidth = 3;
    this.fissv.ctx.strokeRect(
      ranginfo.x,
      ranginfo.y,
      ranginfo.width - 1,
      ranginfo.height - 1
    );
    if (event.type == "dblclick") {
      if(obj.type==2 || obj.type==3) return;
      var col = obj.col;
      var row = obj.row;
      var range = this.fissv.GetColAlphabetByColNumber(col - 1) + "" + row;
      this.range = range;
      var cell = this.fissv.ActiveSheet.sheetData.GetCell(row, range);
      var drawtext = this.fissv.ActiveSheet.GetCellStringValue(cell);

      var style = this.fissv.ActiveSheet.GetCellStyleByCell(cell);
      var font = style.font;
      var fontString = this.fissv.ActiveSheet.GetFontString(font);
      var alignment = style.alignment;
      var textAlign = alignment.horizontal;
      //获取input的id，设置他的位置
      var input = this.fissv.fiss.canvasInput;
      input.value = drawtext;
      this.fissv.fiss.InputTextVale=drawtext;
      input.style.left =
        this.fissv.fiss.canvas.offsetLeft + ranginfo.x - 2 + "px";
      input.style.top =
        this.fissv.fiss.canvas.offsetTop + ranginfo.y - 2 + "px";
      input.style.width = ranginfo.width + "px";
      input.style.height = ranginfo.height + "px";
      input.style.font = fontString;
      input.style.textAlign = textAlign;
      input.style.color = this.fissv.fiss.fissM.GetColorRgb(
        font.color,
        "#000000"
      );
      var fill = style.fill;
      input.style.background = this.fissv.fiss.fissM.GetColorRgb(
        fill.patternFill.fgColor,
        "#ffffff"
      );
      input.focus();
      if(drawtext.length>0){
        var getGetCursorindex=this.getGetCursorindex(obj, event,textAlign,drawtext,fontString);
          input.setSelectionRange(getGetCursorindex,getGetCursorindex);
      }
      // this.textCursor.Setenable(true);
      // this.textCursor.DrawTextCursor(obj, event);
    } else {
      var input = this.fissv.fiss.canvasInput;
      input.style.left = "-300px";
      input.style.top = "-300px";
    }

    this.fissv.ctx.restore();
  }

  getGetCursorindex(obj, event,textAlign,drawtext,fontString){
    var retIndex=0;
    this.fissv.ctx.save();
    this.fissv.ctx.font = fontString;
    var LeftgapX=obj.ranginfo.gapX;
    var drawtextwidth=this.fissv.ctx.measureText(drawtext).width;
    var averageChar= parseInt(drawtextwidth/drawtext.length);
    if(textAlign=="left"){
       retIndex=parseInt((LeftgapX)/averageChar);
       //console.log("left:"+retIndex)
    }else if(textAlign=="right"){
       retIndex=drawtext.length-parseInt((obj.ranginfo.width-LeftgapX)/averageChar);
      //  console.log("right:"+retIndex)
    }else{
       var halfdrawtextwidth=parseInt(drawtextwidth/2);
       var halfIndex=parseInt(drawtext.length/2);
       if(  event.offsetX > obj.ranginfo.x+obj.ranginfo.width/2){
          retIndex=halfIndex+parseInt((LeftgapX-obj.ranginfo.width/2)/averageChar);
       }else
       {
          retIndex=halfIndex-parseInt((obj.ranginfo.width/2-LeftgapX)/averageChar);
       }
      // console.log("center:"+retIndex)

    }
    this.fissv.ctx.restore();
    if(retIndex<0)
     retIndex=0;
    if(retIndex >drawtext.length)
     retIndex=drawtext.length;
    return retIndex;
  }
  RestorePre(preCellData) {
    var ranginfo = preCellData.ranginfo;

    if (this.fissv.fiss.activeSheetIndex != preCellData.sheetnum)
      return;
    // console.log(
    //   "restroe ranginfo.x--" +
    //   ranginfo.x +
    //   "---ranginfo.y--" +
    //   ranginfo.y +
    //   "---ranginfo.width--" +
    //   ranginfo.width +
    //   "---ranginfo.height--" +
    //   ranginfo.height
    // );
    var imgData = preCellData.data;
    // this.fissv.ctx.fillRect(
    //   ranginfo.x,
    //   ranginfo.y,
    //   ranginfo.width,
    //   ranginfo.height
    // );
    //putImageData(imgData,x,y,dirtyX,dirtyY,dirtyWidth,dirtyHeight);
    this.fissv.ctx.putImageData(
      imgData,
      parseInt(ranginfo.x - 2) * 2,
      parseInt(ranginfo.y - 2) * 2
    );
  }
}
