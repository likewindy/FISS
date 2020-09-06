    /*
  */

 import Cell from './Cell.js';

 export default class Row {
   constructor() {
       /*
        <xsd:sequence>
            <xsd:element name="c" type="CT_Cell" minOccurs="0" maxOccurs="unbounded"/>
            <xsd:element name="extLst" minOccurs="0" type="CT_ExtensionList"/>
        </xsd:sequence>*/
        this.cells=[];
        /*<xsd:attribute name="r" type="xsd:unsignedInt" use="optional"/>*/
        this.r=0;
        /*<xsd:attribute name="spans" type="ST_CellSpans" use="optional"/>*/
        this.spans='';
        /*<xsd:attribute name="s" type="xsd:unsignedInt" use="optional" default="0"/>*/
        this.s=0;
        /*<xsd:attribute name="customFormat" type="xsd:boolean" use="optional" default="false"/>*/
        this.customFormat=false;
        /*<xsd:attribute name="ht" type="xsd:double" use="optional"/>*/
        this.ht=null;
        /*<xsd:attribute name="hidden" type="xsd:boolean" use="optional" default="false"/>*/
        this.hidden=false;
        /*<xsd:attribute name="customHeight" type="xsd:boolean" use="optional" default="false"/>*/
        this.customHeight=false;
        /*<xsd:attribute name="outlineLevel" type="xsd:unsignedByte" use="optional" default="0"/>*/
        this.outlineLevel=false;
        /*<xsd:attribute name="collapsed" type="xsd:boolean" use="optional" default="false"/>*/
        this.collapsed=false;
        /*<xsd:attribute name="thickTop" type="xsd:boolean" use="optional" default="false"/>*/
        this.thickTop=false;
        /*<xsd:attribute name="thickBot" type="xsd:boolean" use="optional" default="false"/>*/
        this.thickBot=false;
        /*<xsd:attribute name="ph" type="xsd:boolean" use="optional" default="false"/>*/
        this.ph=false;
   }
		   AddCell(cell){
            var reg=/[0-9]+/g;
            var addcell=cell.r.toString().replace(reg,'');
            for(var icol=0;icol<this.cells.length;icol++)
		    	{

                var tempcell=this.cells[icol];
                var havecell=tempcell.r.toString().replace(reg,'');

				if(havecell.toString() > addcell.toString() )
				{
                    this.cells.splice(icol,0,cell);
					return ;
				}
				else if(havecell.toString()==addcell.toString()){
                    //替换
                    this.cells.splice(icol,1,cell);
					return ;
				}
			}
			// empty add  or last add row
            this.cells.push(cell);
		};
        ParseFromXml(xml){
         this.r=parseInt(xml._r);
         this.spans=xml._spans;
         if(xml._s!=null)
           this.s=parseInt(xml._s);
         if(xml._customFormat!=null)
           this.customFormat=xml._customFormat;
         if(xml._ht!=null)
           this.ht=parseFloat(xml._ht);
         if(xml._hidden!=null)
            this.hidden=xml._hidden;
         if(xml._customHeight!=null)
            this.customHeight=xml._customHeight;
         if(xml._outlineLevelt!=null)
            this.outlineLevel=xml._outlineLevel;
         if(xml._collapsed!=null)
            this.collapsed=xml._collapsed;
         if(xml._thickTop!=null)
            this.thickTop=xml._thickTop;
         if(xml._thickBot!=null)
            this.thickBot=xml._thickBot;
         if(xml._ph!=null)
            this.ph=xml._ph;
         if(xml.c!=null)
         if(xml.c.length==null){
            var cell=new Cell();
                var xmlrcell=xml.c;
                cell.ParseFromXml(xmlrcell);
                this.AddCell(cell);
         }else {
            for(var c=0;c<xml.c.length;c++){
               var cell=new Cell();
               var xmlrcell=xml.c[c];
               cell.ParseFromXml(xmlrcell);
               this.AddCell(cell);
           }
         }
  	  };
}
