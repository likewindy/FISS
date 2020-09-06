export default class SUM {
  constructor() {
    this.name = 'SUM';
    this.returnValueType = 'N'; //数值
  }
  SUM(Pram, sheetname,ActiveSheet, range, value) {
    var retValue = 0;
    var getRowValueList = ActiveSheet.fiss.addin.Normal.Normal(Pram,sheetname,ActiveSheet);
    //第一个多参数
    for (var sheetsN = 0; sheetsN < getRowValueList.length; sheetsN++) {
      var sheetsList = getRowValueList[sheetsN];
      //判断是否数组
      if ( sheetsList   instanceof Array) {
        for (var row = 0; row < sheetsList.length; row++) {
          var colsList = sheetsList[row];
          for (var col = 0; col < colsList.length; col++) {
            var tempfloat = 0;
            try {
              //console.log(colsList[col].toString());console.log(colsList[col].toString());
              var cellvalue = colsList[col].v;
              if (cellvalue.length == 0)
                cellvalue = 0;
              tempfloat = parseFloat(cellvalue);
            } catch (e) {
              console.log(e + colsList[col].toString());
              tempfloat = 0;
            } finally {
              if (isNaN(tempfloat))
                tempfloat = 0;
            }
            retValue = retValue + tempfloat;
          }
        }
      }else //非数组就是返回的cell集合
      {
        var tempfloat = 0;
        try {
          var cellvalue = sheetsList.v;
          if (cellvalue.length == 0)
            cellvalue = 0;
          tempfloat = parseFloat(cellvalue);
        } catch (e) {
          console.log(e + sheetsList.toString());
          tempfloat = 0;
        } finally {
          if (isNaN(tempfloat))
            tempfloat = 0;
        }
        retValue = retValue + tempfloat
      }
    }

    return retValue;
  }
}
