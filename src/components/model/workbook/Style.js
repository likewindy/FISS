   /*
  */

 import CellAlignment from '../style/CellAlignment';
 import NumFmt from '../style/NumFmt.js';
 import Font from '../style/Font.js';
 import Fill from '../style/Fill';
 import Border from '../style/Border';

 export default class Style {
   constructor() {
        //文字的安排
        this.alignment=new CellAlignment();
        //格式化
        this.numFmt=new NumFmt();
        //字体
        this.font =new Font();
        //填充
        this.fill =new Fill();
        //边框
        this.border =new Border();
   }
 }
