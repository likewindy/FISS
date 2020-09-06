    /*
  */

 export default class MergeCell {
   constructor() {


        /*<xsd:attribute name="ref" type="ST_Ref" use="required"/> */
        this.ref='';
   }
    GetRef(){
            return this.ref;
         }
          SetRef(ref){
            this.ref=ref;
         }
          ParseFromXml(xml){
            if(xml._ref!=null)
             this.ref=xml._ref;
         }
}
