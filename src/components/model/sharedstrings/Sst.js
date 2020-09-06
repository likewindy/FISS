/*
     <xsd:element name="sst" type="CT_Sst"/>
        <xsd:complexType name="CT_Sst">
        <xsd:sequence>
        <xsd:element name="si" type="CT_Rst" minOccurs="0" maxOccurs="unbounded"/>
        <xsd:element name="extLst" minOccurs="0" type="CT_ExtensionList"/>
        </xsd:sequence>
        <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
        <xsd:attribute name="uniqueCount" type="xsd:unsignedInt" use="optional"/>
     </xsd:complexType>
    */
import Rst from "./Rst.js";

export default class Sst {
  constructor() {
    this.si = []; //Rst
    this.extLst;
    this.count = 0;
    this.uniqueCount = 0;
  }

  ParseFromXml(xml) {
    if (xml == null) return;
    var acount = parseInt(xml._count);
    if (acount == 1) {
      var rst = new Rst();
      rst.ParseFromXml(xml.si);
      this.AddSi(rst);
    } else {
      for (var n = 0; n < acount; n++) {
        var rst = new Rst();
        rst.ParseFromXml(xml.si[n]);
        this.AddSi(rst);
      }
    }
  }
  AddSi(rst) {
    for(var n=0;n<this.si.length;n++)
    {
        var trst=this.si[n];
        if(trst.t!=null && trst.t==rst.t)
          return n;
    }
    this.si.push(rst);
    this.count++;
    return this.count - 1;
  }
  GetSi(index) {
    if (index > this.count) return null;
    return this.si[index];
  }
}
