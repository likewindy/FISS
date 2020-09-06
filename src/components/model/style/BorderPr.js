

import Color from './Color';

export default class BorderPr {
  constructor() {
    this.color=new Color();
    this.borderStyle=null;
  }

  ParseFromXml(xml){
    this.borderStyle=xml._style;
    this.color.ParseFromXml(xml.color);
  }
}


