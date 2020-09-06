export default class NumFmt {
  constructor() {
    /*<xsd:complexType name="CT_NumFmt">
        <xsd:attribute name="numFmtId" type="ST_NumFmtId" use="required"/>
        <xsd:attribute name="formatCode" type="s:ST_Xstring" use="required"/>
    </xsd:complexType>*/
      this.numFmtId ='';
      this.formatCode='';
  }
      ParseFromXml(xml){
        if(xml._numFmtId!=null)
          this.numFmtId =parseInt(xml._numFmtId);
        if(xml._formatCode!=null)
          this.formatCode =xml._formatCode;
      }
    }

