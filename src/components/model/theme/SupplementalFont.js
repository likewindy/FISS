/*
<xsd:complexType name="CT_SupplementalFont">
    <xsd:attribute name="script" type="xsd:string" use="required"/>
    <xsd:attribute name="typeface" type="ST_TextTypeface" use="required"/>
</xsd:complexType>
*/
export default class SupplementalFont {
  constructor() {
    this.script=='';
    this.typeface='';
  }
    ParseFromXml(xml){
        this.script=xml._script;
        this.typeface=xml._typeface;
    }

}
