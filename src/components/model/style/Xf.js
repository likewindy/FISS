
import CellAlignment from './CellAlignment.js';
import CellProtection from './CellProtection.js';
import ExtensionList from './ExtensionList.js';

export default class Xf {
  constructor() {
    /*
    <xsd:complexType name="CT_Xf">
        <xsd:sequence>
            <xsd:element name="alignment" type="CT_CellAlignment" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="protection" type="CT_CellProtection" minOccurs="0" maxOccurs="1"/>
            <xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
        </xsd:sequence>
        <xsd:attribute name="numFmtId" type="ST_NumFmtId" use="optional"/>
        <xsd:attribute name="fontId" type="ST_FontId" use="optional"/>
        <xsd:attribute name="fillId" type="ST_FillId" use="optional"/>
        <xsd:attribute name="borderId" type="ST_BorderId" use="optional"/>
        <xsd:attribute name="xfId" type="ST_CellStyleXfId" use="optional"/>
        <xsd:attribute name="quotePrefix" type="xsd:boolean" use="optional" default="false"/>
        <xsd:attribute name="pivotButton" type="xsd:boolean" use="optional" default="false"/>
        <xsd:attribute name="applyNumberFormat" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="applyFont" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="applyFill" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="applyBorder" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="applyAlignment" type="xsd:boolean" use="optional"/>
        <xsd:attribute name="applyProtection" type="xsd:boolean" use="optional"/>
    </xsd:complexType>

    */
      this.alignment =new CellAlignment();
      this.protection =new CellProtection();
      this.extLst =new ExtensionList();

      this.numFmtId =null;
      this.fontId =null;
      this.fillId =null;
      this.borderId =null;
      this.xfId =null;

      this.quotePrefix =false; //boolean
      this.pivotButton =false; //boolean
      this.applyNumberFormat =false ; //boolean
      this.applyFont =false; //boolean
      this.applyFill =false; //boolean
      this.applyBorder =false; //boolean
      this.applyAlignment =false; //boolean
      this.applyProtection =false; //boolean
     }


      SetNumFmtId(numFmtId){
        this.numFmtId=numFmtId;
        this.applyNumberFormat =true ;
      }
      SetfontId(fontId){
        this.fontId=fontId;
        this.applyNumberFormat =true ;
      }
      SetFillId(fillId){
        this.fillId=fillId;
        this.applyFill =true ;
      }
      SetBorderId(borderId){
        this.borderId=borderId;
        this.applyBorder =true ;
      }

      ParseFromXml(xml){

        if(xml==null) return;
        if(xml._numFmtId!=null)
          this.numFmtId =parseInt(xml._numFmtId);
        if(xml._fontId!=null)
          this.fontId =parseInt(xml._fontId);
        if(xml._fillId!=null)
          this.fillId =parseInt(xml._fillId);
        if(xml._borderId!=null)
          this.borderId =parseInt(xml._borderId);
        if(xml._xfId!=null)
          this.xfId =parseInt(xml._xfId);

        if(xml._quotePrefix!=null&&xml._quotePrefix=="1")
        this.quotePrefix =true; //boolean
        if(xml._pivotButton!=null&&xml._pivotButton=="1")
        this.pivotButton =true; //boolean
        if(xml._applyNumberFormat!=null&&xml._applyNumberFormat=="1")
        this.applyNumberFormat =true ; //boolean
        if(xml._applyFont!=null&&xml._applyFont=="1")
        this.applyFont =true; //boolean
        if(xml._applyFill!=null&&xml._applyFill=="1")
        this.applyFill =true; //boolean
        if(xml._applyBorder!=null&&xml._applyBorder=="1")
        this.applyBorder =true; //boolean
        if(xml._applyAlignment!=null&&xml._applyAlignment=="1")
        this.applyAlignment =true; //boolean
        if(xml._applyProtection!=null&&xml._applyProtection=="1")
        this.applyProtection =true; //boolean


         this.alignment.ParseFromXml(xml.alignment);
      }

    }
