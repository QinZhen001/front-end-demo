// https://github.com/Sunny-lucking/howToBuildMyVuex/blob/master/src/store/index.js

import Vue from "vue";
import Vuex from "../myVuex";

Vue.use(Vuex);

export default new Vuex.Store({
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
  actions: {
    actionTest({ commit }, params) {
      setTimeout(() => {
        commit("incre", params);
      }, 2000);
    },
  },
});
