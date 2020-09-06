
export default class FontFamily {
  constructor() {

    /*<xsd:simpleType name="ST_FontFamily">
        <xsd:restriction base="xsd:integer">
        <xsd:minInclusive value="0"/>
        <xsd:maxInclusive value="14"/>
    </xsd:restriction>
    </xsd:simpleType>*/
      this.val;
  }

       copy(){
        var fontFamily=new FontFamily();
        fontFamily.val=this.val;
        return fontFamily;
      }

      ParseFromXml(xml){
        if (xml==null) return;
        if(xml._val!=null)
          this.val =parseInt(xml._val);
      }
      SetVal(val){
        if(val>=0 && val <=14)
             this.val=val;
      }

 }



