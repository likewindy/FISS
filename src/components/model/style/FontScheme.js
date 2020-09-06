

export default class FontScheme {
  constructor() {


       /*<xsd:complexType name="CT_FontScheme">
        <xsd:attribute name="val" type="ST_FontScheme" use="required"/>
        </xsd:complexType>*/
      this.val ;
  }
      copy(){
        var fontScheme=new FontScheme();

        fontScheme.val=this.val;

        return fontScheme;
      }
      ParseFromXml(xml){
        if(xml._val!=null)
          this.val =xml._val;
      }
      SetVal(fontSchemeDefine){
             this.val=fontSchemeDefine;
      }
}



