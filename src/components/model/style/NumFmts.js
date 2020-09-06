
import NumFmt from './NumFmt';

export default class NumFmts {
  constructor() {
    var   allFormat=[
      {numFmtId:0,formatCode:'General'},
      {numFmtId:1,formatCode:'0'},
      {numFmtId:2,formatCode:'0.00'},
      {numFmtId:3,formatCode:'#,##0'},
      {numFmtId:4,formatCode:'#,##0.00'},
      {numFmtId:9,formatCode:'0%'},
      {numFmtId:10,formatCode:'0.00%'},
      {numFmtId:11,formatCode:'0.00E+00'},
      {numFmtId:12,formatCode:'# ?/?'},
      {numFmtId:13,formatCode:'# ??/??'},
      {numFmtId:14,formatCode:'yyyy/M/d'},
      {numFmtId:15,formatCode:'d-mmm-yy'},
      {numFmtId:16,formatCode:'d-mmm'},
      {numFmtId:17,formatCode:'mmm-yy'},
      {numFmtId:18,formatCode:'h:mm AM/PM'},
      {numFmtId:19,formatCode:'h:mm:ss AM/PM'},
      {numFmtId:20,formatCode:'h:mm'},
      {numFmtId:21,formatCode:'h:mm:ss'},
      {numFmtId:22,formatCode:'m/d/yy h:mm'},
      {numFmtId:37,formatCode:'h:mm:ss'},
      {numFmtId:38,formatCode:'#,##0 ;[Red](#,##0)'},
      {numFmtId:39,formatCode:'#,##0.00;(#,##0.00)'},
      {numFmtId:40,formatCode:'#,##0.00;[Red](#,##0.00)'},
      {numFmtId:45,formatCode:'mm:ss'},
      {numFmtId:46,formatCode:'[h]:mm:ss'},
      {numFmtId:47,formatCode:'mmss.0'},
      {numFmtId:48,formatCode:'##0.0E+0'},
      {numFmtId:49,formatCode:'@'},
      /* zh-cn fromatcode  */
      {numFmtId:27,formatCode:'yyyy年m月'},
      {numFmtId:28,formatCode:'m月d日'},
      {numFmtId:29,formatCode:'m月d日'},
      {numFmtId:30,formatCode:'m-d-yy'},
      {numFmtId:31,formatCode:'yyyy年m月d日'},
      {numFmtId:32,formatCode:'h时mm分'},
      {numFmtId:33,formatCode:'h时mm分ss秒'},
      {numFmtId:34,formatCode:'上午/下午 h时mm分'},
      {numFmtId:35,formatCode:'上午/下午 h时mm分ss秒'}
    ];

    /*<xsd:complexType name="CT_NumFmts">
        <xsd:sequence>
        <xsd:element name="numFmt" type="CT_NumFmt" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
        <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
        </xsd:complexType>*/
     this.numFmt=[];
     this.count=0;
     for(var n=0;n<allFormat.length;n++)
     {
       var tnumFmt=allFormat[n];
       var  numFmt=new NumFmt();
       numFmt.numFmtId=parseInt(tnumFmt.numFmtId);
       numFmt.formatCode=tnumFmt.formatCode;
        this.AddNumFmt(numFmt);
      }
   }
     ParseFromXml(xml){
        var acount=parseInt(xml._count);
        for(var n=0;n<acount;n++){
          var numFmt=new NumFmt();
          numFmt.ParseFromXml(xml.numFmt[n]);
         this.AddNumFmt(numFmt);
        }
      }
     AddNumFmt(numFmt){
        for(var n=0;n<this.numFmt.length;n++)
        {
            var tnumFmt=this.numFmt[n];
            if(tnumFmt.numFmtId==numFmt.numFmtId)
              return n;
        }
       this.numFmt.push(numFmt);
       this.count++;
       return this.count-1;
      }
     GetnumFmtByID(id){
        for(var n=0;n<this.numFmt.length;n++)
        {
            var tnumFmt=this.numFmt[n];
            if(tnumFmt.numFmtId==id)
              return this.numFmt[n];
        }
        return null;
      }

  }
