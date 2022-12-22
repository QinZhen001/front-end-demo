// js 沙箱
// https://mp.weixin.qq.com/s/nzUEp2nS-cf5zKYOsE-q5A
// 请设计一个不能操作 DOM 和调接口的环境



import { SandboxGlobalProxy, withedYourCode, makeSandbox } from './src'

// 要执行的代码
const code = `
  let aaa = 1;
  let bbb = 2;
  console.log(aaa + bbb);
`;

// const code = `console.log(document)`;
const SandBox = () => {
  const carry = () => {
    // sharedGlobal作为与外部执行环境共享的全局对象
    // code中获取的history为最外层作用域的history
    const sharedGlobal = ["history"];
    const globalProxy = new SandboxGlobalProxy(sharedGlobal);
    makeSandbox(code, globalProxy);
    // // 对外层的window对象没有影响
    // // @ts-ignore
    // console.log("window.abc ", window.abc); // undefined
    // Object.prototype.toString(); // 并没有打印 Traped
  }

  return <div>
    <button onClick={carry}>沙箱中执行代码</button>
  </div>
}


export default SandBox
