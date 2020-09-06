/*
     <xsd:complexType name="CT_OfficeStyleSheet">
    <xsd:sequence>
       <xsd:element name="themeElements" type="CT_BaseStyles" minOccurs="1" maxOccurs="1"/>
       <xsd:element name="objectDefaults" type="CT_ObjectStyleDefaults" minOccurs="0"
         maxOccurs="1"/>
       <xsd:element name="extraClrSchemeLst" type="CT_ColorSchemeList" minOccurs="0"
         maxOccurs="1"/>
       <xsd:element name="custClrLst" type="CT_CustomColorList" minOccurs="0" maxOccurs="1"/>
       <xsd:element name="extLst" type="CT_OfficeArtExtensionList" minOccurs="0" maxOccurs="1"/>
    </xsd:sequence>
    <xsd:attribute name="name" type="xsd:string" use="optional" default=""/>
    </xsd:complexType>
  */


 import BaseStyles from './BaseStyles.js';

 export default class OfficeStyleSheet {
   constructor() {


        this.themeElements=new BaseStyles();
        //this.objectDefaults=new ObjectStyleDefaults();
        //this.extraClrSchemeLst=new ColorSchemeList();
        //this.custClrLst=new CustomColorList();
        //this.extLst=new OfficeArtExtensionList();
        this.name='';
   }

        ParseFromXml(xml){
            this.themeElements.ParseFromXml(xml.theme.themeElements);
            /*if(xml.objectDefaults!=null)
              this.objectDefaults.ParseFromXml(xml.objectDefaults);
            else
              this.objectDefaults=null;

            if(xml.extraClrSchemeLst!=null)
              this.extraClrSchemeLst.ParseFromXml(xml.extraClrSchemeLst);
            else
              this.extraClrSchemeLst=null;

              if(xml.custClrLst!=null)
              this.custClrLst.ParseFromXml(xml.custClrLst);
            else
              this.custClrLst=null;*/

            if(xml._name!=null)
                this.name=xml._name;
        }
 }
