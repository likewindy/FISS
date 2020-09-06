
import ColorChoice from './ColorChoice.js';

export default class ColorScheme {
  constructor() {
/*
<xsd:complexType name="CT_ColorScheme">
    <xsd:sequence>
       <xsd:element name="dk1" type="CT_Color" minOccurs="1" maxOccurs="1"
       <xsd:element name="lt1" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="dk2" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="lt2" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="accent1" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="accent2" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="accent3" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="accent4" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="accent5" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="accent6" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="hlink" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="folHlink" type="CT_Color" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence>
    <xsd:attribute name="name" type="xsd:string" use="required"/>
</xsd:complexType
*/

    this.dk1=new ColorChoice();
    this.lt1=new ColorChoice();
    this.dk2=new ColorChoice();
    this.lt2=new ColorChoice();
    this.accent1=new ColorChoice();
    this.accent2=new ColorChoice();
    this.accent3=new ColorChoice();
    this.accent4=new ColorChoice();
    this.accent5=new ColorChoice();
    this.accent6=new ColorChoice();
    this.hlink=new ColorChoice();
    this.folHlink=new ColorChoice();
  }

    GetColorByIndex(index){
        if (index==0)
          return this.dk1;
        else  if (index==1)
          return this.lt1;
        else  if (index==2)
          return this.dk2;
        else  if (index==3)
          return this.lt2;
        else  if (index==4)
          return this.accent1;
        else  if (index==5)
          return this.accent2;
        else  if (index==6)
          return this.accent3;
        else  if (index==7)
          return this.accent4;
        else  if (index==8)
          return this.accent5;
        else  if (index==9)
          return this.accent6;
        else  if (index==10)
          return this.hlink;
        else  if (index==11)
          return this.folHlink;
        else
           return null;
    }

    ParseFromXml(xml){
        this.dk1.ParseFromXml(xml.dk1);
        this.lt1.ParseFromXml(xml.lt1);
        this.dk2.ParseFromXml(xml.dk2);
        this.lt2.ParseFromXml(xml.lt2);
        this.accent1.ParseFromXml(xml.accent1);
        this.accent2.ParseFromXml(xml.accent2);
        this.accent4.ParseFromXml(xml.accent4);
        this.accent5.ParseFromXml(xml.accent5);
        this.accent3.ParseFromXml(xml.accent3);
        this.accent6.ParseFromXml(xml.accent6);
        this.hlink.ParseFromXml(xml.hlink);
        this.folHlink.ParseFromXml(xml.folHlink);
        this.name=xml._name;
    }
}
