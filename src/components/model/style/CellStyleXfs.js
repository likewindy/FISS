
    /*
<xsd:complexType name="CT_CellStyleXfs">
    <xsd:sequence>
     <xsd:element name="xf" type="CT_Xf" minOccurs="1" maxOccurs="unbounded"/>
    </xsd:sequence>
    <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
</xsd:complexType>
    */

import Xf from './Xf';

export default class CellStyleXfs {
  constructor() {
      this.xf =[];
      this.count ; //unsignedInt
  }
   ParseFromXml(xml){
        var acount=parseInt(xml._count);
        for(var n=0;n<acount;n++){
          var xf=new Xf();
          xf.ParseFromXml(xml.xf[n]);
          this.AddXf(xf);
        }
      }
      AddXf(xf){
        this.xf.push(xf);
        this.count++;
      }
    }
