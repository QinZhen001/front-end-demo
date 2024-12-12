// 借助call
function Parent1() {
  this.name = "parent1"
}

function Child1(...args) {
  Parent1.call(this, ...args)
  this.type = "child1"
}

let child1 = new Child1()
console.log("child1", child1)

/**
 * 问题：
 * 子类无法继承父类原型对象的方法
 */

// 借助原型链
function Parent2() {
  this.name = "parent2"
  this.play = [1, 2, 3]
}

function Child2() {
  this.type = "child2"
}

Child2.prototype = new Parent2()

let child2 = new Parent2()
console.log("child2", child2)

/**
 * 问题：
 * 会导致两个子类实例共用一个原型对象
 */

// 将前两种组合
function Parent3() {
  this.name = "parent3"
  this.play = [1, 2, 3]
}

function Child3() {
  Parent3.call(this)
  this.type = "child3"
}

Child3.prototype = new Parent3()

var s3 = new Child3()
var s4 = new Child3()
s3.play.push(4)
console.log("child31", s3)
console.log("child32", s4)

/**
 * 问题：
 * 会执行两次Parent构造函数
 */

// 组合继承1
function Parent4() {
  this.name = "parent4"
  this.play = [1, 2, 3]
}
function Child4() {
  Parent4.call(this)
  this.type = "child4"
}
Child4.prototype = Parent4.prototype

let child4 = new Child4()
console.log("child4", child4)

/**
 * 问题：
 * 子类实例的构造函数是Parent4，显然这是不对的，应该是Child4
 */

// 优化组合继承 （推荐）
// 寄生组合继承
function Parent5() {
  this.name = "parent5"
  this.play = [1, 2, 3]
}
Parent5.prototype.aaa = "aaa"
function Child5() {
  Parent5.call(this)
  this.type = "child5"
}
// Child5.prototype = 原型对象 （Parent5）
// 原型对象 （Parent5）的 __proto =  object
// Object.create(Parent5.prototype) 这个函数返回一个对象(Parent5),返回对象的__proto = Parent5.prototype
Child5.prototype = Object.create(Parent5.prototype)
Child5.prototype.constructor = Child5

let child5 = new Child5()
console.log("child5", child5)

console.log("create Parent5.prototype", Object.create(Parent5.prototype))

console.log(
  "create Parent5.prototype",
  Object.create(Parent5.prototype, {
    a: {
      writable: true,
      configurable: true,
      value: "1",
    },
  }),
)
// 关于Object.create 查看
// https://juejin.im/post/5dac5d82e51d45249850cd20#heading-24
