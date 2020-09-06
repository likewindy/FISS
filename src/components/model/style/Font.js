import Color from './Color.js';
import FontFamily from './FontFamily.js';
import VerticalAlignFontProperty from './VerticalAlignFontProperty.js';
import FontScheme from './FontScheme.js';
import UnderlineValues from './UnderlineValues.js';


export default class Font {
  constructor() {
    /*<xsd:complexType name="CT_Font">
        <xsd:choice maxOccurs="unbounded">
            <xsd:element name="name" type="CT_FontName" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="charset" type="CT_IntProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="family" type="CT_FontFamily" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="b" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="i" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="strike" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="outline" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="shadow" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="condense" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="extend" type="CT_BooleanProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="color" tfont
            ype="CT_Color" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="sz" type="CT_FontSize" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="u" type="CT_UnderlineProperty" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="vertAlign" type="CT_VerticalAlignFontProperty" minOccurs="0"
            maxOccurs="1"/>
            <xsd:element name="scheme" type="CT_FontScheme" minOccurs="0" maxOccurs="1"/>
        </xsd:choice>
    </xsd:complexType>*/
      this.name ='';    //string
      this.charset=''; //int
      this.family= new FontFamily();
      this.b=false;//Boolean  Dispalys characters in bold face font style
      this.i=false;//Boolean  Dispalys characters in Italic face font style
      this.strike=false;//Boolean  删除线
      this.outline=false;//Boolean
      this.condense=false;//Boolean
      this.extend=false;//Boolean
      this.color=new Color();//
      this.sz=12;//=new FontSize(11);//
      this.u= new UnderlineValues().none;// 下划线
      this.vertAlign=new VerticalAlignFontProperty();//
      this.scheme=new FontScheme();//Boolean
     }

      copy(){
        var font=new Font();
        font.name=this.name;
        font.family= this.family==null ? null:this.family.copy();
        font.b=this.b;
        font.i=this.i;
        font.strike=this.strike;
        font.outline=this.outline;
        font.condense=this.condense;
        font.color=this.color==null ? null:this.color.copy();
        font.sz=this.sz;
        font.u = typeof(this.u) == "undefined"   ? null:this.u;
        font.vertAlign=this.vertAlign==null ? null:this.vertAlign.copy();
        font.scheme=this.scheme==null ? null:this.scheme.copy();
        return font;
      }
      ParseFromXml(xml){
        if(xml.name._val!=null)
          this.name =xml.name._val;
        if(xml.charset!=null && xml.charset._val!=null)
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

