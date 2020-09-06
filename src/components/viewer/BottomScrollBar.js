import DrawDirection from "./DrawDirection";

export default class BottomScrollBar {
  constructor(fissv) {
    this.fissv = fissv;
    this.bottomBarRegins = [];

     this.AddComRegins=this.AddComRegins.bind(this);
     this.BottomScrollbar=this.BottomScrollbar.bind(this);

     this.ClickBottomScrollBarRight=this.ClickBottomScrollBarRight.bind(this);
     this.ClickBottomScrollBarLeft=this.ClickBottomScrollBarLeft.bind(this);

  }


  ClickBottomScrollBarRight  (obj, event)  {
    this.fissv.fiss.$emit("SheetColRight", obj, event);
  };

  ClickBottomScrollBarLeft  (obj, event)  {
    this.fissv.fiss.$emit("SheetColleft", obj, event);
  };



  AddComRegins (oneZoom )  {
    for (var n = 0; n < this.bottomBarRegins.length; n++) {
      let component = this.bottomBarRegins[n];
      let firename = component.name;
      if (oneZoom.name == firename) component.rect = oneZoom.rect;
    }
    this.bottomBarRegins.push(oneZoom);
  };

  BottomScrollbar  (obj, event)  {
    //console.log("......ClickBottomBar:");
    let clientX = event.offsetX;
    let clientY = event.offsetY;

    for (var n = 0; n < this.bottomBarRegins.length; n++) {
      let component = this.bottomBarRegins[n];
      let rect = component.rect;
      let firename = component.name;
      let bigx = rect.x + rect.width;
      if (clientX > rect.x && clientX < bigx)
        if (clientY > rect.y && clientY < rect.y + rect.height) {
          console.log("fire event:" + firename);
          this.fissv.fiss.$emit(firename, this, event);
          break;
        }
    }
  };
  Draw(startx, endy, width, height) {
    this.bottomBarRegins = [];
    this.fissv.fiss.addEvent("ClickBottomScrollbar", this.BottomScrollbar);
    this.bottomBarRegins = [];
    this.fissv.ctx.fillStyle = "white";
    this.fissv.ctx.fillRect(startx, endy, width, height);

    let addy = 0;
    //left button

    this.leftButton = new DrawDirection(this.fissv, "left", false, 1, false);
    this.leftButton.DrawDirection(startx, endy, 20, height);
    var rectup = {
      x: startx,
      y: endy,
      height: height,
      width: 20
    };
    this.bottomBarRegins.push({
      name: "ClickBottomScrollBarLeft",
      rect: rectup
    });
    this.fissv.fiss.addEvent(
      "ClickBottomScrollBarLeft",
      this.ClickBottomScrollBarLeft
    );
    addy = addy + 20;
    //三个部分 白色向上  黑色展示   白色向下  总计像素为 30+x+50=height
    let allbarwidth = parseInt((width - 20 - 20 - 20) * 0.98);
    let uphidewidth = 0,
      midShowwidth = 0,
      downhidewidth = 0;

    //根据model的dimension和默认行高度计算
    let dimension = this.fissv.ActiveSheet.dimension;
    if (dimension == "A1"|| dimension.length==2) dimension = "A1:A1";
    let darray = dimension.split(":");
    var modelStartcol = this.GetColByAlphabet(
      darray[0].replace(/[^A-Z]/gi, "")
    );
    if (modelStartcol > 1) modelStartcol = 1;
    var modelEndcol = this.GetColByAlphabet(darray[1].replace(/[^A-Z]/gi, ""));
    var showcols = this.fissv.showColsArray.length;
    var startcol = this.fissv.StartCol;
    if (modelEndcol == 1 && modelStartcol == 1) {
      midShowwidth = allbarwidth;
    } else {
      var bigcol = showcols > modelEndcol ? showcols : modelEndcol;
      if (startcol + showcols - 2 > bigcol) {
        uphidewidth = parseInt(allbarwidth * 0.95);
        midShowwidth = parseInt(allbarwidth * 0.05);
        downhidewidth = 0;
      } else {
        uphidewidth = parseInt(
          ((startcol - modelStartcol) / bigcol) * allbarwidth
        );
        downhidewidth = parseInt(((bigcol - showcols) / bigcol) * allbarwidth);
        midShowwidth = parseInt((showcols / bigcol) * allbarwidth);
        midShowwidth = midShowwidth < 10 ? 10 : midShowwidth;
      }
    }
    var addx = 20 + 10 + uphidewidth;
    if (midShowwidth + addx > width - 40)
      midShowwidth = parseInt((width - 40 - addx) * 0.98);

    this.fissv.ctx.fillStyle = "#bdbebd";
    this.fissv.ctx.fillRect(
      startx + 20 + 10 + uphidewidth,
      endy + 5,
      midShowwidth,
      height - 10
    );
    //right button
    this.leftButton = new DrawDirection(this.fissv, "right", false, 1, false);
    this.leftButton.DrawDirection(startx + width - 30, endy, 20, height);

    var rectdown = {
      x: startx + width - 40,
      y: endy,
      height: height,
      width: 20
    };
    this.bottomBarRegins.push({
      name: "ClickBottomScrollBarRight",
      rect: rectdown
    });
    this.fissv.fiss.addEvent(
      "ClickBottomScrollBarRight",
      this.ClickBottomScrollBarRight
    );
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
}
