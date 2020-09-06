const X2js = require("x2js"); //xml数据处理插件
const JSZip = require("jszip"); //压缩的插件

export default class ReadFromZip {
  constructor() {}
  readFile(blob, callbackFunction, readfile) {
    var retObject = {};
    var x2js = new X2js({
      stripWhitespaces: false,
      skipEmptyTextNodesForObj: false
    });
    var new_zip = new JSZip();
    try {
      new_zip.loadAsync(blob).then(function(zip) {
        // you now have every files contained in the loaded zip
        new_zip
          .file("xl/styles.xml")
          .async("string")
          .then(function(data) {
            retObject.xmlstyle = x2js.xml2js(data);
          });
        if (new_zip.file("xl/sharedStrings.xml") != null)
          new_zip
          .file("xl/sharedStrings.xml")
          .async("string")
          .then(function(data) {
            retObject.xmlshareString = x2js.xml2js(data);
          });
        new_zip
          .file("xl/theme/theme1.xml")
          .async("string")
          .then(function(data) {
            retObject.xmltheme = x2js.xml2js(data);
          });
        //获取所有的sheet
        new_zip
          .file("xl/workbook.xml")
          .async("string")
          .then(function(data) {
            var workbook = x2js.xml2js(data);
            retObject.workbook = workbook.workbook;
            var xmlSheetsArray = [];
            if (workbook.workbook.sheets.sheet instanceof Array) {
              let sheetsNumber = workbook.workbook.sheets.sheet.length;
              let n = 0;
              for (; n < sheetsNumber; n++) {
                // var readsheetname=workbook.workbook.sheets.sheet[n]._sheetId;

                let myFirstPromise = new Promise(function(resolve, reject) {
                  //当异步代码执行成功时，我们才会调用resolve(...), 当异步代码失败时就会调用reject(...)
                  var bn = n;
                  new_zip
                    .file("xl/worksheets/" + "sheet" + (n + 1) + ".xml")
                    .async("string")
                    .then(function(data) {
                      //  console.log("now bn is " + bn);
                      var xmlsheet1 = x2js.xml2js(data);
                      resolve({
                        no: bn,
                        xml: xmlsheet1
                      });
                    });
                });
                var bn = 0;
                myFirstPromise.then(function(xmlsheet) {
                  //console.log("now n is " + xmlsheet.no);
                  xmlSheetsArray.push(xmlsheet);
                  bn = bn + 1;
                  if (bn == sheetsNumber) {
                    retObject.xmlSheetsArray = readfile.OrderArray(
                      xmlSheetsArray
                    );
                    callbackFunction(retObject);
                  }
                });

                // var bn = 0;
                // new_zip
                //   .file("xl/worksheets/" + "sheet" + (n + 1) + ".xml")
                //   .async("string")
                //   .then(function(data) {
                //     var xmlsheet1 = x2js.xml2js(data);
                //     xmlSheetsArray.push(xmlsheet1);
                //     bn = bn + 1;
                //     console.log("now load xml :" + bn + "now n is " + n);
                //     if (bn == sheetsNumber) {
                //       retObject.xmlSheetsArray = xmlSheetsArray;
                //       callbackFunction(retObject);
                //     }
                //   });
              }
            } else {
              // var readsheetname = workbook.workbook.sheets.sheet._sheetId;
              new_zip
                .file("xl/worksheets/sheet1.xml")
                .async("string")
                .then(function(data) {
                  var xmlsheet1 = x2js.xml2js(data);
                  xmlSheetsArray.push(xmlsheet1);
                  retObject.xmlSheetsArray = xmlSheetsArray;
                  callbackFunction(retObject);
                });
            }
          });
      });
    } catch (e) {
      console.error("读取文件错误！--" + e);
    }
  }
  OrderArray(xmlarray) {
    xmlarray.sort(this.sortNumber);
    var retSheetsArray = [];
    for (var n = 0; n < xmlarray.length; n++) {
      retSheetsArray.push(xmlarray[n].xml);
    }
    return retSheetsArray;
  }
  sortNumber(a, b) {
    return a.no - b.no;
  }
}
