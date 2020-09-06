
/*
    <<xsd:complexType name="CT_Colors">
        <xsd:sequence>
            <xsd:element name="indexedColors" type="CT_IndexedColors" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="mruColors" type="CT_MRUColors" minOccurs="0" maxOccurs="1"/>
        </xsd:sequence>
    </xsd:complexType>

    */
import IndexedColors from './IndexedColors.js';
import MRUColors from './MRUColors.js';

export default class Colors {
  constructor() {
      this.indexedColors =new IndexedColors();
      this.mruColors =new MRUColors();
    }
  }
