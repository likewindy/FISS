/*
<xsd:complexType name="CT_ShapeProperties">
2242 <xsd:sequence>
2243 <xsd:element name="xfrm" type="CT_Transform2D" minOccurs="0" maxOccurs="1"/>
2244 <xsd:group ref="EG_Geometry" minOccurs="0" maxOccurs="1"/>
2245 <xsd:group ref="EG_FillProperties" minOccurs="0" maxOccurs="1"/>
2246 <xsd:element name="ln" type="CT_LineProperties" minOccurs="0" maxOccurs="1"/>
2247 <xsd:group ref="EG_EffectProperties" minOccurs="0" maxOccurs="1"/>
2248 <xsd:element name="scene3d" type="CT_Scene3D" minOccurs="0" maxOccurs="1"/>
2249 <xsd:element name="sp3d" type="CT_Shape3D" minOccurs="0" maxOccurs="1"/>
2250 <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
2251 </xsd:sequence>
2252 <xsd:attribute name="bwMode" type="ST_BlackWhiteMode" use="optional"/>
2253 </xsd:complexType>
*/

import ShapeProperties from './ShapeProperties.js';
import TextBodyProperties from './TextBodyProperties.js';
import TextBodyProperties from './TextBodyProperties.js';
import ShapeStyle from './ShapeStyle.js';

export default class DefaultShapeDefinition {
  constructor() {


    this.spPr=new ShapeProperties();
    this.bodyPr=new TextBodyProperties();
    this.lstStyle=new TextListStyle();
    this.style=new ShapeStyle();
  }


   ParseFromXml(xml){
        if(xml.spPr!=null)
            this.spPr.ParseFromXml(xml.spPr);
        else
            this.spPr=null;
        if(xml.bodyPr!=null)
            this.bodyPr.ParseFromXml(xml.bodyPr);
        else
            this.bodyPr=null;

        if(xml.lstStyle!=null)
            this.lstStyle.ParseFromXml(xml.lstStyle);
        else
            this.lstStyle=null;
        if(xml.style!=null)
            this.style.ParseFromXml(xml.style);
        else
            this.style=null;
    }

}
