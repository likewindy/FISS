import Color from './Color.js';

export default class PatternFill {
  constructor() {

    /*<<xsd:complexType name="CT_PatternFill">
        <xsd:sequence>
        <xsd:element name="fgColor" type="CT_Color" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="bgColor" type="CT_Color" minOccurs="0" maxOccurs="1"/>
        </xsd:sequence>
        <xsd:attribute name="patternType" type="ST_PatternType" use="optional"/>
      </xsd:complexType>*/

    this.fgColor = new Color(); //
    this.bgColor = new Color(); //
    this.patternType;
  }

  ParseFromXml(xml) {
    this.patternType = xml._patternType;
    if (xml.fgColor != null)
      this.fgColor.ParseFromXml(xml.fgColor);
    else
      this.fgColor = null;
    if (xml.bgColor != null)
      this.bgColor.ParseFromXml(xml.bgColor);
    else
      this.bgColor = null;
  }
  /*static  PatternType={
       <xsd:simpleType name="ST_PatternType">
       <xsd:restriction base="xsd:string">
           <xsd:enumeration value="none"/>
           <xsd:enumeration value="solid"/>
           <xsd:enumeration value="mediumGray"/>
           <xsd:enumeration value="darkGray"/>
           <xsd:enumeration value="lightGray"/>
           <xsd:enumeration value="darkHorizontal"/>
           <xsd:enumeration value="darkVertical"/>
           <xsd:enumeration value="darkDown"/>
           <xsd:enumeration value="darkUp"/>
           <xsd:enumeration value="darkGrid"/>
           <xsd:enumeration value="darkTrellis"/>
           <xsd:enumeration value="lightHorizontal"/>
           <xsd:enumeration value="lightVertical"/>
           <xsd:enumeration value="lightDown"/>
           <xsd:enumeration value="lightUp"/>
           <xsd:enumeration value="lightGrid"/>
           <xsd:enumeration value="lightTrellis"/>
           <xsd:enumeration value="gray125"/>
           <xsd:enumeration value="gray0625"/>
       </xsd:restriction>
       </xsd:simpleType>
       none:'none',
       solid:'solid',
       mediumGray:'mediumGray',
       darkGray:'darkGray',
       lightGray:'lightGray',
       darkHorizontal:'darkHorizontal',
       darkVertical:'darkVertical',
       darkDown:'darkDown',
       darkGrid:'darkGrid',
       darkTrellis:'darkTrellis',
       lightHorizontal:'lightHorizontal',
       lightVertical:'lightVertical',
       lightDown:'lightDown',
       lightUp:'lightUp',
       lightGrid:'lightGrid',
       lightTrellis:'lightTrellis',
       gray125:'gray125',
       gray0625:'gray0625'
     };*/


}
