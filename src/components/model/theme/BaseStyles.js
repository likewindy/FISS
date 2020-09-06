/*
<xsd:complexType name="CT_BaseStyles">
    <xsd:sequence>
       <xsd:element name="clrScheme" type="CT_ColorScheme" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="fontScheme" type="CT_FontScheme" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="fmtScheme" type="CT_StyleMatrix" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence>
</xsd:complexType>
*/
import ColorScheme from './ColorScheme.js';
import ThemeFontScheme from './ThemeFontScheme.js';

export default class BaseStyles {
  constructor() {


    this.clrScheme=new ColorScheme();
    this.fontScheme=new ThemeFontScheme();
    //this.fmtScheme=new StyleMatrix();
    //this.extLst=new OfficeArtExtensionList();
  }

    ParseFromXml(xml){
        this.clrScheme.ParseFromXml(xml.clrScheme);
        this.fontScheme.ParseFromXml(xml.fontScheme);
        //this.fmtScheme.ParseFromXml(xml.fmtScheme);
    }

}
