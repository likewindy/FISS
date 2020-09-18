import FISS from "./FISS.vue";

// FISS.install = function(Vue) {
//   Vue.component(FISS.name, FISS);
// };
// expose component to global scope
if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('fiss', FISS)
}
export { FISS }
export default FISS;
