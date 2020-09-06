/*
<xsd:complexType name="CT_ObjectStyleDefaults">
    <xsd:sequence>
       <xsd:element name="spDef" type="CT_DefaultShapeDefinition" minOccurs="0" maxOccurs="1"/>
       <xsd:element name="lnDef" type="CT_DefaultShapeDefinition" minOccurs="0" maxOccurs="1"/>
       <xsd:element name="txDef" type="CT_DefaultShapeDefinition" minOccurs="0" maxOccurs="1"/>
       <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence>
</xsd:complexType>
*/

import DefaultShapeDefinition from './DefaultShapeDefinition.js';

export default class ObjectStyleDefaults {
  constructor() {
    this.spDef=new DefaultShapeDefinition();
    this.lnDef=new DefaultShapeDefinition();
    this.txDef=new DefaultShapeDefinition();
  }

    ParseFromXml(xml){
        if(xml.spDef!=null)
            this.spDef.ParseFromXml(xml.spDef);
        else
            this.spDef=null;
        if(xml.lnDef!=null)
            this.lnDef.ParseFromXml(xml.lnDef);
        else
            this.lnDef=null;

        if(xml.txDef!=null)
            this.txDef.ParseFromXml(xml.txDef);
        else
            this.txDef=null;
    }

}
