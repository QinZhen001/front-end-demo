/**
 * 双重缓存
 */
// obj => observed
let toProxy = new WeakMap()
// observed => obj
let toRaw = new WeakMap()

// -----------------------------------------------


let effectStack = []
let targetMap = new WeakMap()


// -----------------------------

const baseHandler = {
  get(target, key) {
    const res = Reflect.get(target, key)
    // 收集依赖
    track(target, key)
    // 递归查询
    return typeof  res === "object" ? reactive(res) : res
  },
  set(target, key, val) {
    const info = {
      oldValue: target[key],
      newValue: val
    }
    const res = Reflect.set(target, key, val)
    // 触发更新
    trigger(target, key, info)
    return res
  }
}

function reactive(target) {
  // 查询缓存
  let observed = toProxy.get(target)
  if (observed) {
    // 已经proxy过了
    return observed
  }
  if (toRaw.get(target)) {
    return target
  }
  observed = new Proxy(target, baseHandler)
  // 设置缓存
  toProxy.set(target, observed)
  toRaw.set(observed, target)
  return observed
}


/**
 * 收集依赖
 * @param target
 * @param key
 */
function track(target, key) {
  let effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depsMap = targetMap.get(target)
    if (depsMap === undefined) {
      depsMap = new Map()
      targetMap.set(target, depsMap)
    }
    let dep = depsMap.get(key)
    if (dep === undefined) {
      dep = new Set()
      depsMap.set(key, dep)
    }
    if (!dep.has(effect)) {
      dep.add(effect)
      effect.deps.push(dep)
    }
  }
}


/**
 * 触发更新
 * @param target
 * @param key
 * @param info
 */
function trigger(target, key, info) {
  const depsMap = targetMap.get(target)
  if (depsMap === undefined) {
    return
  }

  const effects = new Set()
  const computedRunners = new Set()
  if (key) {
    let deps = depsMap.get(key) || []
    deps.forEach(effect => {
      if (effect.computed) {
        computedRunners.add(effect)
      } else {
        effects.add(effect)
      }
    })
  }

  const run = effect => effect()
  effects.forEach(run)
  computedRunners.forEach(run)
}

/**
 * 存储effect
 * @param fn
 * @param options
 */
function effect(fn, options = {}) {
  let e = createReactiveEffect(fn, options)
  // 没有考虑computed
  if (!options.lazy) {
    e()
  }
  return e
}

/**
 * (高阶函数)
 * @param fn
 * @param options
 * @returns {function(...[*]=): void}
 */
function createReactiveEffect(fn, options) {
  // todo 这里的effect
  const effect = function (...args) {
    return run(effect, fn, args)
  }

  effect.deps = []
  effect.computed = options.computed
  effect.lazy = options.lazy

  console.log("createReactiveEffect effect", effect)
  console.log("\n")
  // debugger

  return effect
}


function run(effect, fn, args) {
  // 当run函数执行的时候我们拿到的effect是有deps，computed，lazy这些属性的
  console.log("run effect", effect)
  console.log("run effect deps", effect.deps)
  console.log("run effect computed", effect.computed)
  console.log("run effect lazy", effect.lazy)
  console.log("\n")
  // debugger

  if (effectStack.indexOf(effect) === -1) {
    try {
      effectStack.push(effect)
      return fn(...args)
    } finally {
      effectStack.pop()
    }
  }
}


/**
 * computed返回一个对象带有effect和value
 * @param fn
 * @returns {*}
 */
function computed(fn) {
  const runner = effect(fn, {
    computed: true,
    lazy: true
  })

  return {
    effect: runner,
    get value() {
      return runner()
    }
  }
}
