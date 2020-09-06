


export default class VerticalAlignFontProperty {
  constructor() {
    /*<xsd:complexType name="CT_VerticalAlignFontProperty">
        <xsd:attribute name="val" type="s:ST_VerticalAlignRun" use="required"/>
        </xsd:complexType>*/

      this.val ;    //string
     }
      copy(){
        var verticalAlignFontProperty=new VerticalAlignFontProperty();
        verticalAlignFontProperty.val=this.val;

        return verticalAlignFontProperty;
      }
      SetVal(val){
             this.val=val;
      }
}



