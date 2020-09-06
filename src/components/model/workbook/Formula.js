export default class Formula {
  constructor(fiss) {
    this.fiss = fiss;
    this.sheetname = '';
    this.sheetId = '';
    this.left = '';
    this.right = '';
    this.order = -1;
    this.caclFunctionChain = [];
  }
  Cacl(ActiveSheet, range, value) {
    //根据caclFunctionChain计算
    //console.log(this.left + '  ' + this.right);
    var tempeval = this.right.toString();
    var bnumber=false;
    let regex = /[+-/*//]/g;
    let myArray = tempeval.split(regex);
    if ( myArray.length > 1) {
       bnumber=true;
    }
    for (var n = 0; n < this.caclFunctionChain.length; n++) {
      var oneFromaulaFun = this.caclFunctionChain[n];
      //若只是一个数字，或文字''则直接返户
      // if(oneFromaulaFun.functionPram.toString().indexOf('\"')!=-1)
      //     continue;
      // else
      if (ActiveSheet.isNumber(oneFromaulaFun.functionPram))
        continue;
      else {
        var ret = oneFromaulaFun.Cacl(ActiveSheet, range, value,this.sheetname);
        if (oneFromaulaFun.functionName == 'Normal') {
          if( ret[0].cellType=='n'){
            if(ret[0].v.length==0)
              tempeval = tempeval.replace(oneFromaulaFun.functionPram, '0');
            else
              tempeval = tempeval.replace(oneFromaulaFun.functionPram, ret[0].v);
          }else
          tempeval = tempeval.replace(oneFromaulaFun.functionPram, ret[0].v);
        } else {
          tempeval = tempeval.replace(oneFromaulaFun.functionName + '(' + oneFromaulaFun.functionPram + ')', ret);
        }

      }
    }
    let retvalue = tempeval;
    if(myArray.length>retvalue.length)
       retvalue='';
    else if ( bnumber) {
      try {
          retvalue = eval(tempeval);
      }
      catch(e) {
        retvalue = tempeval;
      }
    }
    //console.log(this.left + '  ' + this.right+ '  ' +retvalue);
    var rangeValueList = [{
      range: this.left.replace(this.sheetname + '!', ''),
      value: retvalue
    }];
    this.fiss.fissM.workbook.SetRangeValue(this.sheetname, rangeValueList);
  }
}
