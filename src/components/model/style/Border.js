
/*
  <xsd:sequence>
        <xsd:element name="start" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="end" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="top" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="bottom" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="diagonal" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="vertical" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="horizontal" type="CT_BorderPr" minOccurs="0" maxOccurs="1"/>
  </xsd:sequence>
  <xsd:attribute name="diagonalUp" type="xsd:boolean" use="optional"/>
  <xsd:attribute name="diagonalDown" type="xsd:boolean" use="optional"/>
  <xsd:attribute name="outline" type="xsd:boolean" use="optional" default="true"/*/
  import BorderPr from './BorderPr.js';

export default class Border {
  constructor() {
    this.start =new  BorderPr();
  this.end =new  BorderPr();
  this.top =new  BorderPr();
  this.bottom =new  BorderPr();
  this.diagonal =new  BorderPr();
  this.vertical =new  BorderPr();
  this.horizontal =new  BorderPr();

  this.diagonalUp=new  BorderPr();
  this.diagonalDown=new  BorderPr();
  this.outline =true;
  }


  ParseFromXml(xml){
        if(xml.start!=null&&xml.start!="")
            this.start.ParseFromXml(xml.start);
        else if (xml.left!=null&&xml.left!="")
           this.start.ParseFromXml(xml.left);
        else
           this.start=null;

       if(xml.end!=null&&xml.end!="")
            this.end.ParseFromXml(xml.end);
       else if (xml.right!=null&&xml.right!="")
            this.end.ParseFromXml(xml.right);
       else
            this.end=null;
       if(xml.top!=null&&xml.top!="")
            this.top.ParseFromXml(xml.top);
        else
            this.top=null;
       if(xml.bottom!=null&&xml.bottom!="")
            this.bottom.ParseFromXml(xml.bottom);
        else
            this.bottom=null;
       if(xml.diagonal!=null&&xml.diagonal!="")
            this.diagonal.ParseFromXml(xml.diagonal);
        else
            this.diagonal=null;
       if(xml.vertical!=null&&xml.vertical!="")
            this.vertical.ParseFromXml(xml.vertical);
        else
            this.vertical=null;
       if(xml.horizontal!=null&&xml.horizontal!="")
            this.horizontal.ParseFromXml(xml.horizontal);
        else
            this.horizontal=null;
       if(xml.diagonalUp!=null&&xml.diagonalUp!="")
            this.diagonalUp.ParseFromXml(xml.diagonalUp);
        else
            this.diagonalUp=null;
       if(xml.diagonalDown!=null&&xml.diagonalDown!="")
            this.diagonalDown.ParseFromXml(xml.diagonalDown);
       else
            this.diagonalDown=null;
       if(xml.outline!=null&&xml.outline!=""!="")
            this.outline.ParseFromXml(xml.outline);
        else
            this.outline=null;
  }

  SetAllBorder(borderpr){
    this.start =borderpr;
    this.end =borderpr;
    this.top =borderpr;
    this.bottom =borderpr;
    this.diagonal =borderpr;
    this.vertical =borderpr;
    this.horizontal =borderpr;

  }
  BorderIsNull () {
        if (this.start != null || this.end != null || this.top != null || this.bottom != null || this.diagonal != null ||
            this.vertical != null || this.horizontal != null ||  this.diagonalUp != null ||this.diagonalDown != null)  {
                return false;
         }else {
            return true
         }

  }

}
