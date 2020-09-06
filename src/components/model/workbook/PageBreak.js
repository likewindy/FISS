import Break from './Break.js';

export default class PageBreak {
  constructor() {
    /*
   <xsd:sequence>
     <xsd:element name="brk" type="CT_Break" minOccurs="0" maxOccurs="unbounded"/>
  </xsd:sequence>
  <xsd:attribute name="count" type="xsd:unsignedInt" use="optional" default="0"/>
  <xsd:attribute name="manualBreakCount" type="xsd:unsignedInt" use="optional" default="0"/>
    */
    this.brk = [];
    this.count = 0;
    this.manualBreakCount = 0;
  }

  ParseFromXml(xml) {
    if (xml._manualBreakCount != null) this.manualBreakCount = parseInt(xml._manualBreakCount);

    if (Array.isArray(xml.brk)) {
      var rowl = parseInt(xml.brk.length);
      for (var rrr = 0; rrr < rowl; rrr++) {
        var pagebreak = new Break();
        var xmlrow = xml.brk[rrr];
        pagebreak.ParseFromXml(xmlrow);
        this.brk.push(pagebreak);
      }
    } else {
      var pagebreak = new Break();
      pagebreak.ParseFromXml(xml.brk);
      this.brk.push(pagebreak);
    }
    this.count = this.brk.length;

  }

}
