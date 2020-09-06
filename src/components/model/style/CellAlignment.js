/*
        <xsd:complexType name="CT_CellAlignment">
            <xsd:attribute name="horizontal" type="ST_HorizontalAlignment" use="optional"/>
            <xsd:attribute name="vertical" type="ST_VerticalAlignment" use="optional"/>
            <xsd:attribute name="textRotation" type="xsd:unsignedInt" use="optional"/>
            <xsd:attribute name="wrapText" type="xsd:boolean" use="optional"/>
            <xsd:attribute name="indent" type="xsd:unsignedInt" use="optional"/>
            <xsd:attribute name="relativeIndent" type="xsd:int" use="optional"/>
            <xsd:attribute name="justifyLastLine" type="xsd:boolean" use="optional"/>
            <xsd:attribute name="shrinkToFit" type="xsd:boolean" use="optional"/>
            <xsd:attribute name="readingOrder" type="xsd:unsignedInt" use="optional"/>
        </xsd:complexType>
    */
export default class CellAlignment {

    constructor() {
      this.horizontal ='left';
      this.vertical ='bottom';
      this.textRotation ; //unsignedInt
      this.wrapText=false ; //boolean
      this.indent=0 ; //unsignedInt
      this.relativeIndent=0 ; //int
      this.justifyLastLine=0 ; //unsignedInt
      this.shrinkToFit =false; //boolean
      this.readingOrder=0 ; //unsignedInt
    }

    ParseFromXml(xml){
        if (xml==null) return ;
        if(xml._vertical!=null)
        this.vertical =xml._vertical;
        if(xml._horizontal!=null)
            this.horizontal =xml._horizontal;
          if(xml._textRotation!=null)
            this.textRotation =parseInt(xml._textRotation);
          if(xml._wrapText!=null)
            this.wrapText =true;
          if(xml._indent!=null)
            this.indent =parseInt(xml._indent);
          if(xml._relativeIndent!=null)
            this.relativeIndent =parseInt(xml._relativeIndent);
          if(xml._justifyLastLine!=null)
            this.justifyLastLine =parseInt(xml.justifyLastLine);
          if(xml._shrinkToFit!=null)
                this.shrinkToFit =true;
          if(xml._readingOrder!=null)
            this.readingOrder =parseInt(xml._readingOrder);
     }

     returnNew(){
      var t=new CellAlignment();
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

