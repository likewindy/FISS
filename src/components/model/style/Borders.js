

import Border from './Border.js';

export default class Borders {
  constructor() {

    /*
     <xsd:complexType name="CT_Borders">
        <xsd:sequence>
            <xsd:element name="border" type="CT_Border" minOccurs="0" maxOccurs="unbounded"/>
        </xsd:sequence>
        <xsd:attribute name="count" type="xsd:unsignedInt" use="optional"/>
    </xsd:complexType>*/

      this.borders =[];
      this.count=0;
  }

      ParseFromXml(xml){
        var acount=parseInt(xml._count);
        for(var n=0;n<acount;n++){
          var border=new Border();
          border.ParseFromXml(xml.border[n]);
          this.AddBorder(border);
        }
      }
      AddBorder(border){
        for(var n=0;n<this.borders.length;n++)
        {
            var tborder=this.borders[n];
            if(Object.is(tborder,border) )
              return n;
        }
        this.borders.push(border);
        this.count++;
        return this.count-1;
      }
      GetBorderByID(id){
        var idd=parseInt(id);
        return  this.borders[idd];
      }
}
