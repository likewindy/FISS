
import Fill from './Fill';

export default class Fills {
  constructor() {
    /*<xsd:complexType name="CT_Fills">
        <xsd:sequence>
            <xsd:element name="fill" type="CT_Fill" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
        <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
        </xsd:complexType>*/
      this.fill=[];
      this.count=0;
  }
      ParseFromXml(xml){
        var acount=parseInt(xml._count);
        for(var n=0;n<acount;n++){
          var fill=new Fill();
          fill.ParseFromXml(xml.fill[n]);
          this.AddFill(fill);
        }
      }
    AddFill(Fill){
        for(var n=0;n<this.fill.length;n++)
        {
            var tfill=this.fill[n];
            if( Object.is(tfill,Fill))

              return n;
        }
        this.fill.push(Fill);
        this.count++;
        return this.count-1;
      }
    GetFill(id){
        var iid=parseInt(id);
        return this.fill[iid];
      }
}
