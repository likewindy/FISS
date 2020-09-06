/*
<xsd:complexType name="CT_FontCollection">
    <xsd:sequence>
       <xsd:element name="latin" type="CT_TextFont" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="ea" type="CT_TextFont" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="cs" type="CT_TextFont" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="font" type="CT_SupplementalFont" minOccurs="0" maxOccurs="unbounded"/>
       <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence>
</xsd:complexType
*/
import TextFont from './TextFont.js';
import SupplementalFont from './SupplementalFont.js';

export default class FontCollection {
  constructor() {


    this.latin=new TextFont();
    this.ea=new TextFont();
    this.cs=new TextFont();
    this.font=[];
    this.name='';
  }

  ParseFromXml(xml){
        this.latin.ParseFromXml(xml.latin);
        this.ea.ParseFromXml(xml.ea);
        this.cs.ParseFromXml(xml.cs);

        var acount=parseInt(xml.font.length);
        for(var n=0;n<acount;n++){
          var tfont=new SupplementalFont();
          tfont.ParseFromXml(xml.font[n]);
          this.font.push(tfont);
        }

        this.name=xml._name;
    }

}
