export default class PageSize {
  constructor() {
    this.pageSize=[];
    this.init();

  }

  getPageSize(value) {
     for (var n = 0; n < this.pageSize.length; n++) {
       var tempsize=this.pageSize[n];
       if(tempsize.Value==value)
         return tempsize;
     }
     return {ps:'A4 paper',unit:'mm',Width:210,Height:297,Value:9,pdfname:'a4'};
  }
  init(){
    this.pageSize.push({ps:'Letter paper',unit:'in',Width:8.5,Height:11,Value:1,pdfname:''})
    this.pageSize.push({ps:'A3 paper',unit:'mm',Width:210,Height:420,Value:8,pdfname:'a3'})
    this.pageSize.push({ps:'A4 paper',unit:'mm',Width:210,Height:297,Value:9,pdfname:'a4'})
    /*
    Paper Size Width Height Value
    Letter paper 8.5 in .11 in .1
    Legal paper 8.5 in .14 in .5
    Standard paper 10 in .11 in .45
    Standard paper 10 in .14 in .16
    Standard paper 11 in .17 in .17
    Standard paper 15 in .11 in .46
    Standard paper 9 in .11 in .44
    SuperA / SuperA / A4 paper 227 mm 356 mm 57
    A2 paper 420 mm 594 mm 66
    A3 paper 297 mm 420 mm 8
    A3 extra paper 322 mm 445 mm 63
    A3 extra transverse paper 322 mm 445 mm 68
    A3 transverse paper 297 mm 420 mm 67
    A4 paper 210 mm 297 mm 9
    A4 extra paper 236 mm 322 mm 53
    A4 plus paper 210 mm 330 mm 60
    A4 transverse paper 210 mm 297 mm 55
    A4 small paper 210 mm 297 mm 10
    A5 paper 148 mm 210 mm 11
    A5 extra paper 174 mm 235 mm 64
    A5 transverse paper 148 mm 210 mm 61
    SuperB / SuperB / A3 paper 305 mm 487 mm 58
    B4 paper 250 mm 353 mm 12
    B5 paper 176 mm 250 mm 13
    ISO B5 extra paper 201 mm 276 mm 65
    JIS B5 transverse paper 182 mm 257 mm 62
    C paper 17 in .22 in .24
    D paper 22 in .34 in .25
    #10 envelope 4.125 in. 9.5 in. 20
    # 11 envelope 4.5 in .10.375 in .21
    #12 envelope 4.75 in. 11 in. 22
    # 14 envelope 5 in .11.5 in .23
    #9 envelope 3.875 in. 8.875 in. 19
    B4 envelope 250 mm 353 mm 33
    B5 envelope 176 mm 250 mm 34
    B6 envelope 176 mm 125 mm 35
    C3 envelope 324 mm 458 mm 29
    C4 envelope 229 mm 324 mm 30
    C5 envelope 162 mm 229 mm 28
    C6 envelope 114 mm 162 mm 31
    C65 envelope 114 mm 229 mm 32
    DL envelope 110 mm 220 mm 27
    Invite envelope 220 mm 220 mm 47
    Italy envelope 110 mm 230 mm 36
    Monarch envelope 3.875 in. 7.5 in.). 37
    6 3/4 envelope 3.625 in. 6.5 in. 38
    E paper 34 in. 44 in. 26
    Executive paper 7.25 in. 10.5 in. 7
    German legal fanfold 8.5 in. 13 in. 41
    German standard fanfold 8.5 in. 12 in. 40
    US standard fanfold 14.875 in. 11 in. 39
    Folio paper 8.5 in. 13 in. 14
    ISO B4 250 mm 353 mm 42
    Japanese double postcard 200 mm 148 mm 43
    Ledger paper 17 in. 11 in. 4
    Legal extra paper 9.275 in. 15 in. 51
    Letter extra paper 9.275 in. 12 in. 50
    Letter extra transverse
    paper 9.275 in. 12 in. 56
    Letter plus paper 8.5 in. 12.69 in. 59
    Letter transverse paper 8.275 in. 11 in. 54
    Letter small paper 8.5 in. 11 in. 2
    Note paper 8.5 in. 11 in. 18
    Quarto paper 215 mm 275 mm 15
    Statement paper 5.5 in. 8.5 in. 6
    Tabloid paper 11 in. 17 in. 3
    Tabloid extra paper 11.69 in. 18 in. 52
    */
  }



};
