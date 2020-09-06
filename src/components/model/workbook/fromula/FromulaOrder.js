export default class FromulaOrder {
  constructor(fiss) {
    this.fiss = fiss;
    this.formulaArray = [];
    this.maxOrder=0;
  }

  Order(FromulaArray) {
    this.formulaArray = FromulaArray;
    this.OrderFormulaArray();
    this.Orderormula();
    //console.log('顺序计算完成，看retormulaArray');
  }
  Orderormula(){
     this.formulaArray.sort(this.sort);
  }
  sort(a,b){
   return a.order-b.order;
  }
  /*
   对计算顺序重新排序
  */
  OrderFormulaArray() {
    let nowOrder = 0;
    for (let step = 0;; step++) {
      var formulaFindcount = 0;
      for (let n = 0; n < this.formulaArray.length; n++) {
        let formula = this.formulaArray[n];
        if (formula.order == -1) {
          this.FormulaSubChain(formula, step);
        } else
          formulaFindcount++;
      }
      if (formulaFindcount == this.formulaArray.length) break;
      if (step > 128 || formulaFindcount == this.formulaArray.length) {
        break;
        console.log('公式计算嵌套超过128层次！');
      }
    }
  }
  /*
     拆分一个公式的计算联，找最大的计算顺序号
  */
  FormulaSubChain(formula, step) {
    //包括有子公式的情况
    if (formula.caclFunctionChain.length > 0) {
      var MaxtempOrder = -1;
      for (let n = 0; n < formula.caclFunctionChain.length; n++) {
        var subFunChain = formula.caclFunctionChain[n];
        var tOrder = -1;
        if (subFunChain.bHaveSubFun) //有子计算链条
        {
          tOrder = this.SubSubChain(formula, subFunChain.SubFunChain);
        } else { //无子计算链条
          tOrder = this.subFunChainFindOrder(formula, subFunChain.functionPram);
        }
        if (tOrder == -1) {
          MaxtempOrder = -1;
          break;
        } else {
          if (tOrder > MaxtempOrder)
            MaxtempOrder = tOrder;
        }
      }
      formula.order = MaxtempOrder;
      if(formula.order>this.maxOrder)
        this.maxOrder=formula.order;
    } else { //不包括有子公式的情况
      formula.order = 0;

    }
  }
  /*
  子计算链嵌套计算
  */
  SubSubChain(formula, SubFunChainArray) {
    var maxtempOrder = -1;
    for (let n = 0; n < SubFunChainArray.length; n++) {
      var subFunChain = SubFunChainArray[n];
      var tOrder = -1;
      if (subFunChain.bHaveSubFun) //有子计算链条
      {
        tOrder = this.SubSubChain(formula, subFunChain.SubFunChain);
      } else { //无子计算链条
        tOrder = this.subFunChainFindOrder(formula, subFunChain.functionPram);
      }
      if (tOrder == -1) {
        return -1;
      } else {
        if (tOrder > maxtempOrder)
          maxtempOrder = tOrder;
      }
    }
    return maxtempOrder;
  }
  //明细参数，到全部计算公式里面去找，并返回其计算顺序
  /*
  functionPram ==1 [sheetname!]A1
                 2 [sheetname!]A1,[sheetname!]A2,[sheetname!]A3
                 3 [sheetname!]A1:[sheetname!]B3
  */
  subFunChainFindOrder(formula, functionPram) {
    var formulaRight = functionPram;
    var maxtempOrder = -1;
    if (formulaRight.indexOf(',') > 0) {
      var rangeList = formulaRight.split(',');
      for (var n = 0; n < rangeList.length; n++) {
        var torder = this.findInformulaArray(formula, rangeList[n]);
        if (torder == -1) return -1;
        else {
          if (torder > maxtempOrder)
            maxtempOrder = torder;
        }
      }
      return maxtempOrder;
    }
    if (formulaRight.indexOf(':') > 0) {
      var rangeList = formulaRight.split(':');
      var startRange = rangeList[0];
      var endRange = rangeList[1];
      var reg = /[A-Za-z]+/g;
      var startRow = parseInt(startRange.replace(reg, ''));
      var startCol = this.fiss.fissV.GetColByAlphabet(startRange.replace(startRow, ''));
      var endRow = parseInt(endRange.replace(reg, ''));
      var endCol = this.fiss.fissV.GetColByAlphabet(endRange.replace(endRow, ''));;
      for (var row = startRow; row <= endRow; row++) {
        for (var col = startCol - 1; col <= endCol - 1; col++) {
          var trange = this.fiss.fissV.GetColAlphabetByColNumber(col) + row;
          var torder = this.findInformulaArray(formula, trange);
          if (torder == -1) return -1;
          else {
            if (torder > maxtempOrder)
              maxtempOrder = torder;
          }
        }
      }
      return maxtempOrder;
    }
    return this.findInformulaArray(formula, functionPram);
  }

  findInformulaArray(formula, functionPram) {
    //公式的右边参数处理，先拆分，再在公式数组里面找，
    //是否存在，若都不存在计算顺序为0，若找到未确认的-1，则该公式也为-1
    //若都不是-1，则取最大的+1，为此公式的计算顺序。
    for (let n = 0; n < this.formulaArray.length; n++) {
      let findformula = this.formulaArray[n];
      if (findformula.id == formula.id) continue;
      if (this.IsFormulaInsideSingle(formula.sheetname, functionPram, findformula.left)) {
        if (findformula.order == -1) {
          return -1; //该计算公式还未确定计算顺序
        } else
          return (findformula.order + 1); //确定了计算顺序，返回此公式的计算顺序
      }
    }
    //如果在公式中没有包括此参数，说明此参数的计算顺序为0
    return 0;
  }
  IsFormulaInsideSingle(defaultsheetname, functionPram, formulaLeft) {
    var formulaRight = functionPram;
    if (formulaRight.indexOf('!') < 0)
      formulaRight = defaultsheetname + '!' + formulaRight
    if (formulaRight == formulaLeft)
      return true;
    return false;
  }
}
