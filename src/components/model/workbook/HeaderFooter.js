export default class HeaderFooter {
  constructor() {
    /*
  <xsd:sequence>
  <xsd:element name="oddHeader" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
  <xsd:element name="oddFooter" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
  <xsd:element name="evenHeader" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
  <xsd:element name="evenFooter" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
  <xsd:element name="firstHeader" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
  <xsd:element name="firstFooter" type="s:ST_Xstring" minOccurs="0" maxOccurs="1"/>
  </xsd:sequence>
  <xsd:attribute name="differentOddEven" type="xsd:boolean" default="false"/>
  <xsd:attribute name="differentFirst" type="xsd:boolean" default="false"/>
  <xsd:attribute name="scaleWithDoc" type="xsd:boolean" default="true"/>
  <xsd:attribute name="alignWithMargins" type="xsd:boolean" default="true"/>
    */
    this.oddHeader = '';
    this.oddFooter = '';
    this.evenHeader = '';
    this.evenFooter = '';
    this.firstHeader = '';
    this.firstFooter = '';
    this.differentOddEven = false;
    this.differentFirst = false;
    this.scaleWithDoc = true;
    this.alignWithMargins = true;
  }

  ParseFromXml(xml) {
    if (xml._oddHeader != null) this.oddHeader = xml._oddHeader;
    if (xml._oddFooter != null) this.oddFooter = xml._oddFooter;
    if (xml._evenHeader != null) this.evenHeader = xml._evenHeader;
    if (xml._evenFooter != null) this.evenFooter = xml._evenFooter;
    if (xml._firstHeader != null) this.firstHeader = xml._firstHeader;
    if (xml._firstFooter != null) this.firstFooter = xml._firstFooter;
    if (xml._differentOddEven != null) {
      if (xml._differentOddEven != '0')
        this.differentOddEven = true;
      else
        this.differentOddEven = false;
    }
    if (xml._differentFirst != null) {
      if (xml._differentFirst != '0')
        this.differentFirst = true;
      else
        this.differentFirst = false;
    }
    if (xml._scaleWithDoc != null) {
      if (xml._scaleWithDocr != '0')
        this.scaleWithDoc = true;
      else
        this.scaleWithDoc = false;
    }
    if (xml._alignWithMargins != null) {
      if (xml._alignWithMargins != '0')
        this.alignWithMargins = true;
      else
        this.alignWithMargins = false;
    }
  }

}
