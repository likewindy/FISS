
export default class Normal  {
  constructor() {
     this.name='Normal'
     this.returnValueType='O';//对象，文本 \数值\图形，取决于原单元格
  }
  Normal(pram,sheetname,activeSheet){
    /* red 不支持多文件red
    第一步：多参数支持 ,
    第二步：确定sheet ！
    第三步：确定范围 :
    第四步：获取数据
    */
   //第一步 多参数的检核，即,的
   var retList=[];
   var multPram=pram.split(',');
   for (var n = 0; n < multPram.length; n++) {
      var onePram=multPram[n];
      //第二步，确定获取的sheet
      var exclamationIndex=onePram.indexOf('!')
      var getSheetName='';
      if(exclamationIndex!=-1)
        getSheetName= onePram.substr(0,exclamationIndex);
      else
        getSheetName=sheetname;
      onePram=onePram.replace(getSheetName+'!','')
      //第三步 确定单元格范围
      retList.push(activeSheet.fiss.fissM.workbook.GetRangeValue(getSheetName,onePram));
   }
   return retList;
  }
}
