/*
<xsd:complexType name="CT_StyleMatrix">
    <xsd:sequence>
       <xsd:element name="fillStyleLst" type="CT_FillStyleList" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="lnStyleLst" type="CT_LineStyleList" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="effectStyleLst" type="CT_EffectStyleList" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="bgFillStyleLst" type="CT_BackgroundFillStyleList" minOccurs="1"
         maxOccurs="1"/>
    </xsd:sequence>
    <xsd:attribute name="name" type="xsd:string" use="optional" default=""/>
</xsd:complexType>
*/
import LineStyleList from './LineStyleList.js';
import EffectStyleList from './EffectStyleList.js';
import BackgroundFillStyleList from './BackgroundFillStyleList.js';


export default class StyleMatrix {
  constructor() {
    this.fillStyleLst=[];
    this.lnStyleLst=new LineStyleList();
    this.effectStyleLst=new EffectStyleList();
    this.bgFillStyleLst=new BackgroundFillStyleList();
    this.name='';
  }

    ParseFromXml(xml){
        this.fillStyleLst.ParseFromXml(xml.fillStyleLst);
        this.lnStyleLst.ParseFromXml(xml.lnStyleLst);
        this.effectStyleLst.ParseFromXml(xml.effectStyleLst);
        this.bgFillStyleLst.ParseFromXml(xml.bgFillStyleLst);
        this.name=xml._name;
    }

}
