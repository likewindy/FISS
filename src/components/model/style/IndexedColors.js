
import RgbColor from './RgbColor.js';

export default class IndexedColors {
    /*
    <xsd:complexType name="CT_IndexedColors">
    <xsd:sequence>
         <xsd:element name="rgbColor" type="CT_RgbColor" minOccurs="1" maxOccurs="unbounded"/>
    </xsd:sequence>
    </xsd:complexType>
    */



    AddRgbColor(RgbColor){
       this.rgbColor.push(RgbColor);
    }

    constructor(position) {
      this.rgbColor =[];
      this.rgbColor.push(new RgbColor('#000000'));
      this.rgbColor.push(new RgbColor('#FFFFFF'));
      this.rgbColor.push(new RgbColor('#FF0000'));
      this.rgbColor.push(new RgbColor('#00FF00'));
      this.rgbColor.push(new RgbColor('#0000FF'));
      this.rgbColor.push(new RgbColor('#FFFF00'));
      this.rgbColor.push(new RgbColor('#FF00FF'));
      this.rgbColor.push(new RgbColor('#00FFFF'));  //7
      this.rgbColor.push(new RgbColor('#000000'));  //8白
      this.rgbColor.push(new RgbColor('#FFFFFF'));  // 9黑
      this.rgbColor.push(new RgbColor('#FF0000'));  //10

      //10
      this.rgbColor.push(new RgbColor('#00FF00'));  //1
      this.rgbColor.push(new RgbColor('#0000FF'));  //2
      this.rgbColor.push(new RgbColor('#FFFF00'));  //3
      this.rgbColor.push(new RgbColor('#FF00FF'));  //4
      this.rgbColor.push(new RgbColor('#00FFFF'));  //5
      this.rgbColor.push(new RgbColor('#800000'));  //6
      this.rgbColor.push(new RgbColor('#008000'));  //7
      this.rgbColor.push(new RgbColor('#000080'));  //8
      this.rgbColor.push(new RgbColor('#808000'));  //9
      this.rgbColor.push(new RgbColor('#800080'));  //0


      //20
      this.rgbColor.push(new RgbColor('#008080'));  //1
      this.rgbColor.push(new RgbColor('#C0C0C0'));  //2
      this.rgbColor.push(new RgbColor('#808080'));  //3
      this.rgbColor.push(new RgbColor('#9999FF'));  //4
      this.rgbColor.push(new RgbColor('#993366'));  //5
      this.rgbColor.push(new RgbColor('#FFFFCC'));  //6
      this.rgbColor.push(new RgbColor('#CCFFFF'));  //7
      this.rgbColor.push(new RgbColor('#660066'));  //8
      this.rgbColor.push(new RgbColor('#FF8080'));  //9
      this.rgbColor.push(new RgbColor('#0066CC'));  //0



      //30
      this.rgbColor.push(new RgbColor('#CCCCFF'));  //1
      this.rgbColor.push(new RgbColor('#000080'));  //2
      this.rgbColor.push(new RgbColor('#FF00FF'));  //3
      this.rgbColor.push(new RgbColor('#FFFF00'));  //4
      this.rgbColor.push(new RgbColor('#00FFFF'));  //5
      this.rgbColor.push(new RgbColor('#800080'));  //6
      this.rgbColor.push(new RgbColor('#800000'));  //7
      this.rgbColor.push(new RgbColor('#008080'));  //8
      this.rgbColor.push(new RgbColor('#0000FF'));  //9
      this.rgbColor.push(new RgbColor('#00CCFF'));  //0


      //40
      this.rgbColor.push(new RgbColor('#CCFFFF'));  //1
      this.rgbColor.push(new RgbColor('#CCFFCC'));  //2
      this.rgbColor.push(new RgbColor('#FFFF99'));  //3
      this.rgbColor.push(new RgbColor('#99CCFF'));  //4
      this.rgbColor.push(new RgbColor('#FF99CC'));  //5
      this.rgbColor.push(new RgbColor('#CC99FF'));  //6
      this.rgbColor.push(new RgbColor('#FFCC99'));  //7
      this.rgbColor.push(new RgbColor('#3366FF'));  //8
      this.rgbColor.push(new RgbColor('#33CCCC'));  //9
      this.rgbColor.push(new RgbColor('#99CC00'));  //0

      //50
      this.rgbColor.push(new RgbColor('#FFCC00'));  //1
      this.rgbColor.push(new RgbColor('#FF9900'));  //2
      this.rgbColor.push(new RgbColor('#FF6600'));  //3
      this.rgbColor.push(new RgbColor('#666699'));  //4
      this.rgbColor.push(new RgbColor('#969696'));  //5
      this.rgbColor.push(new RgbColor('#003366'));  //6
      this.rgbColor.push(new RgbColor('#339966'));  //7
      this.rgbColor.push(new RgbColor('#003300'));  //8
      this.rgbColor.push(new RgbColor('#333300'));  //9
      this.rgbColor.push(new RgbColor('#993300'));  //0

      //60
      this.rgbColor.push(new RgbColor('#993366'));  //1
      this.rgbColor.push(new RgbColor('#333399'));  //2
      this.rgbColor.push(new RgbColor('#333333'));  //3
      //indexed="64"  System Foreground
      //indexed="65"  System Background
    }

    }
