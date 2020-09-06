/*
   <xsd:complexType name="CT_FontScheme">
    <xsd:sequence>
       <xsd:element name="majorFont" type="CT_FontCollection" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="minorFont" type="CT_FontCollection" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence
     <xsd:attribute name="name" type="xsd:string" use="required"/>
</xsd:complexType

*/
import FontCollection from './FontCollection.js';

export default class ThemeFontScheme {
  constructor() {


    this.majorFont=new FontCollection();
    this.minorFont=new FontCollection();
    this.name='';
  }

    ParseFromXml(xml){
        this.majorFont.ParseFromXml(xml.majorFont);
        this.minorFont.ParseFromXml(xml.minorFont);
        this.name=xml._name;
    }

}
