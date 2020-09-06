/*
<xsd:group name="EG_FillProperties">
    <xsd:choice>
       <xsd:element name="noFill" type="CT_NoFillProperties" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="solidFill" type="CT_SolidColorFillProperties" minOccurs="1"
         maxOccurs="1"/>
       <xsd:element name="gradFill" type="CT_GradientFillProperties" minOccurs="1"
         maxOccurs="1"/>
       <xsd:element name="blipFill" type="CT_BlipFillProperties" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="pattFill" type="CT_PatternFillProperties" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="grpFill" type="CT_GroupFillProperties" minOccurs="1" maxOccurs="1"/>
    </xsd:choice>
</xsd:group>
*/
import NoFillProperties from './NoFillProperties.js';
import SolidColorFillProperties from './SolidColorFillProperties.js';
import GradientFillProperties from './GradientFillProperties.js';
import BlipFillProperties from './BlipFillProperties.js';
import PatternFillProperties from './PatternFillProperties.js';
import GroupFillProperties from './GroupFillProperties.js';


export default class FillProperties {
  constructor() {


    this.noFill=new NoFillProperties();
    this.solidFill=new SolidColorFillProperties();
    this.gradFill=new GradientFillProperties();
    this.blipFill=new BlipFillProperties();
    this.pattFill=new PatternFillProperties();
    this.grpFill=new GroupFillProperties();
  }

    ParseFromXml=function(){
        if(xml.noFill!=null)
          this.noFill.ParseFromXml(xml.noFill);
        else
          this.noFill=null;
        if(xml.solidFill!=null)
          this.solidFill.ParseFromXml(xml.solidFill);
        else
        this.solidFill=null;

        if(xml.gradFill!=null)
          this.gradFill.ParseFromXml(xml.gradFill);
        else
        this.gradFill=null;
        if(xml.blipFill!=null)
          this.blipFill.ParseFromXml(xml.blipFill);
        else
        this.blipFill=null;
        if(xml.pattFill!=null)
          this.pattFill.ParseFromXml(xml.pattFill);
        else
        this.pattFill=null;
        if(xml.grpFill!=null)
          this.grpFill.ParseFromXml(xml.grpFill);
        else
        this.grpFill=null;
    }

}
