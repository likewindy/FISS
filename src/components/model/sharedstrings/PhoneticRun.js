

/*
    <xsd:complexType name="CT_PhoneticRun">
        <xsd:sequence>
         <xsd:element name="t" type="s:ST_Xstring" minOccurs="1" maxOccurs="1"/>
        </xsd:sequence>
        <xsd:attribute name="sb" type="xsd:unsignedInt" use="required"/>
        <xsd:attribute name="eb" type="xsd:unsignedInt" use="required"/>
    </xsd:complexType>
    */

export default class PhoneticRun {
  constructor() {
      this.t ;
      this.sb =0;
      this.eb =0;
   };
}
