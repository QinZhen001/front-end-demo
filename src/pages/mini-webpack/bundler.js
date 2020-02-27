const fs = require("fs");
const path = require("path");
const babylon = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");


let ID = 0


//读取文件信息，并获得当前js文件的依赖关系
function createAsset(filename) {
  // if (filename.indexOf(".js") === -1) {
  //   filename += '.js'
  // }
  //获取文件，返回值是字符串
  const content = fs.readFileSync(filename, "utf-8")

  const ast = babylon.parse(content, {
    sourceType: "module"
  });

  //用来存储 文件所依赖的模块，简单来说就是，当前js文件 import 了哪些文件，都会保存在这个数组里
  const dependencies = []

  // 遍历ast
  traverse(ast, {
    //找到有 import语法 的对应节点
    ImportDeclaration: ({node}) => {
      // 把当前依赖的模块加入到数组中，其实这存的是字符串，
      // 例如 如果当前js文件 有一句 import message from './message.js'，
      // './message.js' === node.source.value
      dependencies.push(node.source.value)
    }
  })


  //模块的id 从0开始， 相当一个js文件 可以看成一个模块
  const id = ID++;


  //这边主要把ES6 的代码转成 ES5
  const {code} = babel.transformSync(ast, {
    presets: ["@babel/preset-env"]
  })

  console.log("code", code)

  return {
    id,
    filename,
    dependencies,
    code
  }
}


//从入口开始分析所有依赖项，形成依赖图，采用广度遍历
function createGraph(entry) {
  const mainAsset = createAsset(entry);


  //既然要广度遍历肯定要有一个队列，第一个元素肯定是 从 "entry.js" 返回的信息
  const queue = [mainAsset];

  for (const asset  of queue) {
    const dirname = path.dirname(asset.filename)

    //新增一个属性来保存子依赖项的数据
    //保存类似 这样的数据结构 --->  {"./message.js" : 1}
    asset.mapping = {};

    asset.dependencies.forEach(async relativePath => {
      const absolutePath = path.join(dirname, relativePath);

      //获得子依赖（子模块）的依赖项、代码、模块id，文件名
      const child = createAsset(absolutePath);

      //给子依赖项赋值，
      asset.mapping[relativePath] = child.id;

      //将子依赖也加入队列中，广度遍历
      queue.push(child);

    })
  }

  return queue
}


//根据生成的依赖关系图，生成对应环境能执行的代码，目前是生产浏览器可以执行的
function bundle(graph) {
  let modules = ""

  //循环依赖关系，并把每个模块中的代码存在function作用域里
  graph.forEach(mod => {
    modules += `${mod.id}:[
      function (require, module, exports){
        ${JSON.stringify(mod.code)}
      },
      ${JSON.stringify(mod.mapping)},
    ],`;
  })


  //require, module, exports 是 cjs的标准不能再浏览器中直接使用，所以这里模拟cjs模块加载，执行，导出操作。
  const result = `
        (function(modules){
      //创建require函数， 它接受一个模块ID（这个模块id是数字0，1，2） ，它会在我们上面定义 modules 中找到对应是模块.
      function require(id){
        const [fn, mapping] = modules[id];
        function localRequire(relativePath){
          //根据模块的路径在mapping中找到对应的模块id
          return require(mapping[relativePath]);
        }
        const module = {exports:{}};
        //执行每个模块的代码。
        fn(localRequire,module,module.exports);
        return module.exports;
      }
      //执行入口文件，
      require(0);
    })({${modules}})
  `

  return result
}


const entryPath = path.resolve(__dirname, "./example/entry.js")


const graph = createGraph(entryPath)


console.log("graph", graph)

const ret = bundle(graph);

// 打包生成文件
const outputPath = path.resolve(__dirname, "./dist/bundle.js")
fs.writeFileSync(outputPath, ret);






