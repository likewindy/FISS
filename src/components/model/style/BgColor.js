


 export default class BgColor {
  constructor() {
        /* <xsd:attribute name="auto" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="indexed" type="xsd:unsignedInt" use="optional"/>
        <xsd:attribute name="rgb" type="ST_UnsignedIntHex" use="optional"/>
        <xsd:attribute name="theme" type="xsd:unsignedInt" use="optional"/>
         <xsd:attribute name="tint" type="xsd:double" use="optional" default="0.0"/>*/

           /* <xsd:attribute name="auto" type="xsd:boolean" use="optional"/>
           A boolean value indicating the color is automatic and system color dependent*/

           this.auto;

           /*<xsd:attribute name="indexed" type="xsd:unsignedInt" use="optional"/>
           Indexed color value. Only used for backwards compatibility. References a color in
                indexedColors.
            */
           this.indexed=0;


            /*<xsd:attribute name="rgb" type="ST_UnsignedIntHex" use="optional"/>
           Standard Alpha Red Green Blue color value (ARGB)
            */
           this.rgb='';


            /*<xsd:attribute name="theme" type="xsd:unsignedInt" use="optional"/>
            A zero-based index into the <clrScheme> collection (§20.1.6.2), referencing a particular
                <sysClr> or <srgbClr> value expressed in the Theme part
            */
           this.theme=0;



            /*<xsd:attribute name="tint" type="xsd:unsignedInt" use="optional"/> */
           this.tint=0;

  }



}



