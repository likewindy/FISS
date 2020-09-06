   /*
    1823 <xsd:complexType name="CT_RElt">
    1824 <xsd:sequence>
    1825 <xsd:element name="rPr" type="CT_RPrElt" minOccurs="0" maxOccurs="1"/>
    1826 <xsd:element name="t" type="s:ST_Xstring" minOccurs="1" maxOccurs="1"/>
    1827 </xsd:sequence>
    1828 </xsd:complexType>
    */

import RPrElt from './RPrElt.js';

export default class RElt {
  constructor() {
    this.rPr =new RPrElt() ;  //RPrElt
    this.t =''; //string
   };

   ParseFromXml(xml){
    if(xml==null) return;
    if(xml.t.__text!=null)
      this.t=xml.t.__text;
    else if (xml.t!=null){
      this.t=xml.t;
    }

    if(xml.rPr!=null)
      this.rPr.ParseFromXml(xml.rPr);
  }
}

