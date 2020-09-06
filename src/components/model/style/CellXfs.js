
    /*
    <xsd:complexType name="CT_CellXfs">
    <xsd:sequence>
        <xsd:element name="xf" type="CT_Xf" minOccurs="1" maxOccurs="unbounded"/>
        </xsd:sequence>
    <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>

    */

   import Xf from './Xf';

export default class CellXfs {
  constructor() {
      this.xfs =[];
      this.count =0; //unsignedInt
  }

      ParseFromXml(xml){
        var acount=parseInt(xml._count);
        if(acount==1){
          var xf=new Xf();
          xf.ParseFromXml(xml.xf);
          this.AddXf(xf);
          return ;
        }
        for(var n=0;n<acount;n++){
          var xf=new Xf();
          xf.ParseFromXml(xml.xf[n]);
          this.AddXf(xf);
        }
      }

      AddXf(xf){
        for(var n=0;n<this.xfs.length;n++)
        {
            var txf=this.xfs[n];
            if(Object.is(txf,xf) )
              return n;
        }
        this.xfs.push(xf);
        this.count++;
        return this.count-1;
      }
      GetCellStyle(index){
         if(this.xfs.length-1>=index)
           return this.xfs[index];
         else (this.xfs.length=index)
         return this.xfs[0];

      }
    }
