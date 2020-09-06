/*
<xsd:complexType name="CT_Worksheet">
<xsd:sequence>
<xsd:element name="sheetPr" type="CT_SheetPr" minOccurs="0" maxOccurs="1"/>
<xsd:element name="dimension" type="CT_SheetDimension" minOccurs="0" maxOccurs="1"/>
<xsd:element name="sheetViews" type="CT_SheetViews" minOccurs="0" maxOccurs="1"/>
<xsd:element name="sheetFormatPr" type="CT_SheetFormatPr" minOccurs="0" maxOccurs="1"/>
<xsd:element name="cols" type="CT_Cols" minOccurs="0" maxOccurs="unbounded"/>
<xsd:element name="sheetData" type="CT_SheetData" minOccurs="1" maxOccurs="1"/>
<xsd:element name="sheetCalcPr" type="CT_SheetCalcPr" minOccurs="0" maxOccurs="1"/>
<xsd:element name="sheetProtection" type="CT_SheetProtection" minOccurs="0" maxOccurs="1"/>
<xsd:element name="protectedRanges" type="CT_ProtectedRanges" minOccurs="0" maxOccurs="1"/>
<xsd:element name="scenarios" type="CT_Scenarios" minOccurs="0" maxOccurs="1"/>
<xsd:element name="autoFilter" type="CT_AutoFilter" minOccurs="0" maxOccurs="1"/>
<xsd:element name="sortState" type="CT_SortState" minOccurs="0" maxOccurs="1"/>
<xsd:element name="dataConsolidate" type="CT_DataConsolidate" minOccurs="0" maxOccurs="1"/>
<xsd:element name="customSheetViews" type="CT_CustomSheetViews" minOccurs="0" maxOccurs="1"/>
<xsd:element name="mergeCells" type="CT_MergeCells" minOccurs="0" maxOccurs="1"/>
<xsd:element name="phoneticPr" type="CT_PhoneticPr" minOccurs="0" maxOccurs="1"/>
<xsd:element name="conditionalFormatting" type="CT_ConditionalFormatting" minOccurs="0" maxOccurs="unbounded"/>
<xsd:element name="dataValidations" type="CT_DataValidations" minOccurs="0"maxOccurs="1"/>
<xsd:element name="hyperlinks" type="CT_Hyperlinks" minOccurs="0" maxOccurs="1"/>
<xsd:element name="printOptions" type="CT_PrintOptions" minOccurs="0" maxOccurs="1"/>
<xsd:element name="pageMargins" type="CT_PageMargins" minOccurs="0" maxOccurs="1"/>
<xsd:element name="pageSetup" type="CT_PageSetup" minOccurs="0" maxOccurs="1"/>
<xsd:element name="headerFooter" type="CT_HeaderFooter" minOccurs="0" maxOccurs="1"/>
<xsd:element name="rowBreaks" type="CT_PageBreak" minOccurs="0" maxOccurs="1"/>
<xsd:element name="colBreaks" type="CT_PageBreak" minOccurs="0" maxOccurs="1"/>
<xsd:element name="customProperties" type="CT_CustomProperties" minOccurs="0" maxOccurs="1"/>
<xsd:element name="cellWatches" type="CT_CellWatches" minOccurs="0" maxOccurs="1"/>
<xsd:element name="ignoredErrors" type="CT_IgnoredErrors" minOccurs="0" maxOccurs="1"/>
<xsd:element name="smartTags" type="CT_SmartTags" minOccurs="0" maxOccurs="1"/>
<xsd:element name="drawing" type="CT_Drawing" minOccurs="0" maxOccurs="1"/>
<xsd:element name="drawingHF" type="CT_DrawingHF" minOccurs="0" maxOccurs="1"/>
<xsd:element name="picture" type="CT_SheetBackgroundPicture" minOccurs="0" maxOccurs="1"/>
<xsd:element name="oleObjects" type="CT_OleObjects" minOccurs="0" maxOccurs="1"/>
<xsd:element name="controls" type="CT_Controls" minOccurs="0" maxOccurs="1"/>
<xsd:element name="webPublishItems" type="CT_WebPublishItems" minOccurs="0" maxOccurs="1"/>
<xsd:element name="tableParts" type="CT_TableParts" minOccurs="0" maxOccurs="1"/>
<xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
</xsd:sequence>
</xsd:complexType>
  */
import SheetFormatPr from "./SheetFormatPr.js";
import SheetData from "./SheetData.js";
import MergeCell from "./MergeCell.js";
import Col from "./Col.js";
import Rst from "../sharedstrings/Rst";
import Range from "./Range.js";
import Cell from "./Cell.js";
import Formula from "./Formula.js";
import Style from "./Style.js";
import Xf from "../style/Xf";
import SubFunChain from "./SubFunChain.js";
import PageSetup from './PageSetup.js';
import PrintOptions from './PrintOptions.js';
import PageMargins from './PageMargins.js';
import HeaderFooter from './HeaderFooter.js';
import PageBreak from './PageBreak.js';

export default class Worksheet {
  constructor(workbook) {
    this.fiss = workbook.fiss;
    this.sharedStrings = this.fiss.fissM.sharedStrings; // sst
    this.styles = this.fiss.fissM.styles; //Stylesheets
    this.name = "";
    this.sheetId = "";
    this.sheetFormatPr = new SheetFormatPr(24);
    this.Cols = [];
    this.sheetData = new SheetData();
    this.mergeCells = [];
    this.customSheetViews;
    this.webPublishItems;
    this.tableParts;
    this.extLst;
    this.dimension = "A1:A1";
    this.StartCol = 1;
    this.StartRow = 1;
    //打印相关
    this.pageSetup = new PageSetup(); //page 3916
    this.printOptions = new PrintOptions();
    this.pageMargins = new PageMargins();
    this.headerFooter = new HeaderFooter();
    this.rowBreaks = new PageBreak();
    this.colBreaks = new PageBreak();
  }
  AddCol(Col) {
    this.Cols.push(Col);
  }

  GetCol(col) {
    for (var irow = 0; irow < this.Cols.length; irow++) {
      var tcol = this.Cols[irow];
      if (tcol.min > col) {
        return null;
      }
      if (col >= tcol.min && col <= tcol.max) {
        return tcol;
      }
    }
    return null;
  }

  AddCMergeCell(mergeCell) {
    this.mergeCells.push(mergeCell);
  }

  ParseFromXml(xmlsheet1) {
    this.sheetFormatPr.ParseFromXml(xmlsheet1.sheetFormatPr);
    this.sheetData.ParseFromXml(xmlsheet1.sheetData);

    if (
      xmlsheet1.mergeCells != null &&
      xmlsheet1.mergeCells.mergeCell.length != null
    ) {
      for (var n = 0; n < xmlsheet1.mergeCells.mergeCell.length; n++) {
        var mergeCell = new MergeCell();
        mergeCell.ParseFromXml(xmlsheet1.mergeCells.mergeCell[n]);
        this.AddCMergeCell(mergeCell);
      }
    } else {
      if (xmlsheet1.mergeCells != null) {
        var mergeCell = new MergeCell();
        mergeCell.ParseFromXml(xmlsheet1.mergeCells.mergeCell);
        this.AddCMergeCell(mergeCell);
      }
    }
    if (xmlsheet1.dimension != null) this.dimension = xmlsheet1.dimension._ref;

    if (xmlsheet1._name != null) this.name = xmlsheet1._name;
    if (xmlsheet1._sheetId != null) this.sheetId = xmlsheet1._sheetId;
    if (xmlsheet1.cols != null) {
      var acount = parseInt(xmlsheet1.cols.col.length);
      if (acount == 1) {
        var col = new Col();
        col.ParseFromXml(xmlsheet1.cols.col);
        this.AddCol(col);
      } else {
        for (var n = 0; n < acount; n++) {
          var col = new Col();
          col.ParseFromXml(xmlsheet1.cols.col[n]);
          this.AddCol(col);
        }
      }
    }
    if (xmlsheet1.pageSetup != null) {
      this.pageSetup.ParseFromXml(xmlsheet1.pageSetup);
    }
    if (xmlsheet1.printOptions != null) {
      this.printOptions.ParseFromXml(xmlsheet1.printOptions);
    }
    if (xmlsheet1.pageMargins != null) {
      this.pageMargins.ParseFromXml(xmlsheet1.pageMargins);
    }
    if (xmlsheet1.headerFooter != null) {
      this.headerFooter.ParseFromXml(xmlsheet1.headerFooter);
    }
    if (xmlsheet1.rowBreaks != null) {
      this.rowBreaks.ParseFromXml(xmlsheet1.rowBreaks);
    }
    if (xmlsheet1.colBreaks != null) {
      this.colBreaks.ParseFromXml(xmlsheet1.colBreaks);
    }
    this.WorkFormula();
  }

  WorkFormula() {
    var rows = this.sheetData.Rows.length;
    for (var irow = 0; irow < rows; irow++) {
      var Row = this.sheetData.Rows[irow];
      for (var icol = 0; icol < Row.cells.length; icol++) {
        var cell = Row.cells[icol];
        if (cell.f != null && cell.f != '') {
          // console.debug(this.name + ' ' + irow + '  ' + icol + '  ' + cell.f)
          var fromula = new Formula(this.fiss);
          fromula.id = (this.fiss.fissM.workbook.formulaArray.length + 1);
          fromula.left = this.name + '!' + cell.r;
          fromula.right = cell.f;
          fromula.type = cell.cellType;
          fromula.sheetname = this.name;
          fromula.sheetId = this.sheetId;
          fromula.caclFunctionChain = [];
          this.CreateFunctionChain(fromula.right, fromula.caclFunctionChain);
          this.fiss.fissM.workbook.formulaArray.push(fromula);
        }
      }
    }
  }
  CreateFunctionChain(fromuls, arrayFromula) {
    //对（）的整体考虑，应该在一个整理计算链条内
    let innerfromuls = fromuls.toString();
    //加减乘除 分割
    let regex = /[+-/*//]/g;
    if (innerfromuls.length == 0) return;
    var leftbracket = innerfromuls.indexOf('(');
    if (leftbracket > -1) {
      var subFunctionChain = new SubFunChain();
      //对函数名称处理，处理函数名称前的四则运行符号
      subFunctionChain.functionName = this.CreateFunctionChain(innerfromuls.substring(0, leftbracket) + '!!##',
        arrayFromula);;
      var temps = innerfromuls.substring(leftbracket + 1);
      var rightbracket = this.FindNextFuntcionRightBracket(temps);
      subFunctionChain.functionPram = temps.substring(0, rightbracket);
      subFunctionChain.functionString = subFunctionChain.functionName + '(' + subFunctionChain.functionPram + ')';
      arrayFromula.push(subFunctionChain);
      //参数内部的是子计算函数，非参数内部的是与该函数平行的计算函数
      //this.CreateFunctionChain(innerfromuls);
      //函数内部处理
      if (subFunctionChain.functionPram.indexOf('(') > -1) {
        subFunctionChain.bHaveSubFun = true;
        this.CreateFunctionChain(subFunctionChain.functionPram, subFunctionChain.SubFunChain);
      }
      // else {
      //   let myArray = subFunctionChain.functionPram.split(regex);
      //   for (var n = 0; n < myArray.length; n++) {
      //     subFunctionChain.bHaveSubFun = true;
      //     if (myArray[n].length == 0) continue
      //     if (myArray[n].indexOf('!!##') > -1) return myArray[n].replace('!!##', '')
      //     if (myArray[n].length == 0) continue

      //     var subFunctionChainInter = new SubFunChain();
      //     subFunctionChainInter.functionName = 'Normal';
      //     subFunctionChainInter.functionPram = myArray[n];
      //     subFunctionChainInter.bHaveSubFun = false;
      //     subFunctionChain.SubFunChain.push(subFunctionChainInter)
      //   }
      // }
      //剩余的字符串继续解析
      var leftString = innerfromuls.substr((innerfromuls.substring(0, leftbracket) + subFunctionChain.functionPram).length +
        2);
      this.CreateFunctionChain(leftString, arrayFromula);
    } else {

      // console.debug(innerfromuls.split(regex))
      let myArray = innerfromuls.split(regex);
      for (var n = 0; n < myArray.length; n++) {
        if (myArray[n].length == 0) continue
        if (myArray[n].indexOf('!!##') > -1) return myArray[n].replace('!!##', '')
        var subFunctionChain = new SubFunChain();
        subFunctionChain.functionName = 'Normal';
        subFunctionChain.functionPram = myArray[n];
        subFunctionChain.bHaveSubFun = false;
        arrayFromula.push(subFunctionChain);
      }
    }
  }
  FindNextFuntcionRightBracket(fromuls) {
    let innerfromuls = fromuls.toString();
    let addLeftBracket = 0;
    let stringlenth = innerfromuls.length;
    for (var n = 0; n < stringlenth; n++) {
      if (innerfromuls[n] == '(') {
        addLeftBracket++;
      } else if (innerfromuls[n] == ')') {
        if (addLeftBracket == 0)
          return n;
        else
          addLeftBracket--;
      }
    }
    return stringlenth;
  }
  //范围支持 通过：，如果有：则获取范围，否则只返回一个单一值
  //目前只支持A1-style方式，不支持R1C1方式
  GetRangeValue(rangePram) {
    var colonIndex = rangePram.indexOf(':')
    if (colonIndex != -1) {
      var rangeList = rangePram.split(':');
      var startRange = rangeList[0];
      var endRange = rangeList[1];
      var reg = /[A-Za-z]+/g;
      var startRow = parseInt(startRange.replace(reg, ''));
      var startCol = this.fiss.fissV.GetColByAlphabet(startRange.replace(startRow, ''));
      var endRow = parseInt(endRange.replace(reg, ''));
      var endCol = this.fiss.fissV.GetColByAlphabet(endRange.replace(endRow, ''));;
      var retRows = [];
      for (var row = startRow; row <= endRow; row++) {
        var retCol = [];
        for (var col = startCol - 1; col <= endCol - 1; col++) {
          var trange = this.fiss.fissV.GetColAlphabetByColNumber(col) + row;
          retCol.push(this.GetCellValue(trange));
        }
        retRows.push(retCol);
      }
      return retRows;
    } else {
      return this.GetCellValue(rangePram);
    }
  }
  GetCellValue(onerange) {
    var cell = this.GetCellByRef(onerange)
    if (cell == null) {
      cell = new Cell();
      cell.r = onerange;
      cell.v = '';
    }
    var tcell = cell.copy();
    tcell.v = this.GetCellStringValue(cell);
    return tcell;
  }
  /*---------------------------------------------------*/
  GetCellStringValue(cell) {
    var drawtext = "";
    if (cell != null) {
      if (cell.cellType == "s") {
        var rst = this.fiss.fissM.sharedStrings.GetSi(cell.v);
        if (rst != null) {
          if (rst.t != null) drawtext = rst.t;
          else drawtext = rst.getAllRText();
        }
      } else {
        if (cell.v != undefined) {
          drawtext = cell.v;
        }
      }
    }
    return drawtext.toString();
  }

  //判断是不是一个数字 或者 一个字符串里全是数字
  isNumber(value) {
    if (value === undefined || value === null || value === '') {
      return false
    }

    if (typeof(value) === 'string') {
      //正整数
      var reNumber = /^\d+$/
      //负整数
      var reNeNumber = /^-\d+$/
      //正实数
      var reRealNumber1 = /^[1-9]\d*[.]\d+$/ //非零开头
      var reRealNumber2 = /^0[.]\d+$/ //零开头
      //负实数
      var reNeRealNumber1 = /^-[1-9]\d*[.]\d+$/ //非零开头
      var reNeRealNumber2 = /^-0[.]\d+$/ //零开头

      if (reNumber.test(value) || reNeNumber.test(value) ||
        reRealNumber1.test(value) || reRealNumber2.test(value) ||
        reNeRealNumber1.test(value) || reNeRealNumber2.test(value)) {
        return true
      } else {
        return false
      }
    } else if (typeof(value) === 'number') {
      return true
    } else {
      return false
    }
  }
  /*
    rangeValueList [{range,value},{range,value}]
  */
  SetRangeValue(rangeValueList) {
    for (var n = 0; n < rangeValueList.length; n++) {
      var onecell = rangeValueList[n];
      // console.log(onecell.range + '   set valie:' + onecell.value + '   D3:' + this.GetCellValue('D3'));
      this.SetCellValue(onecell.range, onecell.value);
    }
  }
  SetCellValue(ref, value) {
    if (value == null) return;
    var cell = this.GetCellByRef(ref);
    if (cell == null && value.length == 0) return;
    if (cell == null) {
      cell = new Cell();
      cell.r = ref;
      if (this.isNumber(value.toString()))
        cell.cellType = 'n';
      else
        cell.cellType = 'str';
    }
    if (cell.cellType == 's') {
      var rst = new Rst();
      rst.t = value;
      cell.v = this.sharedStrings.AddSi(rst);
    } else if (cell.cellType == 'n') {
      cell.v = value.toString().replace(',', '');
    } else if (cell.cellType == 'str') {
      cell.v = value;
    }
    this.sheetData.AddCell(cell);
  }
  SetCellFill(ref, fill) {
    var cell = this.GetCellByRef(ref);
    var style = this.GetCellStyleByCell(cell);
    var range = new Range(ref);
    range.style = style;
    range.style.fill = fill;
    cell.s = this.addStylebyRange(range);
    this.sheetData.AddCell(cell);
  }
  SetCellFont(ref, font) {
    var cell = this.GetCellByRef(ref);
    var style = this.GetCellStyleByCell(cell);
    var range = new Range(ref);
    range.style = style;
    range.style.font = font;
    cell.s = this.addStylebyRange(range);
    this.sheetData.AddCell(cell);
  }
  SetCellBorder(ref, border) {
    var cell = this.GetCellByRef(ref);
    var style = this.GetCellStyleByCell(cell);
    var range = new Range(ref);
    range.style = style;
    range.style.border = border;
    cell.s = this.addStylebyRange(range);
    this.sheetData.AddCell(cell);
  }
  SetCellNumFmt(ref, numfmt) {
    var cell = this.GetCellByRef(ref);
    var style = this.GetCellStyleByCell(cell);
    var range = new Range(ref);
    range.style = style;
    range.style.numfmt = numfmt;
    cell.s = this.addStylebyRange(range);
    this.sheetData.AddCell(cell);
  }
  SetCellAlignment(ref, alignment) {
    var cell = this.GetCellByRef(ref);
    var style = this.GetCellStyleByCell(cell);
    var range = new Range(ref);
    range.style = style;
    range.style.alignment = alignment;
    cell.s = this.addStylebyRange(range);
    this.sheetData.AddCell(cell);
  }
  GetCellByRef(ref) {
    var cell = this.sheetData.GetCellByRef(ref);
    // if (cell == null) {
    //   cell = new Cell();
    //   cell.r = ref;
    //   cell.new = true;
    // }
    return cell;
  }
  GetCellStyleByCell(cell) {
    var style = new Style();
    if (cell != null) {
      var xf = this.fiss.fissM.styles.cellXfs.GetCellStyle(cell.s);

      if (xf == null) return style;

      if (xf.applyNumberFormat)
        style.numFmt = this.fiss.fissM.styles.numFmts.GetnumFmtByID(xf.numFmtId);
      if (xf.applyBorder)
        style.border = this.fiss.fissM.styles.borders.GetBorderByID(xf.borderId);
      if (xf.applyFont)
        style.font = this.fiss.fissM.styles.fonts.GetFontByID(xf.fontId);
      if (xf.applyAlignment) style.alignment = xf.alignment;
      if (xf.applyFill)
        style.fill = this.fiss.fissM.styles.fills.GetFill(xf.fillId);
    }
    return style;
  }
  GetFontString(font) {
    var setFontString = "";
    if (font != null) {
      // font-family  规定字体系列。
      if (font.name != null && font.name != "") {

        setFontString = font.name;
      } else {

        setFontString = this.fiss.fissV.defaultFontFamily;
      }
      // font-size / line-height 规定字号和行高，以像素计。
      if (font.sz != null && font.sz != 0) {
        setFontString =
          this.fiss.fissV.ConvertPxPtRem("pt", font.sz, "px") +
          "px" +
          " " +
          setFontString;

      } else {
        setFontString = this.fiss.fissV.defaultFontSz + " " + setFontString;

      }
      //三、 font-weight 规定字体的粗细
      if (font.b != null && font.b) {

        setFontString = "bold " + setFontString;
      } else {

      }
      //一、 font style 规定字体样式
      if (font.i != null && font.i) {

        setFontString = "italic " + setFontString;
      } else {
        // this.cellFontC.fontstyle = "normal";
        // setFontString = "normal " + setFontString;
      }
    } else {
      setFontString = this.fiss.fissV.defaultFont;
    }
    return setFontString;
  }
  SetCellRange(range) {
    var cell = new Cell();
    if (range.value != "") {
      var rst = new Rst();
      rst.v = range.value;
      cell.v = this.sharedStrings.AddSi(rst);
    }
    cell.r = range.ref;
    cell.cellType = range.cellType;
    cell.s = this.addStylebyRange(range);
    this.sheetData.AddCell(cell);
  }
  addStylebyRange(range) {
    var style = range.style;
    var xf = new Xf();
    if (style.alignment.horizontal != null && style.alignment.vertical != null)
      xf.alignment = style.alignment;
    if (style.numFmt.formatCode != "") {
      xf.numFmtId = this.styles.numFmts.AddNumFmt(style.numFmt);
      xf.SetNumFmtId(xf.numFmtId);
    }
    //if(style.font){
    //	xf.fontId =this.styles.fonts.AddFont(style.font);
    //	xf.SetfontId(xf.fontId);
    //}
    if (
      style.fill.patternFill.bgColor != null &&
      style.fill.patternFill.bgColor != ""
    ) {
      xf.fillId = this.styles.fills.AddFill(style.fill);
      xf.SetFillId(xf.fillId);
    }
    if (!style.border.BorderIsNull()) {
      xf.borderId = this.styles.borders.AddBorder(style.border);
      xf.SetBorderId(xf.borderId);
    }
    if (
      xf.numFmtId != null ||
      xf.fontId != null ||
      xf.fillId != null ||
      xf.borderId != null
    )
      return this.styles.cellXfs.AddXf(xf);
    else return null;
  }
}
