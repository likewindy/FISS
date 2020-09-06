
import PatternFill from './PatternFill.js';
  /*<xsd:complexType name="CT_Fill">
        <xsd:choice minOccurs="1" maxOccurs="1">
            <xsd:element name="patternFill" type="CT_PatternFill" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="gradientFill" type="CT_GradientFill" minOccurs="0" maxOccurs="1"/>
        </xsd:choice>
        </xsd:complexType>*/

export default class Fill {
  constructor() {
      this.patternFill =new  PatternFill(); // PatternFill
      //this.gradientFill=new GradientFill() ; // GradientFill
    }
    ParseFromXml(xml){
         if(xml==null){
            this.patternFill=null;
            return;
         }
        this.patternFill.ParseFromXml(xml.patternFill);
      }
    }

