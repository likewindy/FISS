 /*
        {numFmtId:0,formatCode:'General'},
        {numFmtId:1,formatCode:'0'},
        {numFmtId:2,formatCode:'0.00'},
        {numFmtId:3,formatCode:'#,##0'},
        {numFmtId:4,formatCode:'#,##0.00'},
        {numFmtId:9,formatCode:'0%'},
        {numFmtId:10,formatCode:'0.00%'},
        {numFmtId:11,formatCode:'0.00E+00'},
        {numFmtId:12,formatCode:'# ?/?'},
        {numFmtId:13,formatCode:'# ??/??'},
        {numFmtId:14,formatCode:'yyyy/mm/dd'},
        {numFmtId:15,formatCode:'d-mmm-yy'},
        {numFmtId:16,formatCode:'d-mmm'},
        {numFmtId:17,formatCode:'mmm-yy'},
        {numFmtId:18,formatCode:'h:mm AM/PM'},
        {numFmtId:19,formatCode:'h:mm:ss AM/PM'},
        {numFmtId:20,formatCode:'h:mm'},
        {numFmtId:21,formatCode:'h:mm:ss'},
        {numFmtId:22,formatCode:'m/d/yy h:mm'},
        {numFmtId:37,formatCode:'h:mm:ss'},
        {numFmtId:38,formatCode:'#,##0 ;[Red](#,##0)'},
        {numFmtId:39,formatCode:'#,##0.00;(#,##0.00)'},
        {numFmtId:40,formatCode:'#,##0.00;[Red](#,##0.00)'},
        {numFmtId:45,formatCode:'mm:ss'},
        {numFmtId:46,formatCode:'[h]:mm:ss'},
        {numFmtId:47,formatCode:'mmss.0'},
        {numFmtId:48,formatCode:'##0.0E+0'},
        {numFmtId:49,formatCode:'@'},
          zh-cn fromatcode
        {numFmtId:27,formatCode:'yyyy年m月'},
        {numFmtId:28,formatCode:'m月d日'},
        {numFmtId:29,formatCode:'m月d日'},
        {numFmtId:30,formatCode:'m-d-yy'},
        {numFmtId:31,formatCode:'yyyy年m月d日'},
        {numFmtId:32,formatCode:'h时mm分'},
        {numFmtId:33,formatCode:'h时mm分ss秒'},
        {numFmtId:34,formatCode:'上午/下午 h时mm分'},
        {numFmtId:35,formatCode:'上午/下午 h时mm分ss秒'}
 */


import Color from '../model/style/Color';

export default class FormatString {
  constructor(fissv,drawCell) {
      this.numFmt ='';
      this.fissv=fissv;
      this.drawCell=drawCell;
    }
    fromat(text,xf){
        if(text==null ) return '';
        var formatText=text.toString();
        var numFmtId=2;
        if(xf!=null)
        numFmtId =xf.numFmtId;

            this.numFmt=this.fissv.fiss.fissM.styles.numFmts.GetnumFmtByID(numFmtId);
            if (this.numFmt.numFmtId==0)
               return formatText;
            else if(this.numFmt.numFmtId==1)
               return Math.round(parseFloat(text));
            else if(this.numFmt.numFmtId==14) {
                return this.formatYMDTime(parseInt(text),this.numFmt.formatCode);
            }
            else {

              var retobject=this.FormatNumber(text,this.numFmt.formatCode,this.drawCell.width)
              if(this.drawCell.alignment.horizontal==null|| this.drawCell.alignment.horizontal==''||this.drawCell.alignment.horizontal=='left')
                  this.drawCell.alignment.horizontal='right';
              var color =new  Color();
              color.rgb=retobject.textColor;
              this.drawCell.cellfont.color=color;
              return retobject.fromatText;

            }

        return formatText;
      }

    FormatNumber(formatText,formatCode,width){
        var retObject={
            desc:'',
            oriText: formatText,
            formatCode: formatCode,
            cellWidth:width,
            fromatText:'',
            textColor:'#000000',
            plusMinus:1 // 1>0 0=0 -1<0
        };
        var fromatArray=formatCode.toString().split(';')
        var fromatLength=fromatArray.length;
        try{
         var tflo=Number(formatText.toString());
         if(tflo==0)
           retObject.plusMinus=0;
         else if(tflo<0)
           retObject.plusMinus=-1;
         if(fromatLength==1){
           this.FormatText(retObject,formatText,fromatArray[0],width,2);
         }else if(fromatLength==2){
           if(tflo>=0)
            this.FormatText(retObject,formatText,fromatArray[0],width,2);
          else
            this.FormatText(retObject,formatText,fromatArray[1],width,2);
         }else if(fromatLength>=3){
          if(tflo>0)
           this.FormatText(retObject,formatText,fromatArray[0],width,2);
         else if (tflo==0)
           this.FormatText(retObject,formatText,fromatArray[2],width,2);
         else
           this.FormatText(retObject,formatText,fromatArray[3],width,2);
         }
        }catch(err) {
          if(fromatLength==4){
             retObject.fromatText=this.FormatText(retObject,formatText,fromatArray[3],width,1);
          }else{
            retObject.desc='未定义文本的格式代码！';
          }
        }
        return retObject;
      }
       //type ==1 文本 ==2 数字
     FormatText(retObject,formatText,fromatCode,width,type){
        var sfromatCode=fromatCode.toString();
        //颜色处理
        if(sfromatCode.indexOf('[')!=-1){
          var color=sfromatCode.substr(sfromatCode.indexOf('[')+1,sfromatCode.indexOf(']')-1);
          retObject.textColor=color;
          sfromatCode=sfromatCode.replace('['+color+']','');
        }
        if(sfromatCode.indexOf('General')>0){
          retObject.fromatText=formatText;
          return ;
        }
        var numFmtChar=this.replaceCharPlace(sfromatCode);
        numFmtChar= this.repalceDoubelQuotationmarks(numFmtChar);
        if(type==2){
          var indexdot=numFmtChar.indexOf('.');
          var indexper=numFmtChar.indexOf('%');
          var indexE=numFmtChar.indexOf('E');
          var rightPadE='';
          if (indexper!=-1){
            formatText=Number(formatText.toString())*100+'';
            numFmtChar=numFmtChar.replace('%','');
          }
          if (indexE!=-1){
            var posNumber= parseInt(formatText.toString());
            var poslengt= posNumber>0 ? posNumber.toString().length:(-posNumber).toString().length;
            rightPadE=poslengt-1>10 ? poslengt-1+'': '0'+(poslengt-1);
            formatText=this.diviNumber(Number(formatText.toString()),poslengt-1);
            var indexEFmt=numFmtChar.indexOf('E');
            numFmtChar=numFmtChar.substr(0,indexEFmt);
            sfromatCode=sfromatCode.replace('E+00','E+'+rightPadE);
          }
          var postnumFmtChar=numFmtChar;
          var decimalPartFormat='';
          var posPartFromat='';
          if(indexdot!=-1)
          {
             var decimalFmtChar= numFmtChar.substr(indexdot+1);
             postnumFmtChar=postnumFmtChar.replace('.'+decimalFmtChar,'');
             decimalPartFormat=this.FromatDecimalPart(decimalFmtChar,formatText);
             if(decimalPartFormat==null|decimalPartFormat.length==0)
              decimalPartFormat='';
             else
               decimalPartFormat='.'+decimalPartFormat;
          }
          posPartFromat=this.FromatPostPart(postnumFmtChar,formatText);
          retObject.fromatText=posPartFromat+ decimalPartFormat ;
        }
        var aaaaa='111';
        sfromatCode=this.repalceDoubelQuotationmarks(sfromatCode);
        retObject.fromatText=sfromatCode.replace(numFmtChar,retObject.fromatText);
        retObject.fromatText=this.repalceShowPlacechar(retObject.fromatText);

         // _处理
        //Skips the width of the next character
       // sfromatCode=this.SkipNextChar(sfromatCode);
        retObject.fromatText=this.repalceShowlesschar(retObject.fromatText);
        if (retObject.fromatText.indexOf('(')==-1 && retObject.plusMinus<0)
          retObject.fromatText='-'+retObject.fromatText;

           // \ 符号处理
        //Displays the next character in the format. The application shall not display the backslash.
        //sfromatCode=sfromatCode.replace('\\','')
        retObject.fromatText= retObject.fromatText.replace('\\','');


         // * 符号
        //Repeats the next character in the format enough times to fill the column to its current width.
        var indexrepet=retObject.fromatText.indexOf('*');
        if(indexrepet!=-1){
          var  repetchar=retObject.fromatText[indexrepet+1];
          if(formatText=='6965172978.49'){
            var aaaa;
          }
          var nowwidth=this.fissv.ctx.measureText(retObject.fromatText).width
          if(width!=null&& (width-nowwidth)>0){
            var  rettxext=this.repeatChart(repetchar,width-nowwidth);
            retObject.fromatText=retObject.fromatText.replace('*'+repetchar,rettxext);
          }
          else
            retObject.fromatText=retObject.fromatText.replace('*'+repetchar,'');
        }
         // / 符号处理 分数
           //If this symbol is preceded and followed by a number symbol (0, #, and ?), it is interpreted as the fraction format
          //前面和后面都是数字符号
           //else 解释为正斜杠字符并显示为正斜杠字符

        //"text" 处理
        //Displays whatever text is inside the quotation mark

        // @符号 处理
        //Text placeholder. replace
        //sfromatCode=sfromatCode.replace('@',formatText);


        //retObject.fromatText=formatText;
      }
      repeatChart(repetchar,leftwidth){
           var ret='';
           var onecharWidth=this.fissv.ctx.measureText(repetchar).width;
           var asteriskWidth=this.fissv.ctx.measureText('*').width;
           var padlength=parseInt((leftwidth+asteriskWidth)/onecharWidth ) ;
           for(var n=0;n<padlength;n++){
             ret=ret+repetchar;
          }
          return ret;
      }

      diviNumber(number,times){
        if(times<1) return 0;
        for(var n=0;n<times;n++){
          number=number/10;
        }
        return number;
      }
      FromatDecimalPart(decimalFmtChar,formatText){
        var textIndexdot=formatText.toString().indexOf('.');
        if(textIndexdot!=-1){
           var decimalPartText=formatText.toString().substr(textIndexdot+1);
           var  decimalNumber=  Number('0.'+decimalPartText);
           return decimalNumber.toFixed(decimalFmtChar.length).toString().replace('0.','');

        }else{
           return new Array(decimalFmtChar.length + 1).join('0',  '');
        }
        return '';
      }
      FromatPostPart(postnumFmtChar,formatText){
        formatText=formatText.toString().replace('-','');
        var textIndexdot=formatText.toString().indexOf('.');
        var  posPartText=formatText;
        if(textIndexdot!=-1)
           posPartText=formatText.toString().substr(0,textIndexdot);
        var tret= posPartText.replace(/\d{1,3}(?=(\d{3})+$)/g,function(s){
          return s+','
         })
        return tret;
      }

     repalceDoubelQuotationmarks(formatCode){
        var rep='"';
          for(;;)
          {
            var tindex=formatCode.indexOf(rep);
            if(tindex==-1) break;
            formatCode=formatCode.replace(rep,'');
          }
        return formatCode;

      }
      repalceDoubelchar(formatCode){
        var repDoubleCharArray=['_','*'];

        for(var n=0;n<repDoubleCharArray.length;n++){
          var rep=repDoubleCharArray[n];
          formatCode=this.SkipNextChar(formatCode,rep);
        }
        return formatCode;

      }


      repalceShowlesschar(formatCode){
        var repArray=['\\'];//$-+():space
        for( var n=0;n<repArray.length;n++){

          var rep=repArray[n];
          for(;;)
          {
            var tindex=formatCode.indexOf(rep);
            if(tindex==-1) break;
            formatCode=formatCode.replace(rep,'');
          }
        }
        return formatCode;
      }

      repalceShowPlacechar(formatCode){
        var repArray=['_'];//$-+():space
        for(var n=0;n<repArray.length;n++){

          var rep=repArray[n];
          for(;;)
          {
            var tindex=formatCode.indexOf(rep);
            if(tindex==-1) break;
            var repace=rep+formatCode[tindex+1];
            formatCode=formatCode.replace(repace,' ');
          }
        }
        return formatCode;
      }

      replaceUselesschar(formatCode){
        var repArray=['$','-','+',':',' ','(',')','!','^','&','~','{','}','>','<','=','\\'];//$-+():space
        for( var n=0;n<repArray.length;n++){

          var rep=repArray[n];
          for(;;)
          {
            var tindex=formatCode.indexOf(rep);
            if(tindex==-1) break;
            formatCode=formatCode.replace(rep,'');
          }
        }
        return formatCode;
      }
      replaceCharPlace(formatCode){

        formatCode= this.repalceDoubelchar(formatCode);
        formatCode=this.replaceUselesschar(formatCode);

        for(;;){
          var index=formatCode.indexOf('"')
          if(index==-1) break;
          var nextindex=formatCode.indexOf('"',index+1);
          if(nextindex==-1) break;
          var reptext=formatCode.substr(index,nextindex);
          formatCode=formatCode.replace(new RegExp(reptext,'gm'),'');
        }
        return formatCode;
      }

      SkipNextChar(fromatCode,rep){
          for(;;){
            var index=fromatCode.indexOf(rep)
            if(index<0) break;
            fromatCode=fromatCode.replace(rep+fromatCode[index+1],'')
          }
          return fromatCode;
      }

      formatYMDTime(text,formatCode){
        var unixTime = new Date('1970-1-1');
        var startYearMD = new Date('1900-1-1');
        var iDays = Math.floor((unixTime-startYearMD) / (24 * 3600 * 1000));
        var crtTime = new Date((text-iDays-2)* 24 * 3600 * 1000);
        this.drawCell.alignment.horizontal='right';
        return this.dateFtt(formatCode,crtTime);
      }
      dateFtt(fmt,date)   { //author: meizz
        var o = {
          "M+" : date.getMonth()+1,                 //月份
          "d+" : date.getDate(),                    //日
          "h+" : date.getHours(),                   //小时
          "m+" : date.getMinutes(),                 //分
          "s+" : date.getSeconds(),                 //秒
          "q+" : Math.floor((date.getMonth()+3)/3), //季度
          "S"  : date.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
          fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
          if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      }

  }
