<template>
  <div id="app">
    <input type="file" id="file" v-on:change="loadfile" />
    <button id="printVoucher" v-on:click="print_voucher">Print</button>
    <FISS
      id="test-fiss"
      title="one test fiss"
      v-on:activeSheetChageEvent="fav"
      ref="fiss"
      height="650"
      width="1200"
    />
  </div>
</template>
<script>
import FISS from "./components/FISS";

export default {
  name: "App",
  components: {
    FISS,
  },
  methods: {
    activeSheetChage(obj, event) {
      console.log(
        "out FISS old sheet:" + event.old + "   new sheet:" + event.new
      );
    },
    fav: () => {
      // 当前this指向了定义时所在的对象（window）
      console.log(this); // window
    },
    loadfile(e) {
      this.$refs.fiss.loadFromBlob(e.target.files[0]);
    },
    print_voucher() {
      this.$refs.fiss.Print();
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
body {
  margin: 0;
  padding: 0;
}
</style>
