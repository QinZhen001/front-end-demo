// -----------  测试 -------------------
const readFile = function (fileName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve("name: " + fileName)
    }, 2000)
  })
}

var gen = function* () {
  var f1 = yield readFile("/etc/fstab")
  console.log("readFile f1", f1)
  var f2 = yield readFile("/etc/shells")
  console.log("readFile f2", f2)
  var f3 = yield readFile("/etc/screct")
  console.log("readFile f3", f3)
  return "end"
}

window.co(gen).then((res) => {
  console.log("结束", res)
})
