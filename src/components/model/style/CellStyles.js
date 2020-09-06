


/*
    <xsd:complexType name="CT_CellStyles">
        <xsd:sequence>
        <xsd:element name="cellStyle" type="CT_CellStyle" minOccurs="1" maxOccurs="unbounded"/>
        </xsd:sequence>
        <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
    </xsd:complexType>
    */

export default class CellStyles {
  constructor() {
      this.cellStyles =[];
      this.count ; //unsignedInt
  }

      AddCellStyle(CellStyle){
        this.cellStyles.push(CellStyle);
        this.count++;
      }
}
