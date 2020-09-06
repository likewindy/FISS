export default class UnderlineValues {
  /*
      <xsd:simpleType name="ST_UnderlineValues">
          <xsd:restriction base="xsd:string">
              <xsd:enumeration value="single"/>
              <xsd:enumeration value="double"/>
              <xsd:enumeration value="singleAccounting"/>
              <xsd:enumeration value="doubleAccounting"/>
              <xsd:enumeration value="none"/>
         </xsd:restriction>
      </xsd:simpleType>

  */
  constructor() {
    this.single = 'single';
    this.double = 'double';
    this.singleAccounting = 'singleAccounting';
    this.doubleAccounting = 'doubleAccounting';
    this.none = 'none';
  }
};
