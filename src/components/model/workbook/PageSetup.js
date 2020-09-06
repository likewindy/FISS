/* <xsd:complexType name="CT_PageSetup">
  <xsd:attribute name="paperSize" type="xsd:unsignedInt" use="optional" default="1"/>
  <xsd:attribute name="paperHeight" type="s:ST_PositiveUniversalMeasure" use="optional"/>
  <xsd:attribute name="paperWidth" type="s:ST_PositiveUniversalMeasure" use="optional"/>
  <xsd:attribute name="scale" type="xsd:unsignedInt" use="optional" default="100"/>
  <xsd:attribute name="firstPageNumber" type="xsd:unsignedInt" use="optional" default="1"/>
  <xsd:attribute name="fitToWidth" type="xsd:unsignedInt" use="optional" default="1"/>
  <xsd:attribute name="fitToHeight" type="xsd:unsignedInt" use="optional" default="1"/>
  <xsd:attribute name="pageOrder" type="ST_PageOrder" use="optional" default="downThenOver"/>
  <xsd:attribute name="orientation" type="ST_Orientation" use="optional" default="default"/>
  <xsd:attribute name="usePrinterDefaults" type="xsd:boolean" use="optional" default="true"/>
  <xsd:attribute name="blackAndWhite" type="xsd:boolean" use="optional" default="false"/>
  <xsd:attribute name="draft" type="xsd:boolean" use="optional" default="false"/>
  <xsd:attribute name="cellComments" type="ST_CellComments" use="optional" default="none"/>
  <xsd:attribute name="useFirstPageNumber" type="xsd:boolean" use="optional" default="false"/>
  <xsd:attribute name="errors" type="ST_PrintError" use="optional" default="displayed"/>
  <xsd:attribute name="horizontalDpi" type="xsd:unsignedInt" use="optional" default="600"/>
  <xsd:attribute name="verticalDpi" type="xsd:unsignedInt" use="optional" default="600"/>
  <xsd:attribute name="copies" type="xsd:unsignedInt" use="optional" default="1"/>
  <xsd:attribute ref="r:id" use="optional"/>
*/

export default class PageSetup {
  constructor() {
    //When paperHeight and paperWidth are specified, paperSize should be ignored.
    this.paperSize = 0;
    //Height of custom paper as a number followed by a unit identifier.When paperHeight and paperWidth are specified, paperSize shall be ignored
    this.paperHeight = 0;
    this.paperWidth = 0;
    this.scale = 100;
    this.firstPageNumber = 1;
    this.fitToWidth = 1;
    this.fitToHeight = 1;
    this.pageOrder = 'downThenOver'; //overThenDown
    this.orientation = 'default'; //landscape 横向 
    this.usePrinterDefaults = true;
    //Specifies the page shall print in black and white.
    this.blackAndWhite = false;
    //Specifies the page shall be printed in draft mode
    this.draft = false;
    this.cellComments = false;
    this.useFirstPageNumber = false;
    this.errors = 'displayed';
    //Specifies the horizontal resolution to print in dots per inch
    this.horizontalDpi = 600;
    //
    this.verticalDpi = 600;
    this.copies = 1;
  }

  ParseFromXml(xml) {
    if (xml._paperSize != null) this.paperSize = parseInt(xml._paperSize);
    if (xml._paperHeight != null) this.paperHeight = parseInt(xml._paperHeight);
    if (xml._paperWidth != null) this.paperWidth = parseInt(xml._paperWidth);
    if (xml._scale != null) this.scale = parseInt(xml._scale);
    if (xml._firstPageNumber != null) this.firstPageNumber = parseInt(xml._firstPageNumber);
    if (xml._fitToWidth != null) this.fitToWidth = parseInt(xml._fitToWidth);
    if (xml._fitToHeight != null) this.fitToHeight = parseInt(xml._fitToHeight);
    if (xml._pageOrder != null) this.pageOrder = xml._pageOrder;
    if (xml._orientation != null) this.orientation = xml._orientation;

    if (xml._usePrinterDefaults != null) {
      if (xml._usePrinterDefaults != '0')
        this.usePrinterDefaults = true;
      else
        this.usePrinterDefaults = false;
    }
    if (xml._blackAndWhite != null) {
      if (xml._blackAndWhite != '0')
        this.blackAndWhite = true;
      else
        this.blackAndWhite = false;
    }
    if (xml._draft != null) {
      if (xml._draft != '0')
        this.draft = true;
      else
        this.draft = false;
    }
    if (xml._cellComments != null) {
      if (xml._cellComments != '0')
        this.cellComments = true;
      else
        this.cellComments = false;
    }
    if (xml._useFirstPageNumber != null) {
      if (xml._useFirstPageNumber != '0')
        this.useFirstPageNumber = true;
      else
        this.useFirstPageNumber = false;
    }


    if (xml._errors != null) this.errors = xml._errors;
    if (xml._horizontalDpi != null) this.horizontalDpi = parseInt(xml._horizontalDpi);
    if (xml._verticalDpi != null) this.verticalDpi = parseInt(xml._verticalDpi);
    if (xml._copies != null) this.copies = parseInt(xml._copies);
  }

}
