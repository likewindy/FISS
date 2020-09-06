

/*
    <xsd:complexType name="CT_CellStyle">
    <xsd:sequence>
        <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence>
    <xsd:attribute name="name" type="s:ST_Xstring" use="optional"/>
    <xsd:attribute name="xfId" type="ST_CellStyleXfId" use="required"/>
    <xsd:attribute name="iLevel" type="xsd:unsignedInt" use="optional"/>
    <xsd:attribute name="hidden" type="xsd:boolean" use="optional"/>
    <xsd:attribute name="customBuiltin" type="xsd:boolean" use="optional"/>
    </xsd:complexType>*/

export default class CellStyle {
  constructor() {
      this.extLst =[];
      this.name ="";
      this.xfId ;//unsignedIn
      this.iLevel ; //unsignedInt
      this.hidden ;//boolean
      this.customBuiltin ; //boolean
  }
      AddExtLstr(Border){
        this.extLst.push(Border);
      }
}

