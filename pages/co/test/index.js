// -----------  测试 -------------------
const readFile = function(fileName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve('resolve readFile' + fileName)
    })
  })
}

var gen = function*() {
  var f1 = yield readFile('/etc/fstab')
  console.log('f1', f1)
  var f2 = yield readFile('/etc/shells')
  console.log(f2.toString())
}

window.co(gen).then((res) => {
  console.log('res', res)
})
