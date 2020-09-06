    /*

  */

 export default class Col {
   constructor(min,max) {


        /* <xsd:attribute name="min" type="xsd:unsignedInt" use="required"/>*/
        this.min=min;

        /*  <xsd:attribute name="max" type="xsd:unsignedInt" use="required"/>*/
        this.max=max;

        /*  <xsd:attribute name="width" type="xsd:double" use="optional"/>*/
        this.width=0.0;

        /*  <xsd:attribute name="style" type="xsd:unsignedInt" use="optional" default="0"/>*/
        this.style=0;

        /*  <xsd:attribute name="hidden" type="xsd:boolean" use="optional" default="false"/>*/
        this.hidden=false;

        /*  <xsd:attribute name="bestFit" type="xsd:boolean" use="optional" default="false"/>*/
        this.bestFit=false;

        /*  <xsd:attribute name="customWidth" type="xsd:boolean" use="optional" default="false"/>*/
        this.customWidth=false;

        /*  <xsd:attribute name="outlineLevel" type="xsd:unsignedByte" use="optional" default="0"/>*/
        this.outlineLevel=0;

         /*  <xsd:attribute name="phonetic" type="xsd:boolean" use="optional" default="false"/>*/
        this.phonetic=false;

        /*  <xsd:attribute name="collapsed" type="xsd:boolean" use="optional" default="false"/>*/
        this.collapsed=false;
   }
      ParseFromXml(xml){
            if(xml._min!=null)
              this.min=parseInt(xml._min);
            if(xml._max!=null)
            this.max=parseInt(xml._max);

            if(xml._width!=null)
              this.width=parseFloat(xml._width);

            if(xml._style!=null)
            this.style=parseInt(xml._style);

            if(xml._hidden!=null&&xml._hidde=='1')
              this.hidden=true;

             if(xml._bestFit!=null&&xml._bestFit=='1')
              this.bestFit=true;

             if(xml._customWidth!=null&&xml._customWidth=='1')
               this.customWidth=true;

             if(xml._outlineLevel!=null)
              this.outlineLevel=parseInt(xml._outlineLevel);

              if(xml._phonetic!=null&&xml._phonetic=='1')
                 this.phonetic=true;
             if(xml._collapsed!=null&&xml._collapsed=='1')
              this.collapsed=true;

     }

	}
