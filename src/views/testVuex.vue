<!-- 测试vuex -->
<template>
  <div>
    <div>测试自己写的vuex</div>
    <div>
      store 中的 number :
      <span>{{this.$store.state.num}}</span>
    </div>
    <button @click="setMutation">发起mutation</button>
    <button @click="setAction">发起action</button>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  mounted() {
    console.log("this.$store", this.$store);
  },
  methods: {
    setMutation() {
      this.$store.commit("incre", 1);
    },
    setAction() {
      this.$store.dispatch("actionTest", 3);
    },
  },
};
</script>
<style lang='scss' scoped>
* {
  padding: 5px;
  margin: 5px;
}
</style>