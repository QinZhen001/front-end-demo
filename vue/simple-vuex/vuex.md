## 手写vuex

> 总结一下手写vuex中的一些点



[https://juejin.im/post/6855474001838342151?utm_source=gold_browser_extension](https://juejin.im/post/6855474001838342151?utm_source=gold_browser_extension)



### Vuex的本质



* 安装Vuex，再通过`import Vuex from 'vuex'`引入
* 先 var store = new Vuex.Store({...}),再把store作为参数的一个属性值，new Vue({store})
* 通过Vue.use(Vuex) 使得每个组件都可以拥有store实例





### 每个组件都可以拥有store实例



```js
let install = function(Vue){
    Vue.mixin({
        beforeCreate(){
            if (this.$options && this.$options.store){ // 如果是根组件
                this.$store = this.$options.store
            }else { //如果是子组件
                this.$store = this.$parent && this.$parent.$store
            }
        }
    })
}

```

> 注意是**引用的复制**，因此每个组件都拥有了同一个`$store`挂载在它身上。



**为什么是beforeCreate而不是created呢?**



因为如果是在created操作的话，`$options`已经初始化好了。





### **为什么getter不用写括号**



为什么不用括号一样。（如`{{num}}`,而不是`{{num()}}`）



原来就是利用了Object.defineProperty的get接口。





### vue保证相同的插件不会反复被注册

插件添加到installedPlugins中，保证相同的插件不会反复被注册

```js
Vue.use = function(plugin){
 const installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
 if(installedPlugins.indexOf(plugin)>-1){
  return this;
 }
 <!-- 其他参数 -->
 const args = toArray(arguments,1);
 args.unshift(this);
 if(typeof plugin.install === 'function'){
  plugin.install.apply(plugin,args);
 }else if(typeof plugin === 'function'){
  plugin.apply(null,plugin,args);
 }
 installedPlugins.push(plugin);
 return this;
}
```



### **父组件和子组件的执行顺序**



```
父beforeCreate -> 父created -> 父beforeMounte -> 
子beforeCreate -> 子create -> 子beforeMount -> 子 mounted -> 父mounted
```







