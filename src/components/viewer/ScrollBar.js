import RightScrollBar from "./RightScrollBar.js";
import BottomBar from "./BottomBar.js";

export default class ScrollBar {
  constructor(fissv) {
    this.fissv = fissv;
    this.rightScrollBar = new RightScrollBar(fissv);
    this.bottomScrollBar = new BottomBar(fissv);
  }
  DrawScrollBar(startx, endy, width, height) {
    this.rightScrollBar.Draw(startx, endy, width, height);
    this.bottomScrollBar.Draw(startx, endy, width, height);
  }
}
