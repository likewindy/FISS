import NumFmts from './NumFmts.js';
import Fonts from './Fonts.js';
import Fills from './Fills.js';
import Borders from './Borders.js';
import CellStyleXfs from './CellStyleXfs.js';
import CellXfs from './CellXfs.js';
import CellStyles from './CellStyles.js';
import Dxfs from './Dxfs.js';
import Colors from './Colors.js';
import ExtensionList from './ExtensionList.js';

export default class Stylesheets {
  constructor() {
    /*
    <xsd:complexType name="CT_Stylesheet">
    <xsd:sequence>
        <xsd:element name="numFmts" type="CT_NumFmts" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="fonts" type="CT_Fonts" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="fills" type="CT_Fills" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="borders" type="CT_Borders" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="cellStyleXfs" type="CT_CellStyleXfs" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="cellXfs" type="CT_CellXfs" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="cellStyles" type="CT_CellStyles" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="dxfs" type="CT_Dxfs" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="tableStyles" type="CT_TableStyles" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="colors" type="CT_Colors" minOccurs="0" maxOccurs="1"/>
        <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence>
    </xsd:complexType>
    */
       this.numFmts =new NumFmts();
       this.fonts =new  Fonts();
       this.fills  =new Fills();
       this.borders =new Borders();
       this.cellStyleXfs =new CellStyleXfs();
       this.cellXfs =new  CellXfs();

       this.cellStyles=new CellStyles() ;
       this.dxfs =new  Dxfs();
        //this.tableStyles;//暂时不实现
        this.colors=new Colors();
        this.extLst =new ExtensionList() ;
    }
     ParseFromXml(xml){
          this.numFmts.ParseFromXml(xml.numFmts);
          this.fonts.ParseFromXml(xml.fonts);
          this.fills.ParseFromXml(xml.fills);
          this.borders.ParseFromXml(xml.borders);
          this.cellStyleXfs.ParseFromXml(xml.cellStyleXfs);
          if(xml.cellXfs!=null)
            this.cellXfs.ParseFromXml(xml.cellXfs);
          //this.cellStyles.ParseFromXml(xml.cellStyles);
          //this.dxfs.ParseFromXml(xml.dxfs);
	      }
    }

