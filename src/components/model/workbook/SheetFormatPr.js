/*
		https://docs.microsoft.com/zh-cn/dotnet/api/documentformat.openxml.spreadsheet.sheetformatproperties?view=openxml-2.8.1
    */
export default class SheetFormatPr {
  constructor(defaultRowHeight) {
    /* <xsd:attribute name="baseColWidth" type="xsd:unsignedInt" use="optional" default="8"/>
     */
    this.baseColWidth = 8;
    /*
        <xsd:attribute name="defaultColWidth" type="xsd:double" use="optional"/>

        width = Truncate([{Number of Characters} * {Maximum Digit Width} + {5 pixel padding}] / {Maximum Digit Width} * 256) / 256

        Using the Calibri font as an example, the maximum digit width of 11 point font size is
         7 pixels (at 96 dpi). If you set a column width to be eight characters wide,
          e.g. setColumnWidth(columnIndex, 8*256), then the actual value of visible characters (the value shown in Excel)
          is derived from the following equation: Truncate([numChars*7+5]/7*256)/256 = 8; which gives 7.29.

         默认值为正文样式的字体的最大数字宽度的字符数为单位的列宽。
          如果用户未将此手动，则可以计算：
          defaultColWidth = baseColumnWidth + {填充 （总共 4 个像素，每一侧 2 像素为单位） 的边距} + {网格线 (1pixel)}
          如果用户已手动设置，则没有任何计算，并指定一个值，只需。
					*/
    this.defaultColWidth = 9;
    //	this.defaultColCharWidth =9.14285714285714;

    /*<xsd:attribute name="defaultRowHeight" type="xsd:double" use="required"/>
				默认行高以磅为单位大小。
				*/
    this.defaultRowHeight = 13.5;

    /*<xsd:attribute name="customHeight" type="xsd:boolean" use="optional" default="false"/> */
    this.customHeight = false;

    /*<xsd:attribute name="zeroHeight" type="xsd:boolean" use="optional" default="false"/>*/
    this.zeroHeight = false;

    /*<xsd:attribute name="thickTop" type="xsd:boolean" use="optional" default="false"/>*/
    this.thickTop = false;

    /*<xsd:attribute name="thickBottom" type="xsd:boolean" use="optional" default="false"/>*/
    this.thickBottom = false;

    /*<xsd:attribute name="outlineLevelRow" type="xsd:unsignedByte" use="optional" default="0"/>*/
    this.outlineLevelRow = 0;

    /*<xsd:attribute name="outlineLevelCol" type="xsd:unsignedByte" use="optional" default="0"/>*/
    this.outlineLevelCol = 0;
  }
  ParseFromXml(xml) {
    this.defaultColWidth = parseFloat(xml._defaultColWidth);

    if (this.defaultColWidth == 0) this.defaultColWidth = 9;
    // if (xml._defaultColCharWidth != null)
    //   this.defaultColCharWidth = parseInt(xml._defaultColCharWidth);
    if (xml._defaultRowHeight != null)
      this.defaultRowHeight = parseFloat(xml._defaultRowHeight);

    this.outlineLevelCol = parseInt(xml._outlineLevelCol);
    if (xml._customHeight != null) this.customHeight = xml._customHeight;
    if (xml._zeroHeight != null) this.zeroHeight = xml._zeroHeight;
    if (xml._thickTop != null) this.thickTop = xml._thickTop;
    if (xml._thickBottom != null) this.thickBottom = xml._thickBottom;
    if (xml._outlineLevelRow != null)
      this.outlineLevelRow = parseInt(xml._outlineLevelRow);
  }
}
