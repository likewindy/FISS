

import BorderPr from './BorderPr.js';
import Color from './Color.js';

export default class DefaultBorder {
   constructor() {
     var borderPr=new BorderPr();
     borderPr.color=new Color();
     borderPr.color.rgb=viewcss.CellBoderColor;
     borderPr.borderStyle=BorderStyle.none;

      this.start =borderPr;
      this.end =borderPr;
      this.top =borderPr;
      this.bottom =borderPr;

      this.outline =true;
  }

}
