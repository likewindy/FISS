import FISS from "./src/components/FISS.vue";

FISS.install = function(Vue) {
  Vue.component(FISS.name, FISS);
};

export default FISS;
