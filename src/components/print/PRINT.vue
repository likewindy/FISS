<template>
    <div class="FISS-PDF-div" ref="PrintDiv"  >
      <div class="functionButton">
        <button v-on:click="firstPage">首页</button>
        <button v-on:click="upPage">上一页</button>
        <button v-on:click="nextPage">下一页</button>
        <button v-on:click="lastPage">最后页</button>
        <button v-on:click="print">打印</button>
        <button v-on:click="down">下载</button>
        <button v-on:click="close">关闭</button>
      </div>
      <canvas ref="OnePagePrintCanvas" width="793px" height="1122px"></canvas>
    </div>
</template>
<script>
import JsPDF from 'jspdf';
import PageSize from './PageSize.js';
import DrawCell from '../viewer/DrawCell.js';
import DrawMergeCell from '../viewer/DrawMergeCell.js';
import Cell from '../model/workbook/Cell.js';

export default {
  name: 'PRINT',
  doc: {},
  pageSize: new PageSize(),
  canvasW: 0,
  canvasH: 0,
  pageinfo: {},
  pageSetup: {},
  orientation: 'p',
  fiss: {},
  dimension: '',
  printArea: '',
  printTitlesRow: '',
  printTitlesCol: '',
  ppi: 0,
  ratio: 0,
  nowPage: 1,
  isDownPdf: false,
  ctx: {},
  leftMargins: {}, //x,y,width,height
  rightMargins: {}, //x,y,width,height
  topMargins: {}, //x,y,width,height
  bottomMargins: {}, //x,y,width,height
  headerSize: {}, //x,y,width,height
  footerSize: {}, //x,y,width,height
  contentSize: {}, //x,y,width,height
  pageMargins: {},
  AllPages: {},
  sheetname: '',

  data: function() {
    return {
    };
  },
  mounted: function() {
    this.doc = new JsPDF('p', 'mm', 'a4');
    this.pageinfo = {};
    this.printTitlesRow = '';
    this.printTitlesCol = '';
    this.printArea = '';
    this.nowPage = 1;
    this.drawCell = new DrawCell(this);
    this.drawMergeCell = new DrawMergeCell(this);
    this.ActiveSheet = {};
    this.defaultFontSz = (12 * 96) / 72 + 'px';
    this.AllPages = [];
    this.pageSetup = {};
    this.isDownPdf = false;
  },
  methods: {
    firstPage() {
      if (this.AllPages.length > 0) {
        this.nowPage = 1;
        this.printOneExcleContent(1);
      }
    },
    upPage() {
      if (this.AllPages.length > 0 && this.nowPage > 1) {
        this.nowPage = this.nowPage - 1;
        this.printOneExcleContent(this.nowPage);
      }
    },
    nextPage() {
      if (this.AllPages.length > 0 && this.nowPage < this.AllPages.length) {
        this.nowPage = this.nowPage + 1;
        this.printOneExcleContent(this.nowPage);
      }
    },
    lastPage() {
      if (this.AllPages.length > 0) {
        this.nowPage = this.AllPages.length;
        this.printOneExcleContent(this.nowPage);
      }
    },
    close(){
       this.$refs.PrintDiv.style.visibility = 'hidden';
    },
    print() {
      this.isDownPdf = true;
      this.printALLExcleContent();
      this.isDownPdf = false;
      var downloadData = new Blob([this.doc.output('blob')], { type: 'application/pdf' });
      var objectURL = window.URL.createObjectURL(downloadData);
      var printw = window.open(objectURL);
      printw.print();
    },
    down() {
      this.isDownPdf = true;
      this.printALLExcleContent();
      this.isDownPdf = false;
      this.doc.setPage(1);
      this.doc.save(this.ActiveSheet.name);
    },
    prePrint(fiss) {
      this.$refs.PrintDiv.style.visibility = 'visible';

      this.fiss = fiss;
      this.pageSize = new PageSize();
      //1---获取打印设置相关信息,并设置//2---创建一个画布
      this.setPrintPage();
      //3---根据表格大小分页
      //3.1---单页眉的页眉，内容，页脚
      //3.2---单页眉的内容
      //3.3---单页眉的页脚
      //3.4---存储pdf页面，创建一个新页面
      this.firstPage();
      //4--- 文件信息处理
      this.doc.setProperties({
        title: 'filename',
        subject: 'FISS+filename',
        author: '火柴盒/matchbox',
        keywords: 'financial statement spread sheets create by 火柴盒/matchbox',
        creator: 'FISS'
      });
    },
    printOneExcleContent(onePage) {
      this.nowPage = onePage;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
      //  this.contentSize = { x,y,width,height}
      var pageRowColInfo = this.getPrintPageRowColInfo(onePage);
      if (pageRowColInfo == null) {
        console.log('没有找到打印页！');
        return pageRowColInfo;
      }
      //printTopfooter  this.headerSize
      this.printHeader(onePage);
      //printTitlesRow
      //printTitlesCol
      var allRowHeight = this.contentSize.y;
      //行-1先打印标题行
      //行-2正常的行
      for (var row = pageRowColInfo.startRow; row <= pageRowColInfo.endRow; row++) {
        var RowHeight = parseInt(this.fiss.fissV.GetRowHeight(row));
        //this.DrowRow(row, allRowHeight, RowHeight);
        var allColWidth = 0;
        //列-1 标题列
        for (var col = pageRowColInfo.startCol; col <= pageRowColInfo.endCol; col++) {
          //列2  正常列
          var ColWidth = this.fiss.fissV.GetColWidth(col);
          let showcol = {
            col: col,
            x: this.contentSize.x + allColWidth,
            y: this.contentSize.y,
            height: RowHeight,
            width: ColWidth
          };
          allColWidth = allColWidth + ColWidth;
          this.drawCell.DrawDataCell(showcol.x, allRowHeight, RowHeight, showcol.width, row, showcol.col);
        }
        allRowHeight = allRowHeight + RowHeight;
      }
      //printFootfooter //footerSize
      this.printFooter(onePage);
      if (this.isDownPdf) {
        var data = this.$refs.OnePagePrintCanvas.toDataURL('image/jpeg', 1);
        if (this.orientation == 'l') {
          this.doc.addImage(data, 'JPEG', 0, 0, this.pageinfo.Height, this.pageinfo.Width);
        } else {
          this.doc.addImage(data, 'JPEG', 0, 0, this.pageinfo.Width, this.pageinfo.Height);
        }
      }
      return pageRowColInfo;
    },
    printALLExcleContent() {
      var nowPage = 1;
      this.doc = new JsPDF(this.orientation, 'mm', this.pageinfo.pdfname);
      for (;;) {
        var pageRowColInfo = this.printOneExcleContent(nowPage);

        if (pageRowColInfo == null || pageRowColInfo.lastPage) break;
        else {
          this.doc.addPage();
          nowPage = nowPage + 1;
        }
      }
    },
    printHeader(nowPage) {
      //this.headerSize
      //1 clean
      //2 draw
      //this.clearPrintArea(this.headerSize, 'red');
    },
    printFooter(nowPage) {
      //1 clean
      //2 draw
      // this.clearPrintArea(this.footerSize, 'blue');
    },
    caclAllPages() {
      this.AllPages = [];
      //固定行的标题的高度
      var titleRowHeight = 0.0;
      var TitlesRowInfo = {
        starttitle: 0,
        endttitle: 0
      };
      if (this.printTitlesRow != null && this.printTitlesRow != '') {
        var titlesList = this.printTitlesRow.split(':');
        var starttitle = parseInt(titlesList[0]);
        var endttitle = parseInt(titlesList[1]);
        TitlesRowInfo.starttitle = starttitle;
        TitlesRowInfo.endttitle = endttitle;
        for (var r = starttitle; r < endttitle; r++) {
          var subRowHeight = parseInt(this.GetRowHeight(r));
          titleRowHeight = titleRowHeight + subRowHeight;
        }
      }
      //固定列的标题的宽度
      var titleColWidth = 0.0;
      var TitlesCoInfo = { starttitle: 0, endttitle: 0 };
      if (this.printTitlesCol != null && this.printTitlesCol != '') {
        var titlesList = this.printTitlesCol.split(':');
        var starttitle = parseInt(this.fiss.fissV.GetColByAlphabet(titlesList[0]));
        var endttitle = parseInt(this.fiss.fissV.GetColByAlphabet(titlesList[1]));
        TitlesCoInfo.starttitle = starttitle;
        TitlesCoInfo.endttitle = endttitle;
        for (var c = starttitle; c < endttitle; c++) {
          var subColWidth = parseInt(this.fiss.fissV.GetColWidth(r));
          titleColWidth = titleColWidth + subColWidth;
        }
      }

      var startRow = 1;
      var endRow = 1;
      var nowCol = 1;
      var startCol = 1;
      var endCol = 1;
      //console.log(this.printArea);
      var rangeList = this.printArea.split(':');
      var startRange = rangeList[0];
      var endRange = rangeList[1];
      var reg = /[A-Za-z]+/g;
      startRow = parseInt(startRange.replace(reg, ''));
      startCol = this.fiss.fissV.GetColByAlphabet(startRange.replace(startRow, ''));
      endRow = parseInt(endRange.replace(reg, ''));
      endCol = this.fiss.fissV.GetColByAlphabet(endRange.replace(endRow, ''));
      ////x,y,width,height
      var leftOnePageWidth = this.contentSize.width - titleColWidth;
      var leftOnePageHeight = this.contentSize.height - titleRowHeight;
      if (leftOnePageWidth <= 0 || leftOnePageHeight <= 0) {
        console.log('包括固定的标题行或列后，已无打印区域！');
        return;
      }
      var onePageNowH = 0;
      var rowpage = [];
      var rpage = { startRow: 1, endRow: endRow };
      rowpage.push(rpage);
      for (var nowRow = startRow; nowRow < endRow; nowRow++) {
        var subRowHeight = parseInt(this.GetRowHeight(nowRow));
        onePageNowH = onePageNowH + subRowHeight;
        if (onePageNowH > leftOnePageHeight) {
          nowRow = nowRow - 1;
          if (rowpage.length > 0) {
            rowpage[rowpage.length - 1].endRow = nowRow;
          }
          var rpage = { startRow: nowRow + 1, endRow: endRow };
          rowpage.push(rpage);
          onePageNowH = 0;
        }
      }
      var onePageNowW = 0;
      var colpage = [];
      var cpage = { startCol: startCol, endCol: endCol };
      colpage.push(cpage);
      for (var nowCol = startCol; nowCol < endCol; nowCol++) {
        var subWidth = parseInt(this.GetColWidth(nowCol));
        onePageNowW = onePageNowW + subWidth;
        if (onePageNowW > leftOnePageHeight) {
          nowCol = nowCol - 1;
          if (colpage.length > 0) {
            colpage[rowpage.length - 1].endCol = nowCol;
          }
          var cpage = { startCol: nowCol + 1, endCol: endCol };
          colpage.push(cpage);
          onePageNowW = 0;
        }
      }
      var page = 1;
      if ((this.pageSetup.pageOrder = 'downThenOver')) {
        for (var nowCol = 0; nowCol < colpage.length; nowCol++) {
          var cpage = colpage[nowCol];
          for (var nowRow = 0; nowRow < rowpage.length; nowRow++) {
            var rpage = rowpage[nowRow];
            var onepage = {
              page: page,
              startRow: rpage.startRow,
              endRow: rpage.endRow,
              startCol: cpage.startCol,
              endCol: cpage.endCol,
              lastPage: false,
              TitlesRowInfo: TitlesRowInfo,
              TitlesCoInfo: TitlesCoInfo
            };
            this.AllPages.push(onepage);
            page++;
          }
        }
      } else {
        for (var nowRow = 0; nowRow < rowpage.length; nowRow++) {
          var rpage = rowpage[nowRow];
          for (var nowCol = 0; nowCol < colpage.length; nowCol++) {
            var cpage = colpage[nowCol];
            var onepage = {
              page: page,
              startRow: rpage.startRow,
              endRow: rpage.endRow,
              startCol: cpage.startCol,
              endCol: cpage.endCol,
              lastPage: false,
              TitlesRowInfo: TitlesRowInfo,
              TitlesCoInfo: TitlesCoInfo
            };
            this.AllPages.push(onepage);
            page++;
          }
        }
      }
      //设置最后一页
      if (this.AllPages.length > 0) {
        var onepage = this.AllPages[this.AllPages.length - 1];
        onepage.lastPage = true;
      }
    },
    getPrintPageRowColInfo(page) {
      if (page - 1 > this.AllPages.length) return null;
      return this.AllPages[page - 1];
    },
    setPrintPage() {
      this.ActiveSheet = this.fiss.fissV.ActiveSheet;
      this.dimension = this.ActiveSheet.dimension;
      this.sheetname = this.ActiveSheet.name;
      var pageSetup = this.ActiveSheet.pageSetup;
      this.pageSetup = pageSetup;
      this.pageMargins = this.ActiveSheet.pageMargins;
      if (pageSetup.orientation == 'landscape') this.orientation = 'l';
      this.pageinfo = this.pageSize.getPageSize(pageSetup.paperSize);
      this.doc = new JsPDF(this.orientation, 'mm', this.pageinfo.pdfname);
      this.setPrintCanvas(this.orientation, this.pageinfo);
      this.setPageMargins();
      this.setPrintRange();
      this.caclAllPages();
    },
    setPrintRange() {
      this.printArea = '';
      //确定打印区域和范围
      //1-1 根据Print_Area确定打印区域，Print_Titles为标题区域
      var sheetnames = this.fiss.fissM.workbook.getDefinedName(parseInt(this.fiss.fissV.ActiveSheet.sheetId) - 1);
      var rowl = sheetnames.length;
      for (var rrr = 0; rrr < rowl; rrr++) {
        var onename = sheetnames[rrr];
        if (onename.name.indexOf('Print_Area') > 0) this.printArea = onename.refersTo.replace(/\$/g, '').replace("'" + this.sheetname + "'!", '');
        else if (onename.name.indexOf('Print_Titles') > 0) {
          var refersTo = onename.refersTo.toString();
          if (refersTo.indexOf(',') > 0) {
            var tepmarray = refersTo.split(',');
            this.printTitlesRow = tepmarray[1].toString().replace(/\$/g, '');
            this.printTitlesRow = this.printTitlesRow.replace("'" + this.sheetname + "'!", '');
            this.printTitlesCol = tepmarray[0].toString().replace(/\$/g, '');
            this.printTitlesCol = this.printTitlesCol.replace("'" + this.sheetname + "'!", '');
          } else {
            this.printTitlesRow = onename.refersTo
              .toString()
              .replace(/\$/g, '')
              .replace("'" + this.sheetname + "'!", '');
          }
        }
      }
      //  2 如果没有打印区域，则根据dimension 确定打印区域
      if (this.printArea == '') {
        this.printArea = this.dimension;
      }
      if (this.printArea.indexOf(':') < 0) this.printArea = 'A1:' + this.printArea;
      //检查打印标题行是否在打印区域内，若在打印区域内，则修改打印区域
      if (this.printTitlesRow != '') {
        var printAreaArray = this.printArea.split(':');
        var start = printAreaArray[0];
        var reg = /[A-Za-z]+/g;
        var startRow = parseInt(start.replace(reg, ''));
        var startCol = start.replace(startRow, '');
        var titleRowEnd = parseInt(this.printTitlesRow.split(':')[1]);
        if (titleRowEnd > startRow) {
          this.printArea = startCol + (titleRowEnd + 1) + ':' + printAreaArray[1];
        }
      }
      //检查打印标题列是否在打印区域内，若在打印区域内，则修改打印区域
      if (this.printTitlesCol != '') {
        var printAreaArray = this.printArea.split(':');
        var start = printAreaArray[0];
        var reg = /[A-Za-z]+/g;
        var startRow = parseInt(start.replace(reg, ''));
        var startCol = start.replace(startRow, '');
        var titleRowCol = this.printTitlesCol.split(':')[1];
        if (titleRowCol.toString() > startCol.toString()) {
          var col = this.fiss.fissV.GetColByAlphabet(titleRowCol);
          var nextcol = this.fiss.fissV.GetColAlphabetByColNumber(col);
          this.printArea = nextcol + startRow + ':' + printAreaArray[1];
        }
      }
    },
    clearPrintArea(info, color) {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(info.x, info.y, info.width, info.height);
    },
    setPageMargins() {
      //set leftMargins size inofo
      this.leftMargins = {
        x: 0,
        y: 0,
        width: parseInt(this.pageMargins.left * this.ppi),
        height: this.canvasH
      };
      //this.clearPrintArea(this.leftMargins,'red');
      //set topMargins size inofo
      this.topMargins = {
        x: 0,
        y: 0,
        width: this.canvasW,
        height: parseInt(this.pageMargins.top * this.ppi)
      };

      //this.clearPrintArea(this.topMargins,'green');
      //set rightMargins size inofo
      this.rightMargins = {
        x: this.canvasW - parseInt(this.pageMargins.right * this.ppi),
        y: 0,
        width: parseInt(this.pageMargins.right * this.ppi),
        height: this.canvasH
      };

      //this.clearPrintArea(this.rightMargins,'red');
      //set bottomMargins  size inofo
      this.bottomMargins = {
        x: 0,
        y: this.canvasH - parseInt(this.pageMargins.bottom * this.ppi),
        width: this.canvasW,
        height: parseInt(this.pageMargins.bottom * this.ppi)
      };

      // this.clearPrintArea(this.bottomMargins,'green');
      // //set header size inofo
      this.headerSize = {
        x: parseInt(this.pageMargins.left * this.ppi),
        y: parseInt(this.pageMargins.header * this.ppi) + 1,
        width: this.canvasW - parseInt((this.pageMargins.left + this.pageMargins.right) * this.ppi),
        height: parseInt((this.pageMargins.top - this.pageMargins.header) * this.ppi)
      };

      // this.clearPrintArea(this.headerSize,'orange');
      //set footer size inofo
      this.footerSize = {
        x: parseInt(this.pageMargins.left * this.ppi),
        y: this.canvasH - parseInt(this.pageMargins.bottom * this.ppi),
        width: this.canvasW - parseInt((this.pageMargins.left + this.pageMargins.right) * this.ppi),
        height: parseInt((this.pageMargins.bottom - this.pageMargins.footer) * this.ppi)
      };

      // this.clearPrintArea(this.footerSize,'orange');
      //set print content size inofo
      this.contentSize = {
        x: parseInt(this.pageMargins.left * this.ppi),
        y: parseInt(this.pageMargins.top * this.ppi),
        width: this.canvasW - parseInt((this.pageMargins.left + this.pageMargins.right) * this.ppi),
        height: this.canvasH - parseInt((this.pageMargins.bottom + this.pageMargins.top) * this.ppi)
      };
      // this.clearPrintArea(this.contentSize,'yellow');
    },
    setPrintCanvas(orientation, pageinfo) {
      var Height = pageinfo.Height;
      var Width = pageinfo.Width;
      var unit = pageinfo.unit;
      var ppi = this.fiss.ppi;
      this.ppi = ppi;
      var ratio = this.fiss.ratio;
      this.ratio = ratio;
      if (unit == 'in') {
        Height = Height * 25.4;
        Width = Width * 25.4;
      }
      if (this.orientation == 'l') {
        this.canvasW = parseInt((Height / 10 / 2.54) * ppi);
        this.canvasH = parseInt((Width / 10 / 2.54) * ppi);
        this.$refs.OnePagePrintCanvas.width = parseInt((Height / 10 / 2.54) * ppi) * this.ratio;
        this.$refs.OnePagePrintCanvas.height = parseInt((Width / 10 / 2.54) * ppi) * this.ratio;
        this.$refs.OnePagePrintCanvas.style.width = parseInt((Height / 10 / 2.54) * ppi) + 'px';
        this.$refs.OnePagePrintCanvas.style.height = parseInt((Width / 10 / 2.54) * ppi) + 'px';
      } else {
        this.canvasW = parseInt((Width / 10 / 2.54) * ppi);
        this.canvasH = parseInt((Height / 10 / 2.54) * ppi);
        this.$refs.OnePagePrintCanvas.width = parseInt((Width / 10 / 2.54) * ppi) * this.ratio;
        this.$refs.OnePagePrintCanvas.height = parseInt((Height / 10 / 2.54) * ppi) * this.ratio;
        this.$refs.OnePagePrintCanvas.style.width = parseInt((Width / 10 / 2.54) * ppi) + 'px';
        this.$refs.OnePagePrintCanvas.style.height = parseInt((Height / 10 / 2.54) * ppi) + 'px';
      }

      this.ctx = this.$refs.OnePagePrintCanvas.getContext('2d');
      this.ctx.scale(this.ratio, this.ratio);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, 0, this.canvasW, this.canvasH);
      this.ctx.textAlign = this.fiss.ctx.textAlign;
      this.ctx.textBaseline = this.fiss.ctx.textBaseline;
      this.ctx.fillStyle = this.fiss.ctx.fillStyle;
      this.ctx.font = this.fiss.ctx.font;
    },
    GetColAlphabetByColNumber(number) {
      var colName = '';
      if (number >= 26) {
        colName = this.GetColAlphabetByColNumber(number / 26 - 1);
        colName += String.fromCharCode(65 + (number % 26));
      } else {
        colName += String.fromCharCode(65 + number);
      }
      return colName;
    },
    bmergerCell(row, col) {
      var ycol = this.GetColAlphabetByColNumber(col - 1);
      for (var n = 0; n < this.ActiveSheet.mergeCells.length; n++) {
        var mergeCell = this.ActiveSheet.mergeCells[n].ref;
        var fromtoarray = mergeCell.toString().split(':');
        if (fromtoarray.length == 2) {
          var frominfo = fromtoarray[0];
          var toinfo = fromtoarray[1];

          var fromrow = parseInt(frominfo.toString().replace(/[^0-9]+/gi, ''));
          var fromcol = frominfo.toString().replace(fromrow, '');

          var torow = parseInt(toinfo.toString().replace(/[^0-9]+/gi, ''));
          var tocol = toinfo.toString().replace(torow, '');

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
    },
    ConvertPxPtRem(unitsFrom, fromValue, unitsTo) {
      var px = 0;
      var tdefaultFontSz = this.defaultFontSz.replace('px', ''); //default font-size 16px
      switch (unitsFrom) {
        case 'px':
          px = fromValue;
          break;
        case 'pt':
          px = (fromValue * 96) / 72;
          break;
        case 'percent':
          px = (fromValue * tdefaultFontSz) / 100;
          break;
        case 'rem':
          px = fromValue * tdefaultFontSz;
          break;
      }
      switch (unitsTo) {
        case 'px':
          return this.sanitize(px);
          break;
        case 'pt':
          return this.sanitize((px * 72) / 96);
          break;
        case 'percent':
          return this.sanitize((px * 100) / tdefaultFontSz);
          break;
        case 'rem':
          return this.sanitize(px / tdefaultFontSz);
          break;
      }
    },
    sanitize(value) {
      let valueStr = value + '';
      valueStr = valueStr.replace(/-/g, '');
      if (valueStr.substr(-1) === '.') {
        valueStr += '0';
      }
      valueStr = parseFloat(Math.abs(valueStr).toFixed(3));
      if (valueStr === 'NaN') {
        valueStr = 1;
      }
      return Math.ceil(valueStr);
    },
    GetRowHeight(row) {
      //默认行高以磅为单位大小。
      var grow = this.ActiveSheet.sheetData.GetRow(row);
      if (grow == null || grow.ht == null || grow.ht == '') {
        return parseInt(this.CacalPxByBound(this.ActiveSheet.sheetFormatPr.defaultRowHeight));
      } else {
        return parseInt(this.CacalPxByBound(grow.ht));
      }
    },
    CacalPxByBound(bound) {
      return Math.ceil((bound / 72) * this.fiss.ppi);
    },
    CaclPxbyWidth(width) {
      var px = parseInt(width * 8);
      return px;
    },
    GetColWidth(col) {
      if (col == 0) return this.CaclPxbyWidth(5);
      var tcol = this.ActiveSheet.GetCol(col);
      if (tcol == null || tcol.width == null || tcol.width == 0.0) {
        return this.CaclPxbyWidth(this.ActiveSheet.sheetFormatPr.defaultColWidth);
      } else {
        return parseInt(this.CaclPxbyWidth(tcol.width));
      }
    },
    printpdf(imgData) {
      // var imgData =
      // {
      //  orientation: 'p', One of "portrait" or "landscape" (or shortcuts "p" (Default), "l")  p-纵向打印格式的 l-横向打印格式;
      //  unit: 'mm',   Measurement unit to be used when coordinates are specified. One of "pt" (points), "mm" (Default), "cm", "in"
      //  format: 'a4', One of 'pageFormats' as shown below, default: a4
      //  hotfixes: [] // an array of hotfix strings to enable
      // }
      var doc = new JsPDF('p', 'mm', 'a4'); ////A4纸，纵向

      // x,y,imgWidth,imgHeight
      doc.addImage(imgData, 'JPEG', 0, 0, this.ageinfo.Height, this.ageinfo.Width);
      //  doc.addPage();
      // doc.setFontSize(20);
      // doc.text(50, 20, ' create by matchbox');
      // doc.text(50, 50, ' no print file find');
      // doc.save('aaa.pdf');
      // Output as Data URI
      //doc.output('datauri');

      // Optional - set properties on the document
      doc.setProperties({
        title: 'filename',
        subject: 'FISS+filename',
        author: '火柴盒/matchbox',
        keywords: 'financial statement spread sheets create by 火柴盒/matchbox',
        creator: 'FISS'
      });
      // this.pdfSrc = doc.output('datauristring');
      //doc.setPage(1);
      //addFont(Postscript, Name, Font)

      // Because of security restrictions, getImageFromUrl will
      // not load images from other domains.  Chrome has added
      // security restrictions that prevent it from loading images
      // when running local files.  Run with: chromium --allow-file-access-from-files --allow-file-access
      // to temporarily get around this issue.
      // var getImageFromUrl = function(url, callback) {
      // 	var img = new Image, data, ret={data: null, pending: true};

      // 	img.onError = function() {
      // 		throw new Error('Cannot load image: "'+url+'"');
      // 	}
      // 	img.onload = function() {
      // 		var canvas = document.createElement('canvas');
      // 		document.body.appendChild(canvas);
      // 		canvas.width = img.width;
      // 		canvas.height = img.height;

      // 		var ctx = canvas.getContext('2d');
      // 		ctx.drawImage(img, 0, 0);
      // 		// Grab the image as a jpeg encoded in base64, but only the data
      // 		data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
      // 		// Convert the data to binary form
      // 		data = atob(data)
      // 		document.body.removeChild(canvas);

      // 		ret['data'] = data;
      // 		ret['pending'] = false;
      // 		if (typeof callback === 'function') {
      // 			callback(data);
      // 		}
      // 	}
      // 	img.src = url;

      // 	return ret;
      // }

      // // Since images are loaded asyncronously, we must wait to create
      // // the pdf until we actually have the image data.
      // // If we already had the jpeg image binary data loaded into
      // // a string, we create the pdf without delay.
      // var createPDF = function(imgData) {
      // 	var doc = new jsPDF();

      // 	doc.addImage(imgData, 'JPEG', 10, 10, 50, 50);
      // 	doc.addImage(imgData, 'JPEG', 70, 10, 100, 120);

      // 	// Output as Data URI
      // 	doc.output('datauri');
      // }
    }
  }
};
</script>
<style scoped>
.FISS-PDF-div {
  background-color: gray;
  position: absolute;
  left: 0%;
  top:0%;
  width: 100%;
  visibility: hidden;
  text-align: center;
}

</style>
