<!--  -->
<template>
  <div>
    <p>将Vue.use(Router)中的Router 改为引入自己的Router</p>
    <p>我在此模拟history模式 监听popstate</p>
    <button @click="pushState">pushState</button>
    <p>当前地址：{{href}}</p>
    <div class="tip">
        <p>调用history.pushState()或history.replaceState()不会触发popstate事件</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      href:location.href
    };
  },
  watch:{
    // "location.href"(newHref){
    //   console.log(newHref)
    // }
  },
  mounted() {
    console.log("location.href",location.href)
    window.addEventListener("popstate", () => {
      console.log("popstate location", location);
    });
  },
  methods: {
    pushState() {
      history.pushState({}, "123123", "/pushState");
      this.href = location.href
    }
  }
};
</script>
<style lang='scss' scoped>
  .tip{
    padding: 20px;
    background: #666;
    color: whitesmoke;
  }
</style>  