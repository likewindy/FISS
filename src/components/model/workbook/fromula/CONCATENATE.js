


export default class CONCATENATE  {
  constructor( ) {
    this.name='CONCATENATE';
    this.returnValueType='S';//文本
  }
  CONCATENATE(pram, sheetname,ActiveSheet, range){

    var retvalue='';
    var multPram=pram.split(',');
    for (var n = 0; n < multPram.length; n++) {
       var onePram=multPram[n];
       //第二步，确定获取的sheet
       var exclamationIndex=onePram.indexOf('"')
       if(exclamationIndex!=-1){
         retvalue=retvalue+onePram.replace(/"/g,'');
         continue;
       }else
       {
          var getRowValueList = ActiveSheet.fiss.addin.Normal.Normal(onePram,sheetname, ActiveSheet);
           for (var sheetsN = 0; sheetsN < getRowValueList.length; sheetsN++) {
                var sheetsList = getRowValueList[sheetsN];
                var cellvalue = sheetsList.v;
                if (cellvalue.length != 0)
                   retvalue=retvalue+cellvalue;
           }
       }
    }
   return retvalue;
  }
}
