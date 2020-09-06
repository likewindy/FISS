export default class RightScrollBar {
  constructor(fissv) {
    this.fissv = fissv;
    this.rightBarRegins = [];

    this.AddComRegins=this.AddComRegins.bind(this);
    this.ClickRightBar=this.ClickRightBar.bind(this);
    this.ClickRightScrollBarDown=this.ClickRightScrollBarDown.bind(this);
    this.ClickRightScrollBarUp=this.ClickRightScrollBarUp.bind(this);


  }
  AddComRegins (oneZoom)  {
    for (var n = 0; n < this.rightBarRegins.length; n++) {
      let component = this.rightBarRegins[n];
      let firename = component.name;
      if (oneZoom.name == firename) component.rect = oneZoom.rect;
    }
    this.rightBarRegins.push(oneZoom);
  };

  ClickRightBar  (obj, event)   {
    //console.log("......ClickRightBar:");
    let clientX = event.offsetX;
    let clientY = event.offsetY;

    for (var n = 0; n < this.rightBarRegins.length; n++) {
      let component = this.rightBarRegins[n];
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
    // try {
    //   this.fissv.fiss._events.ClickRightBar = [];
    //   this.fissv.fiss._events.ClickRightScrollBarUp = [];
    //   this.fissv.fiss._events.ClickRightScrollBarDown = [];
    // } catch (e) {}

    this.fissv.fiss.addEvent("ClickRightBar", this.ClickRightBar);
    this.rightBarRegins = [];
    this.fissv.ctx.fillStyle = "white";
    this.fissv.ctx.fillRect(width - 20, startx, 20, height);
    var rect = {
      x: width - 20,
      y: startx,
      height: height,
      width: 20
    };
    this.fissv.AddComRegins({ name: "ClickRightBar", rect });

    let addy = 10;
    //up button
    this.fissv.ctx.beginPath();
    this.fissv.ctx.moveTo(width - 10, addy);
    this.fissv.ctx.lineTo(width - 4, addy + 10);
    this.fissv.ctx.lineTo(width - 16, addy + 10);
    this.fissv.ctx.lineTo(width - 10, addy);
    this.fissv.ctx.fillStyle = "#bdbebd";
    this.fissv.ctx.stroke();
    this.fissv.ctx.closePath();
    this.fissv.ctx.fill();
    var rectup = {
      x: width - 20,
      y: addy,
      height: 10,
      width: 20
    };
    this.rightBarRegins.push({ name: "ClickRightScrollBarUp", rect: rectup });
    this.fissv.fiss.addEvent("ClickRightScrollBarUp", this.ClickRightScrollBarUp);
    addy = addy + 20;
    //三个部分 白色向上  黑色展示   白色向下  总计像素为 30+x+50=height
    let allbarheight = parseInt((height - 30 - 50) * 0.98);
    let uphideheight = 0,
      midShowHeight = 0,
      downhideHeight = 0;
    //根据model的dimension和默认行高度计算
    let dimension = this.fissv.ActiveSheet.dimension;
    if (dimension == "A1" || dimension.length==2) dimension = "A1:A1";

    let darray = dimension.split(":");
    var modelStartrow = parseInt(darray[0].replace(/[^0-9]/gi, ""));

    if (modelStartrow > 1) modelStartrow = 1;

    var modelEndrow = parseInt(darray[1].replace(/[^0-9]/gi, ""));
    var showrows = this.fissv.showrows;
    var startrow = this.fissv.StartRow;
    if (modelStartrow == 1 && modelEndrow == 1) {
      midShowHeight = allbarheight;
    } else {
      var bigrow = showrows > modelEndrow ? showrows : modelEndrow;
      if (startrow + showrows - 2 > bigrow) {
        uphideheight = parseInt(allbarheight * 0.95);
        midShowHeight = parseInt(allbarheight * 0.05);
        downhideHeight = 0;
      } else {
        uphideheight = parseInt(
          ((startrow - modelStartrow) / bigrow) * allbarheight
        );
        downhideHeight = parseInt(
          ((bigrow - showrows) / bigrow) * allbarheight
        );
        midShowHeight = parseInt((showrows / bigrow) * allbarheight);
        midShowHeight = midShowHeight < 10 ? 10 : midShowHeight;
      }
    }
    addy = addy + uphideheight;
    if (midShowHeight + addy > height - 50)
      midShowHeight = parseInt((height - 50 - addy) * 0.98);
    this.fissv.ctx.fillStyle = "#bdbebd";
    this.fissv.ctx.fillRect(width - 16, addy, 12, midShowHeight);
    //down button
    addy = height - 40;
    this.fissv.ctx.beginPath();
    this.fissv.ctx.moveTo(width - 10, addy);
    this.fissv.ctx.lineTo(width - 4, addy - 10);
    this.fissv.ctx.lineTo(width - 16, addy - 10);
    this.fissv.ctx.lineTo(width - 10, addy);
    this.fissv.ctx.fillStyle = "#bdbebd";
    this.fissv.ctx.stroke();
    this.fissv.ctx.closePath();
    this.fissv.ctx.fill();

    var rectdown = {
      x: width - 20,
      y: addy - 10,
      height: 10,
      width: 20
    };
    this.rightBarRegins.push({
      name: "ClickRightScrollBarDown",
      rect: rectdown
    });
    this.fissv.fiss.addEvent(
      "ClickRightScrollBarDown",
      this.ClickRightScrollBarDown
    );
  }

  ClickRightScrollBarDown  (obj, event)  {
    console.log("ClickRightScrollBarDown:");
    this.fissv.fiss.$emit("SheetRowDown", obj, event);
  };

  ClickRightScrollBarUp  (obj, event)  {
    console.log("ClickRightScrollBarUp:");
    this.fissv.fiss.$emit("SheetRowUp", obj, event);
  };
}
