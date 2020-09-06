export default class SubFunChain  {
  constructor( ) {
    this.functionString='';
    this.functionName='';
    this.functionPram='';
    this.bHaveSubFun= false;
    this.SubFunChain= [];
  }
  Cacl(ActiveSheet, range, value,sheetname){
    var ret;
    if(!this.bHaveSubFun){
      let callstring='ActiveSheet.fiss.addin.'+this.functionName+'.'+this.functionName;
       if(typeof(eval('ActiveSheet.fiss.addin.'+this.functionName)) == "object"){
           ret= eval(callstring)( this.functionPram,sheetname,ActiveSheet, range, value );
          //console.log('此函数返回!'+ret);
       }else
       console.log('此函数未在该应用注册!'+this.functionName);
    }
   return ret;
  }
}
