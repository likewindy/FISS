
export default class DrawDoubleLine {
  constructor(drawCell) {
    this.drawCell=drawCell
    this.fissv=drawCell.fissv;
  }

   DrawLine(startx,starty,height,width,borderPr,type,row,col,xf){
        //out line
        var retrectOut=this.CaclOutCoordinate(startx,starty,height,width,borderPr,type,row,col,xf)
        var tstrokeStyle  = this.fissv.ctx.strokeStyle;
        this.fissv.ctx.beginPath();
        this.fissv.ctx.moveTo(retrectOut.x1,retrectOut.y1);
        this.fissv.ctx.lineTo(retrectOut.x2,retrectOut.y2);
        this.fissv.ctx.stroke();
        //while line
        var retrectWhile=this.drawCell.CaclCoordinate('',startx,starty,height,width,borderPr,type,row,col,xf)
        this.fissv.ctx.strokeStyle='#FFFFFF';

        this.fissv.ctx.beginPath();
        this.fissv.ctx.moveTo(retrectWhile.x1,retrectWhile.y1);
        this.fissv.ctx.lineTo(retrectWhile.x2,retrectWhile.y2);
        this.fissv.ctx.stroke();
       //inner line
        var retrectIn=this.CaclInCoordinate(startx,starty,height,width,borderPr,type,row,col,xf)
        this.fissv.ctx.strokeStyle=tstrokeStyle;
        this.fissv.ctx.beginPath();
        this.fissv.ctx.moveTo(retrectIn.x1,retrectIn.y1);
        this.fissv.ctx.lineTo(retrectIn.x2,retrectIn.y2);
        this.fissv.ctx.stroke();
    }
   //这里计算绘制的开始和结束坐标
   CaclOutCoordinate(startx,starty,height,width,borderPr,type,row,col,xf){

    var retcor={
        x1:0,
        y1:0,
        x2:0,
        y2:0
    };
    if(type=='start'){
         if(!this.CheckDoubleBorder(row,col-1,'end')){
            var subendy=0;
            var substarty=0;

            if( !this.CheckDoubleBorder(row,col,'top') && !this.CheckDoubleBorder(row-1,col,'bottom') &&
                !this.CheckDoubleBorder(row,col-1,'top') && !this.CheckDoubleBorder(row-1,col-1,'bottom') &&
                !this.CheckDoubleBorder(row-1,col-1,'end') && !this.CheckDoubleBorder(row-1,col,'start'))
                substarty=2;
            else if(this.CheckDoubleBorder(row,col-1,'top')||this.CheckDoubleBorder(row-1,col-1,'bottom'))
               substarty=2;


            if( !this.CheckDoubleBorder(row,col,'bottom') && !this.CheckDoubleBorder(row+1,col,'top') &&
                !this.CheckDoubleBorder(row+1,col,'start') && !this.CheckDoubleBorder(row+1,col-1,'end') &&
                !this.CheckDoubleBorder(row,col-1,'bottom') && !this.CheckDoubleBorder(row+1,col-1,'top'))
                subendy=2;

             else if(this.CheckDoubleBorder(row,col-1,'bottom')||this.CheckDoubleBorder(row+1,col-1,'top'))
                subendy=2;
             else if(this.CheckDoubleBorder(row,col,'bottom')||this.CheckDoubleBorder(row+1,col,'top'))
                subendy=0;
             else if(this.CheckDoubleBorder(row-1,col,'end')||this.CheckDoubleBorder(row-1,col+1,'start'))
                subendy=2;


             retcor.x1=startx-2+0.5;
             retcor.x2=retcor.x1;
             retcor.y1=starty-2+substarty;
             retcor.y2=starty+height+1-subendy;
         }
    }else if(type=='top'){
     if(!this.CheckDoubleBorder(row-1,col,'bottom')){
        var subendx=0;
        var substartx=0;

        if( !this.CheckDoubleBorder(row,col,'start') && !this.CheckDoubleBorder(row,col-1,'end') &&
        !this.CheckDoubleBorder(row,col-1,'top') && !this.CheckDoubleBorder(row-1,col-1,'bottom') &&
        !this.CheckDoubleBorder(row-1,col-1,'end') && !this.CheckDoubleBorder(row-1,col,'start'))
          substartx=1;
        else if(this.CheckDoubleBorder(row-1,col,'start')||this.CheckDoubleBorder(row-1,col-1,'end'))
           substartx=2;


        if( !this.CheckDoubleBorder(row,col,'end') && !this.CheckDoubleBorder(row,col+1,'start') &&
           !this.CheckDoubleBorder(row-1,col,'start') && !this.CheckDoubleBorder(row-1,col+1,'end') &&
           !this.CheckDoubleBorder(row,col+1,'top') && !this.CheckDoubleBorder(row-1,col+1,'bottom'))
              subendx=-2;
        else if(this.CheckDoubleBorder(row-1,col,'end')||this.CheckDoubleBorder(row-1,col+1,'start'))
              subendx=-2;


         retcor.x1=startx-1+substartx;
         retcor.x2=startx+width+1+subendx;
         retcor.y1=starty-2+0.5;
         retcor.y2=retcor.y1;
     }
    }else if(type=='end'){
     if(!this.CheckDoubleBorder(row,col+1,'start')){

        var substarty=0;
        var subendy=0;
        if(     !this.CheckDoubleBorder(row,col,'top') && !this.CheckDoubleBorder(row-1,col,'bottom') &&
                !this.CheckDoubleBorder(row-1,col,'end') && !this.CheckDoubleBorder(row-1,col+1,'start') &&
                !this.CheckDoubleBorder(row,col+1,'top') && !this.CheckDoubleBorder(row-1,col+1,'bottom'))
            substarty=2;
        else if(this.CheckDoubleBorder(row,col+1,'top') || this.CheckDoubleBorder(row-1,col+1,'bottom'))
           substarty=2;

       if( !this.CheckDoubleBorder(row,col,'bottom') && !this.CheckDoubleBorder(row+1,col,'top') &&
           !this.CheckDoubleBorder(row+1,col,'end') && !this.CheckDoubleBorder(row+1,col+1,'start') &&
           !this.CheckDoubleBorder(row,col+1,'bottom') && !this.CheckDoubleBorder(row+1,col+1,'top'))
           subendy=2;
       else if(this.CheckDoubleBorder(row,col,'bottom')||this.CheckDoubleBorder(row+1,col,'top'))
           subendy=0;
       else if(this.CheckDoubleBorder(row+1,col,'top')||this.CheckDoubleBorder(row,col,'bottom'))
           subendy=2;

         retcor.x1=startx+width+1-0.5;
         retcor.x2=retcor.x1;
         retcor.y1=starty-2+substarty;
         retcor.y2=starty+height+1-subendy;
     }

    }else if(type=='bottom'){

     if(!this.CheckDoubleBorder(row+1,col,'top')){
        var subendx=0;
        var substartx=0;
        if( !this.CheckDoubleBorder(row,col,'start') && !this.CheckDoubleBorder(row,col-1,'end') &&
        !this.CheckDoubleBorder(row,col-1,'bottom') && !this.CheckDoubleBorder(row+1,col-1,'top') &&
        !this.CheckDoubleBorder(row+1,col,'start') && !this.CheckDoubleBorder(row+1,col-1,'end'))
           substartx=1;
        else if(this.CheckDoubleBorder(row,col,'start') || this.CheckDoubleBorder(row,col-1,'end'))
           substarty=0;

        else if(this.CheckDoubleBorder(row-1,col,'start')||this.CheckDoubleBorder(row-1,col-1,'end'))
           substartx=1;

        if( !this.CheckDoubleBorder(row,col,'end') && !this.CheckDoubleBorder(row,col+1,'start') &&
        !this.CheckDoubleBorder(row,col+1,'top') && !this.CheckDoubleBorder(row+1,col+1,'bottom') &&
        !this.CheckDoubleBorder(row+1,col,'end') && !this.CheckDoubleBorder(row+1,col+1,'start'))
             subendx=-2;
        else if(this.CheckDoubleBorder(row,col,'end')||this.CheckDoubleBorder(row,col+1,'start'))
             subendx=-1;

         retcor.x1=startx-1+substartx;
         retcor.x2=startx+width+1+subendx;
         retcor.y1=starty+height+1-0.5;
         retcor.y2=retcor.y1;
     }
    }
    return retcor;
}
  CaclInCoordinate(startx,starty,height,width,borderPr,type,row,col,xf){
    var retcor={
        x1:0,
        y1:0,
        x2:0,
        y2:0
    };
    if(type=='start'){
        var subendy=0;
        var substarty=0;
        if(this.CheckDoubleBorder(row,col,'top') || this.CheckDoubleBorder(row-1,col,'bottom') )
             substarty=0;
        else if(this.CheckDoubleBorder(row-1,col,'start') || this.CheckDoubleBorder(row-1,col-1,'end')){
             substarty=-1;
         }else  if(this.CheckDoubleBorder(row,col-1,'top') ||  this.CheckDoubleBorder(row-1,col-1,'bottom')) {
             substarty=-2;
        }

        if( !this.CheckDoubleBorder(row,col,'bottom') && !this.CheckDoubleBorder(row+1,col,'top') &&
        !this.CheckDoubleBorder(row+1,col,'start') && !this.CheckDoubleBorder(row+1,col-1,'end') &&
         (this.CheckDoubleBorder(row,col-1,'bottom') || this.CheckDoubleBorder(row+1,col-1,'top')) )
            subendy=1;



         retcor.x1=startx+0.5;
         retcor.x2=retcor.x1;
         retcor.y1=starty+substarty;
         retcor.y2=starty+height-1+subendy;
    }else if(type=='top'){
        var subx=0;

        var subendx=0;
        if (this.CheckDoubleBorder(row,col,'start') || this.CheckDoubleBorder(row,col-1,'end') )
            subx=0;
        else if (this.CheckDoubleBorder(row,col-1,'top') || this.CheckDoubleBorder(row-1,col-1,'bottom'))
           subx=-2;
        else if (this.CheckDoubleBorder(row-1,col,'start') || this.CheckDoubleBorder(row-1,col-1,'end'))
            subx=-2;

        if( !this.CheckDoubleBorder(row,col,'end') && !this.CheckDoubleBorder(row,col+1,'start') &&
            !this.CheckDoubleBorder(row-1,col,'end') && !this.CheckDoubleBorder(row-1,col+1,'start') &&
            !this.CheckDoubleBorder(row,col+1,'top') && !this.CheckDoubleBorder(row-1,col+1,'bottom'))
            subendx=1;
         else if(this.CheckDoubleBorder(row,col,'end')||this.CheckDoubleBorder(row,col+1,'start'))
            subendx=0;
         else if(this.CheckDoubleBorder(row-1,col,'end')||this.CheckDoubleBorder(row-1,col+1,'start'))
            subendx=3;

        retcor.x1=startx+subx;
        retcor.x2=startx+width-2+subendx;
        retcor.y1=starty+0.5;
        retcor.y2=retcor.y1;
    }else if(type=='end'){
        var substarty=0;
        if(this.CheckDoubleBorder(row,col,'top') || this.CheckDoubleBorder(row-1,col,'bottom') )
               substarty=0;
        else if(this.CheckDoubleBorder(row-1,col,'end') || this.CheckDoubleBorder(row-1,col+1,'start')){
                substarty=-1;
        }else  if(this.CheckDoubleBorder(row,col+1,'top') ||  this.CheckDoubleBorder(row-1,col+1,'bottom')) {
                substarty=-2;
        }
        var subendy=0;

        if( !this.CheckDoubleBorder(row,col,'bottom') && !this.CheckDoubleBorder(row+1,col,'top') &&
        !this.CheckDoubleBorder(row+1,col,'start') && !this.CheckDoubleBorder(row+1,col-1,'end') &&
         (this.CheckDoubleBorder(row,col+1,'bottom') || this.CheckDoubleBorder(row+1,col+1,'top')) )
            subendy=1;

         retcor.x1=startx+width-2+0.5;
         retcor.x2=retcor.x1;
         retcor.y1=starty+substarty;
         retcor.y2=starty+height-1+subendy;
    }else if(type=='bottom'){
        var subendx=0;

        var subx=0;
        if (this.CheckDoubleBorder(row,col,'start') || this.CheckDoubleBorder(row,col-1,'end') )
            subx=0;
        else if (this.CheckDoubleBorder(row,col-1,'bottom') || this.CheckDoubleBorder(row+1,col-1,'top'))
             subx=-2;
        else if (this.CheckDoubleBorder(row+1,col,'start') || this.CheckDoubleBorder(row+1,col-1,'end'))
            subx=-2;

        var subendx=0;
            if( !this.CheckDoubleBorder(row,col,'end') && !this.CheckDoubleBorder(row,col+1,'start') &&
            !this.CheckDoubleBorder(row+1,col,'end') && !this.CheckDoubleBorder(row+1,col+1,'start') &&
            !this.CheckDoubleBorder(row,col+1,'top') && !this.CheckDoubleBorder(row-1,col+1,'bottom'))
            subendx=1;
         else if(this.CheckDoubleBorder(row,col,'end')||this.CheckDoubleBorder(row,col+1,'start'))
            subendx=0;
        else if(this.CheckDoubleBorder(row+1,col,'end')||this.CheckDoubleBorder(row+1,col+1,'start'))
            subendx=3;

         retcor.x1=startx+subx;
         retcor.x2=startx+width-2+subendx;
         retcor.y1=starty+height-2+0.5;
         retcor.y2=retcor.y1;
    }
    return retcor;
}
  CheckDoubleBorder(row,col,type){
        var borderp= this.drawCell.GetCellBorderPr(row,col,type);
        if(borderp==null) return false;
        var borderStyle=borderp.borderStyle;

        if(borderStyle.indexOf('double')>-1){
            return true;
        }
        return false;
    }
}
