

export default class Color {
  constructor() {
    /* <xsd:attribute name="auto" type="xsd:boolean" use="optional"/>
    <xsd:attribute name="indexed" type="xsd:unsignedInt" use="optional"/>
    <xsd:attribute name="rgb" type="ST_UnsignedIntHex" use="optional"/>
    <xsd:attribute name="theme" type="xsd:unsignedInt" use="optional"/>
    <xsd:attribute name="tint" type="xsd:double" use="optional" default="0.0"/>*/
        this.auto=false;
        /*<xsd:attribute name="indexed" type="xsd:unsignedInt" use="optional"/>
        Indexed color value. Only used for backwards compatibility. References a color in
             indexedColors.
         */
        this.indexed=-1;

         /*<xsd:attribute name="rgb" type="ST_UnsignedIntHex" use="optional"/>
        Standard Alpha Red Green Blue color value (ARGB)
         */
        this.rgb='';

         /*<xsd:attribute name="theme" type="xsd:unsignedInt" use="optional"/>
         A zero-based index into the <clrScheme> collection (§20.1.6.2), referencing a particular
             <sysClr> or <srgbClr> value expressed in the Theme part
         */
        this.theme=-1;

         /*<xsd:attribute name="tint" type="xsd:unsignedInt" use="optional"/>
         a double from -1.0 .. 1.0, where -1.0 means 100% darken and 1.0 means 100% lighten. Also, 0.0 means no change.
         */
        this.tint=0;
  }

        copy(){
            var color=new Color();
            color.auto=this.auto;
            color.indexed=this.indexed;
            color.rgb=this.rgb;
            color.theme=this.theme;
            color.tint=this.tint;
            return color;
          }

        ParseFromXml(xml){
            if(xml==null){
                return;
            }
            if(xml._auto!=null&&xml._auto=='1')
                this.auto=true;
            if(xml._indexed!=null)
                this.indexed=parseInt(xml._indexed);
            if(xml._rgb!=null)
                this.rgb='#'+xml._rgb.toString().substr(2);
            if(xml._theme!=null)
                this.theme=parseInt(xml._theme);
            if(xml._tint!=null)
                this.tint=parseFloat(xml._tint);

        }
}
