// 聊聊Vue的template编译
// https://github.com/answershuto/learnVue/blob/master/docs/%E8%81%8A%E8%81%8AVue%E7%9A%84template%E7%BC%96%E8%AF%91.MarkDown


// $mount
// 首先看一下mount的代码
/*把原本不带编译的$mount方法保存下来，在最后会调用。*/
const mount = Vue.prototype.$mount
/*挂载组件，带模板编译*/
Vue.prototype.$mount = function (el: string | Element,
                                 hydrating: boolean): Component {
    el = el && query(el)

    /* istanbul ignore if */
    if (el === document.body || el === document.documentElement) {
        process.env.NODE_ENV !== 'production' && warn(
            `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
        )
        return this
    }

    const options = this.$options
    // resolve template/el and convert to render function
    /*处理模板templete，编译成render函数，render不存在的时候才会编译template，否则优先使用render*/
    if (!options.render) {
        let template = options.template
        /*template存在的时候取template，不存在的时候取el的outerHTML*/
        if (template) {
            /*当template是字符串的时候*/
            if (typeof template === 'string') {
                if (template.charAt(0) === '#') {
                    template = idToTemplate(template)
                    /* istanbul ignore if */
                    if (process.env.NODE_ENV !== 'production' && !template) {
                        warn(
                            `Template element not found or is empty: ${options.template}`,
                            this
                        )
                    }
                }
            } else if (template.nodeType) {
                /*当template为DOM节点的时候*/
                template = template.innerHTML
            } else {
                /*报错*/
                if (process.env.NODE_ENV !== 'production') {
                    warn('invalid template option:' + template, this)
                }
                return this
            }
        } else if (el) {
            /*获取element的outerHTML*/
            template = getOuterHTML(el)
        }
        if (template) {
            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
                mark('compile')
            }

            /*将template编译成render函数，这里会有render以及staticRenderFns两个返回，这是vue的编译时优化，static静态不需要在VNode更新时进行patch，优化性能*/
            const {render, staticRenderFns} = compileToFunctions(template, {
                shouldDecodeNewlines,
                delimiters: options.delimiters
            }, this)
            options.render = render
            options.staticRenderFns = staticRenderFns

            /* istanbul ignore if */
            if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
                mark('compile end')
                measure(`${this._name} compile`, 'compile', 'compile end')
            }
        }
    }
    /*Github:https://github.com/answershuto*/
    /*调用const mount = Vue.prototype.$mount保存下来的不带编译的mount*/
    return mount.call(this, el, hydrating)
}

//
// 通过mount代码我们可以看到，在mount的过程中，
// 如果render函数不存在（render函数存在会优先使用render）会将template进行compileToFunctions得到render以及staticRenderFns。
// 譬如说手写组件时加入了template的情况都会在运行时进行编译。而render function在运行后会返回VNode节点，
// 供页面的渲染以及在update的时候patch。接下来我们来看一下template是如何编译的。
//


// 一些基础
// 首先，template会被编译成AST，那么AST是什么？
//
// 在计算机科学中，抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。具体可以查看抽象语法树。
//
// // AST会经过generate得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，具体定义如下：
// ./VNode.js


// createCompiler
// createCompiler用以创建编译器，返回值是compile以及compileToFunctions。compile是一个编译器，它会将传入的template转换成对应的AST、render函数以及staticRenderFns函数。而compileToFunctions则是带缓存的编译器，同时staticRenderFns以及render函数会被转换成Funtion对象。
//
// 因为不同平台有一些不同的options，所以createCompiler会根据平台区分传入一个baseOptions，会与compile本身传入的options合并得到最终的finalOptions。


// compileToFunctions
// 首先还是贴一下compileToFunctions的代码。
/*带缓存的编译器，同时staticRenderFns以及render函数会被转换成Funtion对象*/
function compileToFunctions(template: string,
                            options: CompilerOptions,
                            vm: Component): CompiledFunctionResult {

    options = options || {}
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
        // detect possible CSP restriction
        try {
            new Function('return 1')
        } catch (e) {
            if (e.toString().match(/unsafe-eval|CSP/)) {
                warn(
                    'It seems you are using the standalone build of Vue.js in an ' +
                    'environment with Content Security Policy that prohibits unsafe-eval. ' +
                    'The template compiler cannot work in this environment. Consider ' +
                    'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
                    'templates into render functions.'
                )
            }
        }
    }
    // check cache
    /*有缓存的时候直接取出缓存中的结果即可*/
    const key = options.delimiters ?
        String(options.delimiters) + template
        : template
    if (functionCompileCache[key]) {
        return functionCompileCache[key]
    }
    // compile
    /*编译*/
    const compiled = compile(template, options)
    // check compilation errors/tips
    if (process.env.NODE_ENV !== 'production') {
        if (compiled.errors && compiled.errors.length) {
            warn(
                `Error compiling template:\n\n${template}\n\n` +
                compiled.errors.map(e => `- ${e}`).join('\n') + '\n',
                vm
            )
        }
        if (compiled.tips && compiled.tips.length) {
            compiled.tips.forEach(msg => tig(msg, vm))
        }
    }

    // turn code into functions
    const res = {}
    const fnGenErrors = []
    /*将render转换成Funtion对象*/
    res.render = makeFunction(compiled.render, fnGenErrors)
    /*将staticRenderFns全部转化成Funtion对象 */
    const l = compiled.staticRenderFns.length
    res.staticRenderFns = new Array(l)
    for (let i = 0; i < l; i++) {
        res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors)
    }


    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production') {
        if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
            warn(
                `Failed to generate render function:\n\n` +
                fnGenErrors.map(({err, code}) => `${err.toString()} in\n\n${code}\n`).join('\n'),
                vm
            )
        }
    }

    /*存放在缓存中，以免每次都重新编译*/
    return (functionCompileCache[key] = res)
}


// 我们可以发现，在闭包中，会有一个functionCompileCache对象作为缓存器。

/*作为缓存，防止每次都重新编译*/
const functionCompileCache: {
    [key: string]: CompiledFunctionResult;
} = Object.create(null)

// 在进入compileToFunctions以后，会先检查缓存中是否有已经编译好的结果，如果有结果则直接从缓存中读取。
// 这样做防止每次同样的模板都要进行重复的编译工作。

// check cache
/*有缓存的时候直接取出缓存中的结果即可*/
const key = options.delimiters
    ? String(options.delimiters) + template
    : template
if (functionCompileCache[key]) {
    //noinspection JSAnnotator
    return functionCompileCache[key]
}


// 在compileToFunctions的末尾会将编译结果进行缓存
/*存放在缓存中，以免每次都重新编译*/
// return (functionCompileCache[key] = res)


// compile
/*编译，将模板template编译成AST、render函数以及staticRenderFns函数*/
function complie(template: string,
                 options: CompilerOptions): CompiledResult {
    const finalOptions = Object.create(baseOptions)
    const errors = []
    const tips = []
    finalOptions.warn = (msg, tip) => {
        (tip ? tips : errors).push(msg)
    }
    /*做下面这些merge的目的因为不同平台可以提供自己本身平台的一个baseOptions，内部封装了平台自己的实现，
     然后把共同的部分抽离开来放在这层compiler中，所以在这里需要merge一下*/
    if (options) {
        // merge custom modules
        /*合并modules*/
        if (options.modules) {
            finalOptions.modules = (baseOptions || []).concat(options.modules)
        }
        // merge custom directives
        if (options.directives) {
            /*合并directives*/
            finalOptions.directives = extend(
                Object.create(baseOptions.directives),
                options.directives
            )
        }
        // copy other options
        for (const key in options) {
            /*合并其余的options，modules与directives已经在上面做了特殊处理了*/
            if (key !== 'modules' && key !== 'directives') {
                finalOptions[key] = options[key]
            }
        }
    }
    /*基础模板编译，得到编译结果*/
    const compiled = baseCompile(template, finalOptions)
    if (process.env.NODE_ENV !== 'production') {
        errors.push.apply(errors, detectErrors(compiled.ast))
    }
    compiled.errors = errors
    compiled.tips = tips
    return compiled
}

// compile主要做了两件事，一件是合并option（前面说的将平台自有的option与传入的option进行合并），
// 另一件是baseCompile，进行模板template的编译。
//
// 来看一下baseCompile
function baseCompile(template: string,
                     options: CompilerOptions,): CompiledResult {
    /*parse解析得到AST*/
    const ast = parse(template.trim(), options)
    /*
     将AST进行优化
     优化的目标：生成模板AST，检测不需要进行DOM改变的静态子树。
     一旦检测到这些静态树，我们就能做以下这些事情：
     1.把它们变成常数，这样我们就再也不需要每次重新渲染时创建新的节点了。
     2.在patch的过程中直接跳过。
     */
    optimize(ast, options)
    /*根据AST生成所需的code（内部包含render与staticRenderFns）*/
    const code = generate(ast, options)
    return {
        ast,
        render: code.render,
        staticRenderFns: code.staticRenderFns
    }

}

// baseCompile首先会将模板template进行parse得到一个AST，再通过optimize做一些优化，
// 最后通过generate得到render以及staticRenderFns。


// parse
// parse的源码可以参见https://github.com/answershuto/learnVue/blob/master/vue-src/compiler/parser/index.js#L53。
// parse会用正则等方式解析template模板中的指令、class、style等数据，形成AST。
// ./parser/index.js


// optimize
// optimize的主要作用是标记static静态节点，这是Vue在编译过程中的一处优化，后面当update更新界面时，会有一个patch的过程，
// diff算法会直接跳过静态节点，从而减少了比较的过程，优化了patch的性能。


// generate
// generate是将AST转化成render funtion字符串的过程，
// 得到结果是render的字符串以及staticRenderFns字符串。


// 至此，我们的template模板已经被转化成了我们所需的AST、render function字符串以及staticRenderFns字符串。












