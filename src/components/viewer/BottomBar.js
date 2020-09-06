import DrawDirection from "./DrawDirection";
import SheetBar from "./SheetBar";
import BottomScrollBar from "./BottomScrollBar";

export default class BottomBar {
  constructor(fissv) {
    this.fissv = fissv;
    this.startSheetid = 0;
    this.activeSheetid = 0;
    this.buttomComPonentsRegins = [];
    this.lefthidesheets = [];
    this.showsheets = [];
    this.righthidesheets = [];
    this.allsheets = [];
    this.startx = 0;
    this.endy = 0;
    this.width = 0;
    this.height = 0;

    this.ReadDraw=this.ReadDraw.bind(this);
    this.ReadDrawBottomScrollbar=this.ReadDrawBottomScrollbar.bind(this);
    this.ClickLastLeftDric=this.ClickLastLeftDric.bind(this);

    this.ClickLeftDric=this.ClickLeftDric.bind(this);
    this.ClickRightDric=this.ClickRightDric.bind(this);
    this.ClickLastRightDric=this.ClickLastRightDric.bind(this);
    this.ClickSheetName=this.ClickSheetName.bind(this);
    this.ClickBottomBar=this.ClickBottomBar.bind(this);


  }

  Draw(startx, endy, width, height) {
    this.activeSheetid = this.fissv.sheetIndex + 1;
    this.startx = startx;
    this.endy = endy;
    this.width = width;
    this.height = height;
    this.ReadDraw(startx, endy, width, height);
  }

  ReadDrawBottomScrollbar   (startx, endy, width, height)  {
    this.fissv.ctx.fillStyle = "white";
    this.fissv.ctx.fillRect(startx, endy, width - 20, height);
    this.buttomScrollBar = new BottomScrollBar(this.fissv);
    this.buttomScrollBar.Draw(startx, endy, width, height);
  };

  ReadDraw   (startx, endy, width, height)  {

    this.fissv.ctx.fillStyle = "#e9e9e9";
    this.fissv.ctx.fillRect(startx, height - 30, width, 30);
    this.CaclShowSheets(startx, width);
    this.DrawDirection(startx, height - 30, 150, 30);
    var showSheetBarWidth = parseInt(width * 0.65) - 100;
    var showScrollBarWith = width - parseInt(width * 0.65);
    // console.log(
    //   "   startx:" +
    //     (startx + 100) +
    //     "   starty:" +
    //     (height - 30) +
    //     "   showSheetBarWidth:" +
    //     showSheetBarWidth +
    //     "   h:" +
    //     30
    // );
    // this.fissv.ctx.rect(startx + 100, height - 30, showSheetBarWidth - 1, 29);
    // this.fissv.ctx.strokeStyle = "blue";
    // this.fissv.ctx.stroke();
    this.DrawSheets(startx + 100, height - 30, showSheetBarWidth, 30);
    let rect = {
      x: startx,
      y: height - 30,
      height: 30,
      width: showSheetBarWidth + 100
    };
    this.fissv.AddComRegins({ name: "ClickBottomBar", rect });

    this.ReadDrawBottomScrollbar(
      startx + 100 + showSheetBarWidth,
      height - 30,
      showScrollBarWith,
      30
    );
    var rect2 = {
      x: startx + 100 + showSheetBarWidth,
      y: height - 30,
      height: 30,
      width: showScrollBarWith
    };
    this.fissv.AddComRegins({ name: "ClickBottomScrollbar", rect: rect2 });

    this.fissv.fiss.addEvent("ClickBottomBar", this.ClickBottomBar);
    this.fissv.fiss.addEvent("ClickSheetName", this.ClickSheetName);
    this.fissv.fiss.addEvent("ClickLastLeftDric", this.ClickLastLeftDric);
    this.fissv.fiss.addEvent("ClickLeftDric", this.ClickLeftDric);
    this.fissv.fiss.addEvent("ClickRightDric", this.ClickRightDric);
    this.fissv.fiss.addEvent("ClickLastRightDric", this.ClickLastRightDric);
  };

  ClickLastLeftDric   (obj, event)  {
    if (this.lefthidesheets.length <= 0) return;
    console.log("   ClickLastLeftDric:");
    this.activeSheetid = 1;

    this.ReadDraw(this.startx, this.endy, this.width, this.height);
  };
  ClickLeftDric   (obj, event)  {
    if (this.lefthidesheets.length <= 0) return;
    console.log("   ClickLeftDric:");
    this.activeSheetid = this.activeSheetid - 1;
    console.log("   this.activeSheetid:" + this.activeSheetid);
    if (this.activeSheetid <= 0) this.activeSheetid = 1;
    this.ReadDraw(this.startx, this.endy, this.width, this.height);
  };
  ClickRightDric  (obj, event)  {
    if (this.righthidesheets.length <= 0) return;
    console.log("   ClickRightDric:");
    this.activeSheetid = this.showsheets[this.showsheets.length - 1].index;
    //this.activeSheetid = this.activeSheetid + 1;
    console.log("   this.activeSheetid:" + this.activeSheetid);
    if (this.activeSheetid > this.allsheets.length)
      this.activeSheetid = this.allsheets.length;
    this.ReadDraw(this.startx, this.endy, this.width, this.height);
  };
  ClickLastRightDric  (obj, event)  {
    if (this.righthidesheets.length <= 0) return;
    console.log("   ClickLastRightDric:");
    this.activeSheetid = this.allsheets.length;
    this.ReadDraw(this.startx, this.endy, this.width, this.height);
  };

  ClickSheetName   (obj, event)   {
    console.log(
      "   obj.sheetid:" +
        obj.sheetid +
        "   this.activeSheetid:" +
        this.activeSheetid
    );
    if (obj.sheetid != this.activeSheetid) {
      var event = {
        old: this.activeSheetid,
        new: obj.sheetid
      };
      this.fissv.fiss.$emit("ActiveSheetChage", this, event);
    }
  };

  ClickBottomBar (obj, event) {
    let clientX = event.offsetX;
    let clientY = event.offsetY;
    // console.log("   clientX:" + clientX + "   clientY:" + clientY);
    for (var n = 0; n < this.buttomComPonentsRegins.length; n++) {
      let component = this.buttomComPonentsRegins[n];
      let rect = component.rect;
      let firename = component.name;
      if (clientX > rect.x && clientX < rect.x + rect.width)
        if (clientY > rect.y && clientY < rect.y + rect.height) {
          console.log("fire event:" + firename);
          this.fissv.fiss.$emit(firename, component, event);
          break;
        }
    }
  };
  DrawDirection(startx, endy, width, height) {
    this.buttomComPonentsRegins = [];
    var bleft = false;
    var bright = false;
    if (this.lefthidesheets.length > 0) bleft = true;
    if (this.righthidesheets.length > 0) bright = true;

    this.lastleftDric = new DrawDirection(this.fissv, "left", true, 1, bleft);
    this.lastleftDric.DrawDirection(startx + 10, endy, 20, height);
    let lastleftctcol = {
      x: startx + 10,
      y: endy,
      height: height,
      width: 20
    };
    this.buttomComPonentsRegins.push({
      name: "ClickLastLeftDric",
      rect: lastleftctcol
    });

    this.leftDric = new DrawDirection(this.fissv, "left", false, 2, bleft);
    this.leftDric.DrawDirection(startx + 30, endy, 20, height);
    let leftctcol = {
      x: startx + 30,
      y: endy,
      height: height,
      width: 20
    };
    this.buttomComPonentsRegins.push({
      name: "ClickLeftDric",
      rect: leftctcol
    });

    this.rightDric = new DrawDirection(this.fissv, "right", false, 3, bright);
    this.rightDric.DrawDirection(startx + 50, endy, 20, height);
    let rightctcol = {
      x: startx + 50,
      y: endy,
      height: height,
      width: 20
    };
    this.buttomComPonentsRegins.push({
      name: "ClickRightDric",
      rect: rightctcol
    });
    this.lastrightDric = new DrawDirection(
      this.fissv,
      "right",
      true,
      4,
      bright
    );
    this.lastrightDric.DrawDirection(startx + 70, endy, 20, height);
    let lastrightctcol = {
      x: startx + 70,
      y: endy,
      height: height,
      width: 20
    };
    this.buttomComPonentsRegins.push({
      name: "ClickLastRightDric",
      rect: lastrightctcol
    });
  }
  CaclShowSheets(startx, width) {
    this.lefthidesheets = [];
    this.showsheets = [];
    this.righthidesheets = [];
    this.allsheets = [];
    var showSheetBarWidth = parseInt(width * 0.65) - 100;
    var sheetBarWidthList = [];
    var barStartx = startx;
    var leftActiveWidth = 0;

    //全部的sheet
    for (
      var n = 0;
      n < parseInt(this.fissv.fiss.fissM.workbook.sheets.length);
      n++
    ) {
      var worksheet = this.fissv.fiss.fissM.workbook.sheets[n];
      var textWidth = parseInt(
        this.fissv.ctx.measureText(worksheet.name).width + 10
      );
      if (textWidth < 100) textWidth = 100;
      sheetBarWidthList.push(textWidth);
      barStartx = barStartx + textWidth;
      let sheetinfo = {
        index: n + 1,
        sheetname: worksheet.name,
        width: textWidth
      };
      this.allsheets.push(sheetinfo);
      if (n < this.activeSheetid) leftActiveWidth = leftActiveWidth + textWidth;
    }
    var startShowSheetn = 0;
    //计算左侧隐藏的sheet
    if (leftActiveWidth >= showSheetBarWidth) {
      for (n = 0; n < this.allsheets.length; n++) {
        var sheetWidth = this.allsheets[n].width;
        leftActiveWidth = leftActiveWidth - sheetWidth;
        if (leftActiveWidth < showSheetBarWidth) {
          this.lefthidesheets.push(this.allsheets[n]);
          startShowSheetn = n + 1;
          break;
        } else {
          this.lefthidesheets.push(this.allsheets[n]);
        }
        if (n > 90) break;
      }
    }
    var showWidth = 0;
    //计算展示的sheet
    for (n = startShowSheetn; n < this.allsheets.length; n++) {
      var sheetWidth = this.allsheets[n].width;
      showWidth = showWidth + sheetWidth;
      if (showWidth > showSheetBarWidth) {
        startShowSheetn = n + 1;
        this.showsheets.push(this.allsheets[n]);
        break;
      } else {
        startShowSheetn = n + 1;
        this.showsheets.push(this.allsheets[n]);
      }
      if (n > 90) break;
    }
    //计算右侧隐藏的sheet
    for (n = startShowSheetn; n < this.allsheets.length; n++) {
      this.righthidesheets.push(this.allsheets[n]);
      if (n > 90) break;
    }
  }
  DrawSheets(startx, endy, width, height) {
    var barStartx = startx;
    for (var n = 0; n < this.showsheets.length; n++) {
      var worksheet = this.showsheets[n];
      var sheetbar = new SheetBar(
        this.fissv,
        worksheet.index,
        worksheet.sheetname
      );
      sheetbar.Draw(barStartx, endy, worksheet.width, height);
      let sheetRect = {
        x: barStartx,
        y: endy,
        height: height,
        width: worksheet.width
      };
      this.buttomComPonentsRegins.push({
        name: "ClickSheetName",
        rect: sheetRect,
        sheetid: worksheet.index
      });
      barStartx = barStartx + worksheet.width;
    }
    //draw add + button
  }
}
