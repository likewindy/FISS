<template>
  <div class="fissFrame">
    <input
      v-bind:id="canvasInputID"
      type="text"
      autocomplete="off"
      v-bind:name="canvasInputID"
      @focus="inputFocus"
      @blur="inputBlur"
      @keyup.enter="inputEnter"
      v-model="InputTextVale"
      style="
    position: absolute;
    left: -400px;
    top: -300px;"
    />
    <canvas
      v-bind:id="canvasID"
      v-bind:width="width"
      v-bind:height="height"
      @dblclick="dbcanvasClick"
      @click="canvasClick"
      @mousemove="mousemove"
      @mousewheel="mousewheel"
    ></canvas>
    <div v-bind:id="canvasPPIID" style="width:1in;visible:hidden;padding:0px"></div>
    <PRINT ref="print" v-bind:id="canvasIdPrint" msg="FISS print" />
  </div>
</template>

<script>
import ReadFromZip from "./model/zip/ReadFromZip.js";
import Workbook from "./model/workbook/Workbook.js";
import Worksheet from "./model/workbook/Worksheet.js";
import FISSC from "./controller/FISSC.js";
import FISSM from "./model/FISSM.js";
import FISSV from "./viewer/FISSV.js";
import PRINT from "./print/PRINT.vue";

export default {
  name: "FISS",
  components: {
    PRINT,
  },
  xmlFileModel: Object,
  canvas: Object,
  activeSheetIndex: Number,
  ctx: Object,
  bscale: Boolean,
  fissM: Object,
  fissC: Object,
  fissV: Object,
  binput: Boolean,
  ppi: Number,
  addin: Object,
  props: {
    id: String,
    title: String,
    callback: Function,
  },
  created() {
    window.addEventListener("resize", this.handleResize);
  },
  updated() {
    this.createMVC();
  },
  mounted() {
    //初始化绘画的环境
    this.bscale = false;
    this.binput = false;
    this.canvas = document.getElementById(this.canvasID);
    this.ctx = this.canvas.getContext("2d");
    this.handleResize();
    this.ppi = document.getElementById(this.canvasPPIID).offsetWidth;
    this.addin = {};
    this.canvasInput = document.getElementById(this.canvasInputID);
    // console.log("ppi：" + document.getElementById("ppitest").offsetWidth);
  },
  methods: {
    inputBlur(event) {
      this.canvasInput.style.left = "-3000px";
      this.canvasInput.style.top = "-3000px";
      //console.log('inputBlur:' + this.InputTextVale);
      this.$emit("inputValue", event, this.InputTextVale);
      this.binput = false;
      this.InputTextVale = "";
      this.showSheetIndex();
    },
    inputEnter(event) {
      this.canvasInput.style.left = "-3000px";
      this.canvasInput.style.top = "-3000px";
      //console.log('inputEnter:' + this.InputTextVale);
      this.$emit("inputValue", event, this.InputTextVale);
      this.binput = false;
      this.InputTextVale = "";
      this.showSheetIndex();
    },
    inputFocus(event) {
      this.binput = true;
    },
    Print() {
      this.$refs.print.prePrint(this);
    },
    mousewheel(event) {
      //event.wheelDeltaX属性在向右滚动时返回一个正值，向左滚动时返回一个负值，否则返回0。
      //event.wheelDeltaY属性在向下滚动时返回正值，向上滚动时返回负值，否则为0。
      //this.abcemousewheel(this, event);
      var wheelDelta = Math.abs(event.wheelDelta);

      var input = this.canvasInput;
      input.style.left = "-300px";
      input.style.top = "-300px";

      event.stopPropagation();
      event.cancelBubble = true;
      event.returnValue = false;
      if (wheelDelta % 6 == 0) {
        if (event.wheelDeltaY < 0) {
          this.$emit("SheetRowDown", this, event);
          return;
        }
        if (event.wheelDeltaY > 0) {
          this.$emit("SheetRowUp", this, event);
          return;
        }
        if (event.wheelDeltaX < 0) {
          this.$emit("SheetColRight", this, event);
          return;
        }
        if (event.wheelDeltaX > 0) {
          this.$emit("SheetColleft", this, event);
          return;
        }
      }
    },
    mousemove(event) {
      console.log("mousemove:" + event);
      this.$emit("mousemove", this, event);
    },
    canvasClick(event) {
      //sconsole.log(event);
      this.$emit("CanvasClick", this, event);
    },
    dbcanvasClick(event) {
      // console.log(event);
      this.$emit("CanvasClick", this, event);
    },
    getPixelRatio(context) {
      var backingStore =
        context.backingStorePixelRatio ||
        context.webkitBackingStorePixelRatio ||
        context.mozBackingStorePixelRatio ||
        context.msBackingStorePixelRatio ||
        context.oBackingStorePixelRatio ||
        context.backingStorePixelRatio ||
        1;
      return (window.devicePixelRatio || 1) / backingStore;
    },
    handleResize(event) {
      this.ratio = this.getPixelRatio(this.ctx);
      this.width = parseInt(this.$attrs.width);
      this.height = parseInt(this.$attrs.height);

      // this.width = document.documentElement.clientWidth;
      // this.height = document.documentElement.clientHeight;
    },

    loadFromBlob(file) {
      if (file == null) return;
      var read = new ReadFromZip();
      var filedata = read.readFile(file, this.fileReadCallBack, read);
      //开始等待动画
      //alert("1111111");
    },
    createMVC() {
      //在文本输入的时候不重新画
      if (this.binput) return;
      this.canvas.width = this.width * this.ratio;
      this.canvas.height = this.height * this.ratio;
      this.canvas.style.width = this.width + "px";
      this.canvas.style.height = this.height + "px";
      this.fissV = new FISSV(
        this.ctx,
        { x: 0, y: 0, width: this.width, height: this.height },
        this,
        this.ratio
      );
      this.ctx.scale(this.ratio, this.ratio);
      // console.log("ratio：" + this.ratio);
      if (!this.fissC) {
        this.fissC = new FISSC(this);
        this.fissM = new FISSM(this);
        var workbook = new Workbook(this);
        this.fissM.workbook = workbook;
        var worksheet = new Worksheet(workbook);
        worksheet.sheetId = "1";
        worksheet.name = "sheet1";
        workbook.AddSheets(worksheet);
        this.activeSheetIndex = 0;
      }
      this.showSheetIndex();
    },
    fileReadCallBack(xmlModel) {
      this.xmlFileModel = xmlModel;
      //获取默认sheet也并且初始化
      if (xmlModel.workbook.bookViews.workbookView._activeTab == null)
        this.activeSheetIndex = 0;
      else
        this.activeSheetIndex =
          parseInt(xmlModel.workbook.bookViews.workbookView._activeTab) - 1;
      this.showSheetIndexFromFile();
      //结束等待动画
      //alert("3333333");
    },
    showSheetIndexFromFile() {
      var fissm = new FISSM(this);
      this.fissV = new FISSV(
        this.ctx,
        { x: 0, y: 0, width: this.width, height: this.height },
        this,
        this.ratio
      );
      this.fissM = fissm;
      var workbook = new Workbook(this);

      this.fissM.workbook = workbook;
      for (var n = 0; n < this.xmlFileModel.xmlSheetsArray.length; n++) {
        var worksheet = new Worksheet(workbook);
        if (this.xmlFileModel.xmlSheetsArray.length > 1) {
          var ws = this.xmlFileModel.workbook.sheets.sheet[n];
          worksheet.sheetId = ws._sheetId;
          worksheet.name = ws._name;
        } else {
          var ws = this.xmlFileModel.workbook.sheets.sheet;
          worksheet.sheetId = ws._sheetId;
          worksheet.name = ws._name;
        }
        //大数据量时这会比较慢
        worksheet.ParseFromXml(this.xmlFileModel.xmlSheetsArray[n].worksheet);

        workbook.AddSheets(worksheet);
      }
      workbook.OrderFormulaArray();
      if (this.xmlFileModel.workbook.definedNames != null)
        workbook.ParsedefinedNames(
          this.xmlFileModel.workbook.definedNames.definedName
        );

      this.fissM.styles.ParseFromXml(this.xmlFileModel.xmlstyle.styleSheet);
      this.fissM.theme.ParseFromXml(this.xmlFileModel.xmltheme);
      if (this.xmlFileModel.xmlshareString != null)
        this.fissM.sharedStrings.ParseFromXml(
          this.xmlFileModel.xmlshareString.sst
        );

      this.showSheetIndex();
    },
    showSheetIndex() {
      //清除所有注册事件
      //this._events = [];
      //FISS内部事件注册
      this.addInterEvent();
      this.fissV.DrawWorkSheet(this.activeSheetIndex);
      // 使用 $on(eventName) 监听事件
      // 使用 $emit(eventName) 触发事件
    },
    addInterEvent() {
      this.addEvent("ActiveSheetChage", this.ActiveSheetChage);
    },
    addEvent(name, callfunction, multFunc) {
      if (multFunc) {
        this.$on(name, callfunction);
        return;
      }
      if (this._events[name] == undefined) this.$on(name, callfunction);
      else {
        this._events[name] = [];
        this.$on(name, callfunction);
      }
    },
    ActiveSheetChage(obj, event) {
      this.activeSheetIndex = event.new - 1;
      this.showSheetIndex();
    },
    AddIn(name, obj) {
      addinfun.name = new obj(this.fissM.Workbook);
    },
  },
  computed: {
    canvasID: function () {
      return this.id + "-canvas";
    },
    canvasInputID: function () {
      return this.id + "-InputID";
    },
    canvasPPIID: function () {
      return this.id + "-PPIID";
    },
    canvasIdPrint: function () {
      return this.id + "-Print";
    },
  },
  data() {
    return {
      width: 0,
      height: 0,
      ratio: 1.0,
      files: FileList,
      InputTextVale: "",
      msg: "financial statement spread sheets create by 火柴盒/matchbox",
    };
  },
};
</script>
<style scoped>
.fissFrame {
  width: 100%;
  height: 100%;
}
</style>
