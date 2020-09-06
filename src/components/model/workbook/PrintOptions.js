export default class PrintOptions {
  constructor() {
    /*
    <xsd:attribute name="horizontalCentered" type="xsd:boolean" use="optional" default="false"/>
    <xsd:attribute name="verticalCentered" type="xsd:boolean" use="optional" default="false"/>
    <xsd:attribute name="headings" type="xsd:boolean" use="optional" default="false"/>
    <xsd:attribute name="gridLines" type="xsd:boolean" use="optional" default="false"/>
    <xsd:attribute name="gridLinesSet" type="xsd:boolean" use="optional" default="true"/>
    */
    this.horizontalCentered = false;
    this.verticalCentered = false;
    this.headings = false;
    this.gridLines = false;
    this.gridLinesSet = true;
  }

  ParseFromXml(xml) {
    if (xml._horizontalCentered != null) {
      if (xml._horizontalCentered != '0')
        this.horizontalCentered = true;
      else
        this.horizontalCentered = false;
    }
    if (xml._verticalCentered != null) {
      if (xml._verticalCentered != '0')
        this.verticalCentered = true;
      else
        this.verticalCentered = false;
    }
    if (xml._headings != null) {
      if (xml._headings != '0')
        this.headings = true;
      else
        this.headings = false;
    }
    if (xml._gridLines != null) {
      if (xml._gridLines != '0')
        this.gridLines = true;
      else
        this.gridLines = false;
    }
    if (xml._gridLinesSet != null) {
      if (xml._gridLinesSet != '0')
        this.gridLinesSet = true;
      else
        this.gridLinesSet = false;
    }

  }

}
