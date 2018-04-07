// Vuex源码解析
// https://github.com/answershuto/learnVue/blob/master/docs/Vuex%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.MarkDown



// 安装
// 使用过Vuex的朋友一定知道，Vuex的安装十分简单，只需要提供一个store，然后执行下面两句代码即完成的Vuex的引入。
Vue.use(Vuex);

/*将store放入Vue创建时的option中*/
new Vue({
    el: '#app',
    store
});

// 那么问题来了，Vuex是怎样把store注入到Vue实例中去的呢？

// Vue.js提供了Vue.use方法用来给Vue.js安装插件，内部通过调用插件的install方法(当插件是一个对象的时候)来进行插件的安装。


// 我们来看一下Vuex的install实现。
/*暴露给外部的插件install方法，供Vue.use调用安装插件*/
export function install() {
    
}


















































