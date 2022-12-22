export class SandboxGlobalProxy {
  constructor(sharedState: any[]) {
    // 创建一个 iframe 标签，取出其中的原生浏览器全局对象作为沙箱的全局对象
    const iframe = document.createElement('iframe');
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    // sandboxGlobal作为沙箱运行时的全局对象
    const sandboxGlobal = iframe.contentWindow

    const blacklist = ['window', 'document', 'XMLHttpRequest', 'fetch', 'WebSocket', 'Image'];

    return new Proxy(sandboxGlobal!, {
      has: (target, prop: string) => {
        // has 可以拦截 with 代码块中任意属性的访问
        if (sharedState.includes(prop)) {
          // 如果属性存在于共享的全局状态中，则让其沿着原型链在外层查找
          return false;
        }

        // 黑名单中的变量禁止访问
        if (blacklist.includes(prop)) {
          throw new Error(`Can't use: ${prop}!`);
        }


        // 如果没有该属性，直接报错
        if (!target.hasOwnProperty(prop)) {
          throw new Error(`Not find: ${prop}!`);
        }

        // 属性存在，返回sandboxGlobal中的值
        return true;
      }
    })
  }
}

// 构造一个 with 来包裹需要执行的代码，返回 with 代码块的一个函数实例
export function withedYourCode(code: string) {
  code = "with(sandbox) {" + code + "}";
  return new Function("sandbox", code);
}


export function makeSandbox(code: string, ctx: any) {
  withedYourCode(code).call(ctx, ctx);
}
