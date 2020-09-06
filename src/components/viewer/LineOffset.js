
export default class LineOffset {
  constructor (fissv) {
    this.fissv=fissv;
  }
  GetStartDashHeight(borderPr,row,col,dashType){
        var returnHeight=0.0;
        for(var temprow=row-1;;temprow--){
            if(temprow==0) return null;
            var start=this.fissv.drawCell.GetCellBorderPr(temprow,col,'start');
            if(start!=null){
                var borderStyle=start.borderStyle.toString().replace("medium","").toLowerCase();
                if(borderStyle==dashType){
                    returnHeight=returnHeight+this.fissv.GetRowHeight(temprow);
                return returnHeight+this.GetStartDashHeight(borderPr,temprow,col,dashType);
                }
            }
            var end=this.fissv.drawCell.GetCellBorderPr(temprow,col-1,'end');
            if(end==null) return null;
            var endborderStyle=end.borderStyle.toString().replace("medium","").toLowerCase();
            if(endborderStyle==dashType){
                returnHeight=returnHeight+this.fissv.GetRowHeight(temprow);
                return returnHeight+this.GetStartDashHeight(borderPr,temprow,col,dashType);
            }else
            return null;
        }
  }
  GetEndDashHeight(borderPr,row,col,dashType){
            var returnHeight=0.0;
            for(var temprow=row-1;;temprow--){
                if(temprow==0) return null;
                var start=this.fissv.drawCell.GetCellBorderPr(temprow,col,'end');
                if(start!=null){
                    var borderStyle=start.borderStyle.toString().replace("medium","").toLowerCase();
                if(borderStyle==dashType){
                    returnHeight=returnHeight+this.fissv.GetRowHeight(temprow);
                    return returnHeight+this.GetStartDashHeight(borderPr,temprow,col,dashType);
                    }
                }
                var end=this.fissv.drawCell.GetCellBorderPr(temprow,col+1,'start');
                if(end==null) return null;
                var endborderStyle=end.borderStyle.toString().replace("medium","").toLowerCase();
                if(endborderStyle==dashType){
                    returnHeight=returnHeight+this.fissv.GetRowHeight(temprow);
                    return returnHeight+this.GetStartDashHeight(borderPr,temprow,col,dashType);
                }else
                return null;
            }
        }
    GetTopDashWidth(borderPr,row,col,dashType){
            var returnWidth=0.0;
            for(var tempcol=col-1;;tempcol--){
                if(tempcol=0) return null;
                var top=this.fissv.drawCell.GetCellBorderPr(row,tempcol,'top');
                if(top!=null){
                    var borderStyle=top.borderStyle.toString().replace("medium","").toLowerCase();
                    if(borderStyle==dashType){
                    returnWidth=returnWidth+this.fissv.GetColWidth(tempcol);
                    return returnWidth+this.GetTopDashWidth(borderPr,row,tempcol,dashType);
                    }
                }
                var end=this.fissv.drawCell.GetCellBorderPr(row-1,tempcol,'bottom');
                if(end==null) return null;
                    var endborderStyle=end.borderStyle.toString().replace("medium","").toLowerCase();
                if(endborderStyle==dashType){
                    returnWidth=returnWidth+this.fissv.GetColWidth(tempcol);
                    return returnWidth+this.GetTopDashWidth(borderPr,row,tempcol,dashType);
                }else
                    return null;
            }
        }
      GetBottomDashWidth(borderPr,row,col,dashType){
            var returnWidth=0.0;
            for(var tempcol=col-1;;tempcol--){
                if(tempcol=0) return null;
                var top=this.fissv.drawCell.GetCellBorderPr(row,tempcol,'bottom');
                if(top!=null){
                    var borderStyle=top.borderStyle.toString().replace("medium","").toLowerCase();
                    if(borderStyle==dashType){
                        returnWidth=returnWidth+this.fissv.GetColWidth(tempcol);
                    return returnWidth+this.GetTopDashWidth(borderPr,row,tempcol,dashType);
                    }
                }
                var end=this.fissv.drawCell.GetCellBorderPr(row+1,tempcol,'top');
                if(end==null) return null;
                    var endborderStyle=end.borderStyle.toString().replace("medium","").toLowerCase();
                if(endborderStyle==dashType){
                     returnWidth=returnWidth+this.fissv.GetColWidth(tempcol);
                    return returnWidth+this.GetTopDashWidth(borderPr,row,tempcol,dashType);
                }else
                    return null;
            }
        }
      DashOffset(borderPr,type,row,col,dashType,dashLength){
            if(dashLength==null) return -1;
                var toff=0.0;
            if(dashType=='dashdotdot')
                toff=dashLength%22;
            else if (dashType=='hair')
             toff=dashLength%2;
            else if (dashType=='dashed')
                toff=dashLength%6;
            else if (dashType=='dotted')
                toff=dashLength%4;
            else if (dashType=='dashDot')
                toff=dashLength%16;
            return toff==0 ? 0 : toff;

        }
       CaclDashOffset(borderPr,type,row,col,dashType){
            var dashLength=0.0;
            if(type=='start'){
                dashLength=this.GetStartDashHeight(borderPr,row,col,dashType);
            }else if(type=='top'){
                dashLength=this.GetTopDashWidth(borderPr,row,col,dashType);
            }else if(type=='end'){
                dashLength=this.GetEndDashHeight(borderPr,row,col,dashType);
            }else if(type=='bottom'){
                dashLength=this.GetBottomDashWidth(borderPr,row,col,dashType);
            }
            return this.DashOffset(borderPr,type,row,col,dashType,dashLength);
        }
}
