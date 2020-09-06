
export default class GradientFill {
  constructor() {
    /*<xsd:complexType name="CT_GradientFill">
        <xsd:sequence>
            <xsd:element name="stop" type="CT_GradientStop" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
            <xsd:attribute name="type" type="ST_GradientType" use="optional" default="linear"/>
            <xsd:attribute name="degree" type="xsd:double" use="optional" default="0"/>
            <xsd:attribute name="left" type="xsd:double" use="optional" default="0"/>
            <xsd:attribute name="right" type="xsd:double" use="optional" default="0"/>
            <xsd:attribute name="top" type="xsd:double" use="optional" default="0"/>
            <xsd:attribute name="bottom" type="xsd:double" use="optional" default="0"/>
        </xsd:complexType>*/

      this.stop=[];//GradientStop
      this.type=GradientType.linear;
      this.degree=0;
      this.left=0;
      this.right=0;
      this.top=0;
      this.bottom=0;
     }
    GradientType={
        /*<xsd:simpleType name="ST_GradientType">
            <xsd:restriction base="xsd:string">
            <xsd:enumeration value="linear"/>
            <xsd:enumeration value="path"/>
            </xsd:restriction>
        </xsd:simpleType>*/
        linear:'linear',
        path:'path'
      };
}
