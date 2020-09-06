
import Font from './Font';

export default class Fonts {
  constructor() {
    /*<xsd:complexType name="CT_Fonts">
        <xsd:sequence>
         <xsd:element name="font" type="CT_Font" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
      <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
        </xsd:complexType>*/
      this.font=[];
      this.count=0;
  }

      ParseFromXml(xml){
        var acount=parseInt(xml._count);
        for(var n=0;n<acount;n++){
          var font=new Font();
          font.ParseFromXml(xml.font[n]);
          this.AddFont(font);
        }
      }
      AddFont(font){
        for(var n=0;n<this.font.length;n++)
        {
            var tfont=this.font[n];
            if( Object.is(tfont,font))
              return n;
        }
        this.font.push(font);
        this.count++;
        return this.count-1;
      }
      GetFontByID(id){
        var idd=parseInt(id);
        return  this.font[idd].copy();
      }
  }
