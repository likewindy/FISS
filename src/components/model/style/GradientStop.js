

import Color from './Color.js';

export default class GradientStop {
  constructor(position) {
    /*<xsd:complexType name="CT_GradientStop">
        <xsd:sequence>
        <xsd:element name="color" type="CT_Color" minOccurs="1" maxOccurs="1"/>
        </xsd:sequence>
        <xsd:attribute name="position" type="xsd:double" use="required"/>
    </xsd:complexType>*/
      this.color= new Color();
      this.position=position;  //double
  }
}
