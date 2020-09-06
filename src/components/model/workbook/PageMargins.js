export default class PageMargins {
  constructor() {
    /*
      <xsd:attribute name="left" type="xsd:double" use="required"/>
      <xsd:attribute name="right" type="xsd:double" use="required"/>
      <xsd:attribute name="top" type="xsd:double" use="required"/>
      <xsd:attribute name="bottom" type="xsd:double" use="required"/>
      <xsd:attribute name="header" type="xsd:double" use="required"/>
      <xsd:attribute name="footer" type="xsd:double" use="required"/>
    */
   //in inches
    this.left = 0.75;
    this.right = 0.75;
    this.top = 1.0;
    this.bottom = 1.0;
    this.header = 0.511805555555556;
    this.footer = 0.511805555555556;
  }

  ParseFromXml(xml) {

    if (xml._left != null) this.left = parseFloat(xml._left);
    if (xml._right != null) this.right = parseFloat(xml._right);
    if (xml._top != null) this.top = parseFloat(xml._top);
    if (xml._bottom != null) this.bottom = parseFloat(xml._bottom);
    if (xml._header != null) this.header = parseFloat(xml._header);
    if (xml._footer != null) this.footer = parseFloat(xml._footer);

  }

}
