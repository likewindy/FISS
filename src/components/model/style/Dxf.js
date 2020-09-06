

export default class Dxf {
  constructor() {
    /*<xsd:complexType name="CT_Dxf">
        <xsd:sequence>
        <xsd:element name="font" type="CT_Font" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="numFmt" type="CT_NumFmt" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="fill" type="CT_Fill" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="alignment" type="CT_CellAlignment" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="border" type="CT_Border" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="protection" type="CT_CellProtection" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
     </xsd:sequence>
    </xsd:complexType>*/
      this.font;//Font
      this.numFmt;//NumFmt
      this.fill=new Fill();
      this.alignment=new CellAlignment();
      this.border=new Border();
      this.protection=new CellProtection();
      this.extLst=new ExtensionList();
  }
}

