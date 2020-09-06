import SRgbColor from './SRgbColor.js';
import SystemColor from './SystemColor.js';

export default class ColorChoice {
  constructor() {


/*
<xsd:group name="EG_ColorChoice">
<xsd:choice>
    <xsd:element name="scrgbClr" type="CT_ScRgbColor" minOccurs="1" maxOccurs="1"/>
    <xsd:element name="srgbClr" type="CT_SRgbColor" minOccurs="1" maxOccurs="1"/>
    <xsd:element name="hslClr" type="CT_HslColor" minOccurs="1" maxOccurs="1"/>
    <xsd:element name="sysClr" type="CT_SystemColor" minOccurs="1" maxOccurs="1"/>
    <xsd:element name="schemeClr" type="CT_SchemeColor" minOccurs="1" maxOccurs="1"/>
    <xsd:element name="prstClr" type="CT_PresetColor" minOccurs="1" maxOccurs="1"/>
</xsd:choice>
</xsd:group>
*/
    //this.scrgbClr=new ScRgbColor();
    this.srgbClr=new SRgbColor();
    //this.hslClr=new HslColor();
    this.sysClr=new SystemColor();
    //this.schemeClr=new SchemeColor();
    //this.prstClr=new PresetColor();
  }

    GetColorVal(defaultRgb){

      if (this.srgbClr!=null )
         return this.srgbClr.val;
      else
         return defaultRgb;
    }

    ParseFromXml(xml){
       /*if(xml.scrgbClr!=null)
          this.scrgbClr.ParseFromXml(xml.scrgbClr);
        else
          this.scrgbClr=null;
         if(xml.hslClr!=null)
          this.hslClr.ParseFromXml(xml.hslClr);
        else
        this.hslClr=null;
       if(xml.schemeClr!=null)
          this.schemeClr.ParseFromXml(xml.schemeClr);
        else
        this.schemeClr=null;
        if(xml.prstClr!=null)
          this.prstClr.ParseFromXml(xml.prstClr);
        else
        this.prstClr=null;*/
       if(xml.srgbClr!=null)
         this.srgbClr.ParseFromXml(xml.srgbClr);
        else
         this.srgbClr=null;
        if(xml.sysClr!=null)
          this.sysClr.ParseFromXml(xml.sysClr);
        else
        this.sysClr=null;
    }

}
