
export default class Dxfs {
  constructor() {
    /*<xsd:complexType name="CT_Dxfs">
        <xsd:sequence>
         <xsd:element name="dxf" type="CT_Dxf" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
        <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
        </xsd:complexType>*/
      this.dxf=[];
      this.count=0;
     }
      AddDxf(Dxf){
        this.dxf.push(Dxf);
        this.count++;
      }
}

