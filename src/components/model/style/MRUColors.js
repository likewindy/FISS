import Color from './Color.js';

export default class MRUColors {
  constructor() {


    /*
    <xsd:complexType name="CT_MRUColors">
    <xsd:sequence>
    <xsd:element name="color" type="CT_Color" minOccurs="1" maxOccurs="unbounded"/>
    </xsd:sequence>
    </xsd:complexType>
    */
      this.color =[];
  }

      AddColor(Color){
        this.color.push(Color);
      }

    }
