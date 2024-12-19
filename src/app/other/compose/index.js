
// ------------------------    test -----------------------------------
let a = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("xhr1")
      resolve("xhr1")
    }, 5000)
  })
}

let b = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("xhr2")
      resolve("xhr2")
    }, 3000)
  })
}
let steps = [a, b] // 从右向左执行
let composeFn = compose3(...steps)

composeFn().then((res) => {
  console.log(666)
})

// xhr2
// xhr1
// 666
