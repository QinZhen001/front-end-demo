// https://juejin.cn/post/7170852747749621791

class SyncHook {}

// Compiler 它就是整个打包过程的大管家，它里面放着各种你可能需要的编译信息和生命周期 Hook，而且是单例模式
class Compiler {
  constructor(webpackOptions) {
    this.options = webpackOptions
    // 内部提供了很多钩子
    this.hooks = {
      //会在编译刚开始的时候触发此run钩子
      run: new SyncHook(),
      //会在编译结束的时候触发此done钩子
      done: new SyncHook(),
      // ...
    }
  }

  run(cb) {
    // 在编译前触发run钩子执行，表示开始启动编译了
    this.hooks.run.call()
    const onCompiled = () => {
      // 当编译成功后会触发done这个钩子执行
      this.hooks.done.call()
    }
    // 开始编译，成功之后调用onCompiled
    this.compile(onCompiled)
  }

  compile(cb) {
    // 虽然webpack只有一个Compiler，但是每次编译都会产出一个新的Compilation，
    // 这里主要是为了考虑到watch模式，它会在启动时先编译一次，然后监听文件变化，如果发生变化会重新开始编译
    // 每次编译都会产出一个新的Compilation，代表每次的编译结果
    let compilation = new Compilation(this.options)
    // 执行compilation的build方法进行编译，编译成功之后执行回调
    compilation.build(cb)
  }
}

// 编译逻辑均在 Compilation 中
class Compilation {
  constructor(webpackOptions) {
    this.options = webpackOptions
    this.modules = [] //本次编译所有生成出来的模块
    this.chunks = [] //本次编译产出的所有代码块，入口模块和依赖的模块打包在一起为代码块
    this.assets = {} //本次编译产出的资源文件
    this.fileDependencies = [] //本次打包涉及到的文件，这里主要是为了实现watch模式下监听文件的变化，文件发生变化后会重新编译
  }

  build(cb) {
    // 根据配置文件中的`entry`配置项找到所有的入口
    let entry = {}
    if (typeof this.options.entry === "string") {
      entry.main = this.options.entry //如果是单入口，将entry:"xx"变成{main:"xx"}，这里需要做兼容
    } else {
      entry = this.options.entry
    }

    for (let entryName in entry) {
      let entryFilePath = path.posix.join(baseDir, entry[entryName]) //path.posix为了解决不同操作系统的路径分隔符,这里拿到的就是入口文件的绝对路径
      this.fileDependencies.push(entryFilePath)
      //6.2 得到入口模块的的 `module` 对象 （里面放着该模块的路径、依赖模块、源代码等）
      let entryModule = this.buildModule(entryName, entryFilePath)
      this.modules.push(entryModule)
      let chunk = {
        name: entryName,
        entryModule,
        modules: this.modules.filter((item) => item.names.includes(entryName)),
      }
      this.chunks.push(chunk)
    }

    cb()
  }

  // name：这个模块是属于哪个代码块chunk的，modulePath：模块绝对路径
  buildModule(name, modulePath) {
    let sourceCode = fs.readFileSync(modulePath, "utf8")
    let moduleId = "./" + path.posix.relative(baseDir, modulePath)
    // eslint-disable-next-line @next/next/no-assign-module-variable
    let module = {
      id: moduleId,
      names: [name], //names设计成数组是因为代表的是此模块属于哪个代码块，可能属于多个代码块
      dependencies: [], //它依赖的模块
      _source: "", //该模块的代码信息
    }

    // loader 处理
    let loaders = []
    let { rules = [] } = this.options.module
    rules.forEach((rule) => {
      let { test } = rule
      //如果模块的路径和正则匹配，就把此规则对应的loader添加到loader数组中
      if (modulePath.match(test)) {
        loaders.push(...rule.use)
      }
    })
    //自右向左对模块进行转译
    sourceCode = loaders.reduceRight((code, loader) => {
      return loader(code)
    }, sourceCode)

    return module
  }
}

// 自定义插件
// Webpack Plugin 其实就是一个普通的函数，在该函数中需要我们定制一个 apply 方法
class WebpackRunPlugin {
  apply(compiler) {
    compiler.hooks.run.tap("WebpackRunPlugin", () => {
      console.log("WebpackRunPlugin")
    })
  }
}

class WebpackDonePlugin {
  apply(compiler) {
    compiler.hooks.done.tap("WebpackDonePlugin", () => {
      console.log("结束编译")
    })
  }
}

// Webpack 的用法可以看出， Webpack 本质上是一个函数，它接受一个配置信息作为参数，执行后返回一个 compiler 对象
function Webpack(webpackOptions) {
  const compiler = new Compiler(webpackOptions)
  // 挂载插件
  const { plugins } = webpackOptions
  for (let plugin of plugins) {
    plugin.apply(compiler)
  }
  return compiler
}
