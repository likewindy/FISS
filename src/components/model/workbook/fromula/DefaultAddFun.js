import SUM from "./SUM.js";
import Normal from "./Normal.js";
import CONCATENATE from "./CONCATENATE.js";

export default class DefaultAddFun {

  constructor(addinfun) {
    addinfun.SUM=new SUM();
    addinfun.Normal=new Normal();
    addinfun.CONCATENATE=new CONCATENATE();
  }
}
