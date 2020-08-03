// https://github.com/Sunny-lucking/howToBuildMyVuex/blob/master/src/store/index.js

import Vue from "vue";
import Vuex from "./myVuex";

Vue.use(Vue);

export default new Vuex.store({
  state: {
    num: 0,
  },
  getters: {
    getNum(state) {
      return state.num;
    },
  },
  mutations: {
    incre(state, arg) {
      state.num += arg;
    },
  },
});
