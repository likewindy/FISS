/*
    <xsd:complexType name="CT_SystemColor">
364 <xsd:sequence>
365 <xsd:group ref="EG_ColorTransform" minOccurs="0" maxOccurs="unbounded"/>
366 </xsd:sequence>
367 <xsd:attribute name="val" type="ST_SystemColorVal" use="required"/>
368 <xsd:attribute name="lastClr" type="s:ST_HexColorRGB" use="optional"/>
369 </xsd:complexType>
*/


export default class SystemColor {
  constructor() {

    this.val='';
    this.lastClr='';
    this.colorTransfrom=[];
  }

    ParseFromXml(xml){
        this.val=xml._val;

        if(xml._lastClr!=null)
          this.lastClr=xml._lastClr;
        else
        this.lastClr=null;


    }

}
