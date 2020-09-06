 /*
    1829 <xsd:complexType name="CT_RPrElt">
    1830 <xsd:choice maxOccurs="unbounded">
    1831 <xsd:element name="rFont" type="CT_FontName" minOccurs="0" maxOccurs="1"/>
    1832 <xsd:element name="charset" type="CT_IntProperty" minOccurs="0" maxOccurs="1"/>
    1833 <xsd:element name="family" type="CT_IntProperty" minOccurs="0" maxOccurs="1"/>
    1834 <xsd:element name="b" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
    1835 <xsd:element name="i" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
    1836 <xsd:element name="strike" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
    1837 <xsd:element name="outline" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
    1838 <xsd:element name="shadow" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
    1839 <xsd:element name="condense" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
    1840 <xsd:element name="extend" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
    1841 <xsd:element name="color" type="CT_Color" minOccurs="0" maxOccurs="1"/>
    1842 <xsd:element name="sz" type="CT_FontSize" minOccurs="0" maxOccurs="1"/>
    1843 <xsd:element name="u" type="CT_UnderlineProperty" minOccurs="0" maxOccurs="1"/>
    1844 <xsd:element name="vertAlign" type="CT_VerticalAlignFontProperty" minOccurs="0"
    1845 maxOccurs="1"/>
    1846 <xsd:element name="scheme" type="CT_FontScheme" minOccurs="0" maxOccurs="1"/>
    1847 </xsd:choice>
    1848 </xsd:complexType>
    */
   import FontFamily from '../style/FontFamily';
   import Color from '../style/Color'
   import VerticalAlignFontProperty from '../style/VerticalAlignFontProperty';
   import FontScheme from '../style/FontScheme';
   import UnderlineValues from '../style/UnderlineValues';


export default class RPrElt {
  constructor() {
    this.rFont ='';
    this.charset='';
    this.family= new FontFamily();
    this.b =false;
    this.i =false;
    this.strike =false;
    this.outline =false ;
    this.shadow =false ;
    this.condense ;
    this.color=new Color();//
    this.sz=0 ;
    this.u= new UnderlineValues().none;// 下划线
    this.vertAlign=new VerticalAlignFontProperty();//
    this.scheme=new FontScheme();//Boolean
   };

   ParseFromXml(xml){

    this.ParseFromXml=function(xml){
      if(xml.rFont._val!=null)
        this.rFont =xml.rFont._val;
      if(xml.charset!=null&&xml.charset._val!=null)
        this.charset=parseInt(xml.charset._val); //int
      if(xml.b!=null)
          this.b=true;
      if(xml.i!=null)
          this.i=true;
      if(xml.u!=null) {
         if(xml.u=='')
           this.u='single';
          else
           this.u=xml.u._val;
      }

      if(xml.strike!=null)
        this.strike=true;//Boolean
      if(xml.outline!=null)
        this.outline=true;//Boolean
      if(xml.condense!=null)
        this.condense=true;//Boolean
      if(xml.extend!=null)
        this.extend=true;//Boolean

      this.sz=parseInt(xml.sz._val);//
      if(xml.family!=null)
        this.family.ParseFromXml(xml.schfamilyeme);
      else
        this.family=null;
      if(xml.scheme!=null)
        this.scheme.ParseFromXml(xml.scheme);
      else
        this.scheme=null;
      if(xml.color!=null)
        this.color.ParseFromXml(xml.color);
      else
      this.color=null;
      if(xml.vertAlign!=null)
        this.vertAlign.ParseFromXml(xml.vertAlign);
      else
      this.vertAlign=null;

   }
}

}
