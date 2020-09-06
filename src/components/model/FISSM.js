import Sst from "./sharedstrings/Sst.js";
import Stylesheets from "./style/Stylesheet.js";
import OfficeStyleSheet from "./theme//OfficeStyleSheet.js";
import Workbook from "./workbook/Workbook.js";
import FontMetrics from "../viewer/FontMetrics";
import DefaultAddFun from './workbook/fromula/DefaultAddFun.js';

export default class FISSM {
  constructor(fiss) {
    this.fiss = fiss;
    this.sharedStrings = new Sst(); // sst
    this.styles = new Stylesheets(); //Stylesheets
    this.theme = new OfficeStyleSheet();
    this.workbook = new Workbook(fiss); //Workbook
    this.fontMetrics = new FontMetrics();

    this.RowCellValueChage=this.RowCellValueChage.bind(this);
    //自定义函数增加
    new DefaultAddFun(this.fiss.addin,this.workbook);
    //监听表格内容变化
    this.fiss.addEvent("RowCellValueChage", this.RowCellValueChage);


  }
  RowCellValueChage  (ActiveSheet,range, value) {
    var formulaArray=this.fiss.fissM.workbook.formulaArray;
    for (var n = 0; n < formulaArray.length; n++) {
      var oneFromaula=formulaArray[n];
      oneFromaula.Cacl(ActiveSheet,range, value);
    }
  }
  GetColorRgb(color, defaultRgb) {
    var tempRgb = defaultRgb;
    if (color == null) return defaultRgb;
    if (color.theme == -1) {
      if (color.rgb != null && color.rgb != "") tempRgb = color.rgb;
      else {
        var indexcolor = parseInt(color.indexed);
        if(indexcolor==-1) return defaultRgb;
        tempRgb = this.fiss.fissM.styles.colors.indexedColors.rgbColor[
          indexcolor
        ].rgb;
      }
    } else {
      var colorChoice = this.fiss.fissM.theme.themeElements.clrScheme.GetColorByIndex(
        color.theme
      );
      if (colorChoice != null)
        tempRgb = ("#" + colorChoice.GetColorVal(defaultRgb)).replace(
          "##",
          "#"
        );
      else tempRgb = defaultRgb;
    }
    if (color.tint != 0)
      tempRgb = this.procTint(tempRgb.replace("#", ""), color.tint);
    return tempRgb;
  }

  procTint(Rgb, tint) {
    var colorR = parseInt(Rgb.toString().substr(0, 2), 16);
    var colorY = parseInt(Rgb.toString().substr(2, 2), 16);
    var colorB = parseInt(Rgb.toString().substr(4, 2), 16);
    if (tint < 0)
      return (
        "#" +
        parseInt(colorR * (1 + tint)).toString(16) +
        parseInt(colorY * (1 + tint)).toString(16) +
        parseInt(colorB * (1 + tint)).toString(16)
      );
    else
      return (
        "#" +
        parseInt(colorR * (1 - tint) + (255 - 255 * (1 - tint))).toString(16) +
        parseInt(colorY * (1 - tint) + (255 - 255 * (1 - tint))).toString(16) +
        parseInt(colorB * (1 - tint) + (255 - 255 * (1 - tint))).toString(16)
      );
  }
  toString() {
    return this.toString();
  }
  getName() {
    return "FISSM";
  }
}
