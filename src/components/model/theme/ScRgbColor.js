/*
<xsd:complexType name="CT_ScRgbColor">
<xsd:sequence>
<xsd:group ref="EG_ColorTransform" minOccurs="0" maxOccurs="unbounded"/>
</xsd:sequence>
 <xsd:attribute name="r" type="ST_Percentage" use="required"/>
 <xsd:attribute name="g" type="ST_Percentage" use="required"/>
 <xsd:attribute name="b" type="ST_Percentage" use="required"/>
 </xsd:complexType>
*/

import SystemColor from './SystemColor.js';

export default class ScRgbColor {
  constructor() {


    this.r=0.0;
    this.g=0.0;
    this.b=0.0;
    this.sysClr=new SystemColor();
  }
    ParseFromXml(xml){
        if(xml._r!=null)
          this.r= parseFloat(xml._r);
        if(xml._g!=null)
          this.g= parseFloat(xml._g);
        if(xml._b!=null)
        this.b= parseFloat(xml._b);
        if(xml.sysClr!=null)
          this.sysClr.ParseFromXml(xml.sysClr);
        else
        this.sysClr=null;

    }

}
