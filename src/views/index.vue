<!--  -->
<template>
 <div>
   <ul class="menu">
     <li class="menu-item" v-for="(item,index) in menuData" :key="index">
       <router-link :to="item">{{item.text}}</router-link>
     </li>
  </ul> 
 </div>
</template>

<script>
export default {
 components: {},
 props: {},
 data () {
  return {
    menuData:[
      {
        path:"test-vuex",
        text:"自己写的简单vuex"
      }
    ]
  };
 },
 mounted(){},
 methods: {}
}

</script>
<style lang='scss' scoped>
</style>