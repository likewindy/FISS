
/*
<xsd:complexType name="CT_TextFont">
    <xsd:attribute name="typeface" type="ST_TextTypeface" use="required"/>
    <xsd:attribute name="panose" type="s:ST_Panose" use="optional"/>
    <xsd:attribute name="pitchFamily" type="ST_PitchFamily" use="optional" default="0"/>
    <xsd:attribute name="charset" type="xsd:byte" use="optional" default="1"/>
</xsd:complexType>
*/


export default class TextFont {
  constructor() {

    this.typeface='';
    this.panose='';
    this.pitchFamily='0';
    this.charset='1';
  }


    ParseFromXml(xml){
        this.typeface=xml._typeface;
        if(xml._panose=null)
         this.panose=xml._panose;
        else
        this.panose=null;
        if(xml._pitchFamily=null)
        this.pitchFamily=xml._pitchFamily;
        if(xml._charset=null)
        this.charset=xml._charset;


    }

}
