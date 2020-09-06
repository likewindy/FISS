/*
    <xsd:complexType name="CT_SystemColor">
364 <xsd:sequence>
365 <xsd:group ref="EG_ColorTransform" minOccurs="0" maxOccurs="unbounded"/>
366 </xsd:sequence>
367 <xsd:attribute name="val" type="ST_SystemColorVal" use="required"/>
368 <xsd:attribute name="lastClr" type="s:ST_HexColorRGB" use="optional"/>
369 </xsd:complexType>
*/

export default class SRgbColor {
  constructor() {
    this.val='';
    this.colorTransfrom=[];
  }

  ParseFromXml(xml){
        this.val=xml._val;

  }

}
