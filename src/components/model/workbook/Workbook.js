/*
<xsd:complexType name="CT_Workbook">
		<xsd:sequence>
			<xsd:element name="fileVersion" type="CT_FileVersion" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="fileSharing" type="CT_FileSharing" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="workbookPr" type="CT_WorkbookPr" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="workbookProtection" type="CT_WorkbookProtection" minOccurs="0"maxOccurs="1"/>
			<xsd:element name="bookViews" type="CT_BookViews" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="sheets" type="CT_Sheets" minOccurs="1" maxOccurs="1"/>
			<xsd:element name="functionGroups" type="CT_FunctionGroups" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="externalReferences" type="CT_ExternalReferences" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="definedNames" type="CT_DefinedNames" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="calcPr" type="CT_CalcPr" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="oleSize" type="CT_OleSize" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="customWorkbookViews" type="CT_CustomWorkbookViews" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="pivotCaches" type="CT_PivotCaches" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="smartTagPr" type="CT_SmartTagPr" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="smartTagTypes" type="CT_SmartTagTypes" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="webPublishing" type="CT_WebPublishing" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="fileRecoveryPr" type="CT_FileRecoveryPr" minOccurs="0" maxOccurs="unbounded"/>
			<xsd:element name="webPublishObjects" type="CT_WebPublishObjects" minOccurs="0" maxOccurs="1"/>
			<xsd:element name="extLst" type="CT_ExtensionList" minOccurs="0" maxOccurs="1"/>
		</xsd:sequence>
    <xsd:attribute name="conformance" type="s:ST_ConformanceClass"/>
</xsd:complexType>
	*/

import FromulaOrder from "./fromula/FromulaOrder.js";
import DefinedName from "./DefinedName.js";

export default class Workbook {
  constructor(fiss) {
    this.fiss = fiss;
    this.sheets = [];
    this.extLst;
    //定义的公式清单
    this.formulaArray = [];
    //注册的功能函数
    //this.udfFunction = [];
    //别名
    this.definedNames = [];
    this.formulaOrder = new FromulaOrder(fiss);
  }
  AddSheets(sheet) {
    this.sheets.push(sheet);
  };
  GetRangeValue(sheetName, rangePram) {
    for (var n = 0; n < this.sheets.length; n++) {
      var worksheet = this.sheets[n];
      if (worksheet.name == sheetName)
        return worksheet.GetRangeValue(rangePram);
    }
  }
  /*
   rangeValueList [{range,value},{range,value}]
  */
  SetRangeValue(sheetName, rangeValueList) {
    for (var n = 0; n < this.sheets.length; n++) {
      var worksheet = this.sheets[n];
      if (worksheet.name == sheetName)
        return worksheet.SetRangeValue(rangeValueList);
    }
  }
  OrderFormulaArray() {
    this.formulaOrder.Order(this.formulaArray);
  }
  ParsedefinedNames(names) {
    if (Array.isArray(names)) {
      var rowl = parseInt(names.length);
      for (var rrr = 0; rrr < rowl; rrr++) {
        var xmlname = names[rrr];
        var dname = new DefinedName();
        dname.ParseFromXml(xmlname);
        this.definedNames.push(dname);
      }
    } else {
      var dname = new DefinedName();
      dname.ParseFromXml(names);
      this.definedNames.push(dname);
    }
  }
  getDefinedName(sheetid) {
    var retnames = [];
    var rowl = this.definedNames.length;
    for (var rrr = 0; rrr < rowl; rrr++) {
      var onename = this.definedNames[rrr];
      if (onename.sheetId == sheetid)
        retnames.push(onename);
    }
    return retnames;
  }
}
