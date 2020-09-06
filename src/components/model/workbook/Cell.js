/*
     location (reference), value, data type, formatting, and formula
  */
import CellType from "./CellType.js";

export default class Cell {
  constructor() {
    /*
        <xsd:sequence>
         <xsd:element name="f" type="CT_CellFormula" minOccurs="0" maxOccurs="1"/> 后续实现
         <xsd:element name="v" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
         <xsd:element name="is" type="CT_Rst" minOccurs="0" maxOccurs="1"/>后续实现
         <xsd:element name="extLst" minOccurs="0" type="CT_ExtensionList"/>后续实现
        </xsd:sequence>*/
    //子元素
    this.v = -1;
    this.f = "";
    this.is = "";
    this.cellType=new CellType();

    /*<xsd:attribute name="r" type="ST_CellRef" use="optional"/>*/
    this.r = "";

    /*<xsd:attribute name="s" type="xsd:unsignedInt" use="optional" default="0"/>*/
    //Style Index
    this.s = 0;

    /*<xsd:attribute name="t" type="ST_CellType" use="optional" default="n"/>*/
    //Cell Data Type
    this.cellType = this.cellType.n;

    /*<xsd:attribute name="cm" type="xsd:unsignedInt" use="optional" default="0"/>*/
    this.cm = 0;

    /*<xsd:attribute name="vm" type="xsd:unsignedInt" use="optional" default="0"/>*/
    this.vm = 0;

    /*<xsd:attribute name="ph" type="xsd:boolean" use="optional" default="false"/>*/
    this.ph = false;
  }

  ParseFromXml(xml) {
    if (xml._t != null) this.cellType = xml._t;
    if (xml._r != null) this.r = xml._r;
    if (xml._cellType != null) this.cellType = xml._cellType;
    if (xml.v != null && this.cellType != "str") this.v = parseFloat(xml.v);
    else this.v = xml.v;
    if (xml._v != null && this.cellType != "str") this.v = parseFloat(xml._v);
    else this.v = xml.v;
    if (xml._f != null) {
      this.f = xml._f;
    }
    if (xml.f != null) {
      this.f = xml.f;
    }
    if (xml._is != null) this.is = xml._is;

    if (xml._s != null) this.s = parseInt(xml._s);
    if (xml._cm != null) this.cm = parseInt(xml._cm);
    if (xml._vm != null) this.vm = parseInt(xml._vm);
    if (xml._ph != null) this.ph = xml._ph;
  }

  toString() {
    return 'range:' + this.r + '  value:' + this.v;
  }
  copy() {
    var cell = new Cell();
    cell.v = this.v;
    cell.f = this.f;
    cell.is = this.is;
    cell.r = this.r;
    cell.s = this.s;
    cell.cellType = this.cellType;
    cell.cm = this.cm;
    cell.vm = this.vm;
    cell.ph = this.ph;
    return cell
  }



}
