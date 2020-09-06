    /*

  */

 import Style from './Style.js';

 export default class Range {
   constructor(ref) {

        //单元格的值
        this.value='';
        //单元格的公示
        this.formula='';
        this.ref=ref;
        //单元格的类型
        this.cellType=CellType.n;
        //格式化单元格
        this.style=new Style();


    }
  }
