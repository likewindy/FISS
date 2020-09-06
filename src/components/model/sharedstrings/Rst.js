import RElt from './RElt.js';

export default class Rst {
  constructor() {
    this.t ;  // This element represents the text content shown as part of a string.
    this.r =[]; //Rich Text Run( RElt )
    this.rPh =[];//  //This element represents a run of text which displays a phonetic hint for this String Item (si).
    this.phoneticPr; //This element represents a collection of phonetic properties that affect the display of phonetic text for this String Item (si).

   };
  getAllRText(){
    if (this.r.length!=0) {
      var returntspring='';
      for(var n=0;n<this.r.length;n++){
        var rElt=this.r[n];
        if(rElt.t!=null){
          if (typeof rElt.t =='string')
          returntspring=returntspring+rElt.t;
          else
          returntspring=returntspring+' ';
        }

      }
      return returntspring;
    }else
     return '';
  }
  ParseFromXml(xml){
    if(xml==null) return;
    if(xml.t!=null)
      this.t=xml.t;
    if(xml._t!=null)
      this.t=xml._t;
    if (xml.r!=null) {
      var acount=parseInt(xml.r.length);
	    this.t = null;
      for(var n=0;n<acount;n++){
      var relt=new RElt();
      relt.ParseFromXml(xml.r[n]);
      this.r.push(relt);
      }
    }
  }

  AddR(r){
    this.r.push(r);
  }

  AddRPh(rPh){
    this.rPh.push(rPh);
  }

}
