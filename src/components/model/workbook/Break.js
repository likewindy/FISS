export default class Break {
  constructor() {
    /*
    <xsd:attribute name="id" type="xsd:unsignedInt" use="optional" default="0"/>
    <xsd:attribute name="min" type="xsd:unsignedInt" use="optional" default="0"/>
    <xsd:attribute name="max" type="xsd:unsignedInt" use="optional" default="0"/>
    <xsd:attribute name="man" type="xsd:boolean" use="optional" default="false"/>
    <xsd:attribute name="pt" type="xsd:boolean" use="optional" default="false"/>
    */
    this.id = 0;
    this.min = 0;
    this.max = 0;
    this.man = false;
    this.pt = false;
  }

  ParseFromXml(xml) {
    if (xml._id != null) this.id = parseInt(xml._id);
    if (xml._min != null) this.min = parseInt(xml._min);
    if (xml._max != null) this.max = parseInt(xml._max);
    if (xml._man != null) {
      if (xml._man != '0')
        this.man = true;
      else
        this.man = false;
    }
    if (xml._pt != null) {
      if (xml._pt != '0')
        this.pt = true;
      else
        this.pt = false;
    }
  }

}
