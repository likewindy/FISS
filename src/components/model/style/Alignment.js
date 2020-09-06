
 /* <xsd:attribute name="horizontal" type="ST_HorizontalAlignment" use="optional"/>
        <xsd:attribute name="vertical" type="ST_VerticalAlignment" use="optional"/>
        <xsd:attribute name="textRotation" type="xsd:unsignedInt" use="optional"/>
        <xsd:attribute name="wrapText" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="indent" type="xsd:unsignedInt" use="optional"/>
        <xsd:attribute name="relativeIndent" type="xsd:int" use="optional"/>
        <xsd:attribute name="justifyLastLine" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="shrinkToFit" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="readingOrder" type="xsd:unsignedInt" use="optional"/>*/
 export default class Alignment {
  constructor() {
    //子元素
    this.horizontal='';
    this.vertical='';
    this.textRotation=0;
    this.wrapText=false;
    this.indent=0;
    this.relativeIndent='';
   /* <xsd:attribute name="" type="xsd:boolean" use="optional"/>*/
    this.justifyLastLine=false;
    /* <xsd:attribute name="shrinkToFit" type="xsd:boolean" use="optional"/>*/
      this.shrinkToFit=false;
    /*<xsd:attribute name="readingOrder" type="xsd:unsignedInt" use="optional"/>*/

    this.readingOrder=1;
  }

  returnNew(){
    var t=new Alignment();
     t.horizontal= this.horizontal;
     t.vertical= this.vertical;
     t.textRotation= this.textRotation;
     t.wrapText= this.wrapText;
     t.indent= this.indent;
     t.relativeIndent= this.relativeIndent;
     t.justifyLastLine=  this.justifyLastLine;
     t.shrinkToFit= this.shrinkToFit;
     t.readingOrder= this.readingOrder;
    return t;
   }


}
