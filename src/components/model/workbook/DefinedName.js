/*
<xsd:complexType name="CT_ExternalDefinedName">
  <xsd:attribute name="name" type="s:ST_Xstring" use="required"/>
  <xsd:attribute name="refersTo" type="s:ST_Xstring" use="optional"/>
  <xsd:attribute name="sheetId" type="xsd:unsignedInt" use="optional"/>
  localSheetId
  </xsd:complexType>
  */

export default class DefinedName {
  constructor() {
    this.name = '';
    this.refersTo = '';
    this.sheetId = 0;
    this.localSheetId = 0;
  }
  ParseFromXml(xml) {
    if (xml._name != null) this.name = xml._name;
    if (xml._refersTo != null) this.refersTo = xml._refersTo;
    if (xml._sheetId != null) this.sheetId = parseInt(xml._sheetId);
    if (xml._localSheetId != null) this.sheetId = parseInt(xml._localSheetId);
    if (xml.__text) this.refersTo = xml.__text;
  }

}
