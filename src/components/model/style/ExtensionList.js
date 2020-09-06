
export default class ExtensionList {
  constructor() {
    /*
    <xsd:group name="EG_ExtensionList">
        <xsd:sequence>
          <xsd:element name="ext" type="CT_Extension" minOccurs="0" maxOccurs="unbounded"/>
     </xsd:sequence>
    </xsd:group>
    */
      this.ext =[];
      this.AddExt=function(ExtensionList){
        this.ext.push(ExtensionList);
      }
    }
}
