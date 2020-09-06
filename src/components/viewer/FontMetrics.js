
export default class FontMetrics {
  constructor () {
      this.padding=0; ;
      this.context={} ;
      this.canvas={};
      this.testchars ={
        capHeight: 'S',
        baseline: 'n',
        xHeight: 'x',
        descent: 'p',
        ascent: 'h',
        tittle: 'i'
      };
      this.canvas = document.createElement('canvas');
      this.context =this.canvas.getContext('2d');
    }


    setFont(fontFamily, fontSize, fontWeight){
        this.padding = fontSize * 0.5
        this.canvas.width = fontSize * 2
        this.canvas.height = fontSize * 2 + this.padding
        this.context.font = `${fontWeight} ${fontSize}px ${fontFamily}`
        this.context.textBaseline = 'top'
        this.context.textAlign = 'center'
      }

    setAlignment(baseline){
        if(baseline==null) baseline= 'top';
        const ty = baseline === 'bottom' ? this.canvas.height : 0
        this.context.setTransform(1, 0, 0, 1, 0, ty)
        this.context.textBaseline = baseline
      }
     updateText(text){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillText(text, this.canvas.width / 2, this.padding, this.canvas.width)
      }
     computeLineHeight(){
        var  letter = 'A'
        this.setAlignment('bottom')
        var  gutter = this.canvas.height - this.measureBottom(letter)
        this.setAlignment('top')
        return this.measureBottom(letter) + gutter
      }
      computeChineseLineHeight(){
        var  letter = '土'
        this.setAlignment('bottom')
        var  gutter = this.canvas.height - this.measureBottom(letter)
        this.setAlignment('top')
        return this.measureBottom(letter) + gutter
      }
      getPixels(text){
        this.updateText(text)
        return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height).data
      }
      getFirstIndex(pixels){
        for (let i = 3, n = pixels.length; i < n; i += 4) {
            if (pixels[i] > 0) return (i - 3) / 4
        }
        return pixels.length
      }
      getLastIndex(pixels){
        for (let i = pixels.length - 1; i >= 3; i -= 4) {
            if (pixels[i] > 0) return i / 4
          }
          return 0
      }
      measureTop(text){
        return  Math.round(this.getFirstIndex(this.getPixels(text)) / this.canvas.width ) - this.padding ;
      }
      measureBottom(text){
        return  Math.round(this.getLastIndex(this.getPixels(text)) / this.canvas.width) - this.padding
      }

      getMetrics(fontFamily, fontSize, fontWeight){
         this.setFont(fontFamily, fontSize, fontWeight);
          return {
            capHeight: this.measureTop(this.testchars.capHeight),
            baseline: this.measureBottom(this.testchars.baseline),
           // chinabaseline: this.measureBottom(this.testchars.chinabaseline),
            xHeight: this.measureTop(this.testchars.xHeight),
            descent: this.measureBottom(this.testchars.descent),
            bottom: this.computeLineHeight(),
            //chinesebottom: this.computeChineseLineHeight(),
            ascent: this.measureTop(this.testchars.ascent),
            tittle: this.measureTop(this.testchars.tittle),
            top: 0
            //baseCenterDiff:this.measureBottom(this.testchars.baseline)-this.computeLineHeight()/2
           // baseChineseCenterDiff:this.measureBottom(this.testchars.chinabaseline)-this.computeChineseLineHeight()/2
          };
      }
 }

